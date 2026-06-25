/**
 * 通联 syb-test 沙箱联调:跑一笔统一支付下单(扫码主扫),验证网关/签名/字段/paytype。
 * 用法: npx tsx scripts/test-allinpay-order.mts [wxpay|alipay|unionpay]
 * 读 .env.local 注入 process.env,再调 lib/pay/allinpay 的 createScanOrder。
 */
import { readFileSync } from "node:fs";

for (const l of readFileSync(".env.local", "utf8").split("\n")) {
  const m = l.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const { createScanOrder, loadAllinpay, allinpayConfigured, verifyParams } = await import("../src/lib/pay/allinpay.js");

const cfg = loadAllinpay();
console.log("网关:", cfg.gateway, "| cusid:", cfg.cusid, "| appid:", cfg.appid, "| 配置完整:", allinpayConfigured());

const method = (process.argv[2] as "wxpay" | "alipay" | "unionpay") ?? "wxpay";
const outTradeNo = `TEST${Date.now().toString(36).toUpperCase()}`;
console.log(`\n下单: method=${method} reqsn=${outTradeNo} 金额=1分(¥0.01)`);

const r = await createScanOrder({ outTradeNo, amountFen: 1, body: "OnePad会员测试", method });
console.log("\n=== 结果 ===");
console.log("ok:", r.ok);
console.log("qrCode(payinfo):", r.qrCode ? r.qrCode.slice(0, 80) + (r.qrCode.length > 80 ? "…" : "") : "(无)");
console.log("tradeNo(trxid):", r.tradeNo ?? "(无)");
console.log("error:", r.error ?? "(无)");
console.log("raw:", JSON.stringify(r.raw).slice(0, 600));

// 用配置的通联公钥(当前=测试公钥)验本次真实应答签名(零手抄)
const raw = r.raw as Record<string, string> | null;
if (raw && raw.sign) {
  const { sign, ...rest } = raw;
  const ok = verifyParams(rest, sign, loadAllinpay().tlPublicKey);
  console.log(`\n应答验签(测试公钥验生产签名): ${ok ? "✓ 通过 → 同一把公钥,回调也能验" : "✗ 失败 → 测试公钥验不了生产签名"}`);
}
