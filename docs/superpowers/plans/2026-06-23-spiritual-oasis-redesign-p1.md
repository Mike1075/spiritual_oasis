# 心灵家园改版 P1（骨架）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `redesign` 分支上交付改版 P1 骨架——新顶层导航、流体感首页、心灵大学统一课程目录、以及把全站留资迁到 Supabase 的可用底座。

**Architecture:** 沿用现有 Next.js 16 App Router + next-intl（cookie 定 locale，扁平路由，无 `[locale]` 段）。视觉走"流动的意识"：暖黑底 + 流体 Hero（P1 用 canvas/CSS 占位实现，带 reduced-motion 静态兜底；Fable 5 终版 shader 留到 P3）。课程目录用站内 TS 数据文件。留资走新建的 Supabase `leads` 表（项目 `spiritualoasis`）。

**Tech Stack:** Next.js 16.1 / React 19 / Tailwind v4（CSS-first，`@theme` in globals.css）/ next-intl 4 / @supabase/supabase-js 2 / lucide-react / vitest（新增，仅测可单测的数据与 API 逻辑）。

## Global Constraints

- 工作分支：`redesign`（从 `main` 切出，**不在 main 上改**）。
- 留资唯一后端：Supabase 项目 `spiritualoasis`，ref `eowmgxtiiebxtkyzrlgn`，URL `https://eowmgxtiiebxtkyzrlgn.supabase.co`。密钥走环境变量，**不写入仓库**。
- 双语保留：每条面向用户的文案必须同时加 `messages/zh.json` 与 `messages/en.json`。
- 顶层导航（顺序固定）：`心灵大学 · MAS-Life OS · 跨越意识 · 参禅悟道 · 以性入道 · 365公益陪伴 · 关于我们`。心境**不在**顶层。
- 视觉基调：暖黑底（非蓝调赛博），单一呼吸光色；所有动效必须有 `prefers-reduced-motion` 静态兜底。
- 构建注意：本机 Turbopack 遇中文路径会 panic；若 `npm run build` 崩，改用 `next build --webpack`（仓库路径本身无中文，但保险起见记此）。
- 不动 OPC：`op_*` 表与 `/opc`、`/compass`、`/gaokao` 等旧路由代码保留，只是不进新顶层导航。

---

## File Structure

**新建：**
- `src/lib/supabase.ts` — Supabase 浏览器/服务端客户端工厂（单一来源）。
- `src/lib/leads.ts` — 留资数据校验 + 写库（纯逻辑，可单测）。
- `src/data/academy.ts` — 课程目录数据模型（三支柱 + 课程卡）。
- `src/components/leads/LeadForm.tsx` — 可复用留资表单（client）。
- `src/components/sections/redesign/LiquidHero.tsx` — 流体感 Hero。
- `src/components/sections/redesign/PillarsBento.tsx` — 三支柱 bento。
- `src/components/sections/redesign/PhilosophyStrip.tsx` — 共建理念条。
- `src/components/sections/redesign/FeaturedCourses.tsx` — 精选/在招课程。
- `src/components/academy/CourseCard.tsx` — 课程卡（目录与精选共用）。
- `src/app/academy/AcademyCatalog.tsx` — 心灵大学目录客户端组件。
- `tests/` — vitest 单测（`academy.test.ts`、`leads.test.ts`）。
- `vitest.config.ts`、`.env.local`（补 Supabase 变量，不入 git）。

**修改：**
- `src/components/layout/Header.tsx` — 换新 7 项导航。
- `src/components/layout/Footer.tsx` — 子站矩阵 + 心境/社群入口。
- `src/app/api/lead/route.ts` — 改写为写 Supabase。
- `src/app/page.tsx` — 换成新首页区块组合。
- `src/app/academy/page.tsx` — 接入新目录数据 + `AcademyCatalog`。
- `messages/zh.json` / `messages/en.json` — `nav`、新区块文案。
- `src/app/globals.css` — 暖黑底变量 + 流体/光晕 keyframes。
- `package.json` — 加 `test` 脚本与 vitest 依赖。

---

## Task 0: 切分支 + 测试底座 + Supabase 客户端

**Files:**
- Create: `vitest.config.ts`, `src/lib/supabase.ts`
- Modify: `package.json`, `.env.local`, `.env.local.example`

**Interfaces:**
- Produces: `getServiceClient(): SupabaseClient`（服务端，service-role）、`getAnonClient(): SupabaseClient`（匿名/publishable）。来自 `src/lib/supabase.ts`。

- [ ] **Step 1: 切分支**

```bash
cd ~/Downloads/projects/"spiritual oasis homepage"/spiritual-oasis
git checkout main && git pull --ff-only 2>/dev/null; git checkout -b redesign
```

- [ ] **Step 2: 安装 vitest，加 test 脚本**

```bash
npm i -D vitest@^3
npm pkg set scripts.test="vitest run" scripts.test:watch="vitest"
```

- [ ] **Step 3: 写 `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: 补 Supabase 环境变量**

在 `.env.local` 追加（值见会话中 MCP 已确认的 key；service-role 由 Mike 在 Vercel/本地补）：

```
NEXT_PUBLIC_SUPABASE_URL=https://eowmgxtiiebxtkyzrlgn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_-QVUqerxhBAPz7K-ziUyog_RWql5cQG
SUPABASE_SERVICE_ROLE_KEY=__在本地/Vercel配置，勿入库__
```

在 `.env.local.example` 追加同名占位（无值）。

- [ ] **Step 5: 写 `src/lib/supabase.ts`**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// 服务端写库用 service-role（绕过 RLS，仅在 API route 内调用）
export function getServiceClient(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service env missing");
  return createClient(url, key, { auth: { persistSession: false } });
}

// 匿名客户端（如需前端只读/插入）
export function getAnonClient(): SupabaseClient {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}
```

- [ ] **Step 6: typecheck + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "chore: redesign 分支底座 — vitest + supabase 客户端 + env"
```
Expected: tsc 无错误。

---

## Task 1: Supabase `leads` 表 + 留资逻辑 + API

**Files:**
- Create: `src/lib/leads.ts`, `tests/leads.test.ts`
- Modify: `src/app/api/lead/route.ts`
- DB: 新建 `public.leads` 表（经 MCP `apply_migration`）

**Interfaces:**
- Produces: `parseLead(input: unknown): { ok: true; data: LeadInput } | { ok: false; error: string }`；`LeadInput = { name: string; contact: string; source: string; pillar?: string; note?: string; utm?: string }`。来自 `src/lib/leads.ts`。

- [ ] **Step 1: 建表（MCP apply_migration，project_id=eowmgxtiiebxtkyzrlgn）**

迁移名 `create_leads_table`，SQL：

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  source text not null,
  pillar text,
  note text,
  utm text,
  created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
-- 匿名可插入（仅 insert，不可读/改），服务端用 service-role 读取
create policy "anon can insert leads" on public.leads
  for insert to anon with check (true);
```

- [ ] **Step 2: 写失败测试 `tests/leads.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { parseLead } from "../src/lib/leads";

describe("parseLead", () => {
  it("rejects missing name", () => {
    const r = parseLead({ contact: "13800000000", source: "home" });
    expect(r.ok).toBe(false);
  });
  it("rejects missing contact", () => {
    const r = parseLead({ name: "张三", source: "home" });
    expect(r.ok).toBe(false);
  });
  it("accepts and trims valid input", () => {
    const r = parseLead({ name: "  张三 ", contact: " 13800000000 ", source: "home", pillar: "growth" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data.name).toBe("张三");
      expect(r.data.contact).toBe("13800000000");
      expect(r.data.pillar).toBe("growth");
    }
  });
  it("caps overly long fields", () => {
    const r = parseLead({ name: "x".repeat(100), contact: "y".repeat(100), source: "home" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.data.name.length).toBeLessThanOrEqual(40);
  });
});
```

- [ ] **Step 3: 运行测试确认失败**

Run: `npm test -- leads`
Expected: FAIL（`parseLead` 不存在）。

- [ ] **Step 4: 写 `src/lib/leads.ts`**

```ts
export type LeadInput = {
  name: string;
  contact: string;
  source: string;
  pillar?: string;
  note?: string;
  utm?: string;
};

type ParseResult =
  | { ok: true; data: LeadInput }
  | { ok: false; error: string };

export function parseLead(input: unknown): ParseResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "请求格式错误" };
  }
  const b = input as Record<string, unknown>;
  const name = String(b.name ?? "").trim().slice(0, 40);
  const contact = String(b.contact ?? "").trim().slice(0, 60);
  const source = String(b.source ?? "").trim().slice(0, 40);
  if (!name) return { ok: false, error: "请填写称呼" };
  if (!contact) return { ok: false, error: "请填写联系方式" };
  if (!source) return { ok: false, error: "缺少来源" };
  return {
    ok: true,
    data: {
      name,
      contact,
      source,
      pillar: b.pillar ? String(b.pillar).slice(0, 40) : undefined,
      note: b.note ? String(b.note).slice(0, 500) : undefined,
      utm: b.utm ? String(b.utm).slice(0, 200) : undefined,
    },
  };
}
```

- [ ] **Step 5: 运行测试确认通过**

Run: `npm test -- leads`
Expected: PASS（4 个用例）。

- [ ] **Step 6: 改写 `src/app/api/lead/route.ts` 写 Supabase**

```ts
import { NextResponse } from "next/server";
import { parseLead } from "@/lib/leads";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from("leads").insert(parsed.data);
    if (error) throw error;
  } catch (e) {
    console.error("lead insert failed", e);
    return NextResponse.json({ ok: false, error: "提交失败，请稍后再试" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 7: 冒烟测试 API（需本地 service-role key）**

```bash
npm run dev &  # 等待启动
curl -s -X POST localhost:3000/api/lead -H 'content-type: application/json' \
  -d '{"name":"测试","contact":"13800000000","source":"smoke"}'
```
Expected: `{"ok":true}`；用 MCP `execute_sql` 查 `select * from leads where source='smoke'` 能看到 1 行（事后清理）。

- [ ] **Step 8: commit**

```bash
git add -A && git commit -m "feat(leads): 留资迁至 Supabase + parseLead 校验 + leads 表"
```

---

## Task 2: 可复用留资表单 LeadForm

**Files:**
- Create: `src/components/leads/LeadForm.tsx`

**Interfaces:**
- Consumes: `POST /api/lead`（body：`{name,contact,source,pillar?,note?}`）。
- Produces: `<LeadForm source={string} pillar?={string} title?={string} />`。

- [ ] **Step 1: 写 `src/components/leads/LeadForm.tsx`**

```tsx
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
```

- [ ] **Step 2: typecheck + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "feat(leads): 可复用 LeadForm 组件"
```

---

## Task 3: 课程目录数据模型 src/data/academy.ts

**Files:**
- Create: `src/data/academy.ts`, `tests/academy.test.ts`

**Interfaces:**
- Produces: `PILLARS: Pillar[]`；`Pillar = { id: "future"|"growth"|"companion"; titleZh; titleEn; courses: Course[] }`；`Course = { id; titleZh; titleEn; blurbZh; blurbEn; href; external: boolean; format: "online"|"retreat"|"app"|"service"; cover: string; recruiting?: boolean }`。

- [ ] **Step 1: 写失败测试 `tests/academy.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { PILLARS } from "../src/data/academy";

describe("academy data", () => {
  it("has exactly 3 pillars in order", () => {
    expect(PILLARS.map((p) => p.id)).toEqual(["future", "growth", "companion"]);
  });
  it("every course has a non-empty href and bilingual title", () => {
    const courses = PILLARS.flatMap((p) => p.courses);
    expect(courses.length).toBeGreaterThan(0);
    for (const c of courses) {
      expect(c.href).toBeTruthy();
      expect(c.titleZh).toBeTruthy();
      expect(c.titleEn).toBeTruthy();
    }
  });
  it("external courses use absolute urls", () => {
    const ext = PILLARS.flatMap((p) => p.courses).filter((c) => c.external);
    for (const c of ext) expect(c.href.startsWith("http")).toBe(true);
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `npm test -- academy`
Expected: FAIL（模块不存在）。

- [ ] **Step 3: 写 `src/data/academy.ts`**（按 spec 三支柱内容，cover 先用占位路径，P3 生图替换）

```ts
export type CourseFormat = "online" | "retreat" | "app" | "service";

export type Course = {
  id: string;
  titleZh: string;
  titleEn: string;
  blurbZh: string;
  blurbEn: string;
  href: string;
  external: boolean;
  format: CourseFormat;
  cover: string;
  recruiting?: boolean;
};

export type Pillar = {
  id: "future" | "growth" | "companion";
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  courses: Course[];
};

const XIAOE = "https://你的小鹅通地址"; // TODO(Mike): 替换为真实小鹅通店铺地址

export const PILLARS: Pillar[] = [
  {
    id: "future",
    titleZh: "面向未来的教育",
    titleEn: "Future-Ready Education",
    descZh: "以 AI 为助力，重新定义学习与创造。",
    descEn: "AI as leverage — redefining how we learn and create.",
    courses: [
      { id: "mas-life", titleZh: "MAS-Life OS", titleEn: "MAS-Life OS", blurbZh: "本地主权 AI 操作系统，把重复的活交给系统。", blurbEn: "A sovereign local AI OS.", href: "/mas-life", external: false, format: "app", cover: "/images/academy/mas-life.jpg", recruiting: true },
      { id: "onepad", titleZh: "爱宝 OnePad", titleEn: "OnePad", blurbZh: "给体制内孩子的 AI 苏格拉底式提分。", blurbEn: "Socratic AI tutor for in-system students.", href: "https://onepad.spiritual-oasis.net", external: true, format: "app", cover: "/images/academy/onepad.jpg" },
      { id: "futuremind", titleZh: "未来教育学院", titleEn: "Future Mind Academy", blurbZh: "给脱离传统教育的孩子与成人。", blurbEn: "For those beyond traditional schooling.", href: "https://www.futuremind2075.com", external: true, format: "app", cover: "/images/academy/futuremind.jpg" },
    ],
  },
  {
    id: "growth",
    titleZh: "心灵成长教育",
    titleEn: "Inner Growth",
    descZh: "以赛斯资料为核心的课程与练习。",
    descEn: "Courses and practices centered on the Seth material.",
    courses: [
      { id: "kuayue", titleZh: "跨越意识", titleEn: "Crossing Dimensions", blurbZh: "门罗式焦点层级闭关，打开意识的星门。", blurbEn: "An immersive consciousness retreat.", href: "/courses/kuayue", external: false, format: "retreat", cover: "/images/academy/kuayue.jpg", recruiting: true },
      { id: "canchan", titleZh: "参禅悟道 7 天", titleEn: "7-Day Zen", blurbZh: "七天沉浸，照见本来面目。", blurbEn: "Seven days of immersive practice.", href: "/courses/canchan", external: false, format: "retreat", cover: "/images/academy/canchan.jpg", recruiting: true },
      { id: "sex2dao", titleZh: "以性入道", titleEn: "Tao Through Intimacy", blurbZh: "回到身体，连接更高的自己。", blurbEn: "Return to the body, connect with higher self.", href: "https://sex2dao.spiritual-oasis.net", external: true, format: "retreat", cover: "/images/academy/sex2dao.jpg", recruiting: true },
      { id: "xiaoe-healing", titleZh: "疗愈系列", titleEn: "Healing Series", blurbZh: "OM 疗愈、丰盛之旅、动感冥想等。", blurbEn: "Healing, abundance, dynamic meditation.", href: XIAOE, external: true, format: "online", cover: "/images/academy/healing.jpg" },
      { id: "xiaoe-growth", titleZh: "成长系列", titleEn: "Growth Series", blurbZh: "《灵魂永生》《了凡四训》新解等。", blurbEn: "Seth Speaks and more.", href: XIAOE, external: true, format: "online", cover: "/images/academy/growth.jpg" },
    ],
  },
  {
    id: "companion",
    titleZh: "陪伴服务",
    titleEn: "Companionship",
    descZh: "日复一日的陪伴，让成长不孤单。",
    descEn: "Daily companionship for the long road.",
    courses: [
      { id: "365", titleZh: "365 公益陪伴", titleEn: "365 Daily Companion", blurbZh: "全年每日清晨的陪伴与回应。", blurbEn: "Daily wisdom, all year round.", href: "/365", external: false, format: "service", cover: "/images/academy/365.jpg", recruiting: true },
      { id: "mind", titleZh: "心境", titleEn: "Mind", blurbZh: "记录与照见你的内在状态。", blurbEn: "Reflect your inner state.", href: "https://mind.spiritual-oasis.net", external: true, format: "service", cover: "/images/academy/mind.jpg" },
      { id: "seth-dialogue", titleZh: "赛斯对话", titleEn: "Seth Dialogue", blurbZh: "与赛斯智慧对话。", blurbEn: "Dialogue with Seth's wisdom.", href: "https://seth.org.cn", external: true, format: "service", cover: "/images/academy/seth.jpg" },
    ],
  },
];

// 顶层"在招"快捷直达项（顺序固定，对应顶层导航）
export const RECRUITING_NAV = [
  { id: "mas-life", href: "/mas-life", labelZh: "MAS-Life OS", labelEn: "MAS-Life OS" },
  { id: "kuayue", href: "/courses/kuayue", labelZh: "跨越意识", labelEn: "Crossing Dimensions" },
  { id: "canchan", href: "/courses/canchan", labelZh: "参禅悟道", labelEn: "7-Day Zen" },
  { id: "sex2dao", href: "https://sex2dao.spiritual-oasis.net", labelZh: "以性入道", labelEn: "Tao Through Intimacy", external: true },
  { id: "365", href: "/365", labelZh: "365公益陪伴", labelEn: "365 Companion" },
];
```

- [ ] **Step 4: 运行确认通过**

Run: `npm test -- academy`
Expected: PASS（3 个用例）。

- [ ] **Step 5: commit**

```bash
git add -A && git commit -m "feat(data): 心灵大学三支柱课程目录数据 + 测试"
```

---

## Task 4: 新顶层导航（i18n + Header）

**Files:**
- Modify: `messages/zh.json`, `messages/en.json`, `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: `RECRUITING_NAV` from `src/data/academy.ts`（用其 href，但导航文案走 i18n）。

- [ ] **Step 1: 更新 `messages/zh.json` 的 `nav`**

将 `nav` 整段替换为：

```json
"nav": {
  "academy": "心灵大学",
  "masLife": "MAS-Life OS",
  "kuayue": "跨越意识",
  "canchan": "参禅悟道",
  "sex2dao": "以性入道",
  "companion365": "365公益陪伴",
  "about": "关于我们"
}
```

- [ ] **Step 2: 更新 `messages/en.json` 的 `nav`（同 key）**

```json
"nav": {
  "academy": "Academy",
  "masLife": "MAS-Life OS",
  "kuayue": "Crossing Dimensions",
  "canchan": "7-Day Zen",
  "sex2dao": "Tao Through Intimacy",
  "companion365": "365 Companion",
  "about": "About"
}
```

- [ ] **Step 3: 改写 `src/components/layout/Header.tsx` 的 navItems**

将 `navItems` 数组替换为（其余结构如 logo/移动菜单/LanguageSwitcher 保持不变，仅 logo 渐变色后续 Task 调）：

```tsx
const navItems = [
  { href: "/academy", label: t("academy") },
  { href: "/mas-life", label: t("masLife") },
  { href: "/courses/kuayue", label: t("kuayue") },
  { href: "/courses/canchan", label: t("canchan") },
  { href: "https://sex2dao.spiritual-oasis.net", label: t("sex2dao"), external: true },
  { href: "/365", label: t("companion365") },
  { href: "/about", label: t("about") },
];
```

同时把 desktop 容器的 `space-x-8` 调成 `space-x-5`（7 项更挤，给点余量）。

- [ ] **Step 4: 渲染验证**

```bash
npm run dev
# 浏览器/Playwright 打开 localhost:3000，确认顶部 7 项中文导航，移动端汉堡可展开
```
Expected: 顶部出现 7 项；点 365/跨越意识暂时 404（页面 P2 建），但导航本身渲染正常。

- [ ] **Step 5: commit**

```bash
git add -A && git commit -m "feat(nav): 新七项顶层导航 + i18n"
```

---

## Task 5: Footer 子站矩阵

**Files:**
- Modify: `src/components/layout/Footer.tsx`, `messages/zh.json`, `messages/en.json`

- [ ] **Step 1: 读现有 Footer 结构**

Run: `sed -n '1,80p' src/components/layout/Footer.tsx`（按其现有栅格风格改，不重写整体骨架）。

- [ ] **Step 2: 在 Footer 增加"全部入口"区块**

加入一个链接矩阵（含心境/赛斯对话/各子站/社群），用以下数据渲染（external 用 `<a target="_blank">`）：

```tsx
const siteMatrix = [
  { href: "/academy", zh: "心灵大学", en: "Academy" },
  { href: "/mas-life", zh: "MAS-Life OS", en: "MAS-Life OS" },
  { href: "https://onepad.spiritual-oasis.net", zh: "爱宝 OnePad", en: "OnePad", external: true },
  { href: "https://www.futuremind2075.com", zh: "未来教育学院", en: "Future Mind", external: true },
  { href: "https://mind.spiritual-oasis.net", zh: "心境", en: "Mind", external: true },
  { href: "https://seth.org.cn", zh: "赛斯对话", en: "Seth Dialogue", external: true },
  { href: "/about", zh: "关于我们", en: "About" },
];
```

- [ ] **Step 3: 渲染验证 + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "feat(footer): 子站矩阵 + 心境/赛斯对话入口"
```

---

## Task 6: 流体感 Hero（LiquidHero）

**Files:**
- Create: `src/components/sections/redesign/LiquidHero.tsx`
- Modify: `src/app/globals.css`（加暖黑底变量 + 光晕 keyframes）

**Interfaces:**
- Produces: `<LiquidHero />`（自带 CTA）。

- [ ] **Step 1: globals.css 加暖黑底 + 呼吸光晕动画 + reduced-motion 兜底**

在 `globals.css` 末尾追加：

```css
/* 流动的意识 · 暖黑底与呼吸光晕 */
:root {
  --ink: #0b0a0d;       /* 暖黑 */
  --aura-a: #f6c177;    /* 暖金 */
  --aura-b: #4fd1a5;    /* 极光绿 */
}
@keyframes aura-breathe {
  0%, 100% { transform: translate(-10%, -6%) scale(1); opacity: .55; }
  50%      { transform: translate(8%, 6%) scale(1.25); opacity: .8; }
}
.aura {
  background: radial-gradient(closest-side, var(--aura-a), transparent 70%),
              radial-gradient(closest-side, var(--aura-b), transparent 70%);
  filter: blur(60px);
  animation: aura-breathe 14s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .aura { animation: none; }
}
```

- [ ] **Step 2: 写 `LiquidHero.tsx`**（P1 用流动渐变光晕实现"流体感"，Fable 5 shader 终版在 P3 替换此组件内部）

```tsx
"use client";

import Link from "next/link";

export default function LiquidHero() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-[var(--ink)] flex items-center">
      {/* 呼吸光晕（流体感占位；P3 换 Fable 5 流体 shader canvas） */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aura absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute inset-0 bg-[var(--ink)]/40" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl">
          开启人类潜能
          <br />
          引领人类进入新时代
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
          一个以共建·共享·共有方式成立、遵循青色组织理念的成长型社区
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/academy"
            className="rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
            探索心灵大学 →
          </Link>
          <Link href="/365"
            className="rounded-full border border-white/20 px-8 py-4 font-medium text-white transition hover:bg-white/10">
            加入 365 陪伴
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 渲染验证（含 reduced-motion）**

```bash
npm run dev
# Playwright/浏览器开 localhost:3000 看 hero；系统开启"减少动态效果"后光晕应静止
```
Expected: 暖黑底 + 呼吸光晕 + 标题与双 CTA；reduced-motion 下光晕不动。

- [ ] **Step 4: commit**

```bash
git add -A && git commit -m "feat(home): 流动意识 Hero（光晕占位 + reduced-motion 兜底）"
```

---

## Task 7: 首页区块（三支柱 / 理念条 / 精选课程）

**Files:**
- Create: `src/components/academy/CourseCard.tsx`, `src/components/sections/redesign/PillarsBento.tsx`, `src/components/sections/redesign/PhilosophyStrip.tsx`, `src/components/sections/redesign/FeaturedCourses.tsx`

**Interfaces:**
- Consumes: `PILLARS`, `Course` from `src/data/academy.ts`；`<LeadForm>` 不在此用。
- Produces: `<CourseCard course={Course} locale="zh"|"en" />`、`<PillarsBento />`、`<PhilosophyStrip />`、`<FeaturedCourses />`。

- [ ] **Step 1: 写 `CourseCard.tsx`**

```tsx
import Link from "next/link";
import type { Course } from "@/data/academy";

const FORMAT_LABEL: Record<Course["format"], { zh: string; en: string }> = {
  online: { zh: "线上", en: "Online" },
  retreat: { zh: "线下闭关", en: "Retreat" },
  app: { zh: "应用", en: "App" },
  service: { zh: "陪伴", en: "Service" },
};

export default function CourseCard({ course, locale }: { course: Course; locale: "zh" | "en" }) {
  const title = locale === "zh" ? course.titleZh : course.titleEn;
  const blurb = locale === "zh" ? course.blurbZh : course.blurbEn;
  const fmt = FORMAT_LABEL[course.format][locale];
  const inner = (
    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]">
      <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
        <span className="rounded-full border border-white/15 px-2 py-0.5">{fmt}</span>
        {course.recruiting && <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-amber-200">在招</span>}
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{blurb}</p>
      <span className="mt-4 inline-block text-sm text-emerald-300 group-hover:translate-x-1 transition">
        了解 →
      </span>
    </div>
  );
  return course.external ? (
    <a href={course.href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={course.href}>{inner}</Link>
  );
}
```

- [ ] **Step 2: 写 `PillarsBento.tsx`**（三支柱大卡，bento 布局）

```tsx
"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { PILLARS } from "@/data/academy";

export default function PillarsBento() {
  const locale = (useLocale() as "zh" | "en");
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((p) => (
          <Link key={p.id} href={`/academy#${p.id}`}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/25 hover:bg-white/[0.06]">
            <h2 className="text-2xl font-semibold text-white">{locale === "zh" ? p.titleZh : p.titleEn}</h2>
            <p className="mt-3 text-white/60">{locale === "zh" ? p.descZh : p.descEn}</p>
            <p className="mt-6 text-sm text-emerald-300">{p.courses.length} 门课程 / 服务 →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 写 `PhilosophyStrip.tsx`**

```tsx
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
```

- [ ] **Step 4: 写 `FeaturedCourses.tsx`**（取 recruiting 课程）

```tsx
"use client";
import { useLocale } from "next-intl";
import { PILLARS } from "@/data/academy";
import CourseCard from "@/components/academy/CourseCard";

export default function FeaturedCourses() {
  const locale = useLocale() as "zh" | "en";
  const featured = PILLARS.flatMap((p) => p.courses).filter((c) => c.recruiting);
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-8 text-center text-3xl font-semibold text-white">
        {locale === "zh" ? "正在招生" : "Now Enrolling"}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => <CourseCard key={c.id} course={c} locale={locale} />)}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: typecheck + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "feat(home): 三支柱 bento + 理念条 + 精选课程 + 课程卡"
```

---

## Task 8: 心灵大学统一目录页

**Files:**
- Create: `src/app/academy/AcademyCatalog.tsx`
- Modify: `src/app/academy/page.tsx`

- [ ] **Step 1: 写 `AcademyCatalog.tsx`**（按三支柱分区，带 `id` 锚点）

```tsx
"use client";
import { useLocale } from "next-intl";
import { PILLARS } from "@/data/academy";
import CourseCard from "@/components/academy/CourseCard";

export default function AcademyCatalog() {
  const locale = useLocale() as "zh" | "en";
  return (
    <div className="mx-auto max-w-7xl px-6 py-28">
      <h1 className="text-center text-4xl font-semibold text-white sm:text-5xl">
        {locale === "zh" ? "心灵大学" : "Academy"}
      </h1>
      {PILLARS.map((p) => (
        <section key={p.id} id={p.id} className="scroll-mt-24 pt-16">
          <h2 className="text-2xl font-semibold text-white">{locale === "zh" ? p.titleZh : p.titleEn}</h2>
          <p className="mt-2 text-white/60">{locale === "zh" ? p.descZh : p.descEn}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.courses.map((c) => <CourseCard key={c.id} course={c} locale={locale} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 替换 `src/app/academy/page.tsx`**

```tsx
import AcademyCatalog from "./AcademyCatalog";

export const metadata = { title: "心灵大学 · 心灵家园" };

export default function AcademyPage() {
  return <AcademyCatalog />;
}
```

- [ ] **Step 3: 渲染验证**

```bash
npm run dev
# 打开 localhost:3000/academy ，确认三支柱分区 + 课程卡；首页三支柱卡点击跳到对应 #future/#growth/#companion 锚点
```
Expected: 目录三区渲染，锚点跳转生效，外链卡新标签打开。

- [ ] **Step 4: commit**

```bash
git add -A && git commit -m "feat(academy): 统一课程目录页（三支柱分区 + 锚点）"
```

---

## Task 9: 组装首页 + 全量验证

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 替换 `src/app/page.tsx`**

```tsx
import LiquidHero from "@/components/sections/redesign/LiquidHero";
import PillarsBento from "@/components/sections/redesign/PillarsBento";
import PhilosophyStrip from "@/components/sections/redesign/PhilosophyStrip";
import FeaturedCourses from "@/components/sections/redesign/FeaturedCourses";

export default function Home() {
  return (
    <>
      <LiquidHero />
      <PillarsBento />
      <PhilosophyStrip />
      <FeaturedCourses />
    </>
  );
}
```

- [ ] **Step 2: 全量单测**

Run: `npm test`
Expected: 全 PASS（leads + academy）。

- [ ] **Step 3: 构建验证**

```bash
npm run build || npx next build --webpack
```
Expected: 构建成功；若 Turbopack 中文路径 panic 则 `--webpack` 兜底通过。

- [ ] **Step 4: lint**

Run: `npm run lint`
Expected: 无 error（warning 可接受）。

- [ ] **Step 5: 路由冒烟**

```bash
npm run dev
# 逐一打开：/ , /academy , /mas-life ;确认首页四区块、目录三支柱、导航 7 项
```
Expected: 首页与目录正常；/courses/kuayue、/courses/canchan、/365 留到 P2（暂 404，符合预期）。

- [ ] **Step 6: 最终 commit**

```bash
git add -A && git commit -m "feat(home): 组装流动意识首页（hero+三支柱+理念条+精选）"
```

---

## P1 完成判定

- [ ] `npm test` 全绿（leads 校验 + academy 数据）。
- [ ] `npm run build` 成功。
- [ ] 顶层 7 项导航就位；心境已移出顶层、入页脚。
- [ ] 首页：流体 Hero + 三支柱 + 理念条 + 精选课程，reduced-motion 兜底生效。
- [ ] /academy 三支柱目录 + 锚点；外链卡新标签打开。
- [ ] 留资 POST /api/lead 写入 Supabase `leads` 表（冒烟验证过 1 行）。

## 下一阶段（不在本计划内）

- **P2**：`/courses/kuayue`（跨越意识一/二阶，素材见 `docs/courses/跨越维度/`，招生文案待写）、`/courses/canchan`、`/365` 详情页 + 各页 `<LeadForm>`。
- **P3**：关于我们重做（愿景/共建者/历程）+ Fable 5 流体 shader Hero 终版 + 全站生图封面替换。
