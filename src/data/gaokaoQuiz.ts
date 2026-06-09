// AI 时代志愿/方向定位自测 —— 数据
// 移植自 lead-magnets/zhiyuan-positioning，作为高考直播留资页的测评内容。
// 5 种 AI 时代定位原型 + 10 题。诚实定位：不替你选专业，帮你看清天然倾向与方向感。

export type ArchetypeKey = "B" | "C" | "S" | "H" | "K";

export type Archetype = {
  key: ArchetypeKey;
  name: string;
  tags: string[];
  lean: string; // 你是谁
  ai: string; // AI 时代意味着什么（含简单加粗标记 **）
  bet: string; // 该往哪押 / 该避开
};

export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  B: {
    key: "B",
    name: "创造者",
    tags: ["从0造东西", "动手落地", "产品/创作"],
    lean: "你的天然倾向是“做出来”——比起空想，你更想把一个东西真的造出来。",
    ai: "AI 是你最好的施工队。它把“造一个东西”的成本砍到十分之一——以前要一个团队几个月的产品，现在你一个人几周就能做出来。**越能造、越敢造的人，AI 时代放大得越狠。**",
    bet: "押：独立开发 / 产品 / 内容创作 / 创业。（具体专业方向待校准）　避：纯执行型、可被一键生成替代的环节。",
  },
  C: {
    key: "C",
    name: "整合者",
    tags: ["跨界连接", "组合资源", "运营/商业"],
    lean: "你的天然倾向是“连接”——把不同的人、工具、资源凑成一件事。",
    ai: "AI 时代，单一技能在贬值，**独特的组合在升值**。你天生会跨界，而“别人想不到的组合”恰恰是 AI 替代不了的护城河。你的价值是当那个把 AI、人、资源编排起来的人。",
    bet: "押：商业/运营/项目操盘 / 跨界整合 / 一人公司。（具体方向待校准）　避：单点重复劳动。",
  },
  S: {
    key: "S",
    name: "洞察者",
    tags: ["看本质", "判断决策", "战略/研究"],
    lean: "你的天然倾向是“想清楚”——比起埋头干，你更想先看透为什么。",
    ai: "AI 把“执行”变便宜了，于是**“判断”和“品味”变贵了**。机器能写一万个方案，但选哪个、赌哪条路，得靠人的洞察。你这种看得透的人，正是 AI 时代最稀缺的“拍板者”。",
    bet: "押：战略 / 研究 / 咨询 / 投资 / 产品决策。（具体方向待校准）　避：只搬运信息、不下判断的活。",
  },
  H: {
    key: "H",
    name: "共情者",
    tags: ["人际信任", "影响他人", "教育/服务"],
    lean: "你的天然倾向是“连接人”——你有让人信任、被人记住的能力。",
    ai: "AI 能写文案、能算命式安慰，但**真实的人际信任，它给不了**。当一切都能被生成，“一个真的懂你、在乎你的人”反而成了最稀缺的东西。你的温度，是 AI 越强越值钱的资产。",
    bet: "押：教育 / 心理 / 医疗健康 / 社群 / 高端服务。（具体方向待校准）　避：纯信息客服类（最先被 AI 接管）。",
  },
  K: {
    key: "K",
    name: "手艺人",
    tags: ["深耕极致", "专业品味", "设计/工程/艺术"],
    lean: "你的天然倾向是“做到精”——你愿意为一个细节抠到完美。",
    ai: "AI 能做到 80 分，但顶尖的 20 分——那种品味和手感——还是人的。**AI 不会淘汰手艺人，它淘汰半吊子。**你越往极致走，AI 越是你的放大器而不是替代者。",
    bet: "押：设计 / 工程 / 艺术 / 某门专业技能做到顶。（具体方向待校准）　避：停在“差不多”的中间地带。",
  },
};

export type Question = {
  q: string;
  options: { label: string; key: ArchetypeKey }[];
};

export const QUESTIONS: Question[] = [
  {
    q: "一个周末完全自由，你最可能在做什么？",
    options: [
      { label: "捣鼓做出一个小东西（app/视频/手工）", key: "B" },
      { label: "把一堆人/资源凑成一件事", key: "C" },
      { label: "研究一个让你好奇的问题挖到底", key: "S" },
      { label: "跟人深聊、帮人解决烦恼", key: "H" },
      { label: "把一项技能再练精一点", key: "K" },
    ],
  },
  {
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
    q: "高中你最来电的科目类型？",
    options: [
      { label: "信息/通用技术/能动手做的", key: "B" },
      { label: "政治/经济/综合性的", key: "C" },
      { label: "数学/物理/逻辑推理", key: "S" },
      { label: "语文/历史/跟人有关的", key: "H" },
      { label: "美术/音乐/某门钻很深的", key: "K" },
    ],
  },
  {
    q: "看到 AI 一句话生成代码/图/视频，你第一反应？",
    options: [
      { label: "太爽了，我能用它造更多东西", key: "B" },
      { label: "我能把它和别的组合出新玩法", key: "C" },
      { label: "它会怎么改变各行各业？我想看清", key: "S" },
      { label: "那人还剩什么？真实连接更重要了", key: "H" },
      { label: "它做得还不够精，顶尖手艺替代不了", key: "K" },
    ],
  },
  {
    q: "你更想成为哪种人？",
    options: [
      { label: "做出一个很多人用的产品的人", key: "B" },
      { label: "能调动资源、把事搞成的人", key: "C" },
      { label: "看得比别人远、被人请教的人", key: "S" },
      { label: "真正帮到很多人、被记住的人", key: "H" },
      { label: "在一个领域做到顶尖的人", key: "K" },
    ],
  },
  {
    q: "面对一个全新的难题，你倾向？",
    options: [
      { label: "先动手试个原型", key: "B" },
      { label: "先找人/找现成的拼起来", key: "C" },
      { label: "先把问题拆清楚想明白", key: "S" },
      { label: "先搞清谁受影响、要什么", key: "H" },
      { label: "先把基本功打扎实再上", key: "K" },
    ],
  },
  {
    q: "你更怕哪种未来？",
    options: [
      { label: "没有自己的作品", key: "B" },
      { label: "困在小圈子、没资源", key: "C" },
      { label: "看不清方向、瞎忙", key: "S" },
      { label: "做的事跟人没关系、没温度", key: "H" },
      { label: "一直半吊子、不精通", key: "K" },
    ],
  },
  {
    q: "你愿意为一件事熬夜，通常因为？",
    options: [
      { label: "快做出来了，想看到成品", key: "B" },
      { label: "在撮合一件大事", key: "C" },
      { label: "快想通一个问题了", key: "S" },
      { label: "有人需要我", key: "H" },
      { label: "想把一个细节抠到完美", key: "K" },
    ],
  },
  {
    q: "哪句话最像你？",
    options: [
      { label: "想法不如先做出来", key: "B" },
      { label: "一个人走得快，一群人走得远", key: "C" },
      { label: "搞清为什么，比怎么做更重要", key: "S" },
      { label: "人是最终的答案", key: "H" },
      { label: "把一件事做到极致，就有了底气", key: "K" },
    ],
  },
  {
    q: "你希望 AI 在你人生里扮演？",
    options: [
      { label: "我的施工队，帮我把想法造出来", key: "B" },
      { label: "我的资源网，帮我连接放大", key: "C" },
      { label: "我的参谋，帮我看清和决策", key: "S" },
      { label: "我的助手，让我有更多时间陪人", key: "H" },
      { label: "我的工具，帮我把手艺放大", key: "K" },
    ],
  },
];

// 计算结果：返回主原型 + 是否构成「独特组合」（次高分接近主原型）
export function scoreResult(score: Record<ArchetypeKey, number>) {
  const order = (Object.keys(score) as ArchetypeKey[]).sort(
    (a, b) => score[b] - score[a]
  );
  const top = ARCHETYPES[order[0]];
  const second = ARCHETYPES[order[1]];
  const combo = score[order[1]] >= score[order[0]] - 1;
  return { top, second, combo };
}
