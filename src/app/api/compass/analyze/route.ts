import { buildAnalyzePrompt, type CompassInput } from "@/lib/compassPrompts";
import { streamChat } from "@/lib/minimax";

export const runtime = "nodejs";
// M 系列先输出思维链（实测约 40s）再出正文，全程 80-120s——需要 Fluid Compute 的 300s 上限
export const maxDuration = 300;

function sanitize(body: Partial<CompassInput>): CompassInput | null {
  if (!body || (body.track !== "student" && body.track !== "adult")) return null;
  const s = (v: unknown, max: number) => String(v ?? "").slice(0, max);
  return {
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
}

export async function POST(req: Request) {
  let input: CompassInput | null = null;
  try {
    input = sanitize(await req.json());
  } catch {
    /* fallthrough */
  }
  if (!input || input.qaLines.length < 5 || !input.openPlay.trim()) {
    return Response.json({ ok: false, error: "请先完成答题" }, { status: 400 });
  }
  const { system, user } = buildAnalyzePrompt(input);
  return streamChat(system, user, 6000);
}
