// Server component — no "use client"
import { getSessionByProductKey, yuanFromFen } from "@/lib/catalog";
import { EnrollButton } from "./EnrollButton";

interface Props {
  productKey: string;
  locale?: string;
}

export default async function SessionEnrollBox({ productKey }: Props) {
  const session = await getSessionByProductKey(productKey);
  if (!session) return null;

  const price = yuanFromFen(session.priceFen);
  const isFull = session.remaining <= 0;

  // Format date: "2026-09-12" → "2026年9月12日"
  let dateLabel = session.startsOn ?? "";
  if (session.startsOn) {
    const [y, m, d] = session.startsOn.split("-");
    dateLabel = `${y}年${Number(m)}月${Number(d)}日`;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      {/* Session header badges */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/60">
          {session.name}
        </span>
        {dateLabel && (
          <span className="rounded-full border border-white/15 px-3 py-0.5 text-xs text-white/60">
            开营 {dateLabel}
          </span>
        )}
        <span
          className={`ml-auto rounded-full px-3 py-0.5 text-xs ${
            isFull
              ? "bg-red-500/20 text-red-300"
              : "bg-emerald-400/10 text-emerald-300"
          }`}
        >
          {isFull
            ? "已满"
            : `剩余 ${session.remaining} / ${session.capacity} 名额`}
        </span>
      </div>

      {/* Price row */}
      <div className="mb-5 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-amber-300">{price}</span>
        <span className="text-sm text-white/40">· {session.productTitle}</span>
      </div>

      {/* 报名支付 */}
      <EnrollButton
        sessionId={session.sessionId}
        name={session.name}
        priceYuan={price.replace(/^¥/, "")}
        soldOut={isFull}
        loginNext={`/courses/${session.productKey}`}
      />
    </div>
  );
}
