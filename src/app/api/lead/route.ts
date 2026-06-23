import { NextResponse } from "next/server";
import { parseLead } from "@/lib/leads";
import { getServiceClient } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  try {
    const supabase = getServiceClient();
    const { error } = await supabase.from("leads").insert(parsed.data);
    if (error) throw error;
  } catch (e) {
    console.error("lead insert failed", e);
    return NextResponse.json({ ok: false, error: "提交失败，请稍后再试" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
