import { getBitableRecord, COMPASS_TABLE_ID } from "@/lib/feishu";
import { fieldText } from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 60;

// 同源图片代理:MiniMax CDN 无 CORS 头,直接 <img> 画进 canvas 会污染画布导出失败;
// 顺带不向前端暴露原始 URL。只按记录 ID 取 demo图URL,不是开放代理。
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^rec[A-Za-z0-9]+$/.test(id)) {
    return new Response("not found", { status: 404 });
  }
  const record = await getBitableRecord(id, COMPASS_TABLE_ID);
  const url = record ? fieldText(record["demo图URL"]).trim() : "";
  if (!/^https?:\/\//.test(url)) {
    return new Response("not found", { status: 404 });
  }
  try {
    const upstream = await fetch(url);
    if (!upstream.ok || !upstream.body) {
      return new Response("upstream error", { status: 502 });
    }
    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("upstream error", { status: 502 });
  }
}
