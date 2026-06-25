-- M4 支付：course_orders 订单表(用户只读自己;写全走service-role) + 原子占/放名额函数
-- 已 apply 到 supabase eowmgxtiiebxtkyzrlgn (m4_course_orders)；此文件留底。
create table if not exists public.course_orders (
  id uuid primary key default gen_random_uuid(),
  out_trade_no text unique not null,                 -- 提交通联的商户单号
  user_id uuid not null references public.profiles(id),
  session_id uuid not null references public.course_sessions(id),
  amount_fen int not null,
  status text not null default 'pending',            -- pending/paid/expired/refunding/refunded/closed
  expires_at timestamptz,                            -- pending 持名额到期(下单+30min)
  paid_at timestamptz, pay_method text, trade_no text, qr_code text, raw_notify jsonb,
  original_amount_fen int, discount_fen int default 0, coupon_code text, referrer_user_id uuid,  -- S5 预留
  refund_trade_no text, refund_amount_fen int, refunded_at timestamptz, refund_raw jsonb,
  created_at timestamptz not null default now()
);
alter table public.course_orders enable row level security;
create policy "course_orders_select_own" on public.course_orders for select using (auth.uid() = user_id);

create or replace function public.hold_seat(p_session uuid) returns boolean
language plpgsql security definer set search_path=public as $$
begin
  update public.course_sessions set seats_taken = seats_taken + 1
    where id = p_session and seats_taken < capacity and status = 'open';
  return found;
end $$;
create or replace function public.release_seat(p_session uuid) returns void
language plpgsql security definer set search_path=public as $$
begin
  update public.course_sessions set seats_taken = greatest(0, seats_taken - 1) where id = p_session;
end $$;
