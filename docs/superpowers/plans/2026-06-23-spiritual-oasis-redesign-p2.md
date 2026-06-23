# 心灵家园改版 P2（站内课程详情页 + 留资）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为顶层导航里目前会 404 的三个在招项建站内详情页——`/courses/kuayue`（跨越意识）、`/courses/canchan`（参禅悟道7天）、`/365`（公益陪伴）——每页接入 P1 的 `LeadForm` 写 Supabase 留资。

**Architecture:** 一个共享的 `CourseDetailPage` 模板组件（server component 渲染，底部嵌入 `LeadForm`）+ 每个课程一个数据文件（`CourseDetailData`）。页面是薄 server component（metadata + 渲染模板）。`/365` 复用既有 `/calendar` 每日内容（不重写），只做一个服务介绍落地页 + 进入每日内容的 CTA。沿用 P1 的"流动的意识"暖黑底视觉与设计令牌。

**Tech Stack:** Next.js 16 App Router / React 19 Server Components / Tailwind v4（`var(--ink)`/`.aura` 已在 globals.css）/ next-intl / @supabase/supabase-js（经 `/api/lead`）/ vitest。

## Global Constraints

- 工作分支：从 `main` 切出 `redesign-p2`（P1 已合并入 main）。
- 留资唯一后端：复用 P1 的 `POST /api/lead`（写 Supabase `spiritualoasis`）。每页 `LeadForm` 必须传**唯一的 `source`** 与 `pillar`，便于线索归因。
- **语言：P2 课程详情页中文为主**（与现有 `/mas-life` 一致；这是有意的范围决定，双语化延后到后续）。页面 chrome（Header/Footer/LeadForm）本就双语，沿用。
- **内容合规（重要）**：跨越意识的飞书素材标注"课程资料和内容请勿外传，仅限课程内学员学习使用"。公开页面**只做节律概述**（沉浸式多日闭关、每天约 4 段引导音频、早起、戴眼罩、数字断联），**不得逐字复制**内部分时作息表或音频练习内容。
- 文案诚实红线：跨越意识/参禅悟道属意识探索/禅修，**不承诺疗效或具体结果**；个例不代表普遍。
- 视觉：暖黑底 `bg-[var(--ink)]`，复用 `.aura` 光晕；动效沿用 P1 的 reduced-motion 兜底（本期不新增重动效）。
- 内容来源：跨越意识取自飞书素材（节律概述）；参禅悟道取自 Mike 提供的第三期信息 + 往期招生文章，**原创撰写不照抄**；365 取自既有公益陪伴定位。不得编造未提供的师资/价格/日期。

---

## File Structure

**新建：**
- `src/data/courses/types.ts` — `CourseDetailData`/`CourseSection`/`CourseFaq` 类型 + `validateCourseDetail()` 校验函数（纯逻辑，可单测）。
- `src/components/courses/CourseDetailPage.tsx` — 共享课程详情模板（含 `LeadForm`）。
- `src/data/courses/kuayue.ts` — 跨越意识数据（依据飞书素材做节律概述）。
- `src/data/courses/canchan.ts` — 参禅悟道数据（结构到位 + `TODO(Mike)` 占位文案）。
- `src/data/courses/companion365.ts` — 365 公益陪伴落地数据（CTA 指向 `/calendar`）。
- `src/app/courses/kuayue/page.tsx`、`src/app/courses/canchan/page.tsx`、`src/app/365/page.tsx` — 薄 server component 页面。
- `tests/courseDetail.test.ts` — 校验函数单测。
- `tests/course-pages.test.ts` — 三个课程数据均通过 `validateCourseDetail` + source 唯一性。

**不修改**（确认即可）：`/calendar`、`/api/lead`、`LeadForm`、`src/data/academy.ts`（`kuayue/canchan/365` 的 href 在 P1 已指向 `/courses/kuayue`、`/courses/canchan`、`/365`，本期把这些目标页建出来即可）。

---

## Task 1: 类型 + 校验函数 + 共享详情模板

**Files:**
- Create: `src/data/courses/types.ts`, `src/components/courses/CourseDetailPage.tsx`, `tests/courseDetail.test.ts`

**Interfaces:**
- Produces:
  - `type CourseSection = { heading: string; body: string[] }`
  - `type CourseFaq = { q: string; a: string }`
  - `type CourseDetailData = { id; leadSource; pillar; title; subtitle; intro: string[]; forWhom: string[]; experience: string[]; schedule?: CourseSection[]; notes?: string[]; faq?: CourseFaq[]; cta?: { label; href; external? } }`
  - `validateCourseDetail(d: CourseDetailData): string[]`（返回问题列表，空数组=合格）
  - `<CourseDetailPage data={CourseDetailData} />`（默认导出）

- [ ] **Step 1: 写失败测试 `tests/courseDetail.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { validateCourseDetail, type CourseDetailData } from "../src/data/courses/types";

const good: CourseDetailData = {
  id: "x",
  leadSource: "course-x",
  pillar: "growth",
  title: "标题",
  subtitle: "副标题",
  intro: ["一段"],
  forWhom: ["某人"],
  experience: ["某体验"],
};

describe("validateCourseDetail", () => {
  it("passes a complete object", () => {
    expect(validateCourseDetail(good)).toEqual([]);
  });
  it("flags missing required string fields", () => {
    const bad = { ...good, title: "", leadSource: "" };
    const errs = validateCourseDetail(bad);
    expect(errs).toContain("missing title");
    expect(errs).toContain("missing leadSource");
  });
  it("flags empty list fields", () => {
    const bad = { ...good, intro: [], forWhom: [], experience: [] };
    const errs = validateCourseDetail(bad);
    expect(errs).toContain("intro empty");
    expect(errs).toContain("forWhom empty");
    expect(errs).toContain("experience empty");
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `npm test -- courseDetail`
Expected: FAIL（`../src/data/courses/types` 模块不存在）。

- [ ] **Step 3: 写实现 `src/data/courses/types.ts`**

```ts
export type CourseSection = { heading: string; body: string[] };
export type CourseFaq = { q: string; a: string };

export type CourseDetailData = {
  id: string;
  leadSource: string; // 传给 LeadForm 的唯一来源标识
  pillar: string; // 'growth' | 'companion' 等
  title: string;
  subtitle: string;
  intro: string[]; // 开篇段落
  forWhom: string[]; // 适合谁
  experience: string[]; // 你会经历什么
  schedule?: CourseSection[]; // 节律/安排（概述，非逐字内部作息）
  notes?: string[]; // 注意事项
  faq?: CourseFaq[];
  cta?: { label: string; href: string; external?: boolean }; // 额外 CTA（如 365 → /calendar）
};

export function validateCourseDetail(d: CourseDetailData): string[] {
  const errs: string[] = [];
  const need: (keyof CourseDetailData)[] = [
    "id",
    "leadSource",
    "pillar",
    "title",
    "subtitle",
  ];
  for (const k of need) {
    if (!d[k] || typeof d[k] !== "string") errs.push(`missing ${k}`);
  }
  if (!d.intro?.length) errs.push("intro empty");
  if (!d.forWhom?.length) errs.push("forWhom empty");
  if (!d.experience?.length) errs.push("experience empty");
  return errs;
}
```

- [ ] **Step 4: 运行确认通过**

Run: `npm test -- courseDetail`
Expected: PASS（3 用例）。

- [ ] **Step 5: 写 `src/components/courses/CourseDetailPage.tsx`**

```tsx
import Link from "next/link";
import LeadForm from "@/components/leads/LeadForm";
import type { CourseDetailData } from "@/data/courses/types";

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-semibold text-white">{heading}</h2>
      {children}
    </section>
  );
}

export default function CourseDetailPage({ data }: { data: CourseDetailData }) {
  return (
    <article className="bg-[var(--ink)] text-white">
      <header className="relative overflow-hidden px-6 pt-32 pb-20">
        <div className="aura absolute left-1/2 top-0 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-60" />
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold sm:text-5xl">{data.title}</h1>
          <p className="mt-4 text-lg text-white/70">{data.subtitle}</p>
          {data.cta &&
            (data.cta.external ? (
              <a href={data.cta.href} target="_blank" rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
                {data.cta.label}
              </a>
            ) : (
              <Link href={data.cta.href}
                className="mt-8 inline-block rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
                {data.cta.label}
              </Link>
            ))}
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-16 px-6 pb-28">
        <section className="space-y-4">
          {data.intro.map((p, i) => (
            <p key={i} className="leading-relaxed text-white/80">{p}</p>
          ))}
        </section>

        <Section heading="适合谁">
          <ul className="space-y-2">
            {data.forWhom.map((it, i) => (
              <li key={i} className="flex gap-3 text-white/80"><span className="text-emerald-300">·</span>{it}</li>
            ))}
          </ul>
        </Section>

        <Section heading="你会经历什么">
          <ul className="space-y-2">
            {data.experience.map((it, i) => (
              <li key={i} className="flex gap-3 text-white/80"><span className="text-emerald-300">·</span>{it}</li>
            ))}
          </ul>
        </Section>

        {data.schedule?.map((sec, i) => (
          <Section key={i} heading={sec.heading}>
            <div className="space-y-2">
              {sec.body.map((b, j) => (
                <p key={j} className="leading-relaxed text-white/80">{b}</p>
              ))}
            </div>
          </Section>
        ))}

        {data.notes && (
          <Section heading="注意事项">
            <ul className="space-y-2">
              {data.notes.map((n, i) => (
                <li key={i} className="flex gap-3 text-white/70"><span className="text-amber-300">·</span>{n}</li>
              ))}
            </ul>
          </Section>
        )}

        {data.faq && (
          <Section heading="常见问题">
            <div className="space-y-5">
              {data.faq.map((f, i) => (
                <div key={i}>
                  <p className="font-medium text-white">{f.q}</p>
                  <p className="mt-1 text-white/70">{f.a}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section heading="留下联系方式">
          <LeadForm source={data.leadSource} pillar={data.pillar} />
        </Section>
      </div>
    </article>
  );
}
```

- [ ] **Step 6: typecheck**

Run: `npx tsc --noEmit`
Expected: clean（组件类型正确，引用 `@/components/leads/LeadForm` 与 `@/data/courses/types`）。

- [ ] **Step 7: commit**

```bash
git add -A && git commit -m "feat(courses): CourseDetail 类型/校验 + 共享详情模板"
```

---

## Task 2: 跨越意识 /courses/kuayue

**Files:**
- Create: `src/data/courses/kuayue.ts`, `src/app/courses/kuayue/page.tsx`, `tests/course-kuayue.test.ts`

**Interfaces:**
- Consumes: `CourseDetailData`, `validateCourseDetail`（Task 1）；`<CourseDetailPage>`（Task 1）。
- Produces: `export const kuayue: CourseDetailData`。

**内容来源**：`docs/courses/跨越维度/跨越维度-一阶.md`、`-二阶.md`。**只做节律概述，不逐字复制内部作息表**（见 Global Constraints 合规条）。

- [ ] **Step 1: 写 `src/data/courses/kuayue.ts`**

```ts
import type { CourseDetailData } from "./types";

export const kuayue: CourseDetailData = {
  id: "kuayue",
  leadSource: "course-kuayue",
  pillar: "growth",
  title: "跨越意识 · 打开意识的星门",
  subtitle: "一场跨越意识维度的沉浸式闭关（一阶 5 天 / 二阶 10 天）",
  intro: [
    "这是一段向内的旅程。借助一套循序渐进的引导音频，在沉浸、安静、断联的环境里，练习把注意力从外部世界收回，去探索意识更深的层次。",
    "它源自对人类意识状态的系统训练方法——通过反复的聆听与体验，让你熟悉那些平时被忽略的内在感官。这不是知识灌输，而是亲身经历。",
  ],
  forWhom: [
    "想认真探索意识、而不止于阅读概念的人",
    "愿意在几天里放下手机、给自己一段完整的安静",
    "对冥想、内在体验、赛斯/意识探索题材有兴趣",
  ],
  experience: [
    "在引导音频的带领下，逐步进入更深、更稳定的内在状态",
    "白天集体共学、回房沉浸聆听练习交替进行的节律",
    "记录下那些有明显感受的练习，找到属于你的节奏",
    "在断联与充足睡眠中，让身心重新校准",
  ],
  schedule: [
    {
      heading: "课程节律（概述）",
      body: [
        "一阶为期 5 天、二阶为期 10 天（含进阶练习），为线下集中闭关。",
        "每天约四段引导音频练习，与集体共学时段交替；清晨早起、规律作息、保证充足睡眠。",
        "练习时建议坐着或半躺、戴上眼罩，音量调到刚好能听清引导即可。",
        "（具体场次、城市与日期以当期招生公告为准。）",
      ],
    },
  ],
  notes: [
    "音频练习需反复聆听才会显现效果；初期听着睡着是正常的，醒来继续即可。",
    "建议使用普通有线耳机，不要用降噪耳机，尽量不用蓝牙耳机；戴眼罩体验更佳。",
    "闭关期间保证充足睡眠，给身心留出整合的空间。",
    "课程音频与练习内容仅供报名学员学习使用，请勿外传。",
  ],
  faq: [
    {
      q: "没有任何基础可以参加吗？",
      a: "可以。练习是循序渐进的，跟着引导走即可；带着开放和好奇心是最好的准备。",
    },
    {
      q: "一阶和二阶有什么区别？",
      a: "一阶（5 天）是入门与打基础，二阶（10 天）在其上深入，并包含进阶练习。建议先完成一阶。",
    },
    {
      q: "会承诺什么效果吗？",
      a: "不会。这是一段亲身的意识探索体验，每个人的收获不同，我们不承诺任何特定结果。",
    },
  ],
};
```

- [ ] **Step 2: 写页面 `src/app/courses/kuayue/page.tsx`**

```tsx
import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { kuayue } from "@/data/courses/kuayue";

export const metadata: Metadata = {
  title: `${kuayue.title} · 心灵家园`,
  description: kuayue.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={kuayue} />;
}
```

- [ ] **Step 3: 写测试 `tests/course-kuayue.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { kuayue } from "../src/data/courses/kuayue";

describe("kuayue course data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(kuayue)).toEqual([]);
  });
  it("uses its unique lead source and growth pillar", () => {
    expect(kuayue.leadSource).toBe("course-kuayue");
    expect(kuayue.pillar).toBe("growth");
  });
});
```

- [ ] **Step 4: 运行测试 + typecheck**

Run: `npm test -- course-kuayue` → PASS；`npx tsc --noEmit` → clean。

- [ ] **Step 5: commit**

```bash
git add -A && git commit -m "feat(courses): 跨越意识 /courses/kuayue 详情页（节律概述，合规）"
```

---

## Task 3: 参禅悟道 /courses/canchan

**Files:**
- Create: `src/data/courses/canchan.ts`, `src/app/courses/canchan/page.tsx`, `tests/course-canchan.test.ts`

**Interfaces:**
- Produces: `export const canchan: CourseDetailData`。

**说明**：内容依据 Mike 提供的第三期信息（2026/9/12–19 · 扬州 · 6980 元）与往期招生文章**原创撰写**（不照抄原文）。课程为《我是谁·参禅悟道 7 日实修营》，方法为「开悟密集闭关」（Dyad 二人对练 +「我是谁」公案 + 动态/昆达里尼静心 +《十牛图》脉络），导师 Mike 老师 + 微微老师，断网/止语/单人单间/素食。文案诚实红线：不承诺疗效/速效。

- [ ] **Step 1: 写 `src/data/courses/canchan.ts`**

```ts
import type { CourseDetailData } from "./types";

export const canchan: CourseDetailData = {
  id: "canchan",
  leadSource: "course-canchan",
  pillar: "growth",
  title: "我是谁 · 参禅悟道 7 日实修营（第三期）",
  subtitle: "一门「什么都不教」的开悟密集闭关——只做减法，向内看见本来面目",
  intro: [
    "我们这一代人懂了太多道理：读过很多心理与灵性的书，记得各种概念，也长期吃素、打坐、清理卡点。可一回到会议室、回到亲密关系里的一句话，那个焦虑、愤怒、想控制的自己又会瞬间现身。",
    "问题往往不是知识不够，而是装得太多——所谓的「自我」，常是别人给的标签、期待和意见拼起来的。参禅悟道这 7 天不做加法，只做减法：不灌输新知识，只为你布置一个足够纯净、足够安静的场域，让你亲自向内看一眼。",
    "课程由 Mike 老师全程护持、微微老师陪伴，以《十牛图》为底层脉络，借助融合东方禅与西方心理的「开悟密集闭关」方法，带你走一趟向内的旅程。",
  ],
  forWhom: [
    "灵性疲劳者：厌倦了不断向外求法、花了不少钱却仍在原地打转的人",
    "团队 / 企业带领者：长期高压、被责任与焦虑裹挟，想给大脑做一次重启的人",
    "关系里内耗的人：在亲密或亲子关系中反复消耗，想打破旧剧本的人",
    "真正的探寻者：听到「我是谁」会心头一震、愿意为真相诚实一回的人",
  ],
  experience: [
    "Dyad 二人对练：围绕一个终极发问「告诉我，你是谁？」，在一轮轮如镜子般的对练里，看着头脑的标签一层层剥落",
    "动态静心与昆达里尼静心：先让身体动起来、把积压的情绪释放掉，真正的安静才有可能发生",
    "全程断网、止语：交出手机、切断外缘，在高度封闭的场域里专注向内",
    "以《十牛图》收束，落在「入廛垂手」——带着这份清明回到工作、家庭与日常生活，做一个清醒的普通人",
  ],
  schedule: [
    {
      heading: "课程信息（第三期）",
      body: [
        "时间：2026 年 9 月 12 日 - 19 日（7 天 7 夜）",
        "地点：江苏 · 扬州（郊外静谧酒店，单人单间，高标准素食）",
        "导师：Mike 老师（全程护持）、微微老师（觉醒陪伴）",
        "费用：6980 元 / 人",
      ],
    },
    {
      heading: "闭关节律（概述）",
      body: [
        "清晨早起、作息规律，白天以多场高强度的 Dyad 对练为主，与动态 / 昆达里尼静心交替进行。",
        "全程断网、止语、单人单间，是一个让你彻底向内的高强度封闭场域——不是来度假，而是认真地与自己相处。",
      ],
    },
  ],
  notes: [
    "全程需上交手机、断网、止语，请提前安排好工作与家庭事务。",
    "单人单间、高标准素食；闭关强度较高，请量力报名。",
    "这不是放松度假营，也不承诺任何疗效或速效结果——收获因人而异。",
    "名额有限，为保证场域质量不扩招；具体名额以当期招生为准。",
  ],
  faq: [
    {
      q: "「什么都不教」，那这 7 天到底做什么？",
      a: "做减法。不讲新概念，而是通过 Dyad 对练、动态 / 昆达里尼静心和断网止语的场域，让你亲自经历，而不是再多记住一些道理。",
    },
    {
      q: "没有禅修基础可以参加吗？",
      a: "可以。练习有人全程带领，跟着场域走即可；重要的是你愿意诚实地面对自己。",
    },
    {
      q: "会承诺开悟或疗效吗？",
      a: "不会。这是一段亲身的向内体验，每个人的发生都不同，我们不贩卖焦虑，也不承诺速效。",
    },
  ],
};
```

- [ ] **Step 2: 写页面 `src/app/courses/canchan/page.tsx`**

```tsx
import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { canchan } from "@/data/courses/canchan";

export const metadata: Metadata = {
  title: `${canchan.title} · 心灵家园`,
  description: canchan.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={canchan} />;
}
```

- [ ] **Step 3: 写测试 `tests/course-canchan.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { canchan } from "../src/data/courses/canchan";

describe("canchan course data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(canchan)).toEqual([]);
  });
  it("uses its unique lead source and growth pillar", () => {
    expect(canchan.leadSource).toBe("course-canchan");
    expect(canchan.pillar).toBe("growth");
  });
});
```

- [ ] **Step 4: 运行测试 + typecheck**

Run: `npm test -- course-canchan` → PASS；`npx tsc --noEmit` → clean。

- [ ] **Step 5: commit**

```bash
git add -A && git commit -m "feat(courses): 参禅悟道 /courses/canchan 详情页（第三期真实信息 + 原创文案）"
```

---

## Task 4: 365 公益陪伴 /365

**Files:**
- Create: `src/data/courses/companion365.ts`, `src/app/365/page.tsx`, `tests/course-365.test.ts`

**Interfaces:**
- Produces: `export const companion365: CourseDetailData`（带 `cta` 指向 `/calendar`，pillar `companion`）。

**说明**：`/365` 是服务介绍落地页，**不重写每日内容**——既有 `/calendar`（`courses2026.ts` 的 365 天内容）继续作为内容载体；本页用 `cta` 引导"进入每日内容 → /calendar"。

- [ ] **Step 1: 写 `src/data/courses/companion365.ts`**

```ts
import type { CourseDetailData } from "./types";

export const companion365: CourseDetailData = {
  id: "companion365",
  leadSource: "service-365",
  pillar: "companion",
  title: "365 公益陪伴",
  subtitle: "全年每日清晨的陪伴与回应，让成长不孤单",
  intro: [
    "一年 365 天，每天清晨给你一段陪伴：一点智慧、一个练习、一句可以带着上路的话。",
    "这是心灵家园的公益陪伴——不收费，只为让更多人每天都有一个稳定的、向内的锚点。",
  ],
  forWhom: [
    "想给每一天一个安静开始的人",
    "在独自成长、希望有持续陪伴的人",
    "喜欢赛斯/心灵成长题材、愿意每天读一点的人",
  ],
  experience: [
    "每日清晨的内容：智慧片段 + 当日练习",
    "顺着四季节律推进的一整年主题",
    "随时可以回到「每日内容」翻阅与跟读",
  ],
  cta: { label: "进入每日内容 →", href: "/calendar" },
  faq: [
    {
      q: "真的免费吗？",
      a: "是的，365 公益陪伴是免费的。留下联系方式，我们会告诉你如何加入。",
    },
    {
      q: "在哪里看每日内容？",
      a: "点击页面上方的「进入每日内容」，即可按月份/日期浏览全年内容。",
    },
  ],
};
```

- [ ] **Step 2: 写页面 `src/app/365/page.tsx`**

```tsx
import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { companion365 } from "@/data/courses/companion365";

export const metadata: Metadata = {
  title: `${companion365.title} · 心灵家园`,
  description: companion365.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={companion365} />;
}
```

- [ ] **Step 3: 写测试 `tests/course-365.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { companion365 } from "../src/data/courses/companion365";

describe("companion365 data", () => {
  it("is valid", () => {
    expect(validateCourseDetail(companion365)).toEqual([]);
  });
  it("is a companion service that links to /calendar", () => {
    expect(companion365.leadSource).toBe("service-365");
    expect(companion365.pillar).toBe("companion");
    expect(companion365.cta?.href).toBe("/calendar");
  });
});
```

- [ ] **Step 4: 运行测试 + typecheck**

Run: `npm test -- course-365` → PASS；`npx tsc --noEmit` → clean。

- [ ] **Step 5: commit**

```bash
git add -A && git commit -m "feat(365): 365 公益陪伴落地页（CTA 进入 /calendar）"
```

---

## Task 5: 集成验证（导航不再 404 + 全量构建）

**Files:**
- 无新增；验证 + 可能的 source 唯一性测试。
- Create: `tests/course-pages.test.ts`

- [ ] **Step 1: 写 `tests/course-pages.test.ts`（三课 source 唯一 + 全部合格）**

```ts
import { describe, it, expect } from "vitest";
import { validateCourseDetail } from "../src/data/courses/types";
import { kuayue } from "../src/data/courses/kuayue";
import { canchan } from "../src/data/courses/canchan";
import { companion365 } from "../src/data/courses/companion365";

describe("all course detail pages", () => {
  const all = [kuayue, canchan, companion365];
  it("all valid", () => {
    for (const d of all) expect(validateCourseDetail(d)).toEqual([]);
  });
  it("lead sources are unique", () => {
    const sources = all.map((d) => d.leadSource);
    expect(new Set(sources).size).toBe(sources.length);
  });
});
```

- [ ] **Step 2: 运行全量测试**

Run: `npm test`
Expected: 全 PASS（P1 的 leads/academy + P2 的 courseDetail/course-kuayue/course-canchan/course-365/course-pages）。

- [ ] **Step 3: 构建**

```bash
npm run build || npx next build --webpack
```
Expected: 成功；新增路由 `/courses/kuayue`、`/courses/canchan`、`/365` 出现在构建输出中。

- [ ] **Step 4: lint**

Run: `npm run lint`
Expected: 新文件零 error（既有 out-of-scope 文件的历史告警可接受）。

- [ ] **Step 5: 路由 + 留资归因冒烟**

```bash
npm run dev
# 打开 /courses/kuayue /courses/canchan /365 ——三页都正常渲染、不再 404
# 顶层导航点「跨越意识/参禅悟道/365公益陪伴」均落到对应页
# /365 的「进入每日内容」跳到 /calendar
```
人工/Playwright 核对：每页底部 LeadForm 提交后，请求 body 的 `source` 分别为 `course-kuayue` / `course-canchan` / `service-365`（提交真正写库仍需 Mike 配 `SUPABASE_SERVICE_ROLE_KEY`；本步只验证前端 source 正确）。

- [ ] **Step 6: commit**

```bash
git add -A && git commit -m "test(courses): 课程页 source 唯一性 + 集成验证"
```

---

## P2 完成判定

- [ ] `npm test` 全绿（含 P2 新测试）。
- [ ] `npm run build` 成功，三条新路由出现。
- [ ] 顶层导航「跨越意识 / 参禅悟道 / 365公益陪伴」不再 404，落到对应站内详情页。
- [ ] 三页底部 `LeadForm` 各带唯一 `source`（course-kuayue / course-canchan / service-365）与正确 pillar。
- [ ] 跨越意识页为节律概述、未逐字复制内部作息；参禅悟道占位文案以 `TODO(Mike)` 标注。
- [ ] `/365` 的 CTA 进入既有 `/calendar`，未重写每日内容。

## 交接给 Mike（内容待补，非工程阻塞）

- 参禅悟道：第三期信息与原创文案已就位（2026/9/12–19 · 扬州 · 6980 元）；如需可补每日安排细节、报名外链/二维码、往期图片。
- 跨越意识：如有公开版招生文案/图片可替换概述段；确认"以当期招生公告为准"措辞。
- 三页可后续加：封面图（P3 生图）、真实场次/价格、报名外链（如有小鹅通/微信）。

## 不在本计划内

- 双语化课程详情页（P2 中文为主）。
- 关于我们重做 + Fable 5 流体 shader Hero 终版 + 全站生图（= P3）。
- 以性入道（外链 `sex2dao.spiritual-oasis.net`，不建站内页）。
