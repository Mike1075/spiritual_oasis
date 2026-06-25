import { createServerSupabase } from "@/lib/supabase/server";

export type Profile = {
  id: string; phone: string | null; email: string | null;
  full_name: string | null; member_tier: string; role: string;
};

export function isAdminRole(role: string | undefined | null): boolean {
  return role === "admin" || role === "finance";
}

export async function getSessionProfile(): Promise<{ userId: string; profile: Profile } | null> {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("profiles")
    .select("id, phone, email, full_name, member_tier, role")
    .eq("id", user.id)
    .maybeSingle();
  const profile: Profile = data ?? {
    id: user.id, phone: user.phone ?? null, email: user.email ?? null,
    full_name: null, member_tier: "none", role: "user",
  };
  return { userId: user.id, profile };
}
