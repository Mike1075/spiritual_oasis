export type CourseFormat =
  | "online" // 线上（综合）
  | "retreat" // 线下闭关
  | "app" // 应用 / 工具
  | "service" // 陪伴服务
  | "video" // 录播视频课
  | "live" // 直播课
  | "camp" // 训练营 / 体验营
  | "reading"; // 读书会 / 共修

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
  // 二级小组（仅 growth 支柱用，对应 Pillar.subgroups）
  subgroup?: string;
  // —— 商务字段（付费课）——
  priceFen?: number; // 现价（分）
  originalPriceFen?: number; // 划线原价（分）
  salesCount?: number; // 销量/已报名（小鹅通抓取值，截至 2026-06-25）
  durationLabelZh?: string; // 如 "30 章" / "3 阶"
  durationLabelEn?: string;
  // —— 来源 / 支付对齐 ——
  source?: "internal" | "xiaoe" | "external";
  xiaoeProductId?: string; // p_xxx / course_xxx（对账用）
  productKey?: string; // ★支付 v1 预留：上线后据此切站内购买，不迁数据
};

export type Subgroup = { id: string; titleZh: string; titleEn: string };

export type Pillar = {
  id: "future" | "growth" | "companion";
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  subgroups?: Subgroup[]; // 有则按小组分小节渲染
  courses: Course[];
};

// 小鹅通课程详情页（主扫购买）统一 URL
const XE = (spu: string) =>
  `https://appvwgstfof3025.pc.xiaoe-tech.com/p/t_pc/goods_pc_detail/goods_detail/${spu}?product_id=${spu}`;

export const PILLARS: Pillar[] = [
  {
    id: "future",
    titleZh: "面向未来的教育",
    titleEn: "Future-Ready Education",
    descZh: "以 AI 为助力，重新定义学习、创造与谋生。",
    descEn: "AI as leverage — redefining how we learn, create and earn.",
    courses: [
      { id: "mas-life", titleZh: "MAS-Life OS", titleEn: "MAS-Life OS", blurbZh: "本地主权 AI 操作系统，把重复的活交给系统。", blurbEn: "A sovereign local AI OS.", href: "/mas-life", external: false, source: "internal", format: "app", cover: "/images/academy/mas-life.jpg", recruiting: true },
      { id: "onepad", titleZh: "爱宝 OnePad", titleEn: "OnePad", blurbZh: "给体制内孩子的 AI 苏格拉底式提分。", blurbEn: "Socratic AI tutor for in-system students.", href: "https://onepad.spiritual-oasis.net", external: true, source: "external", format: "app", cover: "/images/academy/onepad.jpg" },
      { id: "futuremind", titleZh: "未来教育学院", titleEn: "Future Mind Academy", blurbZh: "给脱离传统教育的孩子与成人。", blurbEn: "For those beyond traditional schooling.", href: "https://www.futuremind2075.com", external: true, source: "external", format: "app", cover: "/images/academy/futuremind.jpg" },
      // —— 商业 · AI · 创富（小鹅通付费课）——
      { id: "ai-xinshangji", titleZh: "2024 AI 新商机解读", titleEn: "AI Opportunities Decoded", blurbZh: "用高维视角看 AI 时代的新商业机会。", blurbEn: "New business openings in the AI era.", href: XE("p_63c160e0e4b02685a437385c"), external: true, source: "xiaoe", format: "video", cover: "/images/academy/ai-xinshangji.jpg", priceFen: 990, originalPriceFen: 19900, xiaoeProductId: "p_63c160e0e4b02685a437385c", productKey: "xe-ai-xinshangji" },
      { id: "douyin-qihao", titleZh: "玩转抖音起号实战", titleEn: "Douyin Account Kickstart", blurbZh: "抖音从 0 到 1 快速起号最新实战。", blurbEn: "Hands-on Douyin cold-start playbook.", href: XE("p_6387e3b9e4b06159f7168768"), external: true, source: "xiaoe", format: "video", cover: "/images/academy/douyin-qihao.jpg", priceFen: 1100, originalPriceFen: 99900, xiaoeProductId: "p_6387e3b9e4b06159f7168768", productKey: "xe-douyin-qihao" },
      { id: "douyin-yunying", titleZh: "抖音运营实战课", titleEn: "Douyin Operations", blurbZh: "系统化的抖音运营实战体系。", blurbEn: "A systematic Douyin operations course.", href: XE("p_638a1bd0e4b07b055821eff5"), external: true, source: "xiaoe", format: "video", cover: "/images/academy/douyin-yunying.jpg", priceFen: 199900, originalPriceFen: 299900, xiaoeProductId: "p_638a1bd0e4b07b055821eff5", productKey: "xe-douyin-yunying" },
      { id: "ai-funeng", titleZh: "用 AI 赋能 · 智慧启蒙训练营", titleEn: "AI-Empowered Creation Camp", blurbZh: "用 AI 赋能、用心创造的智慧启蒙训练营。", blurbEn: "Create with heart, empowered by AI.", href: XE("p_6444d11fe4b0b0bc2bdb4b50"), external: true, source: "xiaoe", format: "camp", cover: "/images/academy/ai-funeng.jpg", priceFen: 3960000, originalPriceFen: 4960000, xiaoeProductId: "p_6444d11fe4b0b0bc2bdb4b50", productKey: "xe-ai-funeng" },
      { id: "caifu-ying", titleZh: "财富共创实修营", titleEn: "Wealth Co-Creation Camp", blurbZh: "在实修中共创财富的体验营。", blurbEn: "Co-create wealth through practice.", href: XE("p_636d52bee4b0276efeaf1d75"), external: true, source: "xiaoe", format: "camp", cover: "/images/academy/caifu-ying.jpg", priceFen: 299900, originalPriceFen: 299900, xiaoeProductId: "p_636d52bee4b0276efeaf1d75", productKey: "xe-caifu-ying" },
      { id: "caifu-shixiu", titleZh: "财富共创实修", titleEn: "Wealth Co-Creation Practice", blurbZh: "深度的财富共创长程实修。", blurbEn: "A deep, long-form wealth practice.", href: XE("p_65447fefe4b04c100fc1fd06"), external: true, source: "xiaoe", format: "camp", cover: "/images/academy/caifu-shixiu.jpg", priceFen: 3000000, originalPriceFen: 6999000, xiaoeProductId: "p_65447fefe4b04c100fc1fd06", productKey: "xe-caifu-shixiu" },
      { id: "aixue-yipai", titleZh: "爱学一派实修营", titleEn: "Aixue School Camp", blurbZh: "爱学一派的长程实修体系。", blurbEn: "The Aixue-school immersive system.", href: XE("p_6547a0d8e4b023c044f85ea3"), external: true, source: "xiaoe", format: "camp", cover: "/images/academy/aixue-yipai.jpg", priceFen: 3000000, originalPriceFen: 6999000, xiaoeProductId: "p_6547a0d8e4b023c044f85ea3", productKey: "xe-aixue-yipai" },
    ],
  },
  {
    id: "growth",
    titleZh: "心灵成长教育",
    titleEn: "Inner Growth",
    descZh: "以赛斯资料与东方智慧为核心的课程、实修与共修。",
    descEn: "Courses, retreats and practice rooted in Seth & Eastern wisdom.",
    subgroups: [
      { id: "retreat", titleZh: "实修闭关 & 体验营", titleEn: "Retreats & Immersive Camps" },
      { id: "classics", titleZh: "经典智慧解读", titleEn: "Classics Decoded" },
      { id: "selfpaced", titleZh: "自学录播课", titleEn: "Self-Paced Courses" },
      { id: "teacher", titleZh: "师资内训", titleEn: "Teacher Training" },
    ],
    courses: [
      // —— 实修闭关 & 体验营 ——（含现有内部课）
      { id: "kuayue", titleZh: "跨越意识", titleEn: "Crossing Dimensions", blurbZh: "沉浸式意识探索闭关，打开意识的星门。", blurbEn: "An immersive consciousness retreat.", href: "/courses/kuayue", external: false, source: "internal", format: "retreat", subgroup: "retreat", cover: "/images/academy/kuayue.jpg", recruiting: true },
      { id: "canchan", titleZh: "参禅悟道 7 天", titleEn: "7-Day Zen", blurbZh: "七天沉浸，照见本来面目。", blurbEn: "Seven days of immersive practice.", href: "/courses/canchan", external: false, source: "internal", format: "retreat", subgroup: "retreat", cover: "/images/academy/canchan.jpg", recruiting: true, priceFen: 798000, durationLabelZh: "7 天", durationLabelEn: "7 days" },
      { id: "sex2dao", titleZh: "以性入道", titleEn: "Tao Through Intimacy", blurbZh: "回到身体，连接更高的自己。", blurbEn: "Return to the body, connect with higher self.", href: "https://sex2dao.spiritual-oasis.net", external: true, source: "external", format: "retreat", subgroup: "retreat", cover: "/images/academy/sex2dao.jpg", recruiting: true },
      { id: "yixingwudao", titleZh: "灵性的本质 · 以性悟道", titleEn: "The Nature of Spirit", blurbZh: "三阶系列：阴阳极致 / 交融 / 不二之美。", blurbEn: "Three stages of yin-yang awakening.", href: XE("p_6643359ee4b0694ca03408b5"), external: true, source: "xiaoe", format: "retreat", subgroup: "retreat", cover: "/images/academy/yixingwudao.jpg", priceFen: 4540000, originalPriceFen: 6500000, durationLabelZh: "3 阶", durationLabelEn: "3 stages", xiaoeProductId: "p_6643359ee4b0694ca03408b5", productKey: "xe-yixingwudao" },
      { id: "yinyangjizhi", titleZh: "一阶共修 · 阴阳极致之美", titleEn: "Stage 1 · Beauty of Yin-Yang", blurbZh: "具身的自我认知，清理旧信念、奔向新未来。", blurbEn: "Embodied self-knowing; clear old beliefs.", href: XE("p_66446f45e4b023c06682911c"), external: true, source: "xiaoe", format: "retreat", subgroup: "retreat", cover: "/images/academy/yinyangjizhi.jpg", priceFen: 1225000, originalPriceFen: 1599900, salesCount: 37, xiaoeProductId: "p_66446f45e4b023c06682911c", productKey: "xe-yinyangjizhi" },
      { id: "zhanfang-ying", titleZh: "绽放生命体验营 + 性命双修", titleEn: "Life-Blossoming Camp (Recorded)", blurbZh: "第一阶段实修课 · 线上录播。", blurbEn: "Stage-1 practice, recorded.", href: XE("p_6350f866e4b0c94264a5b37a"), external: true, source: "xiaoe", format: "video", subgroup: "retreat", cover: "/images/academy/zhanfang-ying.jpg", priceFen: 1000000, originalPriceFen: 1999800, salesCount: 75, xiaoeProductId: "p_6350f866e4b0c94264a5b37a", productKey: "xe-zhanfang-ying" },
      { id: "zhanfang-liaoyu", titleZh: "绽放生命疗愈体验营", titleEn: "Healing & Blossoming Camp", blurbZh: "线上录播的疗愈体验营，摆脱困境束缚。", blurbEn: "A recorded healing camp.", href: XE("p_634d33cae4b0c94264a4310d"), external: true, source: "xiaoe", format: "video", subgroup: "retreat", cover: "/images/academy/zhanfang-liaoyu.jpg", priceFen: 198000, originalPriceFen: 299900, xiaoeProductId: "p_634d33cae4b0c94264a4310d", productKey: "xe-zhanfang-liaoyu" },
      // —— 经典智慧解读 ——
      { id: "daodejing", titleZh: "高维意识解读《道德经》", titleEn: "Tao Te Ching Decoded", blurbZh: "楚简版《道德经》30 章，每章含解读与练习。", blurbEn: "30 chapters, each with practice.", href: XE("p_630af719e4b0c942648da319"), external: true, source: "xiaoe", format: "video", subgroup: "classics", cover: "/images/academy/daodejing.jpg", priceFen: 299900, salesCount: 173, durationLabelZh: "30 章", durationLabelEn: "30 ch.", xiaoeProductId: "p_630af719e4b0c942648da319", productKey: "xe-daodejing" },
      { id: "zhuangzi-online", titleZh: "《庄子》高维智慧 · 线上直播", titleEn: "Zhuangzi · Live", blurbZh: "你可敢来共逍遥？Mike 老师主讲。", blurbEn: "Dare to roam free — by Mike.", href: XE("p_65775e98e4b064a840ea8ebd"), external: true, source: "xiaoe", format: "live", subgroup: "classics", cover: "/images/academy/zhuangzi-online.jpg", priceFen: 299900, salesCount: 170, xiaoeProductId: "p_65775e98e4b064a840ea8ebd", productKey: "xe-zhuangzi-online" },
      { id: "zhuangzi-offline", titleZh: "《庄子》高维智慧 · 线下实修", titleEn: "Zhuangzi · Retreat", blurbZh: "线下实修版，与《庄子》共逍遥。", blurbEn: "The in-person retreat edition.", href: XE("p_65775dc0e4b023c0210ae30e"), external: true, source: "xiaoe", format: "retreat", subgroup: "classics", cover: "/images/academy/zhuangzi-offline.jpg", priceFen: 1250000, xiaoeProductId: "p_65775dc0e4b023c0210ae30e", productKey: "xe-zhuangzi-offline" },
      { id: "daqimiancheng", titleZh: "大器免成 · 老子的高维教育智慧", titleEn: "Laozi's Education Wisdom", blurbZh: "用高维智慧解读老子的教育之道。", blurbEn: "Laozi's way of education, decoded.", href: XE("p_64a09495e4b0cf39e6df502f"), external: true, source: "xiaoe", format: "video", subgroup: "classics", cover: "/images/academy/daqimiancheng.jpg", priceFen: 299900, originalPriceFen: 399900, xiaoeProductId: "p_64a09495e4b0cf39e6df502f", productKey: "xe-daqimiancheng" },
      // —— 自学录播课 ——
      { id: "zhanfang-tiyan", titleZh: "绽放生命体验课", titleEn: "Life-Blossoming Taster", blurbZh: "Mike 老师的入门体验课，9.9 元尝鲜。", blurbEn: "Mike's intro taster course.", href: XE("course_2ldUgaK9cwAtaHGRQzAYjoo6hGp"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/zhanfang-tiyan.jpg", priceFen: 990, originalPriceFen: 98000, xiaoeProductId: "course_2ldUgaK9cwAtaHGRQzAYjoo6hGp", productKey: "xe-zhanfang-tiyan" },
      { id: "21tian-fengsheng", titleZh: "21 天创造丰盛之旅", titleEn: "21 Days to Abundance", blurbZh: "自学版 21 天丰盛创造练习。", blurbEn: "A 21-day self-paced abundance journey.", href: XE("course_2DF86DLrWCUdQRs6nKSR2Zf6z9o"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/21tian-fengsheng.jpg", priceFen: 2100, originalPriceFen: 99900, durationLabelZh: "21 天", durationLabelEn: "21 days", xiaoeProductId: "course_2DF86DLrWCUdQRs6nKSR2Zf6z9o", productKey: "xe-21tian-fengsheng" },
      { id: "21tian-meirong", titleZh: "21 天心灵美容术", titleEn: "21-Day Soul Beauty", blurbZh: "由内而外的心灵美容视频课。", blurbEn: "Beauty from the inside out.", href: XE("p_636625a3e4b083231ec98325"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/21tian-meirong.jpg", priceFen: 2680000, durationLabelZh: "21 天", durationLabelEn: "21 days", xiaoeProductId: "p_636625a3e4b083231ec98325", productKey: "xe-21tian-meirong" },
      { id: "zhideguo-video", titleZh: "《你值得过更好的生活》视频课", titleEn: "You Deserve a Better Life · Video", blurbZh: "经典赛斯文本的视频精讲。", blurbEn: "A video study of the Seth classic.", href: XE("p_6310f9c1e4b0a51fef1530ac"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/zhideguo-video.jpg", priceFen: 2900, xiaoeProductId: "p_6310f9c1e4b0a51fef1530ac", productKey: "xe-zhideguo-video" },
      { id: "zhideguo-gongxiu", titleZh: "《你值得过更好的生活》实操共修", titleEn: "You Deserve a Better Life · Practice", blurbZh: "Mike 老师亲领的实操共修，跳出金钱游戏。", blurbEn: "Practice-led, escape the money game.", href: XE("p_64b8c532e4b03e4b54dcd592"), external: true, source: "xiaoe", format: "reading", subgroup: "selfpaced", cover: "/images/academy/zhideguo-gongxiu.jpg", priceFen: 299900, originalPriceFen: 499900, xiaoeProductId: "p_64b8c532e4b03e4b54dcd592", productKey: "xe-zhideguo-gongxiu" },
      { id: "zuoziji-zhuren", titleZh: "做自己的主人", titleEn: "Be Your Own Master", blurbZh: "做自己命运主人的实修体系。", blurbEn: "Become the master of your fate.", href: XE("p_62e9e70be4b00a4f372ea93f"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/zuoziji-zhuren.jpg", priceFen: 99800, originalPriceFen: 179900, salesCount: 140, xiaoeProductId: "p_62e9e70be4b00a4f372ea93f", productKey: "xe-zuoziji-zhuren" },
      { id: "liangzi-yangming", titleZh: "量子物理 × 阳明心学", titleEn: "Quantum Physics × Yangming", blurbZh: "Mike 携手德国博士 Jing 解密宇宙真相。", blurbEn: "Decoding reality with quantum & mind.", href: XE("p_64b96626e4b0b0bc2c024ffd"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/liangzi-yangming.jpg", priceFen: 499900, originalPriceFen: 699900, xiaoeProductId: "p_64b96626e4b0b0bc2c024ffd", productKey: "xe-liangzi-yangming" },
      { id: "chengzhang-jihui", titleZh: "心灵成长机会视频课", titleEn: "Growth Opportunity · Video", blurbZh: "系统化的心灵成长长程视频课。", blurbEn: "A long-form growth video course.", href: XE("p_654752a2e4b04c10385e5ec0"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/chengzhang-jihui.jpg", priceFen: 4000000, originalPriceFen: 6999000, xiaoeProductId: "p_654752a2e4b04c10385e5ec0", productKey: "xe-chengzhang-jihui" },
      { id: "chengzhang-jihui22", titleZh: "心灵成长机会视频课 · 22", titleEn: "Growth Opportunity · Vol.22", blurbZh: "心灵成长机会系列第 22 辑。", blurbEn: "Volume 22 of the growth series.", href: XE("p_65449abde4b04c100fc20b87"), external: true, source: "xiaoe", format: "video", subgroup: "selfpaced", cover: "/images/academy/chengzhang-jihui22.jpg", priceFen: 3000000, originalPriceFen: 6999000, xiaoeProductId: "p_65449abde4b04c100fc20b87", productKey: "xe-chengzhang-jihui22" },
      { id: "dushuhui", titleZh: "线上读书会", titleEn: "Online Reading Club", blurbZh: "共读《你值得过更好的生活》《个人与群体事件的本质》。", blurbEn: "Reading the Seth classics together.", href: XE("p_63bcf02ce4b02685a4353aaf"), external: true, source: "xiaoe", format: "reading", subgroup: "selfpaced", cover: "/images/academy/dushuhui.jpg", priceFen: 48000, originalPriceFen: 96000, xiaoeProductId: "p_63bcf02ce4b02685a4353aaf", productKey: "xe-dushuhui" },
      { id: "shengdan", titleZh: "圣诞魔法盛典", titleEn: "Christmas Magic Gala", blurbZh: "一年一度的圣诞共修盛典。", blurbEn: "The annual Christmas gathering.", href: XE("p_636d5fdae4b083231ecc62ed"), external: true, source: "xiaoe", format: "live", subgroup: "selfpaced", cover: "/images/academy/shengdan.jpg", priceFen: 199900, originalPriceFen: 299900, xiaoeProductId: "p_636d5fdae4b083231ecc62ed", productKey: "xe-shengdan" },
      // —— 师资内训 ——
      { id: "jiangshi-neixun", titleZh: "心灵家园讲师内训课", titleEn: "Teacher Training (Latest)", blurbZh: "颠覆认知的实修体系，培养能降维打击的讲师。", blurbEn: "The flagship teacher-training system.", href: XE("p_665be109e4b0d84daadc36b8"), external: true, source: "xiaoe", format: "camp", subgroup: "teacher", cover: "/images/academy/jiangshi-neixun.jpg", priceFen: 4500000, originalPriceFen: 6000000, salesCount: 277, xiaoeProductId: "p_665be109e4b0d84daadc36b8", productKey: "xe-jiangshi-neixun" },
      { id: "jiangshi-2023", titleZh: "2023 讲师内训课", titleEn: "Teacher Training 2023", blurbZh: "2023 年度讲师内训完整体系。", blurbEn: "The 2023 teacher-training edition.", href: XE("p_63ee4c38e4b0fc5d123312e9"), external: true, source: "xiaoe", format: "camp", subgroup: "teacher", cover: "/images/academy/jiangshi-2023.jpg", priceFen: 4500000, xiaoeProductId: "p_63ee4c38e4b0fc5d123312e9", productKey: "xe-jiangshi-2023" },
    ],
  },
  {
    id: "companion",
    titleZh: "陪伴服务",
    titleEn: "Companionship",
    descZh: "日复一日的陪伴，让成长不孤单。",
    descEn: "Daily companionship for the long road.",
    courses: [
      { id: "365", titleZh: "365 公益陪伴", titleEn: "365 Daily Companion", blurbZh: "全年每日清晨的陪伴与回应。", blurbEn: "Daily wisdom, all year round.", href: "/365", external: false, source: "internal", format: "service", cover: "/images/academy/365.jpg", recruiting: true },
      { id: "mind", titleZh: "心境", titleEn: "Mind", blurbZh: "记录与照见你的内在状态。", blurbEn: "Reflect your inner state.", href: "https://mind.spiritual-oasis.net", external: true, source: "external", format: "service", cover: "/images/academy/mind.jpg" },
      { id: "seth-dialogue", titleZh: "赛斯对话", titleEn: "Seth Dialogue", blurbZh: "与赛斯智慧对话。", blurbEn: "Dialogue with Seth's wisdom.", href: "https://seth.org.cn", external: true, source: "external", format: "service", cover: "/images/academy/seth.jpg" },
      { id: "seth-wallpaper", titleZh: "365 赛斯壁纸", titleEn: "365 Seth Wallpapers", blurbZh: "每日一张赛斯智慧壁纸，免费下载。", blurbEn: "A daily Seth-wisdom wallpaper, free to download.", href: "https://www.futuremind2075.com/seth365", external: true, source: "external", format: "service", cover: "/images/academy/seth-wallpaper.jpg" },
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
