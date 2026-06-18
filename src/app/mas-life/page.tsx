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
  Wallet,
  Calendar,
  Award,
  Quote,
  ExternalLink,
  PlayCircle,
  Users,
  Tag,
  GraduationCap,
} from "lucide-react";
import EnrollBar from "@/components/mas-life/EnrollBar";
import AssistantWidget from "@/components/assistant/AssistantWidget";
import { osDisplay, osMono } from "@/lib/masosFonts";
import {
  MIDLIFE,
  PERSONAS,
  FACTORS,
  DAYS,
  FAQ,
  CASES,
  FEATURED_TESTIMONIAL,
  XIAOE_COURSE_URL,
} from "@/data/masLife";

export const metadata: Metadata = {
  title: "MAS-Life OS — 给你装一个会帮你的系统 | 心灵家园",
  description:
    "不是一门 AI 课，是 28 天亲手给你装一套会教你想、陪你练、帮你造的活系统。AI 时代普通人改命的必修课。深圳/北京/上海线下 + 线上全球同价，学费 6980，3 人拼团 8 折。",
};

const FACTOR_ICONS = [Compass, Brain, Gauge];

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

export default function MasLifePage() {
  return (
    <div className={`${osDisplay.variable} ${osMono.variable} masos`}>
      <AssistantWidget />
      {/* ============ HERO · 开机控制台 ============ */}
      <section className="relative overflow-hidden">
        {/* 机身底纹：发丝网格 + 通电辉光 */}
        <div className="os-grid absolute inset-0 opacity-[0.45]" />
        <div className="os-glow-you absolute -top-32 left-1/4 h-[640px] w-[640px]" />
        <div className="os-glow-sys absolute -right-40 top-40 h-[520px] w-[520px]" />

        {/* 顶部系统状态条 */}
        <div className="relative border-b border-[color:var(--os-line)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
            <span className="os-mono text-[11px] tracking-[0.16em] text-[color:var(--os-dim)]">
              MAS-LIFE OS · v2026.06 · 28 天装机周期
            </span>
            <span className="os-mono flex items-center gap-2 text-[11px] tracking-[0.16em] text-[color:var(--os-sys)]">
              <span className="os-dot" /> 系统在线
            </span>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24">
          {/* 左：主张 */}
          <div className="os-reveal">
            <div className="os-label mb-6">
              <span className="text-[color:var(--os-you)]">
                [ 一人公司操作系统 · 认证交付网络 ]
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight md:text-6xl">
              普通人跨入 AI 行业的
              <br />
              <span className="text-[color:var(--os-you)]">唯一入口</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--os-dim)] md:text-lg">
              这不是一门课。28 天，你带走的不是知识，是三样能跟你一辈子的东西：
            </p>

            {/* 三样东西 */}
            <ul className="mt-5 space-y-3">
              {[
                ["sys", "一套永远属于你、断网也能跑、永不被封的 AI 系统"],
                ["you", "一个「认证 AI 应用架构师」的新职业身份"],
                ["you", "一张接单变现的交付网络席位"],
              ].map(([tone, text], i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="os-mono mt-1 text-sm font-bold"
                    style={{
                      color:
                        tone === "you"
                          ? "var(--os-you)"
                          : "var(--os-sys)",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span className="text-[15px] leading-snug text-[color:var(--os-text)] md:text-base">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#enroll"
                className="os-btn os-btn-you group px-7 py-4 text-base"
              >
                查看报名方案 · <span className="os-mono font-bold">¥6980</span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#proof" className="os-btn os-btn-ghost px-7 py-4 text-base">
                <Sparkles className="h-5 w-5 text-[color:var(--os-sys)]" />
                看我们怎么 8 天招满 160 人
              </Link>
            </div>
            <Link
              href="/gaokao"
              className="os-mono mt-4 inline-flex items-center gap-1.5 text-xs text-[color:var(--os-dim)] underline-offset-4 hover:text-[color:var(--os-sys)] hover:underline"
            >
              还在犹豫？先免费做一次 AI 定位自测 →
            </Link>
          </div>

          {/* 右：签名元素 —— 诚实仪表盘（活控制台） */}
          <div className="os-reveal os-panel os-panel--live overflow-hidden" style={{ animationDelay: "0.12s" }}>
            <div className="flex items-center justify-between border-b border-[color:var(--os-line)] px-5 py-3">
              <span className="os-mono text-[11px] tracking-[0.14em] text-[color:var(--os-dim)]">
                诚实仪表盘 / honest-dashboard
              </span>
              <span className="os-mono flex items-center gap-1.5 text-[11px] text-[color:var(--os-sys)]">
                <span className="os-dot" /> live
              </span>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <div className="os-label os-label--you">今天最重要的事</div>
                <div className="mt-1.5 flex items-center gap-2 text-lg font-semibold">
                  <span className="text-[color:var(--os-you)]">→</span>
                  写出你的赛道一页纸
                </div>
              </div>

              <div className="os-rule" />

              <div>
                <div className="os-label">昨夜系统替你跑</div>
                <div className="os-mono mt-1.5 text-sm text-[color:var(--os-text)]">
                  3 个任务 · 生成 12 段文案 · 自检 2 轮
                </div>
              </div>

              <div className="os-rule" />

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="os-label">本月成本</span>
                  <span className="os-mono text-sm text-[color:var(--os-text)]">
                    ¥38 / <span className="text-[color:var(--os-dim)]">¥119 封顶</span>
                  </span>
                </div>
                <div className="os-gauge">
                  <span style={{ width: "32%" }} />
                </div>
              </div>

              <div className="os-rule" />

              <div className="os-mono flex items-center gap-2 text-xs text-[color:var(--os-dim)]">
                <span className="text-[color:var(--os-you)]">你管 Why</span>
                <span className="text-[color:var(--os-faint)]">·</span>
                <span className="text-[color:var(--os-sys)]">系统管执行</span>
              </div>
            </div>
          </div>
        </div>

        {/* 信任数字条 —— 仪表读数 */}
        <div className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="os-panel grid grid-cols-2 divide-x divide-y divide-[color:var(--os-line)] sm:grid-cols-4 sm:divide-y-0">
            {[
              ["4 年", "真实时间线", "sys"],
              ["512 位", "累计 AI 学员", "sys"],
              ["60 天", "零基础上架 App*", "you"],
              ["¥119/月", "成本封顶 · 真账", "you"],
            ].map(([a, b, tone]) => (
              <div key={b} className="px-5 py-6">
                <div
                  className="os-mono text-2xl font-bold md:text-3xl"
                  style={{
                    color:
                      tone === "you"
                        ? "var(--os-you)"
                        : "var(--os-sys)",
                  }}
                >
                  {a}
                </div>
                <div className="mt-1.5 text-xs leading-snug text-[color:var(--os-dim)]">
                  {b}
                </div>
              </div>
            ))}
          </div>
          <p className="os-mono mt-3 text-[11px] text-[color:var(--os-faint)]">
            *个例，不代表普遍结果。我们不承诺暴富。
          </p>
        </div>
      </section>

      {/* ============ 王牌实证 · 8 天招满 160 人 ============ */}
      <section
        id="proof"
        className="relative scroll-mt-16 overflow-hidden border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8"
      >
        <div className="os-glow-you absolute -left-32 top-10 h-[420px] w-[420px] opacity-60" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* 左：叙事 + 结果 */}
          <div>
            <div className="os-label os-label--you mb-4">王牌实证 / proof</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              课程最强的背书，
              <br />
              是它
              <span className="text-[color:var(--os-you)]">自己招满了自己</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-[color:var(--os-dim)]">
              这一期 8 天招生，我们没有请投手、没有外包团队——靠的就是你将要拿到的
              <span className="text-[color:var(--os-text)]">同一套系统</span>
              。它自己制定计划、产出内容、定时多平台发布、还当客服核对报名。CEO
              全程只做一件人工：<span className="text-[color:var(--os-text)]">扫码一次</span>。
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["8 天", "招生周期", "sys"],
                ["160+", "实际报名 / 目标 150", "you"],
                ["+10%", "超额完成", "you"],
              ].map(([a, b, tone]) => (
                <div key={b} className="os-panel px-4 py-5">
                  <div
                    className="os-mono text-2xl font-bold md:text-3xl"
                    style={{
                      color: tone === "you" ? "var(--os-you)" : "var(--os-sys)",
                    }}
                  >
                    {a}
                  </div>
                  <div className="mt-1 text-[11px] leading-snug text-[color:var(--os-dim)]">
                    {b}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：系统活动日志（控制台） */}
          <div className="os-panel os-panel--live overflow-hidden">
            <div className="flex items-center justify-between border-b border-[color:var(--os-line)] px-5 py-3">
              <span className="os-mono text-[11px] tracking-[0.14em] text-[color:var(--os-dim)]">
                招生战役 · 系统活动日志
              </span>
              <span className="os-mono flex items-center gap-1.5 text-[11px] text-[color:var(--os-sys)]">
                <span className="os-dot" /> auto
              </span>
            </div>
            <div className="os-mono space-y-3 p-5 text-sm">
              {[
                ["选题 · 6 维质检", "≥85 分过线，不过线自动重写"],
                ["出稿 · 自动配图", "小红书 / 公众号文案 + 封面"],
                ["定时多平台发布", "公众号 · 小红书 · 视频号 · 抖音"],
                ["客服答疑", "课程 / 报名 / 拼团问题自动回"],
                ["核对报名与拼团", "到账、成团状态实时对账"],
              ].map(([a, b], i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[color:var(--os-sys)]">◍</span>
                  <div>
                    <div className="text-[color:var(--os-text)]">{a}</div>
                    <div className="text-xs text-[color:var(--os-dim)]">{b}</div>
                  </div>
                </div>
              ))}
              <div className="os-rule my-1" />
              <div className="flex items-start gap-3">
                <span className="text-[color:var(--os-you)]">●</span>
                <div className="text-[color:var(--os-text)]">
                  人工介入：<span className="text-[color:var(--os-you)]">扫码一次</span>
                  <span className="text-xs text-[color:var(--os-dim)]">
                    {" "}
                    · 其余全自动
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="os-mono mx-auto mt-8 max-w-6xl text-[11px] text-[color:var(--os-faint)]">
          诚实口径：发布到复检全自动，登录环节由人扫码授权一次。不夸大为全自动。
        </p>
      </section>

      {/* ============ 你的 AI 事业之路（钱景主轴） ============ */}
      <section
        id="path"
        className="relative scroll-mt-16 overflow-hidden border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8"
      >
        <div className="os-grid absolute inset-0 opacity-[0.3]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="os-label os-label--you mb-4">你的 AI 事业之路 / path</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              一条从「学员」到
              <span className="text-[color:var(--os-you)]">「拿 AI 收入」</span>
              的明路
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--os-dim)]">
              ¥6980 买的不是一门课，是一张
              <span className="text-[color:var(--os-text)]">进入 AI 事业的入场券</span>
              。从这里开始，你走的是一条有身份、有客户、有收入的路。
            </p>
          </div>

          {/* 四步管线 */}
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              ["01", "报名入行", "拿到系统底座，开始 28 天装机。零基础也能上手，会编程的走更深的引擎层。", "you"],
              ["02", "结课认证", "同一账号自动升级为「认证 AI 应用架构师」，分 L1 / L2 / L3 三级——这是新职业的准入。", "sys"],
              ["03", "深入一线部署", "带着系统走进企业与客户的业务现场，把 AI 真正落到流程里、交付出结果。", "you"],
              ["04", "接单变现", "凭认证身份进入交付网络，阶梯分润 + 客户管理，把技能变成能持续收的钱。", "you"],
            ].map(([n, t, d, tone]) => (
              <div key={n} className="os-panel relative p-5">
                <div
                  className="os-mono text-3xl font-bold"
                  style={{ color: tone === "you" ? "var(--os-you)" : "var(--os-sys)" }}
                >
                  {n}
                </div>
                <div className="mt-3 text-lg font-bold text-[color:var(--os-text)]">
                  {t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--os-dim)]">
                  {d}
                </p>
              </div>
            ))}
          </div>

          {/* 钱景论证 */}
          <div className="os-panel os-panel--live mt-6 grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8">
            <div>
              <div className="os-label mb-3">为什么是现在 · 钱景</div>
              <p className="text-xl font-semibold leading-relaxed text-[color:var(--os-text)] md:text-2xl">
                稀缺的从来不是「会用 AI 的人」，是能把 AI
                <span className="text-[color:var(--os-you)]">真正部署进业务、还能交付结果</span>
                的人。
              </p>
              <p className="mt-4 leading-relaxed text-[color:var(--os-dim)]">
                97% 的个人与中小企业还卡在「AI 试了一圈、落不了地」。这是巨头不愿服务的长尾——也正是带着一套系统的认证架构师，用零头人力就能接住的活。
              </p>
            </div>
            <div className="os-panel p-5">
              <div className="os-mono text-4xl font-bold text-[color:var(--os-you)]">
                30 万+
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--os-dim)]">
                OpenAI 正计划招募规模化的 AI 一线部署人才。风口要的不是观众，是能上场的人——你的认证身份，就是入场资格。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 结课 = 新职业（认证执业） ============ */}
      <section
        id="cert"
        className="relative scroll-mt-16 border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="os-label os-label--you mb-4">结课 = 新职业 / certification</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              结课那天，你的学员账号
              <br />
              变成一张
              <span className="text-[color:var(--os-you)]">执业证</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--os-dim)]">
              不是一纸结业证书，是「认证 AI 应用架构师」的职业身份——它解锁的是接单派单、客户管理、分润结算，和架构师专属的技能与更新通道。
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["L1", "入门架构师", "能独立用系统交付小型项目；介绍客户进入网络，参与阶梯分润。", "sys"],
              ["L2", "独立架构师", "独立承接企业级交付，拥有客户管理后台与更高一档分润。", "you"],
              ["L3", "垂直专家", "在垂直行业获得授权、带队交付，享受最高一档分润与专属资产包。", "you"],
            ].map(([lv, t, d, tone]) => (
              <div key={lv} className="os-panel p-6">
                <div className="flex items-center justify-between">
                  <span
                    className="os-mono rounded-md px-2.5 py-1 text-sm font-bold"
                    style={{
                      color: tone === "you" ? "var(--os-you)" : "var(--os-sys)",
                      background:
                        tone === "you" ? "var(--os-you-soft)" : "var(--os-sys-soft)",
                    }}
                  >
                    {lv}
                  </span>
                  <span className="os-mono text-[11px] text-[color:var(--os-faint)]">
                    认证架构师
                  </span>
                </div>
                <div className="mt-4 text-lg font-bold text-[color:var(--os-text)]">
                  {t}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--os-dim)]">
                  {d}
                </p>
              </div>
            ))}
          </div>
          <p className="os-mono mt-5 text-xs text-[color:var(--os-faint)]">
            分润采阶梯制，随认证等级与真实交付战绩提升；具体规则以平台认证条款为准。
          </p>
        </div>
      </section>

      {/* ============ 系统先进性 · 你的精英团队 ============ */}
      <section
        id="system"
        className="relative scroll-mt-16 overflow-hidden border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8"
      >
        <div className="os-glow-sys absolute -right-32 top-0 h-[460px] w-[460px] opacity-60" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <div className="os-label mb-4">凭什么能接住企业的活 / the system</div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              别人雇一个助理，
              <br />
              你
              <span className="text-[color:var(--os-you)]">装一支精英团队</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[color:var(--os-dim)]">
              一顿饭钱的月成本，做完巨头要驻场几个月的活。这套本地系统不是一个数字员工，是一支随时待命的 AI 交付团队——而你，是指挥它的架构师。
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["指挥内核", "总指挥", "一句话变成一条跑得动的流水线：制定计划、拆解目标、编排任务、调度技能。", "sys"],
              ["战役包工厂", "即插即战", "把一个领域的完整打法封装成「战役包」，装上就能打——创业、招生、内容各有专属包。", "sys"],
              ["技能蒸馏炉", "把你装进系统", "把你那一行的拿手经验蒸馏成可复用技能——你的积累不清零，是系统的燃料。", "sys"],
              ["自进化引擎", "越用越强", "系统自我打分、自动迭代，越用越懂你；课会结束，系统不会，它一直在变强。", "you"],
              ["本地主权", "永远属于你", "装在你自己的电脑里：定时值守、断网照常跑、数据不出门、永不被平台封停。", "you"],
              ["诚实仪表盘", "看得见的账", "它替你干了啥、花了多少、明天先干哪件——成本约 ¥119/月封顶，真账透明。", "you"],
            ].map(([t, tag, d, tone]) => (
              <div key={t} className="os-panel p-5">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[color:var(--os-text)]">
                    {t}
                  </span>
                  <span
                    className="os-mono rounded px-1.5 py-0.5 text-[10px]"
                    style={{
                      color: tone === "you" ? "var(--os-you)" : "var(--os-sys)",
                      background:
                        tone === "you" ? "var(--os-you-soft)" : "var(--os-sys-soft)",
                    }}
                  >
                    {tag}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-[color:var(--os-dim)]">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 时代分水岭 ============ */}
      <section className="relative border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="os-label mb-4 inline-flex items-center gap-2">为什么是现在</div>
          <h2 className="text-3xl font-bold leading-snug md:text-5xl">
            AI 正在
            <span className="text-[color:var(--os-you)]">重置所有人的起跑线</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--os-dim)]">
            被替代的岗位 78% 是中低技能，而 AI 新创造的岗位 85% 要「技术 + 行业」复合能力。
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold leading-relaxed text-[color:var(--os-text)]">
            这不是「要不要学 AI」的问题——是这一轮分水岭，你站哪边。不会给 AI
            建底座的人，不是被 AI 淘汰，是被
            <span className="text-[color:var(--os-you)]">「会用 AI 的同行」</span>淘汰。
          </p>
          <p className="os-mono mx-auto mt-8 max-w-xl border-t border-[color:var(--os-line)] pt-6 text-base italic text-[color:var(--os-faint)]">
            「电脑昨天升级了系统，你的大脑呢？」
          </p>
        </div>
      </section>

      {/* ============ 招生对象：画像 ============ */}
      <section className="border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="os-label mb-4 inline-flex items-center gap-2">你是不是其中之一</div>
            <h2 className="text-3xl font-bold md:text-5xl">这门课，为谁而造</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[color:var(--os-dim)]">
              我们的学员，是有积累却被困住的「准超级个体」——不是想躺赢的小白。
            </p>
          </div>

          {/* 中年失业蓝本 — 大故事块 */}
          <div className="os-panel mb-8 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div
                className="relative min-h-[280px] bg-cover bg-center md:min-h-full"
                style={{ backgroundImage: `url(${MIDLIFE.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--os-bg)] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[color:var(--os-bg)]" />
                <span className="os-mono absolute left-5 top-5 rounded-md border border-[color:var(--os-sys)] bg-black/40 px-3 py-1 text-[11px] text-[color:var(--os-sys)] backdrop-blur-sm">
                  {MIDLIFE.tag}
                </span>
              </div>
              <div className="p-7 md:p-10">
                <h3 className="text-2xl font-bold leading-snug">{MIDLIFE.title}</h3>
                <p className="os-mono mt-1 text-sm text-[color:var(--os-dim)]">{MIDLIFE.age}</p>

                <div className="mt-5 space-y-3 border-l-2 border-[color:var(--os-line-strong)] pl-4">
                  {MIDLIFE.story.map((p, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-[color:var(--os-dim)]">
                      <Rich text={p} />
                    </p>
                  ))}
                </div>

                <div className="mt-5 flex gap-2 rounded-xl bg-[color:var(--os-you-soft)] p-4">
                  <Quote className="h-5 w-5 shrink-0 text-[color:var(--os-you)]" />
                  <p className="text-[15px] leading-relaxed text-[color:var(--os-text)]">
                    <Rich text={MIDLIFE.insight} />
                  </p>
                </div>
              </div>
            </div>

            {/* 三桥接：他的痛 → 课程对症 */}
            <div className="grid gap-px border-t border-[color:var(--os-line)] bg-[color:var(--os-line)] md:grid-cols-3">
              {MIDLIFE.bridge.map((b) => (
                <div key={b.t} className="bg-[color:var(--os-panel)] p-6">
                  <div className="mb-2 text-sm font-bold text-[color:var(--os-sys)]">{b.t}</div>
                  <p className="text-sm leading-relaxed text-[color:var(--os-dim)]">{b.d}</p>
                </div>
              ))}
            </div>
            <p className="os-mono border-t border-[color:var(--os-line)] px-6 py-4 text-xs leading-relaxed text-[color:var(--os-faint)]">
              {MIDLIFE.honest}
            </p>
          </div>

          {/* 其他三类画像 */}
          <div className="grid gap-5 md:grid-cols-3">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="os-panel group overflow-hidden transition hover:border-[color:var(--os-sys)]"
              >
                <div
                  className="relative h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--os-panel)] via-[color:var(--os-panel)]/40 to-transparent" />
                  <span className="os-mono absolute left-4 top-4 rounded-md bg-black/50 px-2.5 py-1 text-[11px] text-[color:var(--os-you)] backdrop-blur-sm">
                    {p.tag}
                  </span>
                  <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold leading-snug">
                    {p.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="mb-4 text-[15px] font-medium italic leading-relaxed text-[color:var(--os-text)]">
                    「{p.oneLine}」
                  </p>
                  <ul className="mb-4 space-y-1.5">
                    {p.pains.map((pain) => (
                      <li key={pain} className="flex gap-2 text-sm text-[color:var(--os-dim)]">
                        <span className="text-[color:var(--os-you)]">·</span>
                        {pain}
                      </li>
                    ))}
                  </ul>
                  <div className="rounded-lg border-l-2 border-[color:var(--os-sys)] bg-[color:var(--os-sys-soft)] p-3 text-sm leading-relaxed text-[color:var(--os-text)]">
                    {p.fix}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 课程体系：三因子 + 装机周 ============ */}
      <section className="border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <div className="os-label mb-4 inline-flex items-center gap-2">28 天你会经历什么</div>
            <h2 className="text-3xl font-bold md:text-5xl">普通人改命的方法论</h2>
            <p className="mt-4 os-mono text-lg text-[color:var(--os-dim)]">
              人生智慧 <span className="text-[color:var(--os-you)]">×</span> 行业技能{" "}
              <span className="text-[color:var(--os-you)]">×</span> 产出效率
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {FACTORS.map((f, i) => {
              const Icon = FACTOR_ICONS[i];
              return (
                <div key={f.title} className="os-panel p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="os-mono flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold"
                      style={{
                        color: "var(--os-you)",
                        background: "var(--os-you-soft)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <Icon className="h-6 w-6 text-[color:var(--os-sys)]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[color:var(--os-dim)]">{f.desc}</p>
                </div>
              );
            })}
          </div>

          {/* 装机周 timeline */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-bold text-[color:var(--os-text)]">
              开课第一周：把系统从零搭起来
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DAYS.map((d) => (
                <div key={d.d} className="os-panel p-5">
                  <div className="os-mono mb-1 text-sm font-bold text-[color:var(--os-sys)]">
                    {d.d}
                  </div>
                  <div className="mb-2 font-semibold">{d.t}</div>
                  <p className="text-sm leading-relaxed text-[color:var(--os-dim)]">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 学员实录墙 ============ */}
      <section className="border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <div className="os-label mb-4 inline-flex items-center gap-2">真名 · 真人 · 真作品</div>
            <h2 className="text-3xl font-bold md:text-5xl">学员实录墙</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[color:var(--os-dim)]">
              他们的起点，大概率比你想象的还低。每个故事都来自我们公众号的学员自述，可点「阅读原文」核实。
            </p>
          </div>

          {/* 最新 · 直播对谈 featured */}
          <div className="os-panel os-panel--live mb-10 overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="flex flex-col justify-center gap-4 p-8 md:col-span-3 md:p-10">
                <span className="os-mono w-fit rounded-md border border-[color:var(--os-sys)] bg-[color:var(--os-sys-soft)] px-3 py-1 text-[11px] text-[color:var(--os-sys)]">
                  {FEATURED_TESTIMONIAL.badge}
                </span>
                <div className="flex gap-3">
                  <Quote className="h-8 w-8 shrink-0 text-[color:var(--os-you)]" />
                  <p className="text-xl font-semibold leading-relaxed text-[color:var(--os-text)] md:text-2xl">
                    {FEATURED_TESTIMONIAL.quote}
                  </p>
                </div>
                <ul className="space-y-2 border-l-2 border-[color:var(--os-line-strong)] pl-4">
                  {FEATURED_TESTIMONIAL.points.map((p, i) => (
                    <li key={i} className="text-[15px] leading-relaxed text-[color:var(--os-dim)]">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-1">
                  <div className="font-bold text-[color:var(--os-text)]">{FEATURED_TESTIMONIAL.name}</div>
                  <div className="os-mono text-sm text-[color:var(--os-dim)]">
                    {FEATURED_TESTIMONIAL.role}
                  </div>
                </div>
              </div>
              <a
                href={FEATURED_TESTIMONIAL.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex min-h-[200px] items-center justify-center bg-[color:var(--os-panel-2)] p-8 md:col-span-2"
              >
                <div className="os-glow-sys absolute inset-0 opacity-60" />
                <div className="relative flex flex-col items-center gap-3 text-center">
                  <PlayCircle className="h-16 w-16 text-[color:var(--os-text)] transition group-hover:scale-110" />
                  <span className="text-sm font-medium text-[color:var(--os-text)]">
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
                className="os-panel group flex flex-col overflow-hidden transition hover:border-[color:var(--os-sys)]"
              >
                {/* 公众号原文真实封面 */}
                <div
                  className="relative h-44 bg-cover bg-center"
                  style={{ backgroundImage: `url(/images/mas-life/cases/${c.id}.jpg)` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--os-panel)] via-[color:var(--os-panel)]/20 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-1 text-lg font-bold text-[color:var(--os-text)]">{c.name}</div>
                  <div className="os-mono mb-4 text-xs leading-snug text-[color:var(--os-you)]">
                    {c.role}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-[color:var(--os-dim)]">
                    {c.built}
                  </p>
                  <div className="mt-auto rounded-lg border-l-2 border-[color:var(--os-sys)] bg-[color:var(--os-sys-soft)] p-3 text-sm leading-relaxed text-[color:var(--os-text)]">
                    {c.result}
                  </div>
                  <div className="os-mono mt-4 flex items-center gap-1.5 text-xs text-[color:var(--os-sys)] transition group-hover:gap-2.5">
                    阅读原文（公众号「爱学 AI 教育」）
                    <ExternalLink className="h-3.5 w-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <p className="os-mono mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[color:var(--os-faint)]">
            以上均为学员真实自述、个例呈现，不代表普遍结果；我们不承诺任何收入或融资结果。部分学员应本人意愿匿名。
          </p>
        </div>
      </section>

      {/* ============ 谁适合 / 不适合 ============ */}
      <section className="border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <div className="os-panel os-panel--live p-7">
            <CheckCircle2 className="mb-3 h-8 w-8 text-[color:var(--os-sys)]" />
            <h3 className="mb-4 text-xl font-bold">适合你，如果——</h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-[color:var(--os-text)]">
              <li>· 被困住了，但心里还有劲</li>
              <li>· 想自己做主方向，不想被替代</li>
              <li>· 愿意 28 天真做出一个东西</li>
              <li>· 有积累的「准超级个体」，不是想躺赢的小白</li>
            </ul>
          </div>
          <div className="os-panel p-7">
            <XCircle className="mb-3 h-8 w-8 text-[color:var(--os-faint)]" />
            <h3 className="mb-4 text-xl font-bold text-[color:var(--os-dim)]">不适合你，如果——</h3>
            <ul className="space-y-2.5 text-[15px] leading-relaxed text-[color:var(--os-dim)]">
              <li>· 想躺赢、找暴富捷径</li>
              <li>· 只想买课收藏、不愿动手</li>
              <li>· 期待全自动永动机、不愿每周喂它一次</li>
            </ul>
            <p className="os-mono mt-5 text-xs text-[color:var(--os-faint)]">
              哈佛不会为没动力的学生改大纲。我们不降门槛——这是为你好。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 报名 Offer · 价值锚定 ============ */}
      <section
        id="enroll"
        className="relative scroll-mt-16 overflow-hidden border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8"
      >
        <div className="os-glow-you absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 opacity-70" />
        <div className="relative mx-auto max-w-4xl">
          <div className="os-panel os-panel--live p-8 md:p-12">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="os-label os-label--you">报名 / enroll</span>
              <span className="os-mono rounded-md border border-[color:var(--os-line-strong)] px-2.5 py-1 text-[11px] text-[color:var(--os-dim)]">
                三城线下各限 50 席 · 报满即止
              </span>
            </div>
            <h2 className="text-3xl font-bold leading-tight md:text-5xl">
              一张 AI 事业入场券，
              <span className="os-mono text-[color:var(--os-you)]">¥6980</span>
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-[color:var(--os-dim)]">
              一套永远属于你的系统、一个认证架构师身份、一张接单变现的网络席位——
              <span className="text-[color:var(--os-text)]">第一天学不会，100% 全额退款</span>
              。把它当一次投资，而不是一笔学费。
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                [Calendar, "开课方式", "深圳 / 北京 / 上海线下小班 + 线上全球可报 · 同价同课"],
                [Wallet, "学费", "¥6980 · 线上线下同价同课"],
                [Award, "折扣", "金卡 / 学生 8 折 · 老学员 75 折 · 3 人拼团 8 折"],
                [ShieldCheck, "风险逆转", "第一天学不会，100% 全额退款"],
              ].map(([Icon, t, d], i) => {
                const I = Icon as typeof Calendar;
                return (
                  <div key={i} className="os-panel flex gap-3 p-4">
                    <I className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--os-sys)]" />
                    <div>
                      <div className="os-label os-label--dim mb-1">{t as string}</div>
                      <div className="text-sm leading-snug text-[color:var(--os-text)]">
                        {d as string}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 省钱方案：三档折扣 + 拼团直达入口 */}
            <div className="mt-8 os-panel border-[color:rgba(245,165,36,0.28)] bg-[color:var(--os-you-soft)] p-5">
              <div className="os-label os-label--you flex items-center gap-2">
                <Tag className="h-4 w-4" /> 省钱方案 · 原价 ¥6980
              </div>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {[
                  [GraduationCap, "学生 / 金卡 8 折", "¥5584", "学生凭学生证 · 进意向群核验", "sys"],
                  [Award, "老学员 75 折", "¥5235", "小鹅通报名自动显示", "sys"],
                  [Users, "3 人拼团 8 折（新人）", "¥5584", "立省 1396 · 618 先锁位全额抵学费", "you"],
                ].map(([Icon, label, price, note, tone], i) => {
                  const I = Icon as typeof Users;
                  const c = tone === "you" ? "var(--os-you)" : "var(--os-sys)";
                  return (
                    <div key={i} className="os-panel p-3.5">
                      <div className="flex items-center gap-1.5 text-xs text-[color:var(--os-dim)]">
                        <I className="h-3.5 w-3.5" /> {label as string}
                      </div>
                      <div
                        className="os-mono mt-1 text-xl font-bold"
                        style={{ color: c }}
                      >
                        {price as string}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[color:var(--os-faint)]">
                        {note as string}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/lock" className="os-btn os-btn-you mt-4 w-full py-3.5 text-base">
                <Users className="h-5 w-5" />
                发起 / 加入 3 人拼团 · 立省 1396
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="os-mono mt-2 text-center text-[11px] text-[color:var(--os-faint)]">
                最多叠加 2 个折扣；学生与老学员折扣二选一。拼团仅限新朋友。
              </p>
            </div>

            <div className="os-panel mt-6 p-5 text-sm leading-relaxed text-[color:var(--os-dim)]">
              <b className="text-[color:var(--os-text)]">你会带走：</b>
              一套真在跑的 AI 系统 + 认证架构师身份 + 你的第一个真产品 +
              一块诚实仪表盘。课程结束，系统带走，一直跑。
              <span className="mt-2 block text-[color:var(--os-faint)]">
                深圳 / 北京 / 上海线下各限 <b className="text-[color:var(--os-text)]">50 席</b>
                ，小班先到先得；线上不限名额，海外可报。
              </span>
            </div>

            <a
              href={XIAOE_COURSE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="os-btn os-btn-you mt-8 w-full py-4 text-lg"
            >
              立即报名 · 小鹅通购买
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link href="/gaokao" className="os-btn os-btn-ghost mt-3 w-full py-3.5 text-base">
              <Sparkles className="h-4 w-4 text-[color:var(--os-sys)]" />
              还在犹豫？先免费做 AI 定位自测
            </Link>
            <p className="os-mono mt-3 text-center text-[11px] text-[color:var(--os-faint)]">
              点「立即报名」直达小鹅通，金卡 / 老学员折扣自动显示；学生 8
              折凭学生证进意向群核验；3 人拼团点上方按钮即可。
            </p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-[color:var(--os-line)] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="os-label mb-4 inline-flex items-center gap-2">把话说清楚</div>
            <h2 className="text-3xl font-bold md:text-4xl">常见问题</h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details
                key={f.q}
                className="os-panel group p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-[color:var(--os-text)] marker:content-['']">
                  {f.q}
                  <span className="os-mono ml-4 text-[color:var(--os-you)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--os-dim)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="relative overflow-hidden border-t border-[color:var(--os-line)] px-5 pb-32 pt-24 sm:px-8">
        <div className="os-glow-you absolute left-1/2 top-0 h-[440px] w-[440px] -translate-x-1/2 opacity-70" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-snug md:text-5xl">
            工作留给 AI，
            <br />
            <span className="text-[color:var(--os-you)]">生活留给自己</span>
          </h2>
          <p className="mt-6 text-lg text-[color:var(--os-dim)]">
            风口要的不是观众，是能上场的人。一张 AI 事业入场券，门开着的时间不长。
          </p>
          <Link href="#enroll" className="os-btn os-btn-you mt-9 px-9 py-4 text-lg">
            查看报名方案 · <span className="os-mono font-bold">¥6980</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="os-mono mx-auto mt-12 max-w-xl text-xs leading-relaxed text-[color:var(--os-faint)]">
            诚实声明：我们不承诺任何升学或收入结果，所有学员成果均为个例、不代表普遍结果。系统为「自我进化 +
            每周维护一次」，非全自动；成本约 ¥119/月真账。报名以最终课程协议为准。
          </p>
        </div>
      </section>

      <EnrollBar />
    </div>
  );
}

