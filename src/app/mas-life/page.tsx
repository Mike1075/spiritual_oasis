import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Compass,
  Brain,
  Gauge,
  ShieldCheck,
  XCircle,
  CheckCircle2,
  Swords,
  Infinity as InfinityIcon,
  Cpu,
  Wallet,
  Calendar,
  Award,
  Quote,
  ExternalLink,
  PlayCircle,
} from "lucide-react";
import EnrollBar from "@/components/mas-life/EnrollBar";
import {
  MIDLIFE,
  PERSONAS,
  FACTORS,
  LAYERS,
  DAYS,
  EDGES,
  COMPARE,
  FAQ,
  TIMELINE,
  TIMELINE_STATS,
  CASES,
  FEATURED_TESTIMONIAL,
  XIAOE_COURSE_URL,
} from "@/data/masLife";

export const metadata: Metadata = {
  title: "MAS-Life OS — 给你装一个会帮你的系统 | 心灵家园",
  description:
    "不是一门 AI 课，是 28 天亲手给你装一套会教你想、陪你练、帮你造的活系统。AI 时代普通人改命的必修课。7/6 深圳夏令营 + 21 天陪跑。",
};

const FACTOR_ICONS = [Compass, Brain, Gauge];
const EDGE_ICONS = [Swords, InfinityIcon, Cpu];

// 简单的 **加粗** 渲染
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="text-white">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-emerald-400" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
        {children}
      </span>
    </div>
  );
}

export default function MasLifePage() {
  return (
    <div className="bg-black text-white">
      {/* ============ HERO ============ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/mas-life/hero-exoskeleton.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

        <div className="relative mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8">
          <span className="mb-6 inline-block rounded-full border border-purple-400/50 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-100 backdrop-blur-sm">
            MAS-Life OS · 一人公司操作系统
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
            这不是一门课，
            <br />
            是给你装一个
            <br />
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              会帮你的系统
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-gray-300">
            AI 时代最缺的不是技能，是意义和方向。28 天，亲手给你装一套
            <span className="text-white">教你怎么想、陪你动手练、帮你造出真东西</span>
            的活系统——装完，它住在你电脑里，你睡觉它也在跑。
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#enroll"
              className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-bold transition hover:scale-[1.02]"
            >
              查看夏令营 · 立即报名
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/gaokao"
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-gray-100 backdrop-blur-sm transition hover:bg-white/10"
            >
              <Sparkles className="h-5 w-5 text-emerald-300" />
              先免费做定位自测
            </Link>
          </div>

          {/* 信任数字条 */}
          <div className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              ["4 年", "真实时间线"],
              ["512 位", "累计 AI 学员"],
              ["60 天", "零基础上架 App*"],
              ["¥119/月", "成本封顶 · 真账"],
            ].map(([a, b]) => (
              <div key={b}>
                <div className="text-2xl font-extrabold text-white md:text-3xl">
                  {a}
                </div>
                <div className="mt-1 text-xs leading-snug text-gray-400">{b}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-600">
            *个例，不代表普遍结果。我们不承诺暴富。
          </p>
        </div>
      </section>

      {/* ============ 时代分水岭 ============ */}
      <section className="relative px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>
            <span className="mx-auto">为什么是现在</span>
          </Eyebrow>
          <h2 className="text-3xl font-bold leading-snug md:text-5xl">
            AI 正在
            <span className="text-emerald-400">重置所有人的起跑线</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            被替代的岗位 78% 是中低技能，而 AI 新创造的岗位 85% 要“技术 + 行业”复合能力。
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold leading-relaxed text-white">
            这不是“要不要学 AI”的问题——是这一轮分水岭，你站哪边。不会给 AI
            建底座的人，不是被 AI 淘汰，是被
            <span className="text-emerald-400">“会用 AI 的同行”</span>淘汰。
          </p>
          <p className="mx-auto mt-8 max-w-xl border-t border-white/10 pt-6 text-base italic text-gray-400">
            “电脑昨天升级了系统，你的大脑呢？”
          </p>
        </div>
      </section>

      {/* ============ 招生对象：画像 ============ */}
      <section className="border-t border-white/5 bg-gradient-to-b from-black via-gray-950 to-black px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <Eyebrow>
              <span className="mx-auto">你是不是其中之一</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">这门课，为谁而造</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              我们的学员，是有积累却被困住的“准超级个体”——不是想躺赢的小白。
            </p>
          </div>

          {/* 中年失业蓝本 — 大故事块 */}
          <div className="mb-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="grid md:grid-cols-2">
              <div
                className="relative min-h-[280px] bg-cover bg-center md:min-h-full"
                style={{ backgroundImage: `url(${MIDLIFE.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/60" />
                <span className="absolute left-5 top-5 rounded-full border border-emerald-400/60 bg-black/40 px-3 py-1 text-xs text-emerald-300 backdrop-blur-sm">
                  {MIDLIFE.tag}
                </span>
              </div>
              <div className="p-7 md:p-10">
                <h3 className="text-2xl font-bold leading-snug">{MIDLIFE.title}</h3>
                <p className="mt-1 text-sm text-gray-400">{MIDLIFE.age}</p>

                <div className="mt-5 space-y-3 border-l-2 border-white/10 pl-4">
                  {MIDLIFE.story.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-gray-300">
                      <Rich text={p} />
                    </p>
                  ))}
                </div>

                <div className="mt-5 flex gap-2 rounded-xl bg-emerald-400/10 p-4">
                  <Quote className="h-5 w-5 shrink-0 text-emerald-400" />
                  <p className="text-[15px] leading-relaxed text-emerald-50">
                    <Rich text={MIDLIFE.insight} />
                  </p>
                </div>
              </div>
            </div>

            {/* 三桥接：他的痛 → 课程对症 */}
            <div className="grid gap-px border-t border-white/10 bg-white/10 md:grid-cols-3">
              {MIDLIFE.bridge.map((b) => (
                <div key={b.t} className="bg-gray-950 p-6">
                  <div className="mb-2 text-sm font-bold text-emerald-300">{b.t}</div>
                  <p className="text-sm leading-relaxed text-gray-400">{b.d}</p>
                </div>
              ))}
            </div>
            <p className="border-t border-white/10 bg-black px-6 py-4 text-xs leading-relaxed text-gray-500">
              {MIDLIFE.honest}
            </p>
          </div>

          {/* 其他三类画像 */}
          <div className="grid gap-5 md:grid-cols-3">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-emerald-400/40"
              >
                <div
                  className="relative h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-xs text-purple-200 backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold leading-snug">
                    {p.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="mb-4 text-[15px] font-medium italic leading-relaxed text-gray-200">
                    “{p.oneLine}”
                  </p>
                  <ul className="mb-4 space-y-1.5">
                    {p.pains.map((pain) => (
                      <li key={pain} className="flex gap-2 text-sm text-gray-400">
                        <span className="text-rose-400/70">·</span>
                        {pain}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg border-l-2 border-emerald-400 bg-emerald-400/5 p-3 text-sm leading-relaxed text-emerald-50/90">
                    {p.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 这是什么：硅基外骨骼 + 三层 ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>它到底是什么</Eyebrow>
              <h2 className="text-3xl font-bold leading-snug md:text-5xl">
                一套会
                <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  教你想、陪你练、帮你造
                </span>
                的活系统
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-300">
                不是录播课，不是又一个聊天助手。它是装在你电脑里的“硅基外骨骼”：
                7 张人生数据库 + 一个主动找你的机器人 + 一套会蒸馏你的技能。
              </p>
              <Link
                href="/gaokao"
                className="mt-7 inline-flex items-center gap-2 text-emerald-300 transition hover:gap-3"
              >
                先做个 3 分钟定位自测，看清你的方向
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div
              className="aspect-square rounded-3xl border border-white/10 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/mas-life/system-render.jpg)" }}
            />
          </div>

          {/* 三层 */}
          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {LAYERS.map((l) => (
              <div
                key={l.n}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-7"
              >
                <div className="mb-4 text-4xl font-black text-white/15">{l.n}</div>
                <h3 className="text-xl font-bold">{l.title}</h3>
                <div className="mb-3 text-sm text-purple-300">{l.sub}</div>
                <p className="text-sm leading-relaxed text-gray-300">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 课程体系：三因子 + 7天 ============ */}
      <section className="border-t border-white/5 bg-gradient-to-b from-black via-gray-950 to-black px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <Eyebrow>
              <span className="mx-auto">领先时代的课程体系</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">普通人改命的方法论</h2>
            <p className="mt-4 text-lg text-gray-300">
              人生智慧 <span className="text-purple-400">×</span> 行业技能{" "}
              <span className="text-purple-400">×</span> 产出效率
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FACTORS.map((f, i) => {
              const Icon = FACTOR_ICONS[i];
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-emerald-400 font-bold">
                      {i + 1}
                    </span>
                    <Icon className="h-6 w-6 text-emerald-300" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* 7 天 timeline */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-bold text-gray-200">
              7 天，把这套从零搭起来
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DAYS.map((d) => (
                <div
                  key={d.d}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="mb-1 font-mono text-sm font-bold text-emerald-400">
                    {d.d}
                  </div>
                  <div className="mb-2 font-semibold">{d.t}</div>
                  <p className="text-sm leading-relaxed text-gray-400">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 三大领先设计 ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <Eyebrow>别家给不了的三件事</Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">
              为什么说它“领先这个时代”
            </h2>
          </div>
          <div className="space-y-5">
            {EDGES.map((e, i) => {
              const Icon = EDGE_ICONS[i];
              return (
                <div
                  key={e.title}
                  className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent p-7 md:flex-row md:items-center md:p-9"
                >
                  <div className="flex shrink-0 items-center gap-4 md:w-72">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-emerald-400/30 ring-1 ring-white/10">
                      <Icon className="h-7 w-7 text-emerald-300" />
                    </span>
                    <h3 className="text-xl font-bold leading-snug">{e.title}</h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-gray-300">{e.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 差异化对比 ============ */}
      <section className="border-t border-white/5 bg-gradient-to-b from-black via-gray-950 to-black px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <Eyebrow>
              <span className="mx-auto">一页说清 我们 vs 所有人</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">独特性，藏不住</h2>
          </div>

          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
           <div className="min-w-[680px] overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-4 bg-white/[0.04] text-sm font-semibold">
              <div className="p-4 text-gray-400" />
              {COMPARE.cols.map((c, i) => (
                <div
                  key={c}
                  className={`p-4 text-center ${
                    i === 2 ? "bg-emerald-400/10 text-emerald-300" : "text-gray-300"
                  }`}
                >
                  {c}
                </div>
              ))}
            </div>
            {COMPARE.rows.map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-4 border-t border-white/10 text-sm"
              >
                <div className="bg-white/[0.02] p-4 font-medium text-gray-300">
                  {row.k}
                </div>
                {row.v.map((v, i) => (
                  <div
                    key={i}
                    className={`p-4 leading-snug ${
                      i === 2
                        ? "bg-emerald-400/[0.07] font-medium text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {v}
                  </div>
                ))}
              </div>
            ))}
           </div>
          </div>
          <p className="mt-5 text-center text-sm text-gray-500">
            在低信任的市场里，<b className="text-gray-300">诚实就是第一生产力</b>
            ——我们最大的武器，是别人造不出的：4 年时间线 + 实名战果 + 真机验证。
          </p>
        </div>
      </section>

      {/* ============ 我们的来时路（时间线） ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <Eyebrow>
              <span className="mx-auto">凭什么信我们</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">我们的来时路</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              判断一家机构有没有实力，先看它“什么时候开始做的”。把我们这几年的动作摆在 AI 的时间线上——你就明白什么叫踩在时代前面。
            </p>
          </div>

          {/* 数字条 */}
          <div className="mb-14 grid grid-cols-2 gap-x-6 gap-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-7 sm:grid-cols-4">
            {TIMELINE_STATS.map(([a, b]) => (
              <div key={b} className="text-center">
                <div className="bg-gradient-to-r from-purple-300 to-emerald-300 bg-clip-text text-2xl font-extrabold text-transparent md:text-3xl">
                  {a}
                </div>
                <div className="mt-1 text-xs leading-snug text-gray-400">{b}</div>
              </div>
            ))}
          </div>

          {/* 时间线 */}
          <div className="relative ml-3 border-l border-white/15 pl-8 sm:ml-6 sm:pl-10">
            {TIMELINE.map((t) => (
              <div key={t.year} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[37px] top-1 flex h-5 w-5 items-center justify-center sm:-left-[47px]">
                  <span className="h-3 w-3 rounded-full bg-gradient-to-br from-purple-400 to-emerald-400 ring-4 ring-black" />
                </span>
                <div className="mb-1 font-mono text-xl font-extrabold text-emerald-400">
                  {t.year}
                </div>
                <h3 className="mb-2 text-lg font-bold">{t.title}</h3>
                <p className="max-w-2xl text-[15px] leading-relaxed text-gray-300">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 学员实录墙 ============ */}
      <section className="border-t border-white/5 bg-gradient-to-b from-black via-gray-950 to-black px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <Eyebrow>
              <span className="mx-auto">真名 · 真人 · 真作品</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-5xl">学员实录墙</h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              他们的起点，大概率比你想象的还低。每个故事都来自我们公众号的学员自述，可点「阅读原文」核实。
            </p>
          </div>

          {/* 最新 · 直播对谈 featured */}
          <div className="mb-10 overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10">
            <div className="grid md:grid-cols-5">
              <div className="flex flex-col justify-center gap-4 p-8 md:col-span-3 md:p-10">
                <span className="w-fit rounded-full border border-emerald-400/60 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  {FEATURED_TESTIMONIAL.badge}
                </span>
                <div className="flex gap-3">
                  <Quote className="h-8 w-8 shrink-0 text-emerald-400/70" />
                  <p className="text-xl font-semibold leading-relaxed text-white md:text-2xl">
                    {FEATURED_TESTIMONIAL.quote}
                  </p>
                </div>
                <ul className="space-y-2 border-l-2 border-white/10 pl-4">
                  {FEATURED_TESTIMONIAL.points.map((p, i) => (
                    <li key={i} className="text-[15px] leading-relaxed text-gray-300">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-1">
                  <div className="font-bold text-white">{FEATURED_TESTIMONIAL.name}</div>
                  <div className="text-sm text-gray-400">
                    {FEATURED_TESTIMONIAL.role}
                  </div>
                </div>
              </div>
              <a
                href={FEATURED_TESTIMONIAL.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[200px] items-center justify-center bg-gradient-to-br from-purple-700/40 to-emerald-700/30 p-8 md:col-span-2"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <PlayCircle className="h-16 w-16 text-white transition group-hover:scale-110" />
                  <span className="text-sm font-medium text-white">
                    {FEATURED_TESTIMONIAL.videoNote}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CASES.map((c) => (
              <a
                key={c.id}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-emerald-400/40 hover:bg-white/[0.05]"
              >
                {/* 公众号原文真实封面 */}
                <div
                  className="relative h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/mas-life/cases/${c.id}.jpg)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 text-lg font-bold text-white">{c.name}</div>
                  <div className="mb-4 text-xs leading-snug text-purple-300">
                    {c.role}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    {c.built}
                  </p>
                  <div className="mt-auto rounded-lg border-l-2 border-emerald-400 bg-emerald-400/[0.07] p-3 text-sm leading-relaxed text-emerald-50">
                    {c.result}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-sky-300 transition group-hover:gap-2.5">
                    阅读原文（公众号「爱学 AI 教育」）
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-gray-600">
            以上均为学员真实自述、个例呈现，不代表普遍结果；我们不承诺任何收入或融资结果。部分学员应本人意愿匿名。
          </p>
        </div>
      </section>

      {/* ============ 成本诚实 ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <Eyebrow>诚实的一笔账</Eyebrow>
          <h2 className="text-3xl font-bold leading-snug md:text-4xl">
            一顿饭钱，养一个 7×24 替你干活的数字员工
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-emerald-400/10 p-6">
              <Wallet className="mb-3 h-7 w-7 text-emerald-400" />
              <div className="text-3xl font-extrabold text-emerald-300">约 ¥119/月</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-300">
                云端主力包月封顶（不到 $20），给你 18 亿 token/月 + 永远用最新模型。不是“几乎不要钱”，是给你真账。
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-6">
              <div className="mb-3 text-sm text-gray-500">对比：囤一台本地 AI 主机</div>
              <div className="text-3xl font-extrabold text-gray-400 line-through decoration-rose-400/60">
                ¥20000+
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                ≈ 包月跑近 20 年。硬件还在掉价、还得自己运维。先用包月把进化循环转起来，远比押注一台两年后才到手的机器划算。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 谁适合 / 不适合 ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-7">
            <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-400" />
            <h3 className="mb-4 text-xl font-bold">适合你，如果——</h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-gray-200">
              <li>· 被困住了，但心里还有劲</li>
              <li>· 想自己做主方向，不想被替代</li>
              <li>· 愿意 28 天真做出一个东西</li>
              <li>· 有积累的“准超级个体”，不是想躺赢的小白</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] p-7">
            <XCircle className="mb-3 h-8 w-8 text-rose-400" />
            <h3 className="mb-4 text-xl font-bold">不适合你，如果——</h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-gray-400">
              <li>· 想躺赢、找暴富捷径</li>
              <li>· 只想买课收藏、不愿动手</li>
              <li>· 期待全自动永动机、不愿每周喂它一次</li>
            </ul>
            <p className="mt-5 text-xs text-gray-500">
              哈佛不会为没动力的学生改大纲。我们不降门槛——这是为你好。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 报名 Offer ============ */}
      <section
        id="enroll"
        className="scroll-mt-16 border-t border-white/5 bg-gradient-to-b from-gray-950 to-black px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-emerald-500/10 p-8 md:p-12">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-purple-300/50 px-3 py-1 text-xs text-purple-100">
                2026 暑期 · 深圳线下夏令营
              </span>
              <span className="rounded-full border border-rose-400/50 bg-rose-500/10 px-3 py-1 text-xs text-rose-200">
                仅 30 个名额 · 6/18 涨价
              </span>
            </div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              把自己升级成「一人公司」
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Spec icon={Calendar} title="时间地点">
                7/6–7/12 深圳线下 + 21 天线上陪跑
              </Spec>
              <Spec icon={Wallet} title="价格 · 早鸟">
                <b className="text-emerald-300">早鸟 4980</b>（6/18 前）· 之后 6980
              </Spec>
              <Spec icon={Award} title="折扣">
                应届高考生 8 折 · 老学员 7.5 折（需核验）
              </Spec>
              <Spec icon={ShieldCheck} title="风险逆转">
                第一天学不会，<b className="text-emerald-300">100% 全额退款</b>
              </Spec>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-relaxed text-gray-300">
              <b className="text-white">你会带走：</b>
              一套真在跑的「硅基外骨骼」+ 你的方向卡 + 你的第一个真产品 + 一块诚实仪表盘 +
              21 天陪跑。
              <span className="mt-2 block text-gray-500">
                深圳场最多 50 人，仅放 <b className="text-white">30 个名额</b>，线下小班，先到先得。
              </span>
            </div>

            <a
              href={XIAOE_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
            >
              立即报名 · 小鹅通购买
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/gaokao"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 py-3.5 text-base font-semibold text-gray-200 transition hover:bg-white/5"
            >
              <Sparkles className="h-4 w-4 text-emerald-300" />
              还在犹豫？先免费做 AI 时代定位自测
            </Link>
            <p className="mt-3 text-center text-xs text-gray-400">
              点「立即报名」直达小鹅通购买；学生 8 折 / 老学员 7.5 折请联系客服核验。
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-white/5 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <Eyebrow>
              <span className="mx-auto">把话说清楚</span>
            </Eyebrow>
            <h2 className="text-3xl font-bold md:text-4xl">常见问题</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-gray-100 marker:content-['']">
                  {f.q}
                  <span className="ml-4 text-emerald-400 transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="border-t border-white/5 px-5 pb-32 pt-24 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-snug md:text-5xl">
            工作留给 AI，
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              生活留给自己
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            一门课会过期，一个会自己变强的系统不会。门开着的时间不长。
          </p>
          <Link
            href="/gaokao"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 px-9 py-4 text-lg font-bold transition hover:scale-[1.02]"
          >
            开始：3 分钟定位自测
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mx-auto mt-12 max-w-xl text-xs leading-relaxed text-gray-600">
            诚实声明：我们不承诺任何升学或收入结果，所有学员成果均为个例、不代表普遍结果。系统为“自我进化 +
            每周维护一次”，非全自动；成本约 ¥119/月真账。报名以最终课程协议为准。
          </p>
        </div>
      </section>

      <EnrollBar />
    </div>
  );
}

function Spec({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-5">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-purple-200">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <p className="text-[15px] leading-relaxed text-gray-200">{children}</p>
    </div>
  );
}
