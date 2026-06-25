"use client";
/**
 * 单课报名支付弹窗（通联收银宝·扫码 Native）。
 * 流程：选微信/支付宝 → POST /api/pay/create 拿 payinfo → 渲染二维码 → 轮询 /api/pay/status → 到账即成功。
 * 价格以服务端 course_sessions 为准；前端只展示与发起。
 */
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

type Method = "wxpay" | "alipay";
type Phase = "choose" | "creating" | "qr" | "paid" | "error";

export function PayModal({
  sessionId,
  name,
  priceYuan,
  onClose,
}: {
  sessionId: string;
  name: string;
  priceYuan: string;
  onClose: () => void;
}) {
  const [method, setMethod] = useState<Method>("wxpay");
  const [phase, setPhase] = useState<Phase>("choose");
  const [qrImg, setQrImg] = useState("");
  const [err, setErr] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (pollRef.current) clearInterval(pollRef.current); }, []);

  async function pay() {
    setPhase("creating");
    setErr("");
    try {
      const r = await fetch("/api/pay/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, method }),
      });
      const d = await r.json();
      if (!d.ok || !d.qrCode) {
        setErr(
          r.status === 401 ? "请先登录后再报名" :
          d.code === "sold_out" ? "名额已满" :
          d.code === "not_configured" ? "支付开通中，请稍后再试" :
          d.error || "下单失败",
        );
        setPhase("error");
        return;
      }
      const img = await QRCode.toDataURL(d.qrCode, { width: 220, margin: 1 });
      setQrImg(img);
      setPhase("qr");
      let ticks = 0;
      pollRef.current = setInterval(async () => {
        ticks++;
        try {
          const s = await fetch(`/api/pay/status?out_trade_no=${encodeURIComponent(d.outTradeNo)}`).then((x) => x.json());
          if (s.paid) {
            if (pollRef.current) clearInterval(pollRef.current);
            setPhase("paid");
          }
        } catch { /* 网络抖动，下次再轮 */ }
        if (ticks > 300 && pollRef.current) clearInterval(pollRef.current); // ~10分钟封顶
      }, 2000);
    } catch {
      setErr("网络异常，请重试");
      setPhase("error");
    }
  }

  const methodLabel = method === "wxpay" ? "微信" : "支付宝";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-label="报名支付" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d1414] p-6 shadow-2xl backdrop-blur" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">报名 · {name}</h3>
          <button onClick={onClose} aria-label="关闭" className="text-white/40 hover:text-white/70">×</button>
        </div>

        {(phase === "choose" || phase === "creating") && (
          <>
            <div className="mb-5 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-amber-300">¥{priceYuan}</span>
            </div>
            <div className="mb-5 flex gap-2">
              {(["wxpay", "alipay"] as Method[]).map((m) => (
                <button key={m} onClick={() => setMethod(m)}
                  className={`flex-1 rounded-xl border py-2.5 text-sm font-medium transition ${method === m ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200" : "border-white/10 text-white/50 hover:text-white/80"}`}>
                  {m === "wxpay" ? "微信支付" : "支付宝"}
                </button>
              ))}
            </div>
            <button onClick={pay} disabled={phase === "creating"}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50">
              {phase === "creating" ? "生成二维码…" : `${methodLabel}支付 ¥${priceYuan}`}
            </button>
            <p className="mt-3 text-center text-xs text-white/30">支付即视为报名该场次。如需退款请在支付后 24 小时内自助办理。</p>
          </>
        )}

        {phase === "qr" && (
          <div className="flex flex-col items-center">
            {qrImg && <img src={qrImg} alt="支付二维码" className="my-3 h-52 w-52 rounded-xl border border-white/10 bg-white p-2" />}
            <div className="text-sm font-medium text-white">¥{priceYuan} · {name}</div>
            <p className="mt-2 text-center text-xs text-white/50">请用{methodLabel}扫一扫完成支付，付款后本页自动确认 ✦</p>
            <span className="mt-3 text-xs text-amber-300">● 等待支付中…</span>
            <button onClick={() => setPhase("choose")} className="mt-3 text-xs text-white/40 underline">← 重新选择</button>
          </div>
        )}

        {phase === "paid" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-3xl text-white">✓</div>
            <h3 className="text-lg font-semibold text-white">报名成功！</h3>
            <p className="text-center text-sm text-white/60">我们已收到你的付款，稍后会与你联系闭关安排。可在「我的订单」查看。</p>
            <button onClick={onClose} className="mt-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white">完成</button>
          </div>
        )}

        {phase === "error" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20 text-3xl font-bold text-red-300">!</div>
            <p className="text-center text-sm text-white/70">{err}</p>
            <button onClick={() => setPhase("choose")} className="mt-2 w-full rounded-xl border border-white/15 py-3 text-sm text-white/80">返回重试</button>
          </div>
        )}
      </div>
    </div>
  );
}
