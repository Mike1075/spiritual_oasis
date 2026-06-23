// 首页 v3 ·「一条回家的路」内容（中文为主）。
// 主线=回家四段路（路径指引），课程为辅助，AI 向导兜底。源头见 docs/.../homepage-v3-way-home-design.md

export const HERO = {
  eyebrow: "心灵家园 · 每个人的家",
  titleA: "不论你迷失在哪里，",
  titleB: "都有一条回家的路。",
  sub: "懂了那么多道理，却依然过不好这一生——不是你不够好，是心还没回家。无论你卡在工作的焦虑、关系的消耗，还是一种说不清的累与空，我们都陪你，找到回家的下一步。",
  ctaPrimary: { label: "找到我回家的下一步", href: "/guide" },
  ctaSecondary: { label: "先看看这条路", href: "#way" },
  trust: ["五年陪伴", "一群正在回家的人", "数千小时免费课程"],
};

// 回家的四段路（主线 · 从三维上升到高维）
export type Stage = {
  n: string;
  stage: string;
  title: string;
  body: string;
  href: string;
  external?: boolean;
  cta: string;
};

export const WAY: { heading: string; intro: string; stages: Stage[] } = {
  heading: "回家的路，分四段走",
  intro: "不必一步到位。你现在在哪一段，就从哪一段开始——路一直都在。",
  stages: [
    {
      n: "一",
      stage: "先驾驭好三维世界",
      title: "把工作留给 AI，把生活留给自己",
      body: "2026 是赤马红羊年，正是翻身上马的时候。让 MAS-Life OS 替你打理工作里那些烦心的重复活，把你的精力，还给最重要的人和事。",
      href: "/mas-life",
      cta: "认识 MAS-Life OS",
    },
    {
      n: "二",
      stage: "激发内在的生命力",
      title: "回到身体，点燃久违的生命力",
      body: "心要回家，得先回到身体。在「以性入道」里，松开压抑，让生命的能量重新流动起来。",
      href: "https://sex2dao.spiritual-oasis.net",
      external: true,
      cta: "了解以性入道",
    },
    {
      n: "三",
      stage: "参透「我是谁」",
      title: "七天闭关，照见本来面目",
      body: "在「参禅悟道」的七天里，断开外界、停下追问，亲自看一眼那个一直替你做决定的「我」到底是谁。",
      href: "/courses/canchan",
      cta: "了解参禅悟道",
    },
    {
      n: "四",
      stage: "探索更高的意识维度",
      title: "打开意识的星门",
      body: "当你准备好，「跨越意识」带你走得更远——去体验意识更深、更广的层次，看见家原本的模样。",
      href: "/courses/kuayue",
      cta: "了解跨越意识",
    },
  ],
};

// 一路有人陪
export const COMPANIONS: {
  heading: string;
  intro: string;
  items: { title: string; body: string; href: string; external?: boolean }[];
} = {
  heading: "这条路上，一直有人陪",
  intro: "回家是慢慢走的事。每一天，都有人在。",
  items: [
    { title: "365 公益陪伴", body: "全年每日清晨的一段陪伴与回应。", href: "/365" },
    { title: "心镜", body: "一面安静的镜子，把你照回给你自己。", href: "https://mind.spiritual-oasis.net", external: true },
    { title: "赛斯对话", body: "与赛斯智慧对话，信念创造实相。", href: "https://seth.org.cn", external: true },
    { title: "365 赛斯壁纸", body: "每日一张，把智慧放进日常。", href: "https://www.futuremind2075.com/seth365", external: true },
  ],
};

// 按渴望走的支线（课程为辅助）
export const NEEDS: {
  heading: string;
  intro: string;
  groups: { want: string; courses: string[]; note: string; href: string; external?: boolean; cta: string }[];
} = {
  heading: "按你此刻的渴望，这些也在",
  intro: "想从具体的事入手？沿着你最在意的那条线，先走起来。",
  groups: [
    {
      want: "想解决财富、活得丰盛",
      courses: ["《21 天丰盛之旅》", "《你值得过更好的生活》"],
      note: "免费课程",
      href: "/academy#growth",
      cta: "去看课程",
    },
    {
      want: "想改变命运、做自己生命的主人",
      courses: ["《了凡四训》新解", "《性自命出》", "《24 周万能金钥》"],
      note: "去宗教化 / 科学化改编",
      href: "/academy#growth",
      cta: "去看课程",
    },
    {
      want: "想探索宇宙的真相",
      courses: ["公众号「高维意识」+ YouTube：2019 至今近 7 年、数千小时赛斯资料免费视频", "楚简《道德经》《庄子》解读", "《六祖坛经》《维摩诘经》《性命圭旨》解读"],
      note: "大量免费",
      href: "https://seth.org.cn",
      external: true,
      cta: "去探索",
    },
  ],
};

// AI 回家向导（兜底接住）
export const GUIDE = {
  eyebrow: "不知道从哪开始？",
  heading: "把此刻的你，说给向导听",
  sub: "它不评判、不替你做决定，只先认真听懂你——然后，陪你找到回家的下一步。无论你迷失在哪里。",
  cta: { label: "和向导聊聊", href: "/guide" },
};

export const CLOSE = {
  heading: "家，一直在这里",
  sub: "你不必先准备好，也不必假装坚强。带着此刻的你，迈出回家的第一步就好。",
  cta: { label: "找到我回家的下一步", href: "/guide" },
};
