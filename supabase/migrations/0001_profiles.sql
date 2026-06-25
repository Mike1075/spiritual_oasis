-- M1 账号地基：profiles 表（挂 auth.users）+ 注册建档触发器 + RLS
-- 已经 apply 到 Supabase 项目 eowmgxtiiebxtkyzrlgn (name m1_profiles)；此文件留底。
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text,
  email text,
  full_name text,
  member_tier text not null default 'none',   -- S5 预留(金卡等)，v1 不消费
  role text not null default 'user',           -- user / finance / admin
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- 防用户自改 role / member_tier（仅 service-role 能改）
create or replace function public.protect_profile_privileged()
returns trigger language plpgsql as $$
begin
  if auth.role() <> 'service_role' then
    new.role := old.role;
    new.member_tier := old.member_tier;
  end if;
  return new;
end $$;
create trigger trg_protect_profile before update on public.profiles
  for each row execute function public.protect_profile_privileged();

-- 注册即建档
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, phone, email)
  values (new.id, new.phone, new.email)
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
