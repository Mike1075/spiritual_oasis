"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const OPENER =
  "你好，我在。\n\n不用组织语言，此刻心里最沉的那段，想从哪说起，就从哪说起。";

// 去掉 M 系列的 <think> 思维链
function stripThink(s: string): string {
  let out = s.replace(/<think>[\s\S]*?<\/think>/g, "");
  const open = out.indexOf("<think>");
  if (open !== -1) out = out.slice(0, open);
  return out.replace(/^\s+/, "");
}

export default function GuidePage() {
  const [entered, setEntered] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: OPENER }]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [err, setErr] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, entered]);

  async function send() {
    const text = input.trim();
    if (!text || streaming) return;
    setErr("");
    setInput("");
    const history = messages.filter((m, i) => !(i === 0 && m.role === "assistant")); // 不把开场白当对话
    const next: Msg[] = [...history, { role: "user", content: text }];
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setStreaming(true);
    try {
      const res = await fetch("/api/guide", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "向导一时没接上，请再说一次。");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() || "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const data = t.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const delta = json?.choices?.[0]?.delta?.content;
            if (typeof delta === "string" && delta) {
              acc += delta;
              const shown = stripThink(acc);
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: "assistant", content: shown };
                return copy;
              });
            }
          } catch {
            /* 跳过不完整 chunk */
          }
        }
      }
      // 思考期还没吐正文
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last.role === "assistant" && !last.content.trim()) {
          copy[copy.length - 1] = { role: "assistant", content: "（我想了想，但一时没接上话，可以再说一次吗。）" };
        }
        return copy;
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "出了点状况，请再试一次。");
      setMessages((m) => m.slice(0, -1)); // 移除空的 assistant 占位
    } finally {
      setStreaming(false);
    }
  }

  if (!entered) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--night)] px-6 py-24 text-[#efe7da]">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto mb-8 h-10 w-10 rounded-full border border-[var(--dawn)]/40">
            <div className="m-[15px] h-1.5 w-1.5 rounded-full bg-[var(--dawn)]" />
          </div>
          <h1 className="text-center font-serif-sc text-2xl font-medium sm:text-3xl">
            进来之前，先说几句真心话
          </h1>
          <div className="mt-8 space-y-5 leading-relaxed text-[#efe7da]/80">
            <p>
              <strong className="text-[#fbf3e4]">我是来陪你的，不是来给你打分、替你做决定的。</strong>
              我会先听你说，慢一点，没关系。你要找的东西，本来就在你自己这里。
            </p>
            <p>
              这是一次<strong className="text-[#fbf3e4]">匿名的陪伴</strong>，不是心理治疗，也不是医疗。请不要写真实姓名、电话这些能认出你的信息；真正困住你的事，也请去找现实里能抱住你的人。
            </p>
            <p>
              如果此刻你有伤害自己的念头，<strong className="text-[#fbf3e4]">请先找一个真实的人</strong>：身边能联系到的人，或拨打全国心理援助热线 400-161-9995、北京危机干预中心 010-82951332。我陪得了你一会儿，却替代不了真实的求助——而你，值得被好好接住。
            </p>
          </div>
          <div className="mt-10 text-center">
            <button
              onClick={() => setEntered(true)}
              className="rounded-full border border-[var(--dawn)]/50 px-9 py-3.5 tracking-[0.15em] text-[#fbf3e4] transition hover:bg-[var(--dawn)]/10"
            >
              我 明 白 了，进 入
            </button>
            <p className="mt-4 text-xs text-[#efe7da]/40">点击进入，表示你了解了上面这些。</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[var(--night)] text-[#efe7da]">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-28">
        <p className="mb-6 text-center text-sm tracking-[0.2em] text-[var(--dawn)]/70">回家向导</p>

        <div className="flex-1 space-y-6 pb-40">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[var(--dawn)]/15 px-5 py-3 leading-relaxed text-[#fbf3e4]"
                    : "max-w-[88%] whitespace-pre-wrap font-serif-sc text-lg leading-relaxed text-[#efe7da]/95"
                }
              >
                {m.content || (streaming ? "…" : "")}
              </div>
            </div>
          ))}
          {err && <p className="text-sm text-red-300/80">{err}</p>}
          <div ref={endRef} />
        </div>
      </div>

      {/* 输入区 */}
      <div className="sticky bottom-0 border-t border-white/10 bg-[var(--night)]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-2xl items-end gap-3 px-6 py-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            placeholder="把此刻的你，写下来…"
            className="max-h-40 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 leading-relaxed text-[#fbf3e4] placeholder-white/35 focus:border-[var(--dawn)]/40 focus:outline-none"
          />
          <button
            onClick={send}
            disabled={streaming || !input.trim()}
            className="shrink-0 rounded-full bg-[var(--dawn)] px-6 py-3 font-medium text-[#1a1206] transition hover:bg-[#f4ba5e] disabled:opacity-40"
          >
            {streaming ? "…" : "说"}
          </button>
        </div>
      </div>
    </main>
  );
}
