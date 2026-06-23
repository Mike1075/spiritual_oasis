# 心灵家园改版 P3（关于我们 + 封面图 + 流体 Hero 终版）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans for the deterministic tasks (T1/T2/T5). Steps use checkbox (`- [ ]`) syntax.
> **注意：T3（生图）与 T4（Fable 5 流体 shader Hero）是创意/交互式任务**，由主代理用 text-to-image 技能 / Fable 5 现做现试，**不走 bite-sized TDD 子代理管线**——它们以"产出文件 + 页面渲染正常 + 验收清单"为准，不写单测。

**Goal:** 完成改版收尾——重做「关于我们」（愿景/共建理念/青色组织/发展历程/共建者招募）、把课程封面图真正生出来并接到卡片与详情页、把首页占位光晕升级为 Fable 5 生成的流体 shader Hero。

**Architecture:** 关于我们 = 一个 `about.ts` 双语数据文件 + 重做的 `/about` 页（locale-aware，复用 P1 视觉令牌），底部「共建者招募」接 P1 `LeadForm`（source `cobuilder`）。封面 = `public/images/` 下生成图 + `CourseCard`/`CourseDetailPage` 用 `next/image` 渲染（缺图优雅降级为渐变占位）。流体 Hero = 自写 Three.js/shader 组件替换 `LiquidHero` 的 `.aura` 占位，保留 reduced-motion 与移动端静态兜底。

**Tech Stack:** Next.js 16 / React 19 / Tailwind v4 / next-intl / next/image / Three.js（Hero，自写）/ @supabase/supabase-js（经 `/api/lead`）/ text-to-image 技能（Agnes 免费后端生图）/ vitest。

## Global Constraints

- 工作分支：从 `main` 切出 `redesign-p3`（P1+P2 已并入 main）。
- 关于我们**双语**（locale-aware，与 P1 首页/目录一致），复用真实史实（2020 疫情期线上读书会起步……2025 启航），**不编造**未知里程碑/权益（未知项用 `TODO(Mike)` 标注）。
- 共建者招募表单复用 P1 `LeadForm`，`source="cobuilder"`、`pillar="community"`（或留空）。
- 视觉沿用「流动的意识」：暖黑底 `var(--ink)`、`.aura`、玻璃拟态；动效一律带 `prefers-reduced-motion` 静态兜底。
- 生图风格统一：留白、光感、东方意境、不堆元素（信任大模型自然排版）。生成文件落 `public/images/`，命名与 `academy.ts`/课程数据里的 `cover` 路径一致。
- 流体 Hero 性能红线：移动端与 reduced-motion 必须回退为静态渐变/图片，不得卡顿；Hero 失败时回退到现有 `.aura` 占位（保证不白屏）。
- 不动后端：留资仍走 P1 `/api/lead` → Supabase；OPC/calendar 等既有路由不碰。

---

## File Structure

**新建：**
- `src/data/about.ts` — 关于我们双语数据（愿景/理念/原则/哲学基石/发展历程/共建者）。
- `src/components/about/*` — 关于页分区组件（按需：`Timeline.tsx` 等），或单文件 `AboutContent.tsx`。
- `public/images/academy/*.jpg`、`public/images/about/*.jpg` — 生成的封面/配图（T3）。
- `src/components/sections/redesign/FluidHero.tsx`（或在 `LiquidHero.tsx` 内升级）— Fable 5 生成的流体 shader（T4）。
- `tests/about.test.ts` — 关于数据结构完整性 + 双语字段非空。
- `tests/courseCover.test.ts` — 封面渲染逻辑（有图渲染 / 无图降级）单测（如组件可测）。

**修改：**
- `src/app/about/page.tsx` — 重做为渲染新 `AboutContent`（保留 server/client 边界）。
- `src/components/academy/CourseCard.tsx` — 渲染 `cover`（next/image + 缺图降级）。
- `src/components/courses/CourseDetailPage.tsx` — Hero 可选渲染 `cover` 背景。
- `src/app/page.tsx` / `LiquidHero.tsx` — 接入 `FluidHero`（T4）。
- `next.config.ts` — 如用远程图源则配 `images.remotePatterns`（本地 `public/` 图无需配）。
- `messages/zh.json`/`messages/en.json` — 仅在需要时补 about 键（优先用 `about.ts` 数据文件承载双语，减少 i18n 改动）。

---

## Task 1（管线）: 关于我们重做

**Files:**
- Create: `src/data/about.ts`, `src/components/about/AboutContent.tsx`, `tests/about.test.ts`
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Produces: `ABOUT`（双语数据对象，含 `vision/values/principles/foundation/timeline/cobuilder`）；`validateAbout(a): string[]`；`<AboutContent />`（client，locale-aware）。

- [ ] **Step 1: 写失败测试 `tests/about.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { ABOUT, validateAbout } from "../src/data/about";

describe("about data", () => {
  it("passes validation", () => {
    expect(validateAbout(ABOUT)).toEqual([]);
  });
  it("timeline entries are bilingual and chronological", () => {
    const years = ABOUT.timeline.map((t) => Number(t.year));
    expect(years.length).toBeGreaterThan(0);
    for (const t of ABOUT.timeline) {
      expect(t.zhTitle).toBeTruthy();
      expect(t.enTitle).toBeTruthy();
    }
    const sorted = [...years].sort((a, b) => a - b);
    expect(years).toEqual(sorted);
  });
  it("cobuilder section has a lead source", () => {
    expect(ABOUT.cobuilder.leadSource).toBe("cobuilder");
  });
});
```

- [ ] **Step 2: 运行确认失败**

Run: `npm test -- about`
Expected: FAIL（模块不存在）。

- [ ] **Step 3: 写 `src/data/about.ts`**（复用现 `/about` 真实史实；未知项 `TODO(Mike)`）

```ts
type Bi = { zh: string; en: string };

export type TimelineItem = {
  year: string;
  zhTitle: string;
  enTitle: string;
  zhDesc: string;
  enDesc: string;
};

export type AboutData = {
  vision: Bi;
  values: Bi[]; // 共建 / 共享 / 共有
  principles: Bi[]; // 青色组织 / 去中心化
  foundation: Bi; // 哲学基石（赛斯）
  timeline: TimelineItem[];
  cobuilder: { intro: Bi; roles: Bi[]; leadSource: string };
};

export const ABOUT: AboutData = {
  vision: {
    zh: "开启人类潜能，引领人类进入新时代。",
    en: "Unlock human potential, and lead humanity into a new era.",
  },
  values: [
    { zh: "共建", en: "Co-build" },
    { zh: "共享", en: "Co-share" },
    { zh: "共有", en: "Co-own" },
  ],
  principles: [
    { zh: "青色组织：去中心化、自主管理、身心整合", en: "Teal organization: decentralized, self-managed, whole-person" },
    { zh: "去中心化：让创造与价值回到每个人手中", en: "Decentralized: creation and value return to each person" },
  ],
  foundation: {
    zh: "以赛斯资料（Seth Material）的宇宙观与「信念创造实相」为哲学基石。",
    en: "Grounded in the Seth Material's worldview and 'beliefs create reality'.",
  },
  // 真实史实取自现有 /about（2020 疫情期线上读书会起步）
  timeline: [
    { year: "2020", zhTitle: "起源", enTitle: "The Beginning", zhDesc: "心灵家园在疫情期间诞生，从线上读书会开始。", enDesc: "Born during the pandemic, starting as an online reading circle." },
    { year: "2021", zhTitle: "成长", enTitle: "Growth", zhDesc: "建立系统课程体系，首批学员突破一千人。", enDesc: "A structured curriculum took shape; the first 1,000 students joined." },
    { year: "2022", zhTitle: "社区成型", enTitle: "Community", zhDesc: "完善线上社区，开启多城市线下活动。", enDesc: "The online community matured; offline gatherings began across cities." },
    { year: "2023", zhTitle: "扩展", enTitle: "Expansion", zhDesc: "全球社区布局，探索更前沿的协作方式。", enDesc: "A global community footprint and new ways to collaborate." },
    { year: "2024", zhTitle: "深耕", enTitle: "Deepening", zhDesc: "课程与陪伴体系深化，社区共建机制成型。", enDesc: "Courses and companionship deepened; co-building mechanisms formed." },
    { year: "2025", zhTitle: "新启航", enTitle: "New Chapter", zhDesc: "迈向以共建·共享·共有为核心的成长型社区。", enDesc: "Toward a growth community built on co-build, co-share, co-own." },
    // TODO(Mike): 如有更准确的年份/里程碑/学员数据，替换以上文案。
  ],
  cobuilder: {
    intro: {
      zh: "心灵家园以共建的方式成立。我们邀请认同愿景的人成为共建者——讲师、志愿者、内容与社区共创者。",
      en: "Spiritual Oasis is built together. We invite those who share the vision to co-build — as teachers, volunteers, and co-creators.",
    },
    roles: [
      { zh: "讲师 / 带领者", en: "Teacher / Facilitator" },
      { zh: "志愿者", en: "Volunteer" },
      { zh: "内容与社区共创", en: "Content & Community Co-creator" },
    ],
    leadSource: "cobuilder",
  },
};

export function validateAbout(a: AboutData): string[] {
  const errs: string[] = [];
  const bi = (b: { zh?: string; en?: string } | undefined, name: string) => {
    if (!b?.zh) errs.push(`${name}.zh empty`);
    if (!b?.en) errs.push(`${name}.en empty`);
  };
  bi(a.vision, "vision");
  bi(a.foundation, "foundation");
  if (!a.values?.length) errs.push("values empty");
  if (!a.principles?.length) errs.push("principles empty");
  if (!a.timeline?.length) errs.push("timeline empty");
  bi(a.cobuilder?.intro, "cobuilder.intro");
  if (!a.cobuilder?.roles?.length) errs.push("cobuilder.roles empty");
  if (a.cobuilder?.leadSource !== "cobuilder") errs.push("cobuilder.leadSource wrong");
  return errs;
}
```

- [ ] **Step 4: 运行确认通过**

Run: `npm test -- about`
Expected: PASS（3 用例）。

- [ ] **Step 5: 写 `src/components/about/AboutContent.tsx`**（client，locale-aware，复用暖黑底+aura）

```tsx
"use client";

import { useLocale } from "next-intl";
import { ABOUT } from "@/data/about";
import LeadForm from "@/components/leads/LeadForm";

export default function AboutContent() {
  const locale = (useLocale() as "zh" | "en");
  const pick = (b: { zh: string; en: string }) => (locale === "zh" ? b.zh : b.en);

  return (
    <div className="bg-[var(--ink)] text-white">
      {/* 愿景 */}
      <header className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="aura absolute left-1/2 top-0 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-50" />
        <p className="text-sm uppercase tracking-widest text-white/50">{locale === "zh" ? "关于我们" : "About"}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold sm:text-5xl">{pick(ABOUT.vision)}</h1>
      </header>

      <div className="mx-auto max-w-4xl space-y-20 px-6 pb-28">
        {/* 共建·共享·共有 */}
        <section className="grid gap-5 sm:grid-cols-3">
          {ABOUT.values.map((v) => (
            <div key={v.en} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <span className="text-2xl font-semibold">{pick(v)}</span>
            </div>
          ))}
        </section>

        {/* 原则 */}
        <section className="space-y-3">
          {ABOUT.principles.map((p) => (
            <p key={p.en} className="text-lg text-white/80">{pick(p)}</p>
          ))}
        </section>

        {/* 哲学基石 */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="mb-3 text-2xl font-semibold">{locale === "zh" ? "哲学基石" : "Foundation"}</h2>
          <p className="text-white/80">{pick(ABOUT.foundation)}</p>
        </section>

        {/* 发展历程 */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold">{locale === "zh" ? "发展历程" : "Our Journey"}</h2>
          <ol className="relative space-y-8 border-l border-white/15 pl-6">
            {ABOUT.timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gradient-to-r from-amber-300 to-emerald-400" />
                <div className="text-emerald-300">{t.year} · {locale === "zh" ? t.zhTitle : t.enTitle}</div>
                <p className="mt-1 text-white/70">{locale === "zh" ? t.zhDesc : t.enDesc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 共建者招募 */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="mb-3 text-2xl font-semibold">{locale === "zh" ? "成为共建者" : "Become a Co-builder"}</h2>
          <p className="mb-4 text-white/80">{pick(ABOUT.cobuilder.intro)}</p>
          <ul className="mb-8 flex flex-wrap gap-3">
            {ABOUT.cobuilder.roles.map((r) => (
              <li key={r.en} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80">{pick(r)}</li>
            ))}
          </ul>
          <LeadForm source={ABOUT.cobuilder.leadSource} pillar="community" title={locale === "zh" ? "留下联系方式，一起共建" : "Join us — leave your contact"} />
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: 替换 `src/app/about/page.tsx`**

```tsx
import AboutContent from "@/components/about/AboutContent";

export const metadata = { title: "关于我们 · 心灵家园" };

export default function AboutPage() {
  return <AboutContent />;
}
```

- [ ] **Step 7: typecheck + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "feat(about): 关于我们重做（愿景/共建理念/历程/共建者招募）"
```

---

## Task 2（管线）: 课程封面接线（CourseCard / 详情页 Hero）

**Files:**
- Modify: `src/components/academy/CourseCard.tsx`, `src/components/courses/CourseDetailPage.tsx`
- Create: `tests/courseCover.test.ts`（如可对纯函数测试封面降级逻辑）

**说明**：当前 `CourseCard` 不渲染 `cover`；课程详情页 Hero 是纯文字。本任务让两者渲染封面图，并在**图片不存在/未生成时优雅降级**为渐变占位（避免裂图）。用 `next/image`；本地 `public/` 图无需配 remotePatterns。

- [ ] **Step 1: 写降级逻辑纯函数 + 失败测试 `tests/courseCover.test.ts`**

在 `src/components/academy/CourseCard.tsx` 顶部导出一个纯函数 `hasCover(cover?: string): boolean`（约定：以 `/images/` 开头才视为真实图，占位/空则降级）。测试：

```ts
import { describe, it, expect } from "vitest";
import { hasCover } from "../src/components/academy/CourseCard";

describe("hasCover", () => {
  it("true for /images path", () => expect(hasCover("/images/academy/x.jpg")).toBe(true));
  it("false for empty", () => expect(hasCover("")).toBe(false));
  it("false for undefined", () => expect(hasCover(undefined)).toBe(false));
});
```

- [ ] **Step 2: 运行确认失败**

Run: `npm test -- courseCover` → FAIL（`hasCover` 未导出）。

- [ ] **Step 3: 在 `CourseCard.tsx` 导出 `hasCover` 并渲染封面（缺图降级渐变）**

在文件顶部加：

```tsx
import Image from "next/image";

export function hasCover(cover?: string): boolean {
  return !!cover && cover.startsWith("/images/");
}
```

在卡片 JSX 顶部（标签行之前）插入封面区块：

```tsx
<div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl">
  {hasCover(course.cover) ? (
    <Image src={course.cover} alt={title} width={480} height={300}
      className="h-full w-full object-cover transition group-hover:scale-105" />
  ) : (
    <div className="h-full w-full bg-gradient-to-br from-amber-300/20 to-emerald-400/20" />
  )}
</div>
```

（`title` 变量已在组件内由 locale 选出；沿用。）

- [ ] **Step 4: 运行确认通过 + 详情页 Hero 可选封面**

Run: `npm test -- courseCover` → PASS。
然后在 `CourseDetailPage.tsx` 的 `<header>` 里，当 `data.cover`（需在 `CourseDetailData` 加可选 `cover?: string` 字段——若加，则同步 P2 数据文件保持 `undefined` 即走纯色）存在时渲染为背景图层；缺省继续用 `.aura`。**为降低改动面，本期可仅做 CourseCard 封面，详情页 Hero 维持 aura**，把详情页封面留作后续——在报告里注明取舍。

- [ ] **Step 5: typecheck + commit**

```bash
npx tsc --noEmit
git add -A && git commit -m "feat(academy): 课程卡渲染封面 + 缺图优雅降级"
```

---

## Task 3（创意/交互，主代理执行，不走子代理管线）: 全站封面/配图生成

**By:** 主代理用 `text-to-image` 技能的 **Agnes AI 免费后端 `gen-image-agnes.sh`（无需登录、OpenAI 兼容、可并发）**。**不写单测**；验收=文件生成 + 页面渲染正常。

- [ ] 列出 `academy.ts` 与课程数据里引用的 `cover` 路径清单（如 `/images/academy/mas-life.jpg` 等）。
- [ ] 用统一风格 prompt（留白、光感、东方意境、不堆元素；暖黑/微光基调与"流动的意识"一致）逐张生成，落到 `public/images/academy/` 对应文件名。
- [ ] 为关于页生成 1–2 张配图（可选），落 `public/images/about/`。
- [ ] 本地 `npm run build` 确认图片被正确引用、无裂图；缺图项保持 T2 的渐变降级。
- [ ] commit：`feat(images): 课程封面与关于页配图（生成图）`

**验收清单：** 每个 `cover` 路径要么有真实图、要么走降级；首页/目录卡片观感统一；无 404 图片请求。

---

## Task 4（创意/交互，主代理执行）: 流体 shader Hero 终版（自写 Three.js，不依赖 Fable 5）

**By:** 主代理直接用 **Three.js/WebGL 自写**流体 shader Hero 组件（Fable 5 暂不可用，改为自写代码；加 `three` 依赖），替换 `LiquidHero` 的 `.aura` 占位。**不写单测**；验收=渲染效果 + 性能 + 兜底。

- [ ] `npm i three @types/three`；新建 `FluidHero.tsx`（`"use client"`，Three.js 全屏平面 + 自定义 fragment shader 做流体/噪声流动，暖黑底 + 单一呼吸光色，缓慢流动）。
- [ ] 用 `next/dynamic`（`ssr:false`）懒加载 `FluidHero`，避免 SSR/WebGL 报错；接入 `LiquidHero`/首页。
- [ ] **兜底三连**：`prefers-reduced-motion` 与移动端（窄屏/无 WebGL）回退为静态渐变（现有 `.aura`）；组件加载/WebGL 失败也回退 `.aura`，不白屏。
- [ ] 性能预算：限制分辨率/像素比（`Math.min(devicePixelRatio,2)`）、单平面单 shader，`requestAnimationFrame` 节流；`npm run build` 通过，首屏不卡顿；离开视口暂停渲染。
- [ ] 保留 P1 的标题/双 CTA 不变（探索心灵大学 / 加入 365 陪伴）。
- [ ] commit：`feat(home): 自写 Three.js 流体 shader Hero 终版（含 reduced-motion/移动端兜底）`

**验收清单：** 桌面流体生效；reduced-motion 静止；移动端不卡；失败有兜底；CTA 与文案不变。

---

## Task 5（管线）: 集成验证

**Files:** Create `tests/p3-data.test.ts`（about + 封面纯函数汇总，可选）

- [ ] **Step 1: 全量测试** `npm test` → 全绿（P1/P2 + about/courseCover）。
- [ ] **Step 2: 构建** `npm run build || npx next build --webpack` → 成功；`/about` 在路由输出。
- [ ] **Step 3: lint** `npm run lint` → 新文件零 error。
- [ ] **Step 4: 路由冒烟**：`/about` 渲染愿景/三理念/历程/共建者表单；共建者表单提交 body `source==="cobuilder"`；首页 Hero（流体或兜底）正常；课程卡封面（真实图或降级）正常。
- [ ] **Step 5: commit**：`test(p3): 集成验证`

---

## P3 完成判定

- [ ] `/about` 重做完成：愿景/共建共享共有/青色组织·去中心化/哲学基石/发展历程/共建者招募（双语），底部 `LeadForm` source=`cobuilder`。
- [ ] 课程卡渲染封面，缺图优雅降级；生成图就位（T3）。
- [ ] 首页流体 Hero 终版（T4），带 reduced-motion/移动端/失败兜底。
- [ ] `npm test` 全绿、`npm run build` 成功、新文件零 lint。

## 交接给 Mike

- 关于页：核对/补正发展历程的真实年份与里程碑（替换 `about.ts` 的 `TODO(Mike)`）、补共建者权益说明（如终身权益/分润，若要公开）。
- 上线清单延续：Vercel 配 `SUPABASE_SERVICE_ROLE_KEY`、替换 `XIAOE` 真实小鹅通地址、推送 `main`。

## 不在本计划内

- 课程详情页 Hero 封面背景（本期 CourseCard 封面优先；详情页维持 aura，列为后续）。
- 双语化 P2 课程详情页（仍中文为主）。
