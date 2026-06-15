// OPC 一人公司适配测评 —— 数据层
// 克隆自 compass（src/data/compass.ts）的数据结构范式：身份分流 + 分支选择题 + 确定性出结果。
// 与 compass 不同：OPC 不走 5 原型 LLM 解读，而是按「业务核心成本类型」做确定性的
// 「适配度评分 + 推荐城市 + 五步注册清单 + 两大避坑」——结果可复现、不依赖模型。
//
// ⚠️ 所有具体补贴/税率/门槛数字一律标「示例，以官方最新政策为准」，不在代码里写死真实政策数值。

// ===== 身份分流（5 类） =====
export type OpcIdentityId =
  | "freelancer" // 自由职业者
  | "developer" // 技术开发者
  | "creator" // 内容创作者
  | "crossborder" // 跨境外贸
  | "smallbiz"; // 传统小生意

export const OPC_IDENTITIES: {
  id: OpcIdentityId;
  label: string;
  hint: string;
}[] = [
  { id: "freelancer", label: "自由职业者", hint: "接单/咨询/设计，想把个人收入正规化" },
  { id: "developer", label: "技术开发者", hint: "独立开发 / 接私活 / SaaS，吃算力与研发" },
  { id: "creator", label: "内容创作者", hint: "短视频/直播/知识付费，吃平台与流量生态" },
  { id: "crossborder", label: "跨境外贸", hint: "出口/独立站/亚马逊，吃跨境结汇与合规" },
  { id: "smallbiz", label: "传统小生意", hint: "实体店/小作坊/本地服务" },
];

// ===== 业务核心成本类型（决定推荐城市的主轴） =====
// compute=算力 / tax=税优 / ecosystem=生态 / crossborder=跨境合规 / local=本地经营(传统)
export type CostType = "compute" | "tax" | "ecosystem" | "crossborder" | "local";

// ===== 选择题 =====
// kind: cost 计入「成本类型」权重；signal 不计分，仅作事实信号（是否开票/融资/营收阶段）
export type OpcQuestion = {
  id: string;
  kind: "cost" | "signal";
  q: string;
  // cost 题的选项带 cost 权重；signal 题的选项带 signal 标记键
  options: { label: string; cost?: CostType; signal?: string }[];
};

// —— 成本类型题（决定推荐城市，核心计分） ——
const COST_QUESTIONS: OpcQuestion[] = [
  {
    id: "c1",
    kind: "cost",
    q: "你的生意里，最大的一块刚性成本/资源依赖是什么？",
    options: [
      { label: "算力 / GPU / 模型推理与训练开销", cost: "compute" },
      { label: "税负 —— 利润不薄，最怕被税吃掉", cost: "tax" },
      { label: "平台与流量 —— 吃抖音/小红书/B站的生态", cost: "ecosystem" },
      { label: "跨境结汇、清关、海外合规", cost: "crossborder" },
      { label: "房租/人工/进货等本地经营成本", cost: "local" },
    ],
  },
  {
    id: "c2",
    kind: "cost",
    q: "如果政府给你一项扶持，你最想要哪一种？",
    options: [
      { label: "算力券 / 数据中心电价补贴（示例，以官方最新政策为准）", cost: "compute" },
      { label: "核定征收 / 税收返还（示例，以官方最新政策为准）", cost: "tax" },
      { label: "内容/MCN 产业园入驻 + 流量扶持（示例，以官方最新政策为准）", cost: "ecosystem" },
      { label: "跨境综试区 + 出口退税便利（示例，以官方最新政策为准）", cost: "crossborder" },
      { label: "我这行政策给不上力，更想要现实建议", cost: "local" },
    ],
  },
  {
    id: "c3",
    kind: "cost",
    q: "你接下来 12 个月，钱最可能烧在哪？",
    options: [
      { label: "买卡 / 租云 / API token", cost: "compute" },
      { label: "其实不太烧钱，主要是想合法少缴点税", cost: "tax" },
      { label: "投流 / 拍摄 / 达人合作", cost: "ecosystem" },
      { label: "备货 / 物流 / 海外仓 / 收款通道", cost: "crossborder" },
      { label: "门面 / 设备 / 雇人", cost: "local" },
    ],
  },
];

// —— 信号题（不计分，作为事实交给结果页与落库） ——
const SIGNAL_QUESTIONS: OpcQuestion[] = [
  {
    id: "s_stage",
    kind: "signal",
    q: "你现在的营收阶段是？",
    options: [
      { label: "还没开张 / 月流水 0", signal: "stage:pre" },
      { label: "刚起步，月流水 1 万以内", signal: "stage:early" },
      { label: "跑通了，月流水 1-10 万", signal: "stage:growing" },
      { label: "成规模，月流水 10 万以上", signal: "stage:scaled" },
    ],
  },
  {
    id: "s_invoice",
    kind: "signal",
    q: "你的客户/平台需要你开发票吗？",
    options: [
      { label: "经常要开，没票就收不到钱", signal: "invoice:must" },
      { label: "偶尔要，能开更好", signal: "invoice:sometimes" },
      { label: "基本不用开票", signal: "invoice:no" },
    ],
  },
  {
    id: "s_funding",
    kind: "signal",
    q: "你有融资 / 拿投资的打算吗？",
    options: [
      { label: "有，未来要融资，需要规范的公司主体", signal: "funding:yes" },
      { label: "暂时没有，先自己养活自己", signal: "funding:no" },
      { label: "没想好，看发展", signal: "funding:maybe" },
    ],
  },
];

export function getOpcQuestions(): OpcQuestion[] {
  return [...COST_QUESTIONS, ...SIGNAL_QUESTIONS];
}

export const COST_LABEL: Record<CostType, string> = {
  compute: "算力驱动",
  tax: "税优敏感",
  ecosystem: "生态依赖",
  crossborder: "跨境合规",
  local: "本地经营",
};

// ===== 推荐城市表（按主成本类型）=====
// 数字一律「示例，以官方最新政策为准」；不写死真实补贴/税率。
export type CityRec = {
  cost: CostType;
  city: string;
  reason: string;
  // 适合落公司主体 or 劝退
  verdict: "go" | "stay-individual";
};

export const CITY_BY_COST: Record<CostType, CityRec> = {
  compute: {
    cost: "compute",
    city: "苏州",
    reason:
      "算力/智算中心配套与算力券类扶持相对友好（示例，以官方最新政策为准），离上海近、人才与供应链好接。",
    verdict: "go",
  },
  tax: {
    cost: "tax",
    city: "深圳",
    reason:
      "市场化程度高、税收政策与个体/小微扶持成熟（示例，以官方最新政策为准），适合利润型一人公司把税务做规范。",
    verdict: "go",
  },
  ecosystem: {
    cost: "ecosystem",
    city: "杭州",
    reason:
      "内容/电商/MCN 生态密集，产业园与达人资源集中（示例，以官方最新政策为准），创作者更容易接到生态红利。",
    verdict: "go",
  },
  crossborder: {
    cost: "crossborder",
    city: "上海临港",
    reason:
      "跨境综试与自贸片区配套，结汇、清关、出口退税链路相对顺（示例，以官方最新政策为准），适合外贸主体。",
    verdict: "go",
  },
  local: {
    cost: "local",
    city: "（建议先别注册公司）",
    reason:
      "传统本地小生意大多吃的是本地经营成本，公司主体带来的记账、社保、合规负担往往大于政策红利。建议先以个体工商户起步，跑出稳定利润、确有开票或融资刚需时再升级为公司。",
    verdict: "stay-individual",
  },
};

// ===== 计分：把 cost 题的选择累加，取最高的成本类型为主轴 =====
export type OpcAnswer = { qid: string; label: string; cost?: CostType; signal?: string };

const EMPTY_COST: Record<CostType, number> = {
  compute: 0,
  tax: 0,
  ecosystem: 0,
  crossborder: 0,
  local: 0,
};

export type OpcResult = {
  primaryCost: CostType;
  costScore: Record<CostType, number>;
  city: CityRec;
  // 适配度 0-100：信号题（营收阶段/开票/融资）越偏向"需要公司主体"越高；传统本地拉低
  fitScore: number;
  fitLabel: string;
  signals: Record<string, string>; // stage / invoice / funding
};

export function scoreOpc(
  answers: OpcAnswer[],
  identityId: OpcIdentityId
): OpcResult {
  const costScore = { ...EMPTY_COST };
  const signals: Record<string, string> = {};

  for (const a of answers) {
    if (a.cost) costScore[a.cost] += 1;
    if (a.signal) {
      const [k, v] = a.signal.split(":");
      if (k && v) signals[k] = v;
    }
  }

  // 传统小生意身份直接给 local 一个保底权重，避免被其他题带偏
  if (identityId === "smallbiz") costScore.local += 2;

  // 取最高成本类型；并列时按 compute>tax>ecosystem>crossborder>local 的稳定顺序
  const ORDER: CostType[] = ["compute", "tax", "ecosystem", "crossborder", "local"];
  let primaryCost: CostType = ORDER[0];
  let best = -1;
  for (const c of ORDER) {
    if (costScore[c] > best) {
      best = costScore[c];
      primaryCost = c;
    }
  }

  const city = CITY_BY_COST[primaryCost];

  // 适配度：基线 50，按信号题加减。这是"成立一人公司主体的适配度"，不是赚钱预测。
  let fit = 50;
  const stageBump: Record<string, number> = {
    pre: -15,
    early: -5,
    growing: 15,
    scaled: 25,
  };
  const invoiceBump: Record<string, number> = {
    must: 20,
    sometimes: 8,
    no: -10,
  };
  const fundingBump: Record<string, number> = {
    yes: 20,
    maybe: 5,
    no: -5,
  };
  fit += stageBump[signals.stage] ?? 0;
  fit += invoiceBump[signals.invoice] ?? 0;
  fit += fundingBump[signals.funding] ?? 0;
  // 传统本地经营：公司主体适配度系统性偏低
  if (primaryCost === "local") fit -= 20;
  fit = Math.max(5, Math.min(98, fit));

  const fitLabel =
    fit >= 75
      ? "高适配 —— 现在就该把公司主体立起来"
      : fit >= 50
        ? "中适配 —— 可以注册，但先想清成本与时点"
        : "低适配 —— 暂别急着开公司，先用个体/个人名义跑通";

  return { primaryCost, costScore, city, fitScore: fit, fitLabel, signals };
}

// ===== 五步注册清单（确定性文案，结果页直接渲染；非 LLM） =====
export function registrationChecklist(r: OpcResult): { title: string; body: string }[] {
  const cityName =
    r.city.verdict === "go" ? r.city.city : "你常驻的城市（先按个体工商户）";
  return [
    {
      title: "1. 定主体与名称",
      body:
        r.city.verdict === "go"
          ? `选「有限责任公司（自然人独资）」最常见；想清楚字号、行业、组织形式。落地城市建议：${cityName}。`
          : "先核「个体工商户」而非公司：登记快、记账成本低、风险敞口小。等利润稳定、确有开票/融资需求再升级。",
    },
    {
      title: "2. 核名 + 准备注册地址",
      body: "通过当地政务平台/一网通办核名。地址必须真实可联系——挂靠虚假地址是高危红线（见下方避坑①）。",
    },
    {
      title: "3. 提交设立登记，领营业执照",
      body: "线上提交章程、股东/法人信息、经营范围；通过后领执照（电子版即生效）。认缴资本如何填见避坑②。",
    },
    {
      title: "4. 刻章 + 银行开户 + 税务报到",
      body: "刻公章/财务章/法人章；开公司对公账户；到税务做报到、核定税种与征收方式（开票需求在这一步落实）。",
    },
    {
      title: "5. 记账报税常态化",
      body:
        "哪怕零申报也必须按月/季报税；找代理记账或自己用工具，别漏报。" +
        (r.signals.funding === "yes"
          ? "有融资打算，从第一天就把股权、账目做干净。"
          : ""),
    },
  ];
}

// ===== 两大避坑（写死的硬提醒，所有结果都展示） =====
export const OPC_PITFALLS: { title: string; body: string }[] = [
  {
    title: "避坑①：虚假挂靠地址 = 公司可能被吊销",
    body:
      "为了凑园区/政策买个「挂靠地址」却联系不上人，一旦被列入经营异常名录、长期不整改，公司会被吊销营业执照，法人还可能进失信名单。地址要真实、能收信、能接受核查。",
  },
  {
    title: "避坑②：认缴资本是你真实的债务，别乱写大数",
    body:
      "认缴制不是「随便写」。你认缴 1000 万，就意味着公司资不抵债时你要在 1000 万范围内补足出资——这是真实的法律责任，不是面子数字。一人公司建议按实际能力认缴，量力而行。",
  },
];

// 给落库/分享用的纯文本报告
export function buildOpcReport(
  identityLabel: string,
  r: OpcResult
): string {
  const checklist = registrationChecklist(r)
    .map((s) => `### ${s.title}\n${s.body}`)
    .join("\n\n");
  const pitfalls = OPC_PITFALLS.map((p) => `### ${p.title}\n${p.body}`).join(
    "\n\n"
  );
  return [
    `# OPC 一人公司适配测评报告`,
    ``,
    `身份：${identityLabel}｜核心成本类型：${COST_LABEL[r.primaryCost]}`,
    ``,
    `## 适配度：${r.fitScore} / 100`,
    r.fitLabel,
    ``,
    `## 推荐落地：${r.city.city}`,
    r.city.reason,
    ``,
    `## 五步注册清单`,
    checklist,
    ``,
    `## 两大避坑（务必看完）`,
    pitfalls,
    ``,
    `> 说明：本报告所涉补贴/税率/门槛均为示例，以官方最新政策为准；测评是思考工具，不构成法律或财税专业建议。`,
  ]
    .join("\n")
    .slice(0, 20000);
}
