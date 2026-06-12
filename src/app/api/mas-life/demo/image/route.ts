import { NextResponse } from "next/server";
import { generateImage } from "@/lib/minimax";
import {
  getBitableRecord,
  updateBitableRecord,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";
import { fieldText } from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 300;

// POV 视角:从 TA 自己的眼睛看出去,绝不出现 TA 的脸(我们不知道 TA 长什么样)
function buildImagePrompt(record: Record<string, unknown>): string {
  const identity = fieldText(record["身份"]).slice(0, 30);
  const direction = fieldText(record["意向方向"]).slice(0, 80);
  const archetype = fieldText(record["测评原型"]).slice(0, 40);
  const scene = direction
    ? `与「${direction}」相关的工作或生活场景`
    : "TA 热爱的事业现场,手边有正在完成的作品";
  return (
    `第一人称视角(POV)实景摄影:从主人公自己的双眼看出去,画面里只能出现主人公自己的双手、` +
    `手边的物件和眼前的环境,绝对不能出现主人公的脸,也不能出现任何清晰的人脸。\n` +
    `场景:10 年后一个普通而美好的瞬间——${scene}。` +
    `主人公的身份气质:${identity || "正在转型的探索者"}${
      archetype ? `,性格底色是「${archetype}」` : ""
    }。可以有桌面、窗外的光、身边的环境细节。\n` +
    `氛围:电影感构图,暖色调(清晨金色阳光或黄昏暖光),梦核质感,轻微柔焦光晕,细腻胶片颗粒,自然景深。\n` +
    `硬性禁止:画面中不能出现任何文字、字母、数字、招牌字样、可读的屏幕内容、logo、水印;` +
    `如有屏幕只能是模糊的光斑;不能出现任何人脸。`
  );
}

// 命中记录后的「图」路:生成 10 年后 POV 图,URL 落库缓存,返回同源代理地址
export async function POST(req: Request) {
  let body: { id?: string; contact?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const id = String(body.id ?? "");
  const contact = String(body.contact ?? "").trim();
  if (!/^rec[A-Za-z0-9]+$/.test(id) || contact.length < 4) {
    return NextResponse.json({ ok: false, error: "参数错误" }, { status: 400 });
  }
  const record = await getBitableRecord(id, COMPASS_TABLE_ID);
  if (!record) {
    return NextResponse.json({ ok: false, error: "记录不存在" }, { status: 404 });
  }
  if (fieldText(record["手机/微信"]).trim() !== contact) {
    return NextResponse.json({ ok: false, error: "无权访问" }, { status: 403 });
  }
  if (fieldText(record["demo图URL"]).trim()) {
    return NextResponse.json({ ok: true, cached: true, url: `/api/mas-life/demo/img/${id}` });
  }
  try {
    const rawUrl = await generateImage(buildImagePrompt(record), "3:4");
    await updateBitableRecord(id, { demo图URL: rawUrl }, COMPASS_TABLE_ID);
    return NextResponse.json({ ok: true, url: `/api/mas-life/demo/img/${id}` });
  } catch (err) {
    console.error("[mas-life/demo/image] 生成失败：", err);
    return NextResponse.json(
      { ok: false, error: "画面生成失败，可刷新重试" },
      { status: 502 }
    );
  }
}
