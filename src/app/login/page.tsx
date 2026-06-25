"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";

// ── Inner form (uses useSearchParams — must be inside <Suspense>) ──────────

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") ?? "/account";

  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const supabase = createBrowserSupabase();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);

    try {
      if (tab === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.toLowerCase().includes("invalid")) {
            setError("邮箱或密码错误，请重试");
          } else if (error.message.toLowerCase().includes("email not confirmed")) {
            setError("邮箱尚未验证，请先检查收件箱中的确认邮件");
          } else {
            setError(error.message);
          }
          return;
        }
        router.replace(nextPath);
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          if (error.message.toLowerCase().includes("already registered")) {
            setError("该邮箱已注册，请直接登录");
          } else if (error.message.toLowerCase().includes("password")) {
            setError("密码至少需要 6 位字符");
          } else {
            setError(error.message);
          }
          return;
        }
        // Supabase may require email confirmation
        if (data.session) {
          // Instant login (email confirm disabled)
          router.replace(nextPath);
        } else {
          setInfo("注册成功！请检查收件箱，点击确认邮件后即可登录。");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_#0d1a1a_0%,_#000_70%)] px-4">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/40">
            <span className="text-white font-bold text-xl">SO</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8">
          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-white/10 mb-8">
            <button
              type="button"
              onClick={() => { setTab("login"); setError(null); setInfo(null); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                tab === "login"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setError(null); setInfo(null); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                tab === "register"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              注册
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-white/60 mb-1.5">邮箱</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-white/25 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-emerald-400/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-white/60 mb-1.5">密码</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === "register" ? "至少 6 位字符" : "••••••••"}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white placeholder-white/25 outline-none transition focus:border-emerald-400/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-emerald-400/30"
              />
            </div>

            {/* Error / Info messages */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
            {info && (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
                {info}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:from-emerald-400 hover:to-teal-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "处理中…" : tab === "login" ? "登录" : "注册"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30">其他方式</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Placeholder: Phone OTP (M2) */}
          <button
            type="button"
            disabled
            title="即将开放"
            className="w-full rounded-xl border border-white/10 bg-white/[0.02] py-3 text-sm text-white/30 cursor-not-allowed"
          >
            手机验证码登录 &nbsp;<span className="text-xs text-amber-400/60">即将开放</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page (wraps form in Suspense per Next 16 requirement) ─────────────────

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
