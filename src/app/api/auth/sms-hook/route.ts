/**
 * Supabase「Send SMS」Hook：手机号 OTP 下发走阿里云短信。
 * Supabase 在需要发验证码时 POST 本路由(带 Standard Webhooks 签名)，我们验签后调阿里云 SendSms。
 * 配置：Supabase Auth → Hooks → Send SMS Hook(HTTPS) → 本 URL + 生成的 Secret(存 SUPABASE_SMS_HOOK_SECRET)。
 * 阿里云 RPC v1 签名与 ~/.claude/skills/aliyun-sms 同(已用官方向量验过)。
 */
import crypto from "node:crypto";

export const dynamic = "force-dynamic";

const pe = (s: string) =>
  encodeURIComponent(s).replace(/\+/g, "%20").replace(/\*/g, "%2A").replace(/%7E/g, "~");

async function sendAliyunSms(phone: string, code: string) {
  const params: Record<string, string> = {
    AccessKeyId: process.env.ALIYUN_SMS_ACCESS_KEY_ID!,
    Action: "SendSms",
    Format: "JSON",
    RegionId: process.env.ALIYUN_SMS_REGION || "cn-hangzhou",
    SignatureMethod: "HMAC-SHA1",
    SignatureNonce: crypto.randomUUID(),
    SignatureVersion: "1.0",
    Timestamp: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
    Version: "2017-05-25",
    PhoneNumbers: phone,
    SignName: process.env.ALIYUN_SMS_SIGN_NAME!,
    TemplateCode: process.env.ALIYUN_SMS_TEMPLATE_CODE!,
    TemplateParam: JSON.stringify({ code }),
  };
  const canonical = Object.keys(params).sort().map((k) => `${pe(k)}=${pe(params[k])}`).join("&");
  const stringToSign = `GET&${pe("/")}&${pe(canonical)}`;
  const signature = crypto
    .createHmac("sha1", process.env.ALIYUN_SMS_ACCESS_KEY_SECRET! + "&")
    .update(stringToSign)
    .digest("base64");
  const endpoint = process.env.ALIYUN_SMS_ENDPOINT || "dysmsapi.aliyuncs.com";
  const r = await fetch(`https://${endpoint}/?${canonical}&Signature=${pe(signature)}`);
  const j = await r.json();
  if (j.Code !== "OK") throw new Error(`Aliyun SMS ${j.Code}: ${j.Message}`);
}

// 验 Supabase Hook 签名(Standard Webhooks / svix 风格)
function verify(secretRaw: string, id: string, ts: string, sig: string, body: string): boolean {
  const secret = Buffer.from(secretRaw.replace(/^v1,whsec_/, ""), "base64");
  const expected = crypto.createHmac("sha256", secret).update(`${id}.${ts}.${body}`).digest("base64");
  return sig.split(" ").some((part) => {
    const s = part.split(",")[1] ?? part;
    const a = Buffer.from(s);
    const b = Buffer.from(expected);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const h = req.headers;
  const ok = verify(
    process.env.SUPABASE_SMS_HOOK_SECRET || "",
    h.get("webhook-id") || "",
    h.get("webhook-timestamp") || "",
    h.get("webhook-signature") || "",
    body,
  );
  if (!ok) return new Response("invalid signature", { status: 401 });

  let payload: { user?: { phone?: string }; sms?: { otp?: string } };
  try { payload = JSON.parse(body); } catch { return new Response("bad json", { status: 400 }); }
  const phone = payload?.user?.phone;
  const otp = payload?.sms?.otp;
  if (!phone || !otp) return new Response("bad payload", { status: 400 });

  // 国内号去掉 86 国家码(阿里云国内模板要 11 位)；其它国家码原样走国际通道
  const national = phone.replace(/^\+?86/, "");
  try {
    await sendAliyunSms(national, otp);
    return new Response(JSON.stringify({}), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
