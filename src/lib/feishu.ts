// 飞书开放平台 — 服务端工具（Vercel serverless 友好，纯 fetch，不依赖 lark-cli）
// 用 tenant_access_token（应用身份）写多维表格记录。
// 该应用 cli_aa948c518565dcba 已被加为线索 base 的协作者（edit），可直接写记录。

const FEISHU_BASE = "https://open.feishu.cn/open-apis";

// 这些不是机密，可作为默认值硬编码；机密只有 APP_SECRET，必须走环境变量。
const APP_ID = process.env.FEISHU_APP_ID || "cli_aa948c518565dcba";
const APP_SECRET = process.env.FEISHU_APP_SECRET || "";
const APP_TOKEN =
  process.env.FEISHU_BITABLE_APP_TOKEN || "BMlcbTjznaJL5WsOXsxcgHavnrh";
const TABLE_ID = process.env.FEISHU_BITABLE_TABLE_ID || "tblWYdnuPsa86tTp";
// AI 罗盘测评结果表（与线索表同 base，应用权限自动覆盖）
export const COMPASS_TABLE_ID =
  process.env.FEISHU_COMPASS_TABLE_ID || "tblmMoNLy8WKTJcI";
// OPC 城市政策库（与线索表同 base，应用权限自动覆盖）—— /opc/policies 政策库页 + 结果页嵌入读取
export const OPC_POLICY_TABLE_ID =
  process.env.FEISHU_OPC_POLICY_TABLE_ID || "tbl8rtvjE1cve76m";
// 618 锁位表：独立私密 base（应用自有 owner，写入不依赖任何人为授权；
// 同事默认不可见，需要谁看就把 base 单独分享为"可阅读"）
export const LOCK_APP_TOKEN =
  process.env.FEISHU_LOCK_APP_TOKEN || "IrGKbwczXa33ZRsC104cM8WsnKs";
export const LOCK_TABLE_ID =
  process.env.FEISHU_LOCK_TABLE_ID || "tbll5i7M32yTQK88";

export const feishuConfigured = Boolean(APP_SECRET);

// 进程内缓存 tenant_access_token（有效期约 2h，提前 5min 失效）
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getTenantToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token;
  }
  const res = await fetch(
    `${FEISHU_BASE}/auth/v3/tenant_access_token/internal`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ app_id: APP_ID, app_secret: APP_SECRET }),
    }
  );
  const json = (await res.json()) as {
    code: number;
    msg: string;
    tenant_access_token?: string;
    expire?: number;
  };
  if (json.code !== 0 || !json.tenant_access_token) {
    throw new Error(`飞书鉴权失败: ${json.code} ${json.msg}`);
  }
  cachedToken = {
    token: json.tenant_access_token,
    expiresAt: now + (json.expire ?? 7200) * 1000 - 5 * 60 * 1000,
  };
  return cachedToken.token;
}

export type LeadFields = Record<string, string | number>;

// 同一张多维表格不支持并发写，直播峰值下偶发冲突——指数退避重试基本能救回
async function feishuFetch<T extends { code: number; msg: string }>(
  url: string,
  init: RequestInit,
  retries = 3
): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i <= retries; i++) {
    try {
      const token = await getTenantToken();
      const res = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
          ...(init.headers || {}),
        },
      });
      const json = (await res.json()) as T;
      if (json.code === 0) return json;
      lastErr = new Error(`飞书接口失败: ${json.code} ${json.msg}`);
      // 频控/冲突类错误才值得重试；权限/参数错误直接抛
      if (![1254290, 1254291, 1255040, 99991400].includes(json.code) && i > 0) {
        throw lastErr;
      }
    } catch (e) {
      lastErr = e;
    }
    if (i < retries) {
      await new Promise((r) => setTimeout(r, 300 * 2 ** i + Math.random() * 200));
    }
  }
  throw lastErr;
}

// 向多维表格写一条记录，返回 record_id
export async function createBitableRecord(
  fields: LeadFields,
  tableId: string = TABLE_ID,
  appToken: string = APP_TOKEN
): Promise<string> {
  const json = await feishuFetch<{
    code: number;
    msg: string;
    data?: { record?: { record_id?: string } };
  }>(`${FEISHU_BASE}/bitable/v1/apps/${appToken}/tables/${tableId}/records`, {
    method: "POST",
    body: JSON.stringify({ fields }),
  });
  return json.data?.record?.record_id ?? "";
}

// 更新已有记录（留资解锁时补写姓名/联系方式）
export async function updateBitableRecord(
  recordId: string,
  fields: LeadFields,
  tableId: string = TABLE_ID,
  appToken: string = APP_TOKEN
): Promise<void> {
  await feishuFetch<{ code: number; msg: string }>(
    `${FEISHU_BASE}/bitable/v1/apps/${appToken}/tables/${tableId}/records/${recordId}`,
    { method: "PUT", body: JSON.stringify({ fields }) }
  );
}

// 按字段精确匹配搜索记录（找回报告用），返回 record_id + fields
export async function searchBitableRecords(
  fieldName: string,
  value: string,
  tableId: string = TABLE_ID,
  limit = 20,
  appToken: string = APP_TOKEN
): Promise<
  { recordId: string; fields: Record<string, unknown>; createdTime: number }[]
> {
  const json = await feishuFetch<{
    code: number;
    msg: string;
    data?: {
      items?: {
        record_id: string;
        fields: Record<string, unknown>;
        // automatic_fields:true 时飞书返回创建时间（毫秒）
        created_time?: number;
      }[];
    };
  }>(
    `${FEISHU_BASE}/bitable/v1/apps/${appToken}/tables/${tableId}/records/search?page_size=${limit}`,
    {
      method: "POST",
      body: JSON.stringify({
        filter: {
          conjunction: "and",
          conditions: [
            { field_name: fieldName, operator: "is", value: [value] },
          ],
        },
        automatic_fields: true,
      }),
    },
    1
  );
  return (json.data?.items ?? []).map((r) => ({
    recordId: r.record_id,
    fields: r.fields,
    createdTime: Number(r.created_time) || 0,
  }));
}

// 拉取整表指定字段（锁位余位统计用）。自动翻页，表内记录量级在几百条，开销可控。
export async function listBitableRecords(
  tableId: string,
  fieldNames: string[],
  appToken: string = APP_TOKEN
): Promise<Record<string, unknown>[]> {
  const all: Record<string, unknown>[] = [];
  let pageToken = "";
  do {
    const qs = `page_size=500${pageToken ? `&page_token=${pageToken}` : ""}`;
    const json = await feishuFetch<{
      code: number;
      msg: string;
      data?: {
        items?: { fields: Record<string, unknown> }[];
        has_more?: boolean;
        page_token?: string;
      };
    }>(
      `${FEISHU_BASE}/bitable/v1/apps/${appToken}/tables/${tableId}/records/search?${qs}`,
      {
        method: "POST",
        body: JSON.stringify({ field_names: fieldNames }),
      },
      1
    );
    for (const r of json.data?.items ?? []) all.push(r.fields);
    pageToken = json.data?.has_more ? json.data?.page_token ?? "" : "";
  } while (pageToken);
  return all;
}

// 把图片字节永久存进飞书云盘（parent_type=bitable_image，挂在本 base 下），返回 file_token。
// 用途：MiniMax 文生图返回的 OSS 链接 24h 过期，生成时立即落盘换成永久 token，杜绝过期空图。
export async function uploadBitableMedia(
  bytes: ArrayBuffer,
  fileName: string,
  appToken: string = APP_TOKEN
): Promise<string> {
  const token = await getTenantToken();
  const form = new FormData();
  form.append("file_name", fileName);
  form.append("parent_type", "bitable_image");
  form.append("parent_node", appToken);
  form.append("size", String(bytes.byteLength));
  form.append("file", new Blob([bytes]), fileName);
  const res = await fetch(`${FEISHU_BASE}/drive/v1/medias/upload_all`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` }, // 不要手动设 Content-Type，让 fetch 带 multipart boundary
    body: form,
  });
  const json = (await res.json()) as {
    code: number;
    msg: string;
    data?: { file_token?: string };
  };
  if (json.code !== 0 || !json.data?.file_token) {
    throw new Error(`飞书素材上传失败: ${json.code} ${json.msg}`);
  }
  return json.data.file_token;
}

// 按 file_token 取回素材字节流（永久有效，服务端用 tenant token 现取）。返回原始 Response 供流式透传。
export async function downloadBitableMedia(fileToken: string): Promise<Response> {
  const token = await getTenantToken();
  return fetch(`${FEISHU_BASE}/drive/v1/medias/${fileToken}/download`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// 读取单条记录（分享页用）
export async function getBitableRecord(
  recordId: string,
  tableId: string = TABLE_ID
): Promise<Record<string, unknown> | null> {
  try {
    const json = await feishuFetch<{
      code: number;
      msg: string;
      data?: { record?: { fields?: Record<string, unknown> } };
    }>(
      `${FEISHU_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${tableId}/records/${recordId}`,
      { method: "GET" },
      1
    );
    return json.data?.record?.fields ?? null;
  } catch {
    return null;
  }
}
