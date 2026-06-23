export type CourseFormat = "online" | "retreat" | "app" | "service";

export type Course = {
  id: string;
  titleZh: string;
  titleEn: string;
  blurbZh: string;
  blurbEn: string;
  href: string;
  external: boolean;
  format: CourseFormat;
  cover: string;
  recruiting?: boolean;
};

export type Pillar = {
  id: "future" | "growth" | "companion";
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  courses: Course[];
};

const XIAOE = "https://你的小鹅通地址"; // TODO(Mike): 替换为真实小鹅通店铺地址

export const PILLARS: Pillar[] = [
  {
    id: "future",
    titleZh: "面向未来的教育",
    titleEn: "Future-Ready Education",
    descZh: "以 AI 为助力，重新定义学习与创造。",
    descEn: "AI as leverage — redefining how we learn and create.",
    courses: [
      { id: "mas-life", titleZh: "MAS-Life OS", titleEn: "MAS-Life OS", blurbZh: "本地主权 AI 操作系统，把重复的活交给系统。", blurbEn: "A sovereign local AI OS.", href: "/mas-life", external: false, format: "app", cover: "/images/academy/mas-life.jpg", recruiting: true },
      { id: "onepad", titleZh: "爱宝 OnePad", titleEn: "OnePad", blurbZh: "给体制内孩子的 AI 苏格拉底式提分。", blurbEn: "Socratic AI tutor for in-system students.", href: "https://onepad.spiritual-oasis.net", external: true, format: "app", cover: "/images/academy/onepad.jpg" },
      { id: "futuremind", titleZh: "未来教育学院", titleEn: "Future Mind Academy", blurbZh: "给脱离传统教育的孩子与成人。", blurbEn: "For those beyond traditional schooling.", href: "https://www.futuremind2075.com", external: true, format: "app", cover: "/images/academy/futuremind.jpg" },
    ],
  },
  {
    id: "growth",
    titleZh: "心灵成长教育",
    titleEn: "Inner Growth",
    descZh: "以赛斯资料为核心的课程与练习。",
    descEn: "Courses and practices centered on the Seth material.",
    courses: [
      { id: "kuayue", titleZh: "跨越意识", titleEn: "Crossing Dimensions", blurbZh: "沉浸式意识探索闭关，打开意识的星门。", blurbEn: "An immersive consciousness retreat.", href: "/courses/kuayue", external: false, format: "retreat", cover: "/images/academy/kuayue.jpg", recruiting: true },
      { id: "canchan", titleZh: "参禅悟道 7 天", titleEn: "7-Day Zen", blurbZh: "七天沉浸，照见本来面目。", blurbEn: "Seven days of immersive practice.", href: "/courses/canchan", external: false, format: "retreat", cover: "/images/academy/canchan.jpg", recruiting: true },
      { id: "sex2dao", titleZh: "以性入道", titleEn: "Tao Through Intimacy", blurbZh: "回到身体，连接更高的自己。", blurbEn: "Return to the body, connect with higher self.", href: "https://sex2dao.spiritual-oasis.net", external: true, format: "retreat", cover: "/images/academy/sex2dao.jpg", recruiting: true },
      { id: "xiaoe-healing", titleZh: "疗愈系列", titleEn: "Healing Series", blurbZh: "OM 疗愈、丰盛之旅、动感冥想等。", blurbEn: "Healing, abundance, dynamic meditation.", href: XIAOE, external: true, format: "online", cover: "/images/academy/healing.jpg" },
      { id: "xiaoe-growth", titleZh: "成长系列", titleEn: "Growth Series", blurbZh: "《灵魂永生》《了凡四训》新解等。", blurbEn: "Seth Speaks and more.", href: XIAOE, external: true, format: "online", cover: "/images/academy/growth.jpg" },
    ],
  },
  {
    id: "companion",
    titleZh: "陪伴服务",
    titleEn: "Companionship",
    descZh: "日复一日的陪伴，让成长不孤单。",
    descEn: "Daily companionship for the long road.",
    courses: [
      { id: "365", titleZh: "365 公益陪伴", titleEn: "365 Daily Companion", blurbZh: "全年每日清晨的陪伴与回应。", blurbEn: "Daily wisdom, all year round.", href: "/365", external: false, format: "service", cover: "/images/academy/365.jpg", recruiting: true },
      { id: "mind", titleZh: "心境", titleEn: "Mind", blurbZh: "记录与照见你的内在状态。", blurbEn: "Reflect your inner state.", href: "https://mind.spiritual-oasis.net", external: true, format: "service", cover: "/images/academy/mind.jpg" },
      { id: "seth-dialogue", titleZh: "赛斯对话", titleEn: "Seth Dialogue", blurbZh: "与赛斯智慧对话。", blurbEn: "Dialogue with Seth's wisdom.", href: "https://seth.org.cn", external: true, format: "service", cover: "/images/academy/seth.jpg" },
      { id: "seth-wallpaper", titleZh: "365 赛斯壁纸", titleEn: "365 Seth Wallpapers", blurbZh: "每日一张赛斯智慧壁纸，免费下载。", blurbEn: "A daily Seth-wisdom wallpaper, free to download.", href: "https://www.futuremind2075.com/seth365", external: true, format: "service", cover: "/images/academy/seth-wallpaper.jpg" },
    ],
  },
];

// 顶层"在招"快捷直达项（顺序固定，对应顶层导航）
export const RECRUITING_NAV = [
  { id: "mas-life", href: "/mas-life", labelZh: "MAS-Life OS", labelEn: "MAS-Life OS" },
  { id: "kuayue", href: "/courses/kuayue", labelZh: "跨越意识", labelEn: "Crossing Dimensions" },
  { id: "canchan", href: "/courses/canchan", labelZh: "参禅悟道", labelEn: "7-Day Zen" },
  { id: "sex2dao", href: "https://sex2dao.spiritual-oasis.net", labelZh: "以性入道", labelEn: "Tao Through Intimacy", external: true },
  { id: "365", href: "/365", labelZh: "365公益陪伴", labelEn: "365 Companion" },
];
