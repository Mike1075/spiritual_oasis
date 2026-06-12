// 「10 年后」公开分享页:只展示称呼 + 故事(+ POV 图),绝不展示手机号,无需登录
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getBitableRecord, COMPASS_TABLE_ID } from "@/lib/feishu";
import { fieldText, isPlaceholderName } from "@/lib/demo";
import DreamcoreBg from "@/components/mas-life/Dreamcore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "TA 的 10 年后 · 心灵家园",
  description: "一封来自 10 年后的信。AI 畅想，仅供娱乐，不构成对未来的预测。",
};

export default async function DemoSharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const safeId = /^rec[A-Za-z0-9]+$/.test(id) ? id : "";
  const record = safeId ? await getBitableRecord(safeId, COMPASS_TABLE_ID) : null;
  const story = record ? fieldText(record["demo故事"]).trim() : "";
  const savedName = record ? fieldText(record["姓名"]).trim() : "";
  const name = isPlaceholderName(savedName) ? "朋友" : savedName;
  const hasImage = Boolean(record && fieldText(record["demo图URL"]).trim());
  const paragraphs = story.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07040f] text-white">
      <DreamcoreBg />
      <div className="relative z-10 mx-auto w-full max-w-xl px-5 pb-16 pt-10">
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fuchsia-300/80">
          <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
          MAS · 时光机
        </div>

        {story ? (
          <>
            {hasImage && (
              <div className="mb-5 overflow-hidden rounded-3xl border border-fuchsia-400/25">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/mas-life/demo/img/${safeId}`}
                  alt="10 年后,从 TA 眼睛看出去的一个瞬间"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            )}
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
              <h1 className="text-xl font-bold leading-snug">
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent">
                  来自 10 年后的一封信 · 致 {name}
                </span>
              </h1>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.9] text-white/80">
                {paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-center">
            <h1 className="text-xl font-bold">这份「10 年后」还没生成</h1>
            <p className="mt-2 text-sm text-white/55">
              链接可能有误，或故事还在路上。
            </p>
          </div>
        )}

        <Link
          href="/mas-life/demo"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-base font-bold shadow-[0_0_30px_rgba(217,70,239,0.3)] transition hover:opacity-90"
        >
          <Sparkles className="h-5 w-5" />
          看看你的 10 年后
          <ArrowRight className="h-5 w-5" />
        </Link>

        <p className="mt-8 text-center text-xs leading-relaxed text-white/35">
          本页面内容为 AI 畅想，仅供娱乐，不构成对未来的预测。
        </p>
      </div>
    </main>
  );
}
