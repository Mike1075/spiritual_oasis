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

// 向多维表格写一条记录，返回 record_id
export async function createBitableRecord(fields: LeadFields): Promise<string> {
  const token = await getTenantToken();
  const res = await fetch(
    `${FEISHU_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fields }),
    }
  );
  const json = (await res.json()) as {
    code: number;
    msg: string;
    data?: { record?: { record_id?: string } };
  };
  if (json.code !== 0) {
    throw new Error(`飞书写表失败: ${json.code} ${json.msg}`);
  }
  return json.data?.record?.record_id ?? "";
}
