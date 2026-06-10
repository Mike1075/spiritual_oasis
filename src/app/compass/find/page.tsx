"use client";

// 找回我的报告：凭留资时的联系方式（+称呼二次校验）查询历史报告链接
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, FileSearch, Loader2 } from "lucide-react";

type FoundReport = {
  id: string;
  identity: string;
  archetype: string;
  direction: string;
};

export default function CompassFindPage() {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [err, setErr] = useState("");
  const [reports, setReports] = useState<FoundReport[]>([]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (contact.trim().length < 4) {
      setErr("请输入当时留下的手机号或微信号");
      return;
    }
    setLoading(true);
    setSearched(false);
    try {
      const res = await fetch("/api/compass/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: contact.trim(), name: name.trim() }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "查询失败");
      setReports(j.reports || []);
      setSearched(true);
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "查询失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        <Link
          href="/compass"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 text-xs font-bold">
            SO
          </span>
          心灵家园 · AI 定位罗盘
        </Link>

        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 px-3 py-1 text-xs text-emerald-300">
          <FileSearch className="h-3.5 w-3.5" />
          找回我的报告
        </span>
        <h1 className="mb-2 text-2xl font-extrabold">报告链接丢了？</h1>
        <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
          输入你保存报告时留下的<b className="text-white">手机号或微信号</b>
          ，就能找回所有报告。当时填过称呼的，称呼也要对上（防止别人冒查你的报告）。
        </p>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="手机号 / 微信号 *"
            className="mb-3 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-500 focus:border-emerald-400"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="称呼（当时填过就必须填，没填过可留空）"
            className="mb-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-500 focus:border-emerald-400"
          />
          {err && <p className="mt-1 text-sm text-rose-400">{err}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-3.5 font-bold text-emerald-950 transition active:scale-[0.99] disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                查询中…
              </>
            ) : (
              <>
                找回报告
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        {searched && (
          <div className="mt-6">
            {reports.length ? (
              <>
                <p className="mb-3 text-sm font-semibold text-sky-300">
                  找到 {reports.length} 份报告：
                </p>
                <div className="space-y-2.5">
                  {reports.map((r) => (
                    <Link
                      key={r.id}
                      href={`/compass/r/${r.id}`}
                      className="block rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition hover:border-emerald-400/60 hover:bg-white/[0.08]"
                    >
                      <span className="text-[15px] font-semibold">
                        {r.direction || r.archetype || "定位报告"}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {[r.identity, r.archetype].filter(Boolean).join(" · ")}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-gray-300">
                没有查到。可能：①联系方式和当时填的不一致（比如手机号 vs
                微信号）②当时填了称呼但这次没填对 ③当时没点「保存报告」。
                <br />
                解决不了就加老师微信（备注「找回报告」），人工帮你查。
              </div>
            )}
          </div>
        )}

        <Link
          href="/compass"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-sky-300 transition hover:bg-white/5"
        >
          没做过测评？现在测一次 →
        </Link>
      </div>
    </div>
  );
}
