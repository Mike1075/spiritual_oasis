"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

type Mode = "login" | "register" | "phone";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/account";

  const [mode, setMode] = useState<Mode>("login");
  // 邮箱
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 手机
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const supabase = createBrowserSupabase();
  const resetMsg = () => { setError(null); setInfo(null); };

  // —— 邮箱登录/注册 ——
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    resetMsg();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setError(/invalid/i.test(error.message) ? "邮箱或密码错误，请重试" : /not confirmed/i.test(error.message) ? "邮箱尚未验证，请先检查收件箱中的确认邮件" : error.message);
          return;
        }
        router.replace(nextPath);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(/already/i.test(error.message) ? "该邮箱已注册，请直接登录" : /password/i.test(error.message) ? "密码至少需要 6 位字符" : error.message);
          return;
        }
        if (data.session) router.replace(nextPath);
        else setInfo("注册成功！请检查收件箱，点击确认邮件后即可登录。");
      }
    } finally { setLoading(false); }
  }

  // —— 手机：发送验证码 ——
  async function sendCode() {
    resetMsg();
    if (!/^1\d{10}$/.test(phone)) { setError("请输入 11 位手机号"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ phone: `+86${phone}` });
      if (error) { setError(error.message.includes("rate") ? "发送过于频繁，请稍后再试" : `发送失败：${error.message}`); return; }
      setCodeSent(true);
      setInfo("验证码已发送，请查收短信（约 1 分钟内）。");
      let c = 60; setCooldown(c);
      const t = setInterval(() => { c -= 1; setCooldown(c); if (c <= 0) clearInterval(t); }, 1000);
    } finally { setLoading(false); }
  }

  // —— 手机：验证码登录/注册 ——
  async function handlePhone(e: React.FormEvent) {
    e.preventDefault();
    resetMsg();
    if (!/^\d{4,6}$/.test(code)) { setError("请输入收到的验证码"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({ phone: `+86${phone}`, token: code, type: "sms" });
      if (error) { setError(/expired|invalid/i.test(error.message) ? "验证码错误或已过期" : error.message); return; }
      router.replace(nextPath);
    } finally { setLoading(false); }
  }

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-white/25 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-emerald-400/30";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#0d1a1a_0%,_#000_70%)] px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <span className="text-white font-bold text-xl">SO</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8">
          {/* Tab 切换 */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 mb-8 text-sm">
            {([["login", "登录"], ["register", "注册"], ["phone", "手机验证码"]] as [Mode, string][]).map(([m, label]) => (
              <button key={m} type="button"
                onClick={() => { setMode(m); resetMsg(); }}
                className={`flex-1 py-2.5 font-medium transition-colors ${mode === m ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"}`}>
                {label}
              </button>
            ))}
          </div>

          {mode !== "phone" ? (
            <form onSubmit={handleEmail} className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">邮箱</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">密码</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "register" ? "至少 6 位字符" : "••••••••"} className={inputCls} />
              </div>
              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
              {info && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">{info}</div>}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50">
                {loading ? "处理中…" : mode === "login" ? "登录" : "注册"}
              </button>
            </form>
          ) : (
            <form onSubmit={handlePhone} className="space-y-5">
              <div>
                <label className="block text-sm text-white/60 mb-1.5">手机号</label>
                <input type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="11 位手机号" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1.5">验证码</label>
                <div className="flex gap-2">
                  <input type="text" inputMode="numeric" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="短信验证码" className={inputCls} />
                  <button type="button" onClick={sendCode} disabled={loading || cooldown > 0} className="shrink-0 whitespace-nowrap rounded-xl border border-emerald-400/40 px-4 text-sm text-emerald-300 transition hover:bg-emerald-400/10 disabled:opacity-40">
                    {cooldown > 0 ? `${cooldown}s` : codeSent ? "重新发送" : "获取验证码"}
                  </button>
                </div>
              </div>
              {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
              {info && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">{info}</div>}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50">
                {loading ? "处理中…" : "验证码登录 / 注册"}
              </button>
              <p className="text-center text-xs text-white/30">未注册的手机号将自动创建账号。忘记密码也可用此方式登录。</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
