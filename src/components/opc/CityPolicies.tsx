"use client";

// 结果页嵌入:按推荐城市拉取真实政策(/api/opc/policies),展示 🟢🟡 前几条 + 跳转政策库。
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Landmark, Loader2 } from "lucide-react";

type Item = {
  city: string;
  name: string;
  type: string;
  strength: string;
  subject: string;
  status: string;
  sourceUrl: string;
  sourceOrg: string;
  isCommunity: boolean;
};

export default function CityPolicies({ city }: { city: string }) {
  const noCity = !city || /建议|别注册|个体/.test(city);
  const [items, setItems] = useState<Item[] | null>(null);
  const [loading, setLoading] = useState(!noCity);

  useEffect(() => {
    if (noCity) return;
    let alive = true;
    setLoading(true);
    fetch(`/api/opc/policies?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((j) => {
        if (alive) setItems(Array.isArray(j.items) ? j.items : []);
      })
      .catch(() => alive && setItems([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [city, noCity]);

  if (noCity) {
    return (
      <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-1 flex items-center gap-2 text-lg font-bold">
          <Landmark className="h-5 w-5 text-sky-300" />
          各地扶持政策
        </div>
        <p className="text-sm leading-relaxed text-gray-300">
          你的情况更适合先用个体工商户起步。各地对个体户 / 小微也有补贴与减免——
        </p>
        <Link
          href="/opc/policies"
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
        >
          打开全国 OPC 政策库
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const policies = (items || []).filter((p) => !p.isCommunity);
  const top = policies.slice(0, 4);

  return (
    <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-1 flex items-center gap-2 text-lg font-bold">
        <Landmark className="h-5 w-5 text-sky-300" />
        {city} 的真实扶持政策
      </div>
      <p className="mb-3 text-xs text-gray-500">
        来自飞书政策库,带官方出处。🟢 已核实 · 🟡 待核实仅供参考。
      </p>

      {loading ? (
        <div className="flex items-center gap-2 py-4 text-sm text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          正在拉取 {city} 的最新政策…
        </div>
      ) : top.length === 0 ? (
        <p className="py-2 text-sm text-gray-400">
          暂未收录 {city} 的细则,可到政策库看周边城市对比。
        </p>
      ) : (
        <div className="space-y-2.5">
          {top.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="rounded-xl border border-white/10 bg-black/20 p-3"
            >
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                    p.status.includes("🟢")
                      ? "bg-emerald-400/10 text-emerald-300"
                      : "bg-amber-400/10 text-amber-300"
                  }`}
                >
                  {p.status.includes("🟢") ? "已核实" : "待核实"}
                </span>
                {p.type && (
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[11px] text-gray-300">
                    {p.type}
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold leading-snug text-white">
                {p.name}
              </p>
              {p.strength && (
                <p className="mt-0.5 text-xs leading-relaxed text-emerald-200/90">
                  {p.strength}
                </p>
              )}
              {/^https?:\/\//.test(p.sourceUrl) && (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                >
                  <ExternalLink className="h-3 w-3" />
                  {p.sourceOrg || "出处"}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <Link
        href={`/opc/policies?city=${encodeURIComponent(city)}`}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-emerald-300 hover:text-emerald-200"
      >
        查看 {city} 全部政策与创业社区
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
