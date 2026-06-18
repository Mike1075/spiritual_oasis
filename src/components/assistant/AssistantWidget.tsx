"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "你好呀～我是课程 AI 助手 🤖 可以问我：课程内容、适不适合你、怎么报名、锁位/拼团怎么操作、付款单号哪里找。退款核验这类操作我办不了，会请你进群找人工客服哦。";

const QUICK = [
  "这门课适合我吗？",
  "怎么锁位？618 是什么？",
  "3 人拼团怎么玩？",
  "付款单号在哪里找？",
];

// M 系列把思维链以 <think>…</think> 混在 content 里输出——展示前剥掉
function stripThink(s: string): string {
  let out = s.replace(/<think>[\s\S]*?<\/think>/g, "");
  const open = out.indexOf("<think>");
  if (open !== -1) out = out.slice(0, open);
  // 组件按纯文本渲染，模型偶尔输出的 **加粗** 标记直接剥掉
  return out.replace(/\*\*/g, "").trimStart();
}

export default function AssistantWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, open]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setInput("");
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    // 发给后端的历史不含开场白（开场白是写死的，不占上下文）
    const payload = history.filter((m, i) => !(i === 0 && m.role === "assistant"));
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      if (!res.ok || !res.body) {
        let msg = "我这边出了点小状况，请稍后再试，或进群找人工客服～";
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {
          /* ignore */
        }
        setMsgs([...history, { role: "assistant", content: msg }]);
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let full = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const data = t.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const j = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[];
            };
            const c = j.choices?.[0]?.delta?.content;
            if (typeof c === "string" && c) {
              full += c;
              const shown = stripThink(full);
              setMsgs([...history, { role: "assistant", content: shown }]);
            }
          } catch {
            /* 跳过半截 chunk */
          }
        }
      }
      const final = stripThink(full);
      setMsgs([
        ...history,
        {
          role: "assistant",
          content: final || "我没接住这个问题😅 换个问法试试，或进群找人工客服～",
        },
      ]);
    } catch {
      setMsgs([
        ...history,
        { role: "assistant", content: "网络异常，请稍后再试，或进群找人工客服～" },
      ]);
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 悬浮按钮 */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-4 z-40 flex items-center gap-2 rounded-full bg-[#f5a524] px-4 py-3 font-bold text-[#1a1205] shadow-lg shadow-[#f5a524]/30 transition hover:bg-[#ffb83a] active:scale-95"
        >
          <MessageCircle className="h-5 w-5" />
          问我
        </button>
      )}

      {/* 聊天面板 */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 flex h-[72vh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#101219] shadow-2xl sm:bottom-5 sm:right-4 sm:h-[560px] sm:w-[380px] sm:rounded-3xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-2 font-bold text-white">
              <Sparkles className="h-4 w-4 text-[#2dd4bf]" />
              课程 AI 助手
            </div>
            <button
              type="button"
              aria-label="关闭"
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#f5a524] text-[#1a1205]"
                      : "bg-white/10 text-white/85"
                  }`}
                >
                  {m.content ||
                    (busy && i === msgs.length - 1 ? (
                      <Loader2 className="h-4 w-4 animate-spin text-white/60" />
                    ) : (
                      ""
                    ))}
                </div>
              </div>
            ))}
            {/* 快捷问题（仅开场） */}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-[#2dd4bf]/50 px-3 py-1.5 text-xs text-[#2dd4bf] transition hover:bg-[#2dd4bf]/15"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing) send(input);
                }}
                placeholder="输入你的问题…"
                className="flex-1 rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#2dd4bf]"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={busy || !input.trim()}
                aria-label="发送"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f5a524] text-[#1a1205] disabled:opacity-40"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-white/35">
              AI 回答仅供参考，以页面规则和人工客服为准 · 退款/核验请进群办理
            </p>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
