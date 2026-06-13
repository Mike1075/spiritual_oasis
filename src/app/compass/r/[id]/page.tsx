// AI 定位罗盘 — 报告分享页（服务端读取飞书记录，仅展示已解锁报告）
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { getBitableRecord, COMPASS_TABLE_ID } from "@/lib/feishu";
import Markdown from "@/components/compass/Markdown";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fieldText(v: unknown): string {
  // 飞书文本字段可能返回 string 或 [{text}] 富文本段数组
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v
      .map((seg) =>
        typeof seg === "object" && seg && "text" in seg
          ? String((seg as { text: unknown }).text)
          : ""
      )
      .join("");
  }
  return "";
}

export default async function CompassReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safeId = /^rec[A-Za-z0-9]+$/.test(id) ? id : "";
  const record = safeId
    ? await getBitableRecord(safeId, COMPASS_TABLE_ID)
    : null;
  const unlocked = record && fieldText(record["解锁"]) === "已解锁";
  const report = unlocked ? fieldText(record["报告"]) : "";
  const name = unlocked ? fieldText(record["姓名"]) : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        <Link
          href="/compass"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 text-xs font-bold">
            SO
          </span>
          心灵家园 · AI 定位罗盘
        </Link>

        {report ? (
          <>
            <div className="relative mb-5 overflow-hidden rounded-2xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/compass/hero.jpg"
                alt="AI 定位罗盘"
                className="aspect-[21/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/50 px-3 py-1 text-xs text-emerald-300 backdrop-blur">
                <Compass className="h-3.5 w-3.5" />
                {name && name !== "（未填）" ? `${name} 的` : ""}AI 定位报告
              </span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Markdown text={report} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              本报告由 AI 根据本人回答现场生成，是思考工具而非专业建议；标注（需核实）的数字请自行验证。
            </p>

            {/* 彩蛋入口:报告主人凭测评时的手机号+称呼进时光机 */}
            <Link
              href="/mas-life/demo"
              className="mt-6 block rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/15 to-pink-500/10 p-5 transition hover:border-fuchsia-300/60 active:scale-[0.99]"
            >
              <div className="mb-1 text-lg font-bold">✨ 彩蛋：看见 10 年后的你</div>
              <p className="text-sm leading-relaxed text-gray-300">
                做过测评就能进时光机——AI 写一封来自 10 年后的信，再画一张未来某个瞬间。凭测评时的手机号进入。
              </p>
            </Link>
          </>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h1 className="mb-2 text-xl font-bold">报告不存在或未解锁</h1>
            <p className="text-sm text-gray-400">
              链接可能有误，或这份报告尚未保存。
            </p>
          </div>
        )}

        <Link
          href="/compass"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
        >
          我也要测：AI 时代我的位置在哪
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
