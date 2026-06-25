# 心灵家园 · 账号与支付系统 v1 设计文档

- 日期：2026-06-25
- 站点：`spiritual-oasis`（Next.js 16 App Router + Supabase + Vercel，线上 www.spiritual-oasis.net）
- 仓库：`Mike1075/spiritual_oasis`
- 状态：设计待评审

---

## 1. 背景与目标

课程过去在**小鹅通**售卖，官网只有"留资表单（LeadForm）"，没有在线收款，也**没有用户注册/登录/用户档案**。本次要给官网课程加上"学员自助购买付费"的能力。

第一版（v1）聚焦**线下闭关/活动的在线全款收款**，并一次性把**账号体系**和**管理后台**这两个地基打好。最终形态还会有会员等级、多阶连报优惠、推荐返佣等复杂促销玩法——这些归入一个独立的"营销/会员引擎（S5）"，**v1 不实现，只在数据结构上预留接口**。

### v1 成功标准（端到端闭环）
学员能：注册/登录（手机短信或邮箱）→ 进入课程页看到价格与**剩余名额** → 点"报名/购买" → 微信/支付宝扫码付**全款** → 付款成功后订单自动置为已支付、名额自动占用 → 在"我的订单"看到记录。
管理员能：在 `/admin` 查看订单列表、按条件筛选、导出 CSV、查看各场次名额看板、对单笔订单退款。

---

## 2. 范围

### v1 实现
- **S1 账号身份**：手机号短信验证码（阿里云国际短信）为主 + 邮箱密码兜底；用户档案表，预留"会员等级"字段（先存不用）。
- **S2 课程目录**：可购买产品 + **场次** + **名额上限**（满即不可报）；预留"阶段/进阶"结构。
- **S3 结账支付**：通联收银宝扫码 Native，**全款**；订单记录；付款成功占名额；退款。
- **S4 管理后台**：`/admin` 路由，按管理员角色放行；订单列表/筛选/导出、名额看板、退款。

### v1 明确不做（YAGNI）
- ❌ 看课权限门控、视频/内容托管（线上课继续留在小鹅通外链）。
- ❌ 定金 + 尾款（只做全款；订单模型为定金预留状态，但不走逻辑）。
- ❌ **S5 营销/会员引擎**：会员折扣、多阶连报优惠、优惠券、推荐返佣。只在 `orders` 表预留字段，不写任何折扣/返佣逻辑；v1 用户付的就是课程标价。
- ❌ 微信公众号 OAuth 登录（未来可加为第三种登录方式）。

---

## 3. 子系统分层（回顾）

| 子系统 | v1 | 说明 |
|---|---|---|
| S1 账号身份 | ✅ | 手机短信 + 邮箱密码兜底；profiles 含 `member_tier` 预留 |
| S2 课程目录 | ✅（精简） | products + course_sessions（场次+名额）；预留 stage |
| S3 结账支付 | ✅ | 通联全款、orders、付款占名额、退款 |
| S4 管理后台 | ✅ | /admin，订单/名额/导出/退款 |
| S5 营销会员引擎 | ❌ 仅留接口 | orders 预留 original_amount/discount/coupon/referrer |

**核心原则**：v1 的 `orders` 表预留 `original_amount_fen / discount_fen / coupon_code / referrer_user_id` 等字段（先都空），将来做 S5 时**不改表、不迁移数据**。

---

## 4. 架构总览

### 4.1 与现有代码的关系
- 复用现有栈：Next.js App Router、Supabase（已用 service-role 写留资）、Vercel 部署、`qrcode` 依赖已装。
- **直接照搬**通联技能模板的核心：`lib/pay/allinpay.ts`（加签/验签/下单/验回调，站点无关、基本不改）。
- **适配点**：模板默认"已登录用户 + 会员有效期 `paid_until`"的**会员订阅模型**。我们做的是**按课程的一次性购买**，因此：
  - 保留 `orders` 订单表与 `allinpay.ts` 核心；
  - **不使用** `membership.ts` 的 `paid_until` 会员有效期概念（v1 不是按时间的会员，而是按场次的报名）；
  - 订单关联到"用户 + 课程场次"，付款成功即"已报名该场次"。
- 营销内容仍留在现有 TS 数据文件（如 `src/data/courses/canchan.ts`）；**商品价格与名额以数据库为准**（服务端权威、可变），课程页通过 `product_key` 关联读取。

### 4.2 模块边界（每个单元一个清晰职责）
- `lib/pay/allinpay.ts` — 通联协议层（加签/验签/下单/查询/退款）。输入凭据+参数，输出网关结果。不碰业务。
- `lib/pay/products.ts` — 商品/场次读取与名额校验（替代模板 `plans.ts`）。
- `lib/auth/*` — 取当前登录用户 id、管理员判定。
- `lib/orders.ts` — 订单状态机与名额占用/释放（唯一改订单状态的地方）。
- `app/api/pay/*` — 路由层：create / notify / status / refund。
- `app/api/auth/sms-hook` — 接 Supabase「Send SMS」Hook，调用阿里云发验证码。
- `app/(auth)/*` — 登录/注册/我的订单 UI。
- `app/admin/*` — 后台 UI + 后台专用 API。

---

## 5. 数据模型（Supabase / Postgres）

> 迁移以 Supabase migration 形式提交。所有金额字段单位为**分**（与通联一致）。

### 5.1 `profiles` — 用户档案（关联 `auth.users`）
| 列 | 类型 | 说明 |
|---|---|---|
| `id` | uuid PK | = `auth.users.id` |
| `phone` | text | 手机号（短信登录时由 auth 带入，冗余便于后台检索） |
| `email` | text | 邮箱 |
| `full_name` | text | 姓名（结账时填，线下报到用） |
| `member_tier` | text default `'none'` | **S5 预留**：none / gold(金卡) …；v1 不消费 |
| `role` | text default `'user'` | user / finance / admin（后台鉴权） |
| `created_at` | timestamptz default now() | |

注册时由数据库触发器自动建 `profiles` 行（`auth.users` insert → 建档）。

### 5.2 `products` — 可购买产品（课程）
| 列 | 类型 | 说明 |
|---|---|---|
| `id` | uuid PK | |
| `product_key` | text unique | 与营销内容关联，如 `canchan` / `kuayue` |
| `title` | text | 展示名 |
| `stage` | int default 1 | **预留**：进阶/多阶（1=基础阶）；v1 都填 1 |
| `is_active` | bool default true | 是否在售 |
| `created_at` | timestamptz | |

### 5.3 `course_sessions` — 场次 + 名额
| 列 | 类型 | 说明 |
|---|---|---|
| `id` | uuid PK | |
| `product_id` | uuid FK → products | |
| `name` | text | 如「2026年9月扬州·第三期」 |
| `starts_on` | date | 开营日期 |
| `price_fen` | int | **权威标价**（分），如参禅 798000 |
| `capacity` | int | 名额上限，如 20 |
| `seats_taken` | int default 0 | 已占名额（pending 持有 + paid 占用） |
| `status` | text default `'open'` | open / closed |
| `created_at` | timestamptz | |

剩余名额 = `capacity - seats_taken`。

### 5.4 `orders` — 订单（通用，照搬模板 `op_orders` 思路并扩展）
| 列 | 类型 | 说明 |
|---|---|---|
| `id` | uuid PK | |
| `cusorderid` | text unique | 提交通联的商户单号（生成规则见 §7） |
| `user_id` | uuid FK → profiles | 下单用户 |
| `session_id` | uuid FK → course_sessions | 购买的场次 |
| `amount_fen` | int | **实付金额**（分）= v1 标价 |
| `status` | text | `pending` / `paid` / `expired` / `refunding` / `refunded` / `failed` |
| `expires_at` | timestamptz | pending 持名额到期时间（默认创建后 30 分钟） |
| `paid_at` | timestamptz | |
| `payinfo_channel` | text | wxpay / alipay（用户实际扫的） |
| `raw_notify` | jsonb | 通联回调原文（审计/对账） |
| **S5 预留↓** | | **v1 全部留空/默认** |
| `original_amount_fen` | int | 原价（=标价时无折扣） |
| `discount_fen` | int default 0 | 折扣额 |
| `coupon_code` | text | 优惠券 |
| `referrer_user_id` | uuid | 推荐人（返佣用） |
| `created_at` | timestamptz | |

**金额校验**：回调金额必须等于 `amount_fen`，不符则拒（防篡改，模板已内置）。
**幂等**：`status` 仅在 `pending → paid` 守卫下置位；通联重推不重复开通（模板已内置）。

### 5.5 RLS 策略（关键，吸取既往教训）
> 既往坑：**Supabase 表缺对应命令策略时，UPDATE 会静默 0 行不报错**。因此每个表按命令显式建策略；**所有"推进状态"的写操作一律走 service-role + 在 SQL 里带所有权条件**，不靠前端。

- `products` / `course_sessions`：`anon` + `authenticated` **可 SELECT**（公开读价格/名额）；无 INSERT/UPDATE 策略（仅 service-role 改）。
- `profiles`：用户**仅可 SELECT/UPDATE 自己那行**（`auth.uid() = id`）；`role`/`member_tier` 用户不可改（用 service-role 或列级限制）。
- `orders`：用户**仅可 SELECT 自己的单**（`auth.uid() = user_id`）；**无前端 INSERT/UPDATE**——下单、置已付、退款全部经服务端 API 用 service-role 写，并在 query 中带 `user_id`/`status` 守卫。
- 名额扣减、状态推进：全部 service-role，前端无权。

---

## 6. S1 账号身份

### 6.1 登录方式
- **主：手机号 + 短信验证码**——阿里云国际短信，覆盖国内（极廉）+ 海外（一地一价）。
- **兜底：邮箱 + 密码**——Supabase 原生，覆盖收不到短信的海外用户。
- Supabase Auth 同一用户可绑定手机与邮箱。

### 6.2 阿里云短信接入（自定义 Send SMS Hook）
Supabase 原生短信商不含阿里云，故用 **Supabase「Send SMS」Hook**：
- 新增 `POST /api/auth/sms-hook`（Next.js 路由）。
- Supabase 在需要发验证码时回调此 URL，附 HMAC 签名头（用 hook secret）。
- 路由**校验签名** → 取出手机号与 OTP → 调**阿里云短信 API**（签名 + 验证码模板）发送。
- 失败返回非 2xx，Supabase 据此报错。
- 需环境变量：`ALIYUN_SMS_ACCESS_KEY_ID` / `ALIYUN_SMS_ACCESS_KEY_SECRET` / `ALIYUN_SMS_SIGN_NAME` / `ALIYUN_SMS_TEMPLATE_CODE` / `SUPABASE_SMS_HOOK_SECRET`。
- ⚠️ 待用户提供：阿里云短信注册后给到 AccessKey、已审核**签名**、验证码**模板 Code**（签名来源建议用营业执照或公众号，官网在 Vercel 无 ICP 备案不能作签名来源）。

### 6.3 UI
- `/login`、`/register`：手机号收验证码 / 邮箱密码两个 Tab。
- Header 右上新增**登录入口 / 已登录头像菜单**（「我的订单」「退出」）。
- `/account/orders`：我的订单列表（读自己 orders）。
- 客户端用 `@supabase/supabase-js` 维护会话；服务端 API 从 Supabase 会话取 `auth.uid()` 作为权威用户 id。

---

## 7. S3 支付流程与名额并发

### 7.1 订单生命周期
```
[选场次] -- create --> pending(持名额, 30min过期)
   pending -- 通联回调成功 --> paid(占名额, 报名成功)
   pending -- 超时/用户放弃 --> expired(释放名额)
   paid    -- 客服/用户退款 --> refunding --> refunded(释放名额)
```

### 7.2 名额并发控制（物理座位，不能超卖）
采用**"创建即持位、超时释放"**：
1. **create**：在一个事务/原子条件更新里 `UPDATE course_sessions SET seats_taken = seats_taken + 1 WHERE id = ? AND seats_taken < capacity AND status='open'`；**影响 0 行 = 已满**，拒绝下单。成功才建 `pending` 订单并写 `expires_at = now()+30min`，再向通联下单拿 `payinfo`。
2. **notify（付款成功）**：守卫 `pending → paid`，置 `paid_at`；名额已在 create 持有，无需再加。
3. **过期释放**：惰性 + 定时双保险——
   - 惰性：任何读"剩余名额"或下单前，先把 `now() > expires_at` 的 `pending` 单置 `expired` 并 `seats_taken - 1`。
   - 定时：一个轻量清扫（Vercel Cron 或 notify 时顺带）兜底释放。
4. **退款**：`paid → refunding → refunded`，`seats_taken - 1` 释放名额（幂等，按订单状态守卫）。

> 取舍说明：相比"付款成功才扣名额"，创建即持位能**杜绝超卖**（线下座位错配代价高），代价是要管过期释放——对小容量（~20 人）闭关值得。

### 7.3 通联集成（照搬模板）
- `lib/pay/allinpay.ts`：照搬，**不改加签验签**。
- `POST /api/pay/create`：要求**已登录**（未登录 401）；入参 `session_id`；服务端取价格、持名额、生成 `cusorderid`、下单、返回 `payinfo`。
- `PayModal.tsx`：渲染 `payinfo` 为二维码，前端轮询 `/api/pay/status`。
- `POST /api/pay/notify`：通联回调，**用通联生产平台公钥验签** → 金额比对 → 幂等置 `paid` → 写 `raw_notify`。
- `POST /api/pay/refund`：客服带 `x-admin-token` 退任意单 / 用户限 24h 退本人单；自动识别"通联后台直接退"的退款通知。
- `cusorderid` 生成：`SO` + 日期 + 短随机/序列，唯一、可读、便于对账。

### 7.4 上线前必做验收（技能强调，别跳）
1. **离线验公钥**：`scripts/verify-order.mts` 真打一笔小额下单并用配置的通联公钥验本次应答签名，看到 `应答验签 ✓ 通过` 才说明生产公钥正确（用错测试公钥→回调静默失败、用户付了钱开不了单）。
2. Vercel 配齐 env → `vercel --prod`。
3. 线上探活：`/api/pay/create` 未登录 401；`/api/pay/notify` 空体 400。
4. **真扫一笔小额**（登录→报名→扫 ¥0.01）→ 查库 `orders.status='paid'` 且 `seats_taken` +1 → 端到端通过 → 通联后台 24h 内退款验证退款链路。

---

## 8. S4 管理后台

- 路由 `app/admin/*`，**服务端**校验 `profiles.role ∈ {admin, finance}`，否则 302 回首页。
- v1 管理员通过直接改库 `role` 字段手工种子（无自助提权）。
- 功能：
  - **订单列表**：分页 + 按状态/场次/手机号/日期筛选；显示用户、场次、金额、状态、时间。
  - **导出 CSV**：当前筛选结果导出，给财务对账。
  - **名额看板**：各 `course_sessions` 的 capacity / seats_taken / 剩余 / pending 占用。
  - **退款**：单笔订单一键退款（调 `/api/pay/refund`，带管理员 token），状态流转 + 释放名额。
- 后台所有写操作经服务端 API + service-role；前端不直连库写。

---

## 9. 安全与合规
- 机密（通联私钥/通联公钥、阿里云 AK Secret、service-role key、SMS hook secret）**只进 `.env.local` 与 Vercel env，绝不入库/不进仓库**（`.gitignore` 已含 `.env.local`）。
- RLS 见 §5.5；状态推进一律 service-role + 所有权守卫。
- 通联手续费（约 0.38%）**不得转嫁用户**，计入成本（协议要求）。
- 经营范围需覆盖"在线教育/会员"等实际业务，否则可能被风控冻结结算资金；与短信签名主体宜一致。

---

## 10. 环境变量清单（v1 新增）
通联（来自 `~/.allinpay/credentials.env`，照抄）：`ALLINPAY_GATEWAY` / `ALLINPAY_CUSID` / `ALLINPAY_APPID` / `ALLINPAY_PRIVATE_KEY` / `ALLINPAY_TL_PUBLIC_KEY` / `ALLINPAY_VERSION` / `ALLINPAY_NOTIFY_URL`(=`https://www.spiritual-oasis.net/api/pay/notify`) / `PAY_ADMIN_TOKEN`。
阿里云短信：`ALIYUN_SMS_ACCESS_KEY_ID` / `ALIYUN_SMS_ACCESS_KEY_SECRET` / `ALIYUN_SMS_SIGN_NAME` / `ALIYUN_SMS_TEMPLATE_CODE` / `SUPABASE_SMS_HOOK_SECRET`。
Supabase：现有 `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` 复用。

---

## 11. 测试策略
- 单测（vitest，沿用现有 `tests/`）：
  - `allinpay.ts` 加签拼接 / 验签（用固定向量）。
  - 名额并发：满场拒单、过期释放、退款释放的状态机。
  - 金额比对拒篡改、回调幂等。
  - 管理员鉴权（非 admin 拒入 /admin）。
- 集成/验收：§7.4 的真扫小额端到端 + 通联后台退款。

---

## 12. 实施里程碑（建议顺序）
1. **M1 账号地基**：Supabase Auth（邮箱密码先通）、profiles + 触发器 + RLS、登录/注册 UI、Header 入口。
2. **M2 短信**：阿里云 Send SMS Hook，手机验证码登录打通（依赖用户提供 AK/签名/模板）。
3. **M3 目录+名额**：products/course_sessions 迁移、灌入参禅/跨越数据、课程页读价格+剩余名额、名额并发逻辑。
4. **M4 支付**：照搬 allinpay.ts、create/notify/status/refund、PayModal 接报名按钮、verify-order 验公钥、真扫小额验收。
5. **M5 后台**：/admin 订单列表/筛选/导出/名额看板/退款。
6. **M6 上线**：env 推 Vercel、生产探活、灰度真扫、交付财务对账与退款规程（参 `references/refund-ops.md` 按站点微调）。

每个里程碑独立可验收；M1/M3 可并行起步，M4 依赖 M1+M3，M2 依赖用户给短信凭据（不阻塞其余）。

---

## 13. 待用户提供 / 未决
- 阿里云（或腾讯云）短信：AccessKey ID/Secret、已审核签名、验证码模板 Code（用户注册中）。
- v1 首批上架的场次与名额：参禅（¥7980，2026-09-12 扬州第三期，名额=?）、跨越意识（价格/场次/名额=?）。其余疗愈/成长系列 v1 继续留小鹅通外链。
- `PAY_ADMIN_TOKEN` 由本地生成。
- 首批管理员账号（谁的手机号/邮箱设为 admin/finance）。
