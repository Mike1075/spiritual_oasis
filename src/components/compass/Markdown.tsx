// 轻量 Markdown 渲染（##/###/**/- 列表/段落），零依赖、服务端组件可用。
// 报告由 LLM 流式生成，渲染时过滤 [方向清单] 解析行。

import React from "react";

function Bold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-emerald-300">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: number) => {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul${key}`} className="mb-3 space-y-1.5 pl-1">
        {list.map((item, i) => (
          <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-gray-200">
            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
            <span>
              <Bold text={item} />
            </span>
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trimEnd();
    const t = line.trim();
    if (t.startsWith("[方向清单]")) return; // 系统解析行不展示
    if (t.startsWith("- ") || t.startsWith("* ")) {
      list.push(t.slice(2));
      return;
    }
    flushList(i);
    if (!t) return;
    if (t.startsWith("### ")) {
      blocks.push(
        <h4 key={i} className="mb-1.5 mt-4 text-[15px] font-bold text-sky-300">
          <Bold text={t.slice(4)} />
        </h4>
      );
    } else if (t.startsWith("## ")) {
      blocks.push(
        <h3
          key={i}
          className="mb-2 mt-6 border-l-2 border-emerald-400 pl-3 text-lg font-extrabold text-white first:mt-0"
        >
          <Bold text={t.slice(3)} />
        </h3>
      );
    } else if (t.startsWith("# ")) {
      blocks.push(
        <h3 key={i} className="mb-2 mt-6 text-xl font-extrabold text-white">
          <Bold text={t.slice(2)} />
        </h3>
      );
    } else {
      blocks.push(
        <p key={i} className="mb-2.5 text-[15px] leading-relaxed text-gray-200">
          <Bold text={t} />
        </p>
      );
    }
  });
  flushList(lines.length);
  return <div>{blocks}</div>;
}
