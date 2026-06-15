// GEO（生成式引擎优化）组件 —— FAQPage 结构化数据 + 首屏 AI 摘要块
// radar-auto 2026-06-15：增量新增，供 home/compass/gaokao/mas-life 四页复用。
// 纯展示、无客户端 hook，因此可同时被服务端页与客户端页 import（不加 "use client"）。

export type FaqItem = { q: string; a: string };

/**
 * 输出 schema.org FAQPage 的 JSON-LD。
 * 用 dangerouslySetInnerHTML 注入，确保 SSR HTML 里就带上结构化数据，
 * 供搜索引擎 / 生成式引擎（AI 概览、ChatGPT、Perplexity 等）抓取引用。
 */
export function JsonLdFaq({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      // 单条对象、无用户输入，序列化安全
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * 首屏可见的「AI 摘要块」：80-120 字，明确观点 + 具体场景 + 品牌词，
 * 段落留可切割断点（句号 / 分号），便于生成式引擎摘取为可验证答案。
 * label 是给读者的小标题（如「一句话讲清」），children 是摘要正文。
 */
export function GeoSummary({
  label = "一句话讲清",
  children,
  className = "",
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-geo-summary
      className={
        "rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] px-4 py-3 text-sm leading-relaxed text-gray-200 " +
        className
      }
    >
      <span className="mr-2 inline-block rounded-full border border-emerald-400/50 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
        {label}
      </span>
      {children}
    </div>
  );
}
