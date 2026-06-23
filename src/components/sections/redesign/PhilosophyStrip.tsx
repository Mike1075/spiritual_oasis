export default function PhilosophyStrip() {
  const items = [
    { zh: "共建 · 共享 · 共有", en: "Co-build · Co-share · Co-own" },
    { zh: "青色组织", en: "Teal Organization" },
    { zh: "去中心化", en: "Decentralized" },
  ];
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-3 px-6 text-center">
        {items.map((it) => (
          <span key={it.en} className="text-white/70">{it.zh}<span className="ml-2 text-white/35">{it.en}</span></span>
        ))}
      </div>
    </section>
  );
}
