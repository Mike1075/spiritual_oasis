"use client";

// OPC 城市政策库 —— 浏览/筛选(客户端)。数据由 /opc/policies 服务端页面注入。
// 红绿灯:🟢已核实 / 🟡待核实(带徽章) ;🔴 已在服务端过滤。

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ExternalLink,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import type { OpcPolicy } from "@/lib/opcPolicies";

function StatusBadge({ status }: { status: string }) {
  if (status.includes("🟢"))
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300">
        <ShieldCheck className="h-3 w-3" /> 已核实
      </span>
    );
  if (status.includes("🟡"))
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[11px] text-amber-300">
        待核实 · 仅供参考
      </span>
    );
  return null;
}

function PolicyCard({ p }: { p: OpcPolicy }) {
  const [open, setOpen] = useState(false);
  if (p.isCommunity) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="mb-1 flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0 text-sky-300" />
          <span className="text-[15px] font-semibold text-white">{p.name}</span>
        </div>
        <div className="mb-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-400">
          <span className="rounded bg-white/5 px-1.5 py-0.5">{p.city}</span>
          <span className="rounded bg-sky-400/10 px-1.5 py-0.5 text-sky-300">
            {p.type.replace("社区/", "")}
          </span>
        </div>
        {p.audience && (
          <p className="text-sm leading-relaxed text-gray-300">{p.audience}</p>
        )}
        {p.sourceUrl && (
          <SourceLink url={p.sourceUrl} org={p.sourceOrg} />
        )}
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-gray-300">
          {p.city}
        </span>
        <StatusBadge status={p.status} />
        {p.type && (
          <span className="rounded bg-emerald-400/10 px-1.5 py-0.5 text-[11px] text-emerald-300">
            {p.type}
          </span>
        )}
      </div>
      <p className="text-[15px] font-semibold leading-snug text-white">
        {p.name}
      </p>
      {p.strength && (
        <p className="mt-1 text-sm leading-relaxed text-emerald-200/90">
          {p.strength}
        </p>
      )}
      <div className="mt-2 grid gap-1 text-xs text-gray-400">
        {p.subject && (
          <p>
            <span className="text-gray-500">主体要求:</span> {p.subject}
          </p>
        )}
        {p.audience && (
          <p>
            <span className="text-gray-500">适用:</span> {p.audience}
          </p>
        )}
        {p.validity && (
          <p>
            <span className="text-gray-500">时效:</span> {p.validity}
          </p>
        )}
      </div>
      {p.quote && (
        <div className="mt-2">
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-xs text-sky-400 hover:text-sky-300"
          >
            {open ? "收起原文" : "查看出处原文"}
          </button>
          {open && (
            <p className="mt-1.5 rounded-lg border-l-2 border-white/15 bg-black/30 px-3 py-2 text-xs leading-relaxed text-gray-400">
              {p.quote}
            </p>
          )}
        </div>
      )}
      {p.sourceUrl && <SourceLink url={p.sourceUrl} org={p.sourceOrg} />}
    </div>
  );
}

function SourceLink({ url, org }: { url: string; org: string }) {
  if (!/^https?:\/\//.test(url)) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300"
    >
      <ExternalLink className="h-3 w-3" />
      {org || "查看出处"}
    </a>
  );
}

function Library({ items }: { items: OpcPolicy[] }) {
  const search = useSearchParams();
  const initialCity = search.get("city") || "全部";

  const cities = useMemo(() => {
    const set = new Set(items.map((p) => p.city).filter(Boolean));
    return ["全部", ...Array.from(set).sort((a, b) => a.localeCompare(b, "zh"))];
  }, [items]);
  const types = useMemo(() => {
    const set = new Set(
      items.filter((p) => !p.isCommunity).map((p) => p.type).filter(Boolean)
    );
    return ["全部", ...Array.from(set).sort((a, b) => a.localeCompare(b, "zh"))];
  }, [items]);

  const [city, setCity] = useState(
    cities.includes(initialCity) ? initialCity : "全部"
  );
  const [type, setType] = useState("全部");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [q, setQ] = useState("");
  const [showCommunity, setShowCommunity] = useState(true);

  const filtered = useMemo(() => {
    const kw = q.trim();
    return items.filter((p) => {
      if (city !== "全部" && p.city !== city) return false;
      if (!showCommunity && p.isCommunity) return false;
      if (type !== "全部" && p.type !== type) return false;
      if (onlyVerified && !p.status.includes("🟢")) return false;
      if (
        kw &&
        !`${p.city}${p.name}${p.type}${p.strength}${p.audience}`.includes(kw)
      )
        return false;
      return true;
    });
  }, [items, city, type, onlyVerified, q, showCommunity]);

  const policyCount = filtered.filter((p) => !p.isCommunity).length;
  const commCount = filtered.filter((p) => p.isCommunity).length;

  return (
    <>
      {/* 筛选区 */}
      <div className="sticky top-0 z-10 -mx-5 mb-5 border-b border-white/10 bg-black/80 px-5 pb-4 pt-3 backdrop-blur">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜城市 / 政策 / 关键词（如 算力券、落户、免租）"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-gray-500 focus:border-emerald-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 outline-none focus:border-emerald-400"
          >
            {cities.map((c) => (
              <option key={c} value={c} className="bg-gray-900">
                {c === "全部" ? "全部城市" : c}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-sm text-gray-200 outline-none focus:border-emerald-400"
          >
            {types.map((t) => (
              <option key={t} value={t} className="bg-gray-900">
                {t === "全部" ? "全部类型" : t}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOnlyVerified((v) => !v)}
            className={`rounded-lg border px-2.5 py-1.5 text-sm transition ${
              onlyVerified
                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                : "border-white/10 bg-white/5 text-gray-300"
            }`}
          >
            仅看已核实 🟢
          </button>
          <button
            onClick={() => setShowCommunity((v) => !v)}
            className={`rounded-lg border px-2.5 py-1.5 text-sm transition ${
              showCommunity
                ? "border-sky-400/50 bg-sky-400/10 text-sky-300"
                : "border-white/10 bg-white/5 text-gray-400"
            }`}
          >
            含社区园区
          </button>
        </div>
        <p className="mt-2.5 text-xs text-gray-500">
          命中 {policyCount} 条政策 · {commCount} 条社区园区
        </p>
      </div>

      {/* 列表 */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-gray-500">
          没有匹配的结果，换个城市或关键词试试
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((p, i) => (
            <PolicyCard key={`${p.city}-${p.name}-${i}`} p={p} />
          ))}
        </div>
      )}
    </>
  );
}

export default function PolicyLibrary({ items }: { items: OpcPolicy[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <div className="h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-2xl px-5 pb-20 pt-6">
        <Link
          href="/opc"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          返回 OPC 适配测评
        </Link>

        <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/50 px-3 py-1 text-xs text-emerald-300">
          <Building2 className="h-3.5 w-3.5" />
          全国 OPC 一人公司政策库
        </span>
        <h1 className="mb-2 flex items-center gap-2 text-3xl font-extrabold leading-snug">
          <MapPin className="h-7 w-7 text-sky-400" />
          各城市扶持政策 · 一手出处
        </h1>
        <p className="mb-4 text-[15px] leading-relaxed text-gray-300">
          覆盖全国数十城的一人公司 / 超级个体 / 个体户扶持政策与创业社区。
          每条都带核实状态与出处链接——
          <b className="text-emerald-300">🟢 已核实</b> 来自政府 / 园区一手文件，
          <b className="text-amber-300">🟡 待核实</b> 来自二手来源仅供参考，
          传闻类已剔除。
        </p>

        <Suspense fallback={<p className="py-10 text-gray-500">加载中…</p>}>
          <Library items={items} />
        </Suspense>

        <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">
          说明:政策时效性强，所有补贴 / 税率 / 门槛数字以官方最新文件为准，申领前请到当地市场监管 /
          人社 / 税务部门核实。本页是信息整理工具，不构成法律或财税建议。
        </p>
      </div>
    </div>
  );
}
