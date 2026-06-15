import {
  getBitableRecord,
  downloadBitableMedia,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";
import { fieldText } from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 60;

// 同源图片代理:MiniMax CDN 无 CORS 头,直接 <img> 画进 canvas 会污染画布导出失败;
// 顺带不向前端暴露原始 URL。只按记录 ID 取 demo图URL,不是开放代理。
// 存储格式两种:`feishu:<file_token>` = 永久素材(新);`http(s)://...` = MiniMax OSS 链(老,24h 过期)。
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!/^rec[A-Za-z0-9]+$/.test(id)) {
    return new Response("not found", { status: 404 });
  }
  const record = await getBitableRecord(id, COMPASS_TABLE_ID);
  const stored = record ? fieldText(record["demo图URL"]).trim() : "";

  try {
    let upstream: Response;
    if (stored.startsWith("feishu:")) {
      // 永久素材:服务端用 tenant token 现取,不会过期
      upstream = await downloadBitableMedia(stored.slice("feishu:".length));
    } else if (/^https?:\/\//.test(stored)) {
      // 老记录的 OSS 链接,可能已过期(>24h 必 502);用户重新生成后会迁移成 feishu: 永久素材
      upstream = await fetch(stored);
    } else {
      return new Response("not found", { status: 404 });
    }
    if (!upstream.ok || !upstream.body) {
      return new Response("upstream error", { status: 502 });
    }
    return new Response(upstream.body, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("upstream error", { status: 502 });
  }
}
