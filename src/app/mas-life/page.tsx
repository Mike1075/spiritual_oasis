import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Compass,
  Database,
  Factory,
  Gauge,
  ShieldCheck,
  Sparkles,
  XCircle,
  Calendar,
  Wallet,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "MAS-Life OS — 给你装一个会帮你的系统 | 心灵家园",
  description:
    "这不是一门课，是给你装一套真在替你跑的“一人公司操作系统”：看清方向 + 装一套系统 + 做出一个真东西。7/6–7/12 深圳夏令营 + 21 天线上陪跑。",
};

// 三因子
const FACTORS = [
  {
    icon: Compass,
    title: "人生智慧",
    desc: "看清往哪走、避哪些坑、每天做对一件事。AI 时代最缺的不是技能，是方向和意义。",
  },
  {
    icon: Brain,
    title: "行业技能",
    desc: "把你那一行的经验，变成 AI 能替你重复干的本事——不是从零学编程，是放大你已有的积累。",
  },
  {
    icon: Gauge,
    title: "产出效率",
    desc: "每天真做出看得见的东西。不停在 PPT 和收藏夹里，把想法落成作品。",
  },
];

// 系统三件套
const SYSTEM = [
  {
    icon: Database,
    title: "7 张飞书多维表格",
    sub: "你的「人生数据库」",
    desc: "人设 / MIT / 复盘 / 收获 / 技能 / 方向 / 工作流——你的目标、手艺和进展，结构化沉淀成数据。",
  },
  {
    icon: Bot,
    title: "一个飞书机器人",
    sub: "你的前端入口",
    desc: "在飞书发一条指令，它读写那 7 张表、定时主动找你开局、晚上帮你锁定明天最重要的一件事。",
  },
  {
    icon: Factory,
    title: "6 个可复用技能",
    sub: "让系统会干活",
    desc: "建人设 / 锁 MIT / 晨间开局 / 蒸馏你的手艺 / 一键装市场技能 / 接卡片回调——把「你」蒸馏进 AI。",
  },
];

// 7 天工作流
const DAYS = [
  { d: "Day 0", t: "装地基", desc: "模型路由 + 飞书闭环跑通，环境就绪。" },
  { d: "Day 1", t: "建人设", desc: "7 表绑定 + 三层提示词，建出你的数字人设。" },
  { d: "Day 2", t: "对抗式预死亡", desc: "让系统多角色把你的计划往死里挑毛病，提前看清怎么死、怎么防。" },
  { d: "Day 3", t: "每日系统", desc: "晚锁 MIT、晨间主动开局、飞书卡片确认，日常自动跑起来。" },
  { d: "Day 4", t: "技能蒸馏", desc: "把你的手艺蒸馏成技能并一键装进市场，系统自己加固。" },
  { d: "Day 5–6", t: "做出真东西", desc: "用系统驱动，亲手做出你的第一个真产品。" },
  { d: "Day 7", t: "交付与方向卡", desc: "带走一套在跑的系统 + 你的方向卡 + 第一个作品。" },
];

// 诚实护城河
const HONEST = [
  "不承诺暴富、不卖 prompt 速成；学员成果一律标注「个例，不代表普遍结果」。",
  "成本给真账：约 ¥119/月，不是「几乎不要钱」。",
  "不是全自动永动机：系统自我进化 + 你每周喂它一次。",
  "4 年沉淀、5 期、两百多篇实名案例，真名真人、真机验证。",
];

export default function MasLifePage() {
  return (
    <div className="bg-black text-white">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden px-5 pb-20 pt-28 md:pt-36">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 top-40 h-[320px] w-[320px] rounded-full bg-emerald-500/15 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-5 inline-block rounded-full border border-purple-400/50 px-4 py-1.5 text-sm text-purple-200">
            MAS-Life OS · 一人公司操作系统
          </span>
          <h1 className="mb-5 text-4xl font-extrabold leading-tight md:text-6xl">
            这不是一门课，
            <br />
            是给你装一个
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              会帮你的系统
            </span>
          </h1>
          <p className="mx-auto mb-9 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            AI 时代最缺的不是技能，是意义和方向。我们不教你用某个 AI——
            我们带你看清方向、装一套真在替你跑的系统、做出一个属于你的真东西。
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#camp"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-7 py-4 text-lg font-bold transition active:scale-[0.99] sm:w-auto"
            >
              查看 7 月深圳夏令营
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/gaokao"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/60 px-7 py-4 text-lg font-semibold text-emerald-300 transition hover:bg-emerald-400/10 sm:w-auto"
            >
              <Sparkles className="h-5 w-5" />
              免费做 AI 时代定位自测
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 痛点 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            高考是 18 岁那年，别人替你画好的赛道
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            可人生真正的分水岭是现在——AI 正在重置所有人的起跑线。
            <br />
            这一次没有标准答案、没有老师划重点，
            <span className="text-white">谁先看清方向谁赢。</span>
          </p>
          <p className="mt-6 text-base leading-relaxed text-gray-400">
            你有积累，却被困在系统里：白天被榨干、副业停在 PPT、
            看着同龄人用 AI 弯道超车而焦虑。你为孩子的志愿、方向焦虑了三天——
            <span className="text-emerald-300">你自己的方向，多久没认真想过了？</span>
          </p>
        </div>
      </section>

      {/* ===== 这是什么 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              你会带走一套「硅基外骨骼」
            </h2>
            <p className="text-gray-400">
              不是一堆课程录播，是一套真在跑的、属于你自己的操作系统。
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SYSTEM.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-6"
              >
                <s.icon className="mb-4 h-9 w-9 text-emerald-400" />
                <h3 className="text-lg font-bold">{s.title}</h3>
                <div className="mb-3 text-sm text-purple-300">{s.sub}</div>
                <p className="text-sm leading-relaxed text-gray-300">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 方法论：三因子 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              普通人改命的方法论
            </h2>
            <p className="text-lg text-gray-300">
              人生智慧 <span className="text-purple-400">×</span> 行业技能{" "}
              <span className="text-purple-400">×</span> 产出效率
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {FACTORS.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 font-bold">
                    {i + 1}
                  </span>
                  <f.icon className="h-6 w-6 text-emerald-300" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-gray-400">
            三层交付：地板降到 0（零基础也能上手），天花板做出真东西（真有作品）。
          </p>
        </div>
      </section>

      {/* ===== 7 天工作流 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            7 天，把这套从零搭起来
          </h2>
          <div className="space-y-4">
            {DAYS.map((d) => (
              <div
                key={d.d}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="w-20 shrink-0 font-bold text-emerald-400">
                  {d.d}
                </div>
                <div>
                  <div className="font-semibold">{d.t}</div>
                  <p className="mt-1 text-sm leading-relaxed text-gray-400">
                    {d.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 诚实护城河 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
            <h2 className="text-3xl font-bold md:text-4xl">
              我们的护城河，是「诚实」
            </h2>
            <p className="mt-3 text-gray-400">
              市场全是月入过万、割韭菜。我们偏要给你看真的，也给你划清边界。
            </p>
          </div>
          <ul className="space-y-3">
            {HONEST.map((h) => (
              <li
                key={h}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-gray-200"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border-l-2 border-emerald-400 bg-emerald-400/10 px-5 py-4 text-sm leading-relaxed text-emerald-50">
            最近一期，带零基础的同学
            <b> 60 天做出一个上架苹果商店的 App</b>，大部分人都完成了。
            <span className="text-emerald-200/80">（个例，不代表普遍结果）</span>
          </div>
        </div>
      </section>

      {/* ===== 夏令营 Offer ===== */}
      <section id="camp" className="scroll-mt-20 border-t border-white/5 px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-600/15 via-fuchsia-600/10 to-emerald-500/10 p-8 md:p-10">
            <span className="mb-4 inline-block rounded-full border border-purple-300/50 px-3 py-1 text-xs text-purple-200">
              2026 暑期 · 深圳线下夏令营
            </span>
            <h2 className="mb-6 text-3xl font-extrabold md:text-4xl">
              AI 时代，把自己升级成「一人公司」
            </h2>

            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <Spec icon={Calendar} title="时间地点">
                7/6–7/12 深圳线下
                <br />+ 21 天线上陪跑
              </Spec>
              <Spec icon={Wallet} title="价格">
                <b className="text-emerald-300">早鸟 4980</b>（6/18 前）
                <br />
                之后恢复 6980
              </Spec>
              <Spec icon={Award} title="学生价">
                应届高考毕业生
                <br />
                <b className="text-emerald-300">额外 8 折</b>（需核验身份）
              </Spec>
              <Spec icon={ShieldCheck} title="风险逆转">
                第一天听不懂、学不会
                <br />
                <b className="text-emerald-300">100% 全额退款</b>
              </Spec>
            </div>

            <div className="mb-8 rounded-xl border border-white/10 bg-black/20 p-5 text-sm leading-relaxed text-gray-300">
              <b className="text-white">你会带走：</b>
              一套真在跑的「硅基外骨骼 / 一人公司操作系统」 + 你的方向卡 +
              你的第一个真产品 + 21 天陪跑。
              <br />
              <span className="mt-2 inline-block text-gray-400">
                深圳场最多 50 人，仅放 <b className="text-white">30 个名额</b>
                ，线下小班，先到先得。
              </span>
            </div>

            <Link
              href="/gaokao"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
            >
              做个定位自测，领名额信息
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-3 text-center text-xs text-gray-400">
              先免费看清自己的 AI 时代方向，再决定要不要上车。
            </p>
          </div>
        </div>
      </section>

      {/* ===== 谁适合 / 不适合 ===== */}
      <section className="border-t border-white/5 px-5 py-20">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.06] p-6">
            <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-400" />
            <h3 className="mb-3 text-lg font-bold">适合你，如果——</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
              <li>· 被困住了，但心里还有劲</li>
              <li>· 想自己做主方向，不想被替代</li>
              <li>· 愿意 28 天真做出一个东西</li>
              <li>· 有积累的「准超级个体」，不是想躺赢的小白</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] p-6">
            <XCircle className="mb-3 h-8 w-8 text-rose-400" />
            <h3 className="mb-3 text-lg font-bold">不适合你，如果——</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-400">
              <li>· 想躺赢、找暴富捷径</li>
              <li>· 只想买课收藏、不愿动手</li>
              <li>· 期待全自动永动机、不愿每周喂它一次</li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              哈佛不会为没动力的学生改大纲。我们不降门槛——这是为你好。
            </p>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="border-t border-white/5 px-5 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-5 text-3xl font-bold md:text-4xl">
            18 岁那年的方向，别人替你选了。
            <br />
            这一次，你要不要自己做主？
          </h2>
          <p className="mb-8 text-gray-400">
            门开着的时间不长。先花 3 分钟，看清你的 AI 时代方向。
          </p>
          <Link
            href="/gaokao"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-400 px-8 py-4 text-lg font-bold transition active:scale-[0.99]"
          >
            开始 AI 时代定位自测
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-gray-500">
            诚实声明：我们不承诺任何升学或收入结果，所有学员成果均为个例、不代表普遍结果。
            成本约 ¥119/月真账，系统需你每周维护一次。报名以最终课程协议为准。
          </p>
        </div>
      </section>
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
