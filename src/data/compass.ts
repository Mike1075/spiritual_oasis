// AI 定位罗盘 —— 数据层
// 双轨测评：高考生/大学生 走 student 轨，职场人/转型者 走 adult 轨。
// 设计依据（2026-06 研究综述）：
//  - 对话式分支测评完成率约为静态表单 2 倍（ACM TOCHI 54% vs 24%），8-15 轮为甜点区
//  - 分析单位是"任务"而非"职业名称"（Anthropic Economic Index：同一职业内自动化与增强并存）
//  - 三个新维度：AI 暴露画像 / 人机协作风格（半人马 vs 赛博格）/ 再学习弹性（WEF：39% 核心技能将在 2030 前改变）
// 5 原型沿用 gaokaoQuiz（B创造者/C整合者/S洞察者/H共情者/K手艺人），由 LLM 做深度解读。

import type { ArchetypeKey } from "./gaokaoQuiz";
export { ARCHETYPES, scoreResult, type ArchetypeKey } from "./gaokaoQuiz";

export type Track = "student" | "adult";

export const IDENTITIES: {
  id: string;
  label: string;
  track: Track;
  hint: string;
}[] = [
  { id: "gaokao", label: "高考应届生", track: "student", hint: "影响报考与专业方向" },
  { id: "college", label: "在校大学生", track: "student", hint: "选方向 / 准备就业" },
  { id: "worker", label: "职场人", track: "adult", hint: "升级或寻找新可能" },
  { id: "switcher", label: "转型 / 间隔期", track: "adult", hint: "重新选一条路" },
];

// ===== 选择题 =====
// kind: archetype 计入5原型打分；signal 不打分，作为事实信号交给 AI 分析
export type CompassQuestion = {
  id: string;
  kind: "archetype" | "signal";
  q: string;
  options: { label: string; key?: ArchetypeKey }[];
};

// —— 两轨共用的原型题（5 道，从 gaokaoQuiz 10 题中精选改写） ——
const ARCHETYPE_CORE: CompassQuestion[] = [
  {
    id: "a1",
    kind: "archetype",
    q: "一个完全自由的周末，你最可能在做什么？",
    options: [
      { label: "捣鼓做出一个小东西（app/视频/手工）", key: "B" },
      { label: "把一堆人/资源凑成一件事", key: "C" },
      { label: "研究一个让你好奇的问题挖到底", key: "S" },
      { label: "跟人深聊、帮人解决烦恼", key: "H" },
      { label: "把一项技能再练精一点", key: "K" },
    ],
  },
  {
    id: "a2",
    kind: "archetype",
    q: "别人最常夸你哪一点？",
    options: [
      { label: "动手能力强、能落地", key: "B" },
      { label: "人脉广、会牵线、点子多", key: "C" },
      { label: "看得透、想得深", key: "S" },
      { label: "有亲和力、让人信任", key: "H" },
      { label: "专业、做得精细", key: "K" },
    ],
  },
  {
    id: "a3",
    kind: "archetype",
    q: "面对一个全新的难题，你的第一反应是？",
    options: [
      { label: "先动手试个原型再说", key: "B" },
      { label: "先找人/找现成的拼起来", key: "C" },
      { label: "先把问题拆清楚想明白", key: "S" },
      { label: "先搞清谁受影响、他们要什么", key: "H" },
      { label: "先把基本功打扎实再上", key: "K" },
    ],
  },
  {
    id: "a4",
    kind: "archetype",
    q: "你更怕哪种未来？",
    options: [
      { label: "一辈子没有自己的作品", key: "B" },
      { label: "困在小圈子里、调不动资源", key: "C" },
      { label: "看不清方向、一直瞎忙", key: "S" },
      { label: "做的事跟人没关系、没温度", key: "H" },
      { label: "永远半吊子、没一样精通", key: "K" },
    ],
  },
  {
    id: "a5",
    kind: "archetype",
    q: "你希望 AI 在你人生里扮演什么角色？",
    options: [
      { label: "施工队——帮我把想法造出来", key: "B" },
      { label: "资源网——帮我连接和放大", key: "C" },
      { label: "参谋——帮我看清和决策", key: "S" },
      { label: "助手——让我有更多时间陪人", key: "H" },
      { label: "刨子——帮我把手艺磨得更利", key: "K" },
    ],
  },
];

// —— 信号题（不打分，直接喂给 AI 的事实） ——
const SIGNAL_SHARED: CompassQuestion[] = [
  {
    id: "s1",
    kind: "signal",
    q: "你和 AI 的真实关系，最接近哪种？",
    options: [
      { label: "几乎没用过，有点发怵" },
      { label: "偶尔聊聊天、搜搜东西" },
      { label: "每周都用它干正事（写东西/做题/做方案）" },
      { label: "已经用它做出过完整的东西（产品/报告/作品）" },
    ],
  },
  {
    id: "s2",
    kind: "signal",
    q: "如果 AI 是你的搭档，你天然倾向哪种合作方式？",
    options: [
      { label: "分工式：我定方向和把关，具体活交给它" },
      { label: "缠绕式：每一步都跟它来回过招、互相改" },
      { label: "验证式：我自己干，只让它检查和挑错" },
      { label: "托管式：能全交给它的就全交，我只看结果" },
    ],
  },
  {
    id: "s3",
    kind: "signal",
    q: "上一次从零学会一个新东西（技能/工具/学科），是什么时候？",
    options: [
      { label: "最近 3 个月内，一直在学新东西" },
      { label: "今年学过一两样" },
      { label: "好几年没正经学过新东西了" },
      { label: "想学，但总是开了头就放下" },
    ],
  },
];

const SIGNAL_STUDENT: CompassQuestion[] = [
  {
    id: "st1",
    kind: "signal",
    q: "选专业/方向时，你（和家里）最看重什么？",
    options: [
      { label: "稳——就业稳定、旱涝保收" },
      { label: "爱——一定要是我真感兴趣的" },
      { label: "高——收入上限要高，敢赌" },
      { label: "听安排——家里说了算 / 还没想法" },
    ],
  },
];

const SIGNAL_ADULT: CompassQuestion[] = [
  {
    id: "ad1",
    kind: "signal",
    q: "你现在的职业状态更接近？",
    options: [
      { label: "在职还算稳，但想升级打法" },
      { label: "在职但焦虑，行业/岗位在被 AI 动摇" },
      { label: "自由职业 / 在做副业" },
      { label: "待业 / 间隔期，正在找新方向" },
    ],
  },
];

export function getQuestions(track: Track): CompassQuestion[] {
  return [
    ...ARCHETYPE_CORE,
    ...SIGNAL_SHARED,
    ...(track === "student" ? SIGNAL_STUDENT : SIGNAL_ADULT),
  ];
}

// ===== 开放题（测评的灵魂——AI 必须引用原话分析） =====
export const OPEN_QUESTIONS: {
  id: string;
  q: string;
  hint: string;
  placeholder: string;
  required: boolean;
}[] = [
  {
    id: "o1",
    q: "有什么事是你做起来像玩、别人却觉得费劲的？",
    hint: "学科、技能、爱好都算。这是你最容易被忽略的资产，随便写、写大白话。",
    placeholder: "比如：给同学讲题他们一听就懂 / 打游戏总能第一个摸清机制 / 砍价、组局、修东西……",
    required: true,
  },
  {
    id: "o2",
    q: "你现在心里有想押的方向吗？有什么现实约束？",
    hint: "没有方向就写「还没有」，AI 会替你推荐三条。约束如：分数段、家里意见、存款、时间、城市。",
    placeholder: "比如：想学计算机但分数可能不够 / 想转 AI 产品但只有 6 个月缓冲……",
    required: false,
  },
];

// 从 AI 输出里解析「方向清单」行: [方向清单] A | B | C
// 兜底：模型偶尔漏输出该行，则从 "### 方向一：XX" 式标题里抠
export function parseDirections(text: string): string[] {
  const m = text.match(/\[方向清单\]\s*(.+)/);
  if (m) {
    const list = m[1]
      .split("|")
      .map((s) => s.trim().replace(/^[「『《]|[」』》]$/g, ""))
      .filter(Boolean)
      .slice(0, 3);
    if (list.length) return list;
  }
  const heads = [...text.matchAll(/###\s*方向[一二三123][:：]\s*([^\n（(]+)/g)]
    .map((h) => h[1].trim().replace(/^[「『《]|[」』》]$/g, ""))
    .filter(Boolean)
    .slice(0, 3);
  return heads;
}
