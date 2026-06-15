import { NextResponse } from "next/server";
import { generateImage } from "@/lib/minimax";
import {
  getBitableRecord,
  updateBitableRecord,
  uploadBitableMedia,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";
import { fieldText } from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 300;

// 风格库:时间光线 × 色调 × 环境质感,按记录哈希取一种,避免人人都是"黄昏暖光坐桌前"
const STYLES = [
  "清晨薄雾,冷蓝与金色晨光交错,空气通透,清冽而充满希望",
  "正午明亮通透,大面积自然留白,日系清新色调,干净松弛",
  "黄昏暖金逆光,梦核质感,轻微柔焦光晕,细腻胶片颗粒",
  "深夜暖黄台灯,窗外城市霓虹虚化成彩色光斑,安静专注的微光氛围",
  "雨后青灰蓝绿色调,窗玻璃上有雨痕,湿润清冽,空气感强",
  "森林般的绿意与树影光斑,自然治愈系色调,呼吸感",
  "冬日雪后冷白色调,窗外积雪,屋内一点暖橙光源,静谧温暖",
  "紫粉色晚霞铺满天空,梦幻浪漫色调,轻盈通透",
];

// 不同方向给不同的手边物件/环境,让画面真正属于 TA 的人生
const SCENE_HINTS: [RegExp, string][] = [
  [/写作|作家|文案|编剧|自媒体|博主/, "手边是摊开的稿纸、钢笔和一杯冒着热气的咖啡"],
  [/编程|程序|开发|AI|技术|工程/, "手边是机械键盘和屏幕虚化的彩色光斑,桌上有绿植"],
  [/教育|老师|讲师|培训|教练/, "眼前是教室或工作坊的空间,手边有讲义和白板笔"],
  [/设计|艺术|绘画|插画|摄影/, "手边是画具、色卡或相机,桌面散落着创作中的作品"],
  [/餐饮|烘焙|咖啡|美食|厨/, "眼前是料理台,手边有新鲜食材和厨具,蒸汽袅袅"],
  [/手作|木工|陶艺|工匠/, "眼前是工作台,手边是工具和正在成形的作品"],
  [/心理|疗愈|冥想|瑜伽|身心/, "眼前是温暖安静的空间,有蜡烛、坐垫和绿植"],
  [/运动|健身|户外|徒步/, "眼前是清晨的步道或山野,双手系着鞋带或握着水壶"],
  [/音乐|乐器|歌/, "手边是乐器的一角和散落的乐谱"],
  [/农|种植|田园|乡村/, "眼前是田野或花园,双手沾着泥土,捧着刚收获的果实"],
];

// 同一条记录永远取同一种风格(与 demo图URL 缓存语义一致),不同人错开
function hashPick(seed: string, n: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % n;
}

// POV 视角:从 TA 自己的眼睛看出去,绝不出现 TA 的脸(我们不知道 TA 长什么样)
function buildImagePrompt(record: Record<string, unknown>, id: string): string {
  const identity = fieldText(record["身份"]).slice(0, 30);
  const direction = fieldText(record["意向方向"]).slice(0, 80);
  const archetype = fieldText(record["测评原型"]).slice(0, 40);
  const style = STYLES[hashPick(id + archetype, STYLES.length)];
  const hint = SCENE_HINTS.find(([re]) => re.test(direction + identity))?.[1];
  const scene = direction
    ? `与「${direction}」相关的工作或生活场景${hint ? `,${hint}` : ""}`
    : hint
      ? `TA 热爱的事业现场,${hint}`
      : "TA 热爱的事业现场,手边有正在完成的作品";
  return (
    `第一人称视角(POV)实景摄影:从主人公自己的双眼看出去,画面里只能出现主人公自己的双手、` +
    `手边的物件和眼前的环境。镜头里没有任何人物面孔——主人公在镜头后面,不在画面里。\n` +
    `场景:10 年后一个普通而美好的瞬间——${scene}。` +
    `主人公的身份气质:${identity || "正在转型的探索者"}${
      archetype ? `,性格底色是「${archetype}」` : ""
    }。可以有桌面、窗外的光、身边的环境细节。\n` +
    `氛围:电影感构图,自然景深。光线与色调:${style}。\n` +
    `硬性禁止:画面中不能出现任何人脸、人物正面或侧面面孔(包括远处路人);` +
    `不能出现任何文字、字母、数字、招牌字样、可读的屏幕内容、logo、水印;` +
    `如有屏幕只能是模糊的光斑。`
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
  // 只有已存成飞书永久素材（feishu:<token>）才算缓存命中；
  // 老记录里残留的 MiniMax OSS 链接（http，24h 过期）视为未缓存，走下面重新生成并迁移。
  if (fieldText(record["demo图URL"]).trim().startsWith("feishu:")) {
    return NextResponse.json({ ok: true, cached: true, url: `/api/mas-life/demo/img/${id}` });
  }
  try {
    // 1) MiniMax 出图（返回的 OSS 链接 24h 过期）
    const rawUrl = await generateImage(buildImagePrompt(record, id), "3:4");
    // 2) 立刻把字节下载下来，落进飞书云盘换永久 file_token——杜绝过期空图
    const imgRes = await fetch(rawUrl);
    if (!imgRes.ok) throw new Error(`下载生成图失败 ${imgRes.status}`);
    const bytes = await imgRes.arrayBuffer();
    // 第三参用默认 app_token（罗盘表与线索表同 base）；素材挂在该 base 下
    const fileToken = await uploadBitableMedia(bytes, `mindos-${id}.jpg`);
    await updateBitableRecord(id, { demo图URL: `feishu:${fileToken}` }, COMPASS_TABLE_ID);
    return NextResponse.json({ ok: true, url: `/api/mas-life/demo/img/${id}` });
  } catch (err) {
    console.error("[mas-life/demo/image] 生成失败：", err);
    return NextResponse.json(
      { ok: false, error: "画面生成失败，可刷新重试" },
      { status: 502 }
    );
  }
}
