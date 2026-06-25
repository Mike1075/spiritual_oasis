/**
 * 通联支付(收银宝)客户端 —— 扫码 Native 下单 + 异步通知验签。
 * ------------------------------------------------------------------
 * 已按通联正式文档「4.1 统一支付API」校准(prodoc.allinpay.com/doc/256):
 *   - 接口:POST {gateway}/unitorder/pay;生产 gateway=https://vsp.allinpay.com/apiweb,
 *     测试=https://syb-test.allinpay.com/apiweb。
 *   - 加签(doc/2318):非空业务参数按参数名 ASCII 升序、& 连 key=value、含 signtype、
 *     剔除 sign、不 URL 编码;SHA1withRSA → base64。验通联回调用通联公钥、同规则。
 *   - 金额 trxamt 单位=分;reqsn=商户单号;paytype 长度3(W01微信/A01支付宝/U01云闪付,
 *     主扫场景 acct 留空)。
 *   - 同步返回:retcode=SUCCESS/FAIL(通信),payinfo=二维码串(扫码),trxstatus=交易状态。
 *   - 异步通知(doc/2331):form 推送,商户单号回传字段为【cusorderid】,成功 trxstatus=0000,
 *     商户须回纯文本 "success" 否则通联重推。
 *   - trxstatus(doc/2320):0000 成功;2000/2008/3088 处理中/待支付;1001/3xxx 失败/关闭。
 */
import { createSign, createVerify, randomBytes } from "node:crypto";

export interface AllinpayConfig {
  gateway: string; // 网关基址
  cusid: string; // 商户号
  appid: string; // 应用 appid
  privateKey: string; // 我方 RSA 私钥(PEM)
  tlPublicKey: string; // 通联 RSA 公钥(PEM,验回调签名用)
  notifyUrl: string; // 异步通知地址
  version: string;
}

function pem(raw: string, type: "PRIVATE" | "PUBLIC"): string {
  const s = (raw || "").trim().replace(/\\n/g, "\n");
  if (s.includes("BEGIN")) return s; // 已是完整 PEM
  // 纯 base64 → 包成 PEM
  const label = type === "PRIVATE" ? "PRIVATE KEY" : "PUBLIC KEY";
  const body = s.replace(/\s+/g, "").replace(/(.{64})/g, "$1\n");
  return `-----BEGIN ${label}-----\n${body}\n-----END ${label}-----`;
}

export function loadAllinpay(): AllinpayConfig {
  const e = process.env;
  const cfg: AllinpayConfig = {
    gateway: e.ALLINPAY_GATEWAY || "https://vsp.allinpay.com/apiweb",
    cusid: e.ALLINPAY_CUSID || "",
    appid: e.ALLINPAY_APPID || "",
    privateKey: pem(e.ALLINPAY_PRIVATE_KEY || "", "PRIVATE"),
    tlPublicKey: pem(e.ALLINPAY_TL_PUBLIC_KEY || "", "PUBLIC"),
    notifyUrl: e.ALLINPAY_NOTIFY_URL || "",
    version: e.ALLINPAY_VERSION || "11",
  };
  return cfg;
}

export function allinpayConfigured(): boolean {
  const c = loadAllinpay();
  return !!(c.cusid && c.appid && c.privateKey.includes("BEGIN") && c.tlPublicKey.includes("BEGIN"));
}

/** 收银宝待签名串(doc/2318):剔除 sign/空值,按 key ASCII 升序拼成 a=1&b=2,含 signtype,不 urlencode。 */
export function canonical(params: Record<string, string>): string {
  return Object.keys(params)
    .filter((k) => k !== "sign" && params[k] !== undefined && params[k] !== null && params[k] !== "")
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
}

/** RSA 加签:SHA1withRSA → base64(doc/2318 确认)。 */
export function signParams(params: Record<string, string>, privateKey: string): string {
  const signer = createSign("RSA-SHA1");
  signer.update(canonical(params), "utf8");
  return signer.sign(privateKey, "base64");
}

/** 验签(回调用通联公钥) */
export function verifyParams(params: Record<string, string>, sign: string, tlPublicKey: string): boolean {
  try {
    const verifier = createVerify("RSA-SHA1");
    verifier.update(canonical(params), "utf8");
    return verifier.verify(tlPublicKey, sign, "base64");
  } catch {
    return false;
  }
}

export function randomStr(len = 16): string {
  return randomBytes(Math.ceil(len / 2)).toString("hex").slice(0, len);
}

export type PayMethod = "wxpay" | "alipay" | "unionpay";

// paytype 长度3(doc/256 + 附录 5.3);主扫(用户扫商户展示码)按渠道选
const PAYTYPE: Record<PayMethod, string> = {
  wxpay: "W01", // 微信
  alipay: "A01", // 支付宝
  unionpay: "U01", // 银联云闪付
};

export interface ScanOrderResult {
  ok: boolean;
  qrCode?: string; // payinfo:二维码内容(前端渲染成二维码)
  tradeNo?: string; // 通联交易号 trxid
  raw: unknown;
  error?: string;
}

/**
 * 统一支付下单(主扫,返回 payinfo 二维码串)。POST {gateway}/unitorder/pay。
 * acct 留空=扫码场景。成功判定:retcode=SUCCESS 且拿到 payinfo。
 */
export async function createScanOrder(input: {
  outTradeNo: string;
  amountFen: number;
  body: string;
  method: PayMethod;
  validMinutes?: number;
}): Promise<ScanOrderResult> {
  const cfg = loadAllinpay();
  const params: Record<string, string> = {
    cusid: cfg.cusid,
    appid: cfg.appid,
    version: cfg.version,
    trxamt: String(input.amountFen), // 分
    reqsn: input.outTradeNo,
    paytype: PAYTYPE[input.method],
    randomstr: randomStr(),
    body: input.body,
    notify_url: cfg.notifyUrl,
    validtime: String(input.validMinutes ?? 30),
    signtype: "RSA",
  };
  params.sign = signParams(params, cfg.privateKey);

  try {
    const res = await fetch(`${cfg.gateway}/unitorder/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams(params).toString(),
    });
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try { json = JSON.parse(text); } catch { /* 非 JSON 原样留 raw */ }
    const retcode = String(json.retcode ?? "");
    const payinfo = (json.payinfo as string) || undefined;
    const ok = retcode === "SUCCESS" && !!payinfo;
    return {
      ok,
      qrCode: payinfo,
      tradeNo: (json.trxid as string) || undefined,
      raw: json && Object.keys(json).length ? json : text,
      error: ok ? undefined : (json.retmsg as string) || (json.errmsg as string) || text.slice(0, 200),
    };
  } catch (e) {
    return { ok: false, raw: null, error: (e as Error).message };
  }
}

export interface RefundResult {
  ok: boolean;
  status: "done" | "pending" | "failed"; // done=已退,pending=处理中(等退款回调),failed=失败
  refundTrxid?: string;
  raw: unknown;
  error?: string;
}

/**
 * 统一退款(doc/258):POST {网关}/tranx/refund。支持部分退款、多次退款。
 * oldReqsn(原交易商户单号) 与 oldTrxid(原交易通联流水) 二选一指定要退哪笔。
 */
export async function createRefund(input: {
  refundReqsn: string; // 新退款单号(我方生成,唯一)
  amountFen: number; // 退款金额(分)
  oldReqsn?: string;
  oldTrxid?: string;
}): Promise<RefundResult> {
  const cfg = loadAllinpay();
  const params: Record<string, string> = {
    cusid: cfg.cusid,
    appid: cfg.appid,
    version: cfg.version,
    trxamt: String(input.amountFen),
    reqsn: input.refundReqsn,
    randomstr: randomStr(),
    notify_url: cfg.notifyUrl,
    signtype: "RSA",
  };
  if (input.oldReqsn) params.oldreqsn = input.oldReqsn;
  if (input.oldTrxid) params.oldtrxid = input.oldTrxid;
  params.sign = signParams(params, cfg.privateKey);
  try {
    const res = await fetch(`${cfg.gateway}/tranx/refund`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      body: new URLSearchParams(params).toString(),
    });
    const text = await res.text();
    let json: Record<string, unknown> = {};
    try { json = JSON.parse(text); } catch { /* */ }
    const retcode = String(json.retcode ?? "");
    const trxstatus = String(json.trxstatus ?? "");
    const ok = retcode === "SUCCESS" && ["0000", "2000", "2008"].includes(trxstatus);
    const status: RefundResult["status"] = retcode !== "SUCCESS" ? "failed" : trxstatus === "0000" ? "done" : "pending";
    return {
      ok, status,
      refundTrxid: (json.trxid as string) || undefined,
      raw: json && Object.keys(json).length ? json : text,
      error: ok ? undefined : (json.retmsg as string) || (json.errmsg as string) || text.slice(0, 200),
    };
  } catch (e) {
    return { ok: false, status: "failed", raw: null, error: (e as Error).message };
  }
}

// 退款类交易码(微信/支付宝/银联退货),用于识别退款通知
const REFUND_TRXCODES = ["VSP503", "VSP513", "VSP553"];

export interface NotifyResult {
  valid: boolean; // 验签通过
  outTradeNo?: string;
  tradeNo?: string;
  amountFen?: number;
  success?: boolean; // 交易是否成功
  isRefund: boolean; // 是否退款通知
  srcTradeNo?: string; // 退款通知里的原交易流水(匹配原订单用)
  oldReqsn?: string; // 退款通知里的原交易商户单号
  params: Record<string, string>;
}

/**
 * 解析并验签异步通知(doc/2331)。
 * 注意:通知里商户单号字段是【cusorderid】(下单时我们发的是 reqsn);成功 trxstatus=0000。
 */
export function parseNotify(params: Record<string, string>): NotifyResult {
  const cfg = loadAllinpay();
  const sign = params.sign || "";
  const valid = verifyParams(params, sign, cfg.tlPublicKey);
  const trxstatus = params.trxstatus ?? "";
  return {
    valid,
    outTradeNo: params.cusorderid || params.reqsn, // 通知用 cusorderid
    tradeNo: params.trxid,
    amountFen: params.trxamt ? Number(params.trxamt) : undefined,
    success: trxstatus === "0000",
    isRefund: REFUND_TRXCODES.includes(params.trxcode ?? ""),
    srcTradeNo: params.srctrxid || params.oldtrxid || undefined, // 原交易流水
    oldReqsn: params.oldreqsn || undefined, // 原交易商户单号
    params,
  };
}

/** 通联期望的回调应答:纯文本 "success"(否则通联重推)。 */
export const NOTIFY_ACK = "success";
