# M3 课程目录显示 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show live price and remaining-capacity for the 参禅 course by reading Supabase `products`+`course_sessions` tables server-side and rendering a tasteful enroll box on the course detail page.

**Architecture:** A new `src/lib/catalog.ts` module fetches product+session data via the existing anon Supabase client (public-read RLS). A server component `src/components/courses/SessionEnrollBox.tsx` consumes it and renders the card. The canchan `page.tsx` is wired to render the box and marked `force-dynamic` so Next.js fetches fresh data at runtime.

**Tech Stack:** Next.js 16 App Router, TypeScript, @supabase/supabase-js (already installed), Tailwind CSS (dark glassmorphism), Vitest 3

## Global Constraints

- Project root: `/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis`
- Branch: `feat/payment-v1-m1`
- Do NOT `git config` user identity; let git use its local config
- Do NOT create new Supabase tables; `products` and `course_sessions` already exist with public-read RLS
- Match dark glassmorphism style: `border border-white/10 bg-white/[0.03] backdrop-blur rounded-2xl`
- Class vocabulary: amber-300 for prices, emerald-300/400 for CTAs, white/60-70 for body text
- `yuanFromFen`: 798000→"¥7980", 990→"¥9.9", 299900→"¥2999" (fen÷100=yuan; no decimal if integer, else strip trailing zeros)
- `SessionEnrollBox` is a SERVER component (no `"use client"`)
- canchan page must have `export const dynamic = 'force-dynamic'`
- Test file goes in `tests/catalog-format.test.ts` (vitest picks up `tests/**/*.test.ts`)
- All gates must pass: `npx tsc --noEmit`, `npm run build`, `npx vitest run`

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/lib/catalog.ts` | `SessionInfo` type, `getSessionByProductKey()`, `yuanFromFen()` |
| Create | `src/components/courses/SessionEnrollBox.tsx` | Server component rendering price+capacity card |
| Modify | `src/app/courses/canchan/page.tsx` | Import + render `<SessionEnrollBox>`, add `force-dynamic` |
| Create | `tests/catalog-format.test.ts` | Unit tests for `yuanFromFen` |
| Create | `.superpowers/sdd/m3-code-report.md` | Final report |

---

### Task 1: `src/lib/catalog.ts` — data layer

**Files:**
- Create: `src/lib/catalog.ts`
- Test: `tests/catalog-format.test.ts` (yuanFromFen only — getSessionByProductKey needs live Supabase, skip integration test)

**Interfaces:**
- Produces:
  - `type SessionInfo = { sessionId:string; productKey:string; productTitle:string; name:string; startsOn:string|null; priceFen:number; capacity:number; seatsTaken:number; remaining:number; status:string }`
  - `async function getSessionByProductKey(productKey: string): Promise<SessionInfo | null>`
  - `function yuanFromFen(fen: number): string`

- [ ] **Step 1: Write the failing test**

```ts
// tests/catalog-format.test.ts
import { describe, it, expect } from "vitest";
import { yuanFromFen } from "../src/lib/catalog";

describe("yuanFromFen", () => {
  it("798000 fen → ¥7980", () => {
    expect(yuanFromFen(798000)).toBe("¥7980");
  });
  it("990 fen → ¥9.9", () => {
    expect(yuanFromFen(990)).toBe("¥9.9");
  });
  it("299900 fen → ¥2999", () => {
    expect(yuanFromFen(299900)).toBe("¥2999");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npx vitest run tests/catalog-format.test.ts
```

Expected: FAIL — "Cannot find module '../src/lib/catalog'"

- [ ] **Step 3: Create `src/lib/catalog.ts`**

```ts
// src/lib/catalog.ts
import { getAnonClient } from "@/lib/supabase";

export type SessionInfo = {
  sessionId: string;
  productKey: string;
  productTitle: string;
  name: string;
  startsOn: string | null;
  priceFen: number;
  capacity: number;
  seatsTaken: number;
  remaining: number;
  status: string;
};

/** 分 → 人民币字符串（整数无小数；990→"¥9.9"；299900→"¥2999"） */
export function yuanFromFen(fen: number): string {
  const yuan = fen / 100;
  if (Number.isInteger(yuan)) return `¥${yuan}`;
  // strip trailing zeros after decimal
  return `¥${yuan.toFixed(10).replace(/\.?0+$/, "")}`;
}

/**
 * 读取指定 product_key 的产品及第一个 course_session。
 * 使用 anon 客户端 —— products & course_sessions 已配置公开只读 RLS。
 * v1: 单场次，取 starts_on 最早的一个。
 */
export async function getSessionByProductKey(
  productKey: string,
): Promise<SessionInfo | null> {
  const supabase = getAnonClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      product_key,
      title,
      course_sessions (
        id,
        name,
        starts_on,
        price_fen,
        capacity,
        seats_taken,
        status
      )
    `)
    .eq("product_key", productKey)
    .eq("is_active", true)
    .limit(1)
    .single();

  if (error || !data) return null;

  // PostgREST returns nested array; take first session ordered by starts_on
  const sessions = (data.course_sessions as Array<{
    id: string;
    name: string;
    starts_on: string | null;
    price_fen: number;
    capacity: number;
    seats_taken: number;
    status: string;
  }>);

  if (!sessions || sessions.length === 0) return null;

  // Sort ascending by starts_on, nulls last
  const sorted = [...sessions].sort((a, b) => {
    if (!a.starts_on) return 1;
    if (!b.starts_on) return -1;
    return a.starts_on.localeCompare(b.starts_on);
  });

  const s = sorted[0];
  return {
    sessionId: s.id,
    productKey: data.product_key,
    productTitle: data.title,
    name: s.name,
    startsOn: s.starts_on,
    priceFen: s.price_fen,
    capacity: s.capacity,
    seatsTaken: s.seats_taken,
    remaining: Math.max(0, s.capacity - s.seats_taken),
    status: s.status,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npx vitest run tests/catalog-format.test.ts
```

Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis"
git add src/lib/catalog.ts tests/catalog-format.test.ts
git commit -m "feat(catalog): add getSessionByProductKey + yuanFromFen"
```

---

### Task 2: `SessionEnrollBox.tsx` — server component

**Files:**
- Create: `src/components/courses/SessionEnrollBox.tsx`

**Interfaces:**
- Consumes: `getSessionByProductKey(productKey)` → `SessionInfo | null`, `yuanFromFen(fen)` → `string` from `@/lib/catalog`
- Produces: RSC that renders a glassmorphism card or null

- [ ] **Step 1: Create `src/components/courses/SessionEnrollBox.tsx`**

```tsx
// src/components/courses/SessionEnrollBox.tsx
// Server component — no "use client"
import { getSessionByProductKey, yuanFromFen } from "@/lib/catalog";

interface Props {
  productKey: string;
  locale?: string;
}

export default async function SessionEnrollBox({ productKey }: Props) {
  const session = await getSessionByProductKey(productKey);
  if (!session) return null;

  const price = yuanFromFen(session.priceFen);
  const isFull = session.remaining <= 0;

  // Format date: "2026-09-12" → "2026年9月12日"
  let dateLabel = session.startsOn ?? "";
  if (session.startsOn) {
    const [y, m, d] = session.startsOn.split("-");
    dateLabel = `${y}年${Number(m)}月${Number(d)}日`;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      {/* Session header */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/60">
          {session.name}
        </span>
        {dateLabel && (
          <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/60">
            开营 {dateLabel}
          </span>
        )}
        <span
          className={`ml-auto rounded-full px-3 py-0.5 text-xs ${
            isFull
              ? "bg-red-500/20 text-red-300"
              : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {isFull ? "已满" : `剩余 ${session.remaining} / ${session.capacity} 名额`}
        </span>
      </div>

      {/* Price */}
      <div className="mb-5 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-amber-300">{price}</span>
        <span className="text-sm text-white/40">· {session.productTitle}</span>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled
        title="站内支付即将开放"
        className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white/30"
      >
        立即报名
        <span className="ml-2 text-xs text-amber-400/60">站内支付即将开放</span>
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors (or only pre-existing errors unrelated to new files)

- [ ] **Step 3: Commit**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis"
git add src/components/courses/SessionEnrollBox.tsx
git commit -m "feat(catalog): add SessionEnrollBox server component"
```

---

### Task 3: Wire `SessionEnrollBox` into canchan page

**Files:**
- Modify: `src/app/courses/canchan/page.tsx`

Current file (for reference):
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

`CourseDetailPage` renders the intro + body sections but does NOT have a slot for a live enroll card. The simplest safe place is to render `SessionEnrollBox` ABOVE `CourseDetailPage`, sharing the same page wrapper. This avoids restructuring `CourseDetailPage`.

- [ ] **Step 1: Update `src/app/courses/canchan/page.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import SessionEnrollBox from "@/components/courses/SessionEnrollBox";
import { canchan } from "@/data/courses/canchan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${canchan.title} · 心灵家园`,
  description: canchan.subtitle,
};

export default function Page() {
  return (
    <>
      <CourseDetailPage data={canchan} />
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <SessionEnrollBox productKey="canchan" />
      </div>
    </>
  );
}
```

Note: `SessionEnrollBox` is an async server component, so the parent `Page` function needs to be async too if it `await`s it directly — but since Next.js handles async children in RSC trees, this is fine without making `Page` async.

- [ ] **Step 2: Run tsc check**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npx tsc --noEmit 2>&1 | head -30
```

Expected: no new errors

- [ ] **Step 3: Run full build**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npm run build 2>&1 | tail -30
```

Expected: successful build with canchan route marked as dynamic

- [ ] **Step 4: Run vitest**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis" && npx vitest run 2>&1 | tail -20
```

Expected: all tests pass including the 3 new `yuanFromFen` tests

- [ ] **Step 5: Commit**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis"
git add src/app/courses/canchan/page.tsx
git commit -m "feat(catalog): wire SessionEnrollBox into canchan course page"
```

---

### Task 4: Report + final commit

**Files:**
- Create: `.superpowers/sdd/m3-code-report.md`

- [ ] **Step 1: Create report directory and file**

```bash
mkdir -p "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis/.superpowers/sdd"
```

Write `.superpowers/sdd/m3-code-report.md` with:
- Files created/modified
- tsc status
- build status
- vitest status
- Notes on any concerns

- [ ] **Step 2: Final commit**

```bash
cd "/Users/mike/Downloads/projects/spiritual oasis homepage/spiritual-oasis"
git add .superpowers/sdd/m3-code-report.md docs/superpowers/plans/2026-06-25-m3-catalog-display.md
git commit -m "feat(catalog): 课程页显示价格+剩余名额 (M3)"
```

---

## Self-Review

**Spec coverage:**
- ✅ `src/lib/catalog.ts` with `SessionInfo` type, `getSessionByProductKey`, `yuanFromFen`
- ✅ `yuanFromFen`: 798000→"¥7980", 990→"¥9.9", 299900→"¥2999"
- ✅ `SessionEnrollBox` server component with glassmorphism style, disabled CTA "立即报名"
- ✅ canchan page wired + `force-dynamic`
- ✅ `tests/catalog-format.test.ts` with 3 yuanFromFen cases
- ✅ tsc/build/vitest gate steps in Task 3
- ✅ Report file
- ✅ Git commit with exact message "feat(catalog): 课程页显示价格+剩余名额 (M3)"

**Placeholder scan:** No TBD, TODO, or placeholder content found.

**Type consistency:**
- `SessionInfo` defined in Task 1 catalog.ts, consumed in Task 2 SessionEnrollBox.tsx ✅
- `yuanFromFen(fen: number): string` defined Task 1, imported Task 2 ✅
- `getSessionByProductKey(productKey: string): Promise<SessionInfo | null>` defined Task 1, imported Task 2 ✅
