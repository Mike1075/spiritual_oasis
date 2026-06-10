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

export type LeadFields = Record<string, string>;

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
  tableId: string = TABLE_ID
): Promise<string> {
  const json = await feishuFetch<{
    code: number;
    msg: string;
    data?: { record?: { record_id?: string } };
  }>(`${FEISHU_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${tableId}/records`, {
    method: "POST",
    body: JSON.stringify({ fields }),
  });
  return json.data?.record?.record_id ?? "";
}

// 更新已有记录（留资解锁时补写姓名/联系方式）
export async function updateBitableRecord(
  recordId: string,
  fields: LeadFields,
  tableId: string = TABLE_ID
): Promise<void> {
  await feishuFetch<{ code: number; msg: string }>(
    `${FEISHU_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${tableId}/records/${recordId}`,
    { method: "PUT", body: JSON.stringify({ fields }) }
  );
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
