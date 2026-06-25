# M3 课程目录显示 — 实施报告

**日期:** 2026-06-25  
**分支:** feat/payment-v1-m1

---

## 文件变更

| 操作 | 路径 |
|------|------|
| 新建 | `src/lib/catalog.ts` |
| 新建 | `src/components/courses/SessionEnrollBox.tsx` |
| 修改 | `src/app/courses/canchan/page.tsx` |
| 新建 | `tests/catalog-format.test.ts` |

---

## 功能说明

### `src/lib/catalog.ts`
- `SessionInfo` 类型：封装产品+场次联合数据
- `getSessionByProductKey(productKey)`: 使用 anon Supabase 客户端（公开只读 RLS），PostgREST 嵌套 select 拉取 products + course_sessions，取 starts_on 最早场次，计算 `remaining = max(0, capacity - seats_taken)`
- `yuanFromFen(fen)`: 分→元展示（798000→"¥7980"，990→"¥9.9"，299900→"¥2999"），整数无小数，非整数用 toFixed(2) 去尾零

### `src/components/courses/SessionEnrollBox.tsx`
- 纯 Server Component（无 "use client"）
- 暗色玻璃拟态风格（`border border-white/10 bg-white/[0.03] backdrop-blur rounded-2xl`）
- 展示：场次名徽章 + 开营日期 + 剩余名额（已满时显示"已满"红色标签）
- 价格用 amber-300 大字体
- 禁用 CTA 按钮"立即报名" + 副文"站内支付即将开放"

### `src/app/courses/canchan/page.tsx`
- 新增 `export const dynamic = "force-dynamic"` 确保运行时拉取
- 在 `CourseDetailPage` 下方插入 `<SessionEnrollBox productKey="canchan" />`，外包 `max-w-3xl` 容器对齐正文

---

## 门控结果

| 门控 | 状态 | 说明 |
|------|------|------|
| `npx tsc --noEmit` | ✅ PASS | 零错误 |
| `npm run build` | ✅ PASS | `/courses/canchan` 标记为 `ƒ` (Dynamic) |
| `npx vitest run` | ✅ PASS | 31 tests, 12 test files, 全通 |

---

## 提交记录

1. `feat(catalog): add getSessionByProductKey + yuanFromFen` — 8d6d07b  
2. `feat(catalog): add SessionEnrollBox server component` — cc98423  
3. `feat(catalog): wire SessionEnrollBox into canchan course page` — 59d1d9e

---

## 注意事项

- `getSessionByProductKey` 在 build 时不会执行（`force-dynamic` 保证运行时才调用），所以构建期无需 Supabase 连接
- 目前 v1 只取第一个场次（按 starts_on 升序）；多场次支持可在 v2 扩展
- `SessionEnrollBox` 返回 `null` 时页面无任何额外 DOM，无需降级 UI
