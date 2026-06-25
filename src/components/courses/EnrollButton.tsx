"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { PayModal } from "./PayModal";

/**
 * 「立即报名」按钮：未登录→跳登录(带 next 回跳)；已登录→开支付弹窗。
 * soldOut 时禁用显示「已满」。
 */
export function EnrollButton({
  sessionId,
  name,
  priceYuan,
  soldOut,
  loginNext,
}: {
  sessionId: string;
  name: string;
  priceYuan: string;
  soldOut: boolean;
  loginNext: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [checking, setChecking] = useState(false);

  if (soldOut) {
    return (
      <button disabled className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-medium text-white/30">
        已满
      </button>
    );
  }

  async function onClick() {
    setChecking(true);
    const supabase = createBrowserSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    setChecking(false);
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(loginNext)}`);
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button
        onClick={onClick}
        disabled={checking}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60"
      >
        {checking ? "…" : "立即报名"}
      </button>
      {open && (
        <PayModal
          sessionId={sessionId}
          name={name}
          priceYuan={priceYuan}
          onPaid={() => setPaid(true)}
          onClose={() => {
            setOpen(false);
            if (paid) router.refresh(); // 付款成功后刷新页面：更新剩余名额 + 切到「已报名」
          }}
        />
      )}
    </>
  );
}
