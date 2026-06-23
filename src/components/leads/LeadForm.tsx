"use client";

import { useState } from "react";

export default function LeadForm({
  source,
  pillar,
  title = "留下联系方式，我们与你联系",
}: {
  source: string;
  pillar?: string;
  title?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        contact: fd.get("contact"),
        note: fd.get("note"),
        source,
        pillar,
      }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) {
      setState("done");
    } else {
      setState("error");
      setMsg(data.error || "提交失败");
    }
  }

  if (state === "done") {
    return <p className="text-emerald-300">已收到，我们会尽快联系你 🌱</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-md">
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <input name="name" required placeholder="称呼"
        className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40" />
      <input name="contact" required placeholder="微信 / 手机"
        className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40" />
      <textarea name="note" placeholder="想了解什么（可选）" rows={2}
        className="rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40" />
      <button type="submit" disabled={state === "loading"}
        className="rounded-full bg-gradient-to-r from-amber-300/90 to-emerald-400/90 px-6 py-3 font-medium text-black disabled:opacity-60">
        {state === "loading" ? "提交中…" : "提交"}
      </button>
      {state === "error" && <p className="text-red-400 text-sm">{msg}</p>}
    </form>
  );
}
