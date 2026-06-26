# 转化资产层（获客→转化→留存）设计 · spiritual-oasis

> 来源：从一篇 2026 数字产品打法长文里提炼出的「三成真缺口」，转成 www.spiritual-oasis.net 心灵家园官网的系统架构改进。
> 状态：设计稿（待 Mike 审）→ 后续走 writing-plans 出实现计划。
> 日期：2026-06-26。

**目标**：在 spiritual-oasis 现有「账号 + 通联支付 + 课程目录」地基之上，加一层 **「获客 → 转化 → 留存」转化资产层**，补四个缺口：①系统化战果墙 ②留资跟进引擎（深做）③低价前门 ④自有受众纪律（骨架）。

**架构基调**：**Supabase 唯一真相源 + 站点自带 `/admin` 作团队操作面**。spiritual-oasis 是对外消费站点，**全程 Supabase 自包含、不引飞书**（飞书是 lifeos/MAS-Life 内部生态的操作面，不耦合进消费站）。

## 全局约束（Global Constraints）

- **数据库**：Supabase 项目 `eowmgxtiiebxtkyzrlgn`（与现有 profiles / products / course_sessions / course_orders / hold_seat·release_seat 同库）。
- **不引飞书**：捕获/录入/跟进/受众全在 Supabase + 站内 `/admin`。
- **RLS**：公开数据（proofs published）匿名只读；PII（leads / lead_touches / entitlements）只 admin + service-role 可读写；表写一律走服务端 API 路由（service-role），不开匿名表写。
- **后台门控**：`/admin/*` 用 `profiles.role`（沿用 `getSessionProfile` / `isAdminRole`）。
- **复用**：支付复用现有 `通联 allinpay.ts` 与 `/api/pay/*`；外发短信复用已接的阿里云短信（`aliyun-sms`，待运营商报备生效）；邮箱后续接。
- **栈**：Next 16 App Router + @supabase/ssr + Tailwind v4，沿用现有 `lib/supabase/{client,server}.ts`、`lib/auth.ts`、`lib/catalog.ts` 模式。

---

## ① 战果墙（Proof Wall）· 深

把散落的好评/截图/转变收成一张结构化、可全站复用的「战果」资产，让"证据>承诺"无处不在。

### 数据模型 `proofs`
| 字段 | 类型 | 说明 |
|---|---|---|
| id | uuid pk | |
| kind | text | testimonial / screenshot / transformation / metric / video |
| title | text | 标题（"3个月从内耗到清明"）|
| quote | text | 故事正文 |
| author_name / author_handle / author_avatar_url | text | 出处人（可匿名化）|
| product_key | text null | 挂哪门课（关联 products.product_key）；空=通用 |
| metric_label / metric_value | text | kind=metric 用（"爬分 62→91"）|
| media_url | text | 截图/视频/封面，存 Supabase storage `proofs` 桶 |
| tags | text[] | 赛道/人群/主题，供筛选 |
| featured | int default 0 | 权重，置顶"战果高亮带" |
| verified | bool default false | 团队核实过=可信 |
| status | text default 'draft' | draft / published |
| source_user_id | uuid null | 若此人已在库里→关联 profiles |
| created_at / published_at | timestamptz | |

RLS：`select` where `status='published'`（anon）；写只 service-role。

### 录入（Supabase-only）
`/admin/proofs`：建/编辑/发布战果 + 上传截图到 `proofs` 桶（服务端 API 用 service-role 写）。role=admin 门控。**站内闭环、零飞书**。

### 站点复用
- `src/lib/proofs.ts` → `getProofs({ productKey?, tag?, featuredFirst?, limit? })`（anon client，公开读）。
- `<ProofWall>`（服务端组件，按 kind 渲染不同卡）：课程详情页传 productKey 只显该课战果。
- `<ResultsHighlight>`：首屏 3–5 条 featured 紧凑带（"置顶战果位"）。
- `/results` 页：全量 + 按 tag 筛。
- `CourseCard` 加"看战果"入口；卡带 `verified` 徽章，墙以 verified+featured 领头。

---

## ② 留资跟进引擎（Lead Follow-up Engine）· 深

把留资从"填完即躺"升级成可追踪、会自动培育的管线：捕获→分群→认领→多触点跟进→转化。

### 数据模型（3 张表）
- **`leads`**：name、phone/email/wechat（按 contact 去重）、`source`(gaokao/maslife/course_page/lead_magnet/compass/manual)、`interest`(product_key 或自由词)、`status`(new→contacted→nurturing→converted→lost)、`assigned_to`(uuid→profiles)、`next_action_at`、notes、utm/referrer/source_url、`user_id`(注册后关联 profiles)、score、created_at、last_touch_at。
- **`lead_touches`**：lead_id fk、`channel`(sms/email/wechat/call/system)、direction(out/in)、summary、template_key、at、by。
- **`nurture_steps`**（序列定义：sequence_key、step_no、delay_hours、channel、template_key、body）+ **`lead_enrollments`**（lead_id、sequence_key、current_step、next_at、status）。

RLS：全部 admin + service-role；leads 写只走 `/api/leads`。

### 捕获
现有 gaokao/maslife 留资页 + 课程页 CTA + lead magnet 领取，统一 POST `/api/leads`（service-role insert，**替掉原写飞书 base 的逻辑**）。定位罗盘 compass 出结果也建一条 lead 并按结果分群。按 contact 去重 / 关联已有。

### 跟进/培育引擎
新 lead →（DB 触发器 / cron）①按 source·interest 入一条滴灌序列 ②进 `/admin` 待认领队列。一个 cron（每小时/天）扫 `lead_enrollments.next_at<=now`：
- channel=sms → 阿里云短信；email → 邮件；
- channel=wechat/call（人工）→ 在 `/admin` 给认领人生成提醒，不自动发；
- 每触点写 `lead_touches`、推进 step、置下一个 next_at。
- lead.contact 命中某笔 `course_orders`(paid) → 自动置 `converted` + 停序列。

### `/admin/leads` 看板
按 status 列（或带筛的表：来源/课程/认领人/逾期）；单条详情＝`lead_touches` 时间线 + 一键补跟进/改状态/设下次跟进/认领/内联发模板短信邮件；**"今天该跟进"视图**(`next_action_at<=今天`)＝每日跟进工作清单。

---

## ③ 低价前门（Low-ticket front-door）· 骨架

入门数字产品（¥9.9/¥29/¥49）把陌生人先变"已付费买家"，再用②往 ¥6980/金卡推。三件挂现有支付：
1. **产品**：`products` 加 `type`（`retreat` 名额报名 / `digital` 即时交付）。低价前门=`digital`（无名额、付完即解锁），支付复用通联。内容用 AI 从现有课料蒸馏。
2. **交付**：付款成功 → 写 `entitlements`(user_id, product_key, granted_at) → 解锁门控资源页/PDF。
3. **接力**：products 加 `next_offer_key`（下一阶）。买前门 → 给 profile 打标 + 自动入②滴灌序列、指向下一阶（¥27→¥197→¥997 爬梯）。
→ 复用支付 + leads/培育，仅新增小表 `entitlements`。

## ④ 自有受众纪律（Owned-audience discipline）· 骨架（横切约束）

架构原则：每个获客触点必须把人沉进自己的库（profiles ∪ leads），不让关系只留在平台。落三处：
1. **处处捕获规则**：任何渠道 CTA → 必有"自有捕获"步 → leads/profiles；不做无回流口、只活在平台的内容（在 `/api/leads` 漏斗 + 内容/战役层强制）。
2. **统一受众视图**：`audience = profiles ∪ leads`（一个 SQL view + `/admin` 查询层），一处看"拥有多少人"，按来源/tier/兴趣/状态分群。**北极星 = 自有受众增长**。
3. **再触达能力**：对自有受众用自己的渠道（短信/邮箱，复用 `lead_touches`+滴灌）做广播/复售老课。后续 `/admin/broadcast` 选分群→发→记 touches。
→ 几乎不加表，是 profiles+leads 之上一层视图 + 复用培育做广播。

---

## 实施建议顺序（供 writing-plans 用）
1. 战果墙（独立、即见效、零依赖）：proofs 表 + `/admin/proofs` + `<ProofWall>`/`<ResultsHighlight>`/`/results`。
2. 留资跟进引擎：leads/lead_touches 表 + `/api/leads`（替飞书写入）+ `/admin/leads` 看板 + "今天该跟进" → 再加 nurture_steps/enrollments + cron 自动滴灌。
3. 低价前门：products.type + entitlements + next_offer + digital 交付页（依赖②的滴灌做接力）。
4. 自有受众：audience view + 捕获规则审计 + `/admin/broadcast`（依赖①②③沉淀的数据）。

> 与现有 M5 后台合流：①②④ 的 `/admin/*` 与支付 v1 规划的 `/admin`（订单/退款）同属一个 role 门控后台，统一建。
