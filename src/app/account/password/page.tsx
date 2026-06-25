"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

export default function PasswordPage() {
  const router = useRouter();
  const supabase = createBrowserSupabase();
  const [ready, setReady] = useState(false);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) router.replace("/login?next=/account/password");
      else setReady(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (pwd.length < 6) { setMsg({ ok: false, text: "密码至少 6 位字符" }); return; }
    if (pwd !== pwd2) { setMsg({ ok: false, text: "两次输入的密码不一致" }); return; }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: pwd });
    setLoading(false);
    if (error) setMsg({ ok: false, text: `设置失败：${error.message}` });
    else { setMsg({ ok: true, text: "密码已更新，下次可用邮箱 + 新密码登录。" }); setPwd(""); setPwd2(""); }
  }

  if (!ready) return <div className="min-h-screen bg-black" />;

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-white/25 outline-none transition focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/30";

  return (
    <div className="mx-auto max-w-md px-6 py-28 text-white">
      <h1 className="text-3xl font-semibold">设置 / 重置密码</h1>
      <p className="mt-3 text-sm text-white/60">忘记密码时，可在登录页用「手机验证码」登录，进来后在这里设置新密码。</p>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm text-white/60 mb-1.5">新密码</label>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="至少 6 位字符" className={inputCls} />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1.5">确认新密码</label>
          <input type="password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} placeholder="再输入一次" className={inputCls} />
        </div>
        {msg && (
          <div className={`rounded-xl border px-4 py-3 text-sm ${msg.ok ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300" : "border-red-500/20 bg-red-500/10 text-red-300"}`}>{msg.text}</div>
        )}
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white transition hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50">
          {loading ? "保存中…" : "保存新密码"}
        </button>
      </form>
    </div>
  );
}
