import { buildPremortemPrompt, type CompassInput } from "@/lib/compassPrompts";
import { streamChat } from "@/lib/minimax";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  let body: (Partial<CompassInput> & { direction?: string }) | null = null;
  try {
    body = await req.json();
  } catch {
    /* fallthrough */
  }
  const direction = String(body?.direction ?? "").trim().slice(0, 80);
  if (
    !body ||
    (body.track !== "student" && body.track !== "adult") ||
    !direction
  ) {
    return Response.json({ ok: false, error: "缺少方向" }, { status: 400 });
  }
  const s = (v: unknown, max: number) => String(v ?? "").slice(0, max);
  const input: CompassInput = {
    track: body.track,
    identityLabel: s(body.identityLabel, 20),
    archetypeLabel: s(body.archetypeLabel, 40),
    scoreLine: s(body.scoreLine, 60),
    qaLines: (Array.isArray(body.qaLines) ? body.qaLines : [])
      .slice(0, 12)
      .map((l) => s(l, 160)),
    openPlay: s(body.openPlay, 600),
    openDirection: s(body.openDirection, 600),
  };
  const { system, user } = buildPremortemPrompt(input, direction);
  return streamChat(system, user, 5000);
}
