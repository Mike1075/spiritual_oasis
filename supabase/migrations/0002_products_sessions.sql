-- M3 课程目录 + 名额：products + course_sessions（公开只读，仅 service-role 写名额）
-- 已 apply 到 supabase eowmgxtiiebxtkyzrlgn (m3_products_sessions)；此文件留底。
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_key text unique not null,         -- 对应 academy.ts 的 productKey
  title text not null,
  stage int not null default 1,             -- 预留：进阶/多阶
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.course_sessions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  starts_on date,
  price_fen int not null,                    -- 权威标价（分）
  capacity int not null,                     -- 名额上限
  seats_taken int not null default 0,        -- 已占（pending 持有 + paid 占用，M4 起维护）
  status text not null default 'open',       -- open / closed
  created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.course_sessions enable row level security;
create policy "products_public_read" on public.products for select using (true);
create policy "course_sessions_public_read" on public.course_sessions for select using (true);
-- 无 insert/update/delete 策略：仅 service-role 写

insert into public.products (product_key, title)
  values ('canchan', '参禅悟道 7 天') on conflict (product_key) do nothing;
insert into public.course_sessions (product_id, name, starts_on, price_fen, capacity)
  select p.id, '2026年9月·扬州第三期', date '2026-09-12', 798000, 50
  from public.products p where p.product_key='canchan'
  and not exists (select 1 from public.course_sessions s where s.product_id=p.id);
