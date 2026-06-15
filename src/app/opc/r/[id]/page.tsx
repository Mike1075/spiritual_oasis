// OPC 一人公司适配测评 — 报告分享页（克隆自 compass/r/[id]）
// 服务端读取飞书记录，仅展示已解锁报告。
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { getBitableRecord } from "@/lib/feishu";
import { OPC_TABLE_ID } from "../../../api/opc/tableId";
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

export default async function OpcReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safeId = /^rec[A-Za-z0-9]+$/.test(id) ? id : "";
  const record = safeId ? await getBitableRecord(safeId, OPC_TABLE_ID) : null;
  const unlocked = record && fieldText(record["解锁"]) === "已解锁";
  const report = unlocked ? fieldText(record["报告"]) : "";
  const name = unlocked ? fieldText(record["姓名"]) : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <div className="h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        <Link
          href="/opc"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-xs font-bold">
            SO
          </span>
          心灵家园 · OPC 一人公司适配测评
        </Link>

        {report ? (
          <>
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/50 px-3 py-1 text-xs text-emerald-300">
              <Building2 className="h-3.5 w-3.5" />
              {name && name !== "（未填）" ? `${name} 的` : ""}OPC 适配报告
            </span>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Markdown text={report} />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              本报告由本人测评现场生成，是思考工具而非专业建议；所涉补贴/税率/门槛均为示例，以官方最新政策为准。
            </p>
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
          href="/opc"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
        >
          我也要测：我这门生意该不该开公司
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
