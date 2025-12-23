export interface DailyLesson {
  date: string; // YYYY-MM-DD format
  titleZh: string;
  titleEn: string;
  quoteZh: string;
  quoteEn: string;
  contentZh: string;
  contentEn: string;
  actionZh?: string;
  actionEn?: string;
  special?: string; // Holiday or special day
}

export interface MonthData {
  month: number;
  themeZh: string;
  themeEn: string;
  subtitleZh: string;
  subtitleEn: string;
  sourceZh: string;
  sourceEn: string;
  goals: { zh: string; en: string }[];
  lessons: DailyLesson[];
}

export interface QuarterData {
  quarter: number;
  themeZh: string;
  themeEn: string;
  months: number[];
}

export const quarters: QuarterData[] = [
  { quarter: 1, themeZh: "惊醒", themeEn: "Awakening", months: [1, 2, 3] },
  { quarter: 2, themeZh: "扩展", themeEn: "Expansion", months: [4, 5, 6] },
  { quarter: 3, themeZh: "实战", themeEn: "Practice", months: [7, 8, 9] },
  { quarter: 4, themeZh: "飞升", themeEn: "Ascension", months: [10, 11, 12] },
];

export const monthsData: MonthData[] = [
  // January
  {
    month: 1,
    themeZh: "觉醒与初见",
    themeEn: "The Awakening & The Encounter",
    subtitleZh: "认识内我，打破肉体幻觉",
    subtitleEn: "Meet Your Inner Self, Break the Physical Illusion",
    sourceZh: "《灵魂永生》第一章、第二章",
    sourceEn: "Seth Speaks Chapter 1 & 2",
    goals: [
      { zh: "打破只有肉体才是真的这一核心幻觉", en: "Break the core illusion that only physical body is real" },
      { zh: "认识住在你豪宅二楼的内我", en: "Recognize the Inner Self living on the second floor of your mansion" },
      { zh: "建立我创造我自己的实相的初步认知", en: "Establish initial understanding of 'I create my own reality'" },
    ],
    lessons: [
      {
        date: "2026-01-01",
        titleZh: "这不仅是一本书，这是一面镜子",
        titleEn: "This Is Not Just a Book, It's a Mirror",
        quoteZh: "你总以为有肉体和没肉体是两个物种。其实你现在读这段话时，内在那个没有形体的你，比肉体的你更清醒。",
        quoteEn: "You always think 'having a body' and 'not having a body' are two species. Actually, when you read this, the formless you inside is more awake than your physical self.",
        contentZh: "赛斯是谁？为什么一个没有肉身的鬼要写书？把肉身和存在的等号撕掉。",
        contentEn: "Who is Seth? Why does a 'ghost' without a physical body write books? Tear down the equation between 'body' and 'existence'.",
        actionZh: "对着镜子问自己：镜子里的是我，还是正在看镜子的那个是我？",
        actionEn: "Ask yourself in the mirror: Is the one in the mirror 'me', or is the one looking at the mirror 'me'?",
        special: "元旦 New Year's Day"
      },
      {
        date: "2026-01-02",
        titleZh: "我是你的老朋友",
        titleEn: "I Am Your Old Friend",
        quoteZh: "我看不见你们，但我知道你们存在。请你也给我同样的礼遇——假设我是一个真实、完整、充满幽默的生命。",
        quoteEn: "I cannot see you, but I know you exist. Please give me the same courtesy—assume I am a real, complete, humorous being.",
        contentZh: "赛斯的自我介绍。他不是来吓你的，他是穿越时空来和你击掌的。",
        contentEn: "Seth's self-introduction. He's not here to scare you; he's here to high-five you across time and space."
      },
      {
        date: "2026-01-03",
        titleZh: "我来，是为了给你一记耳光",
        titleEn: "I Come to Slap You Awake",
        quoteZh: "你们发明了上帝命运因果，好让自己继续做无助的凡人。我来就是为了拆穿这个谎言。",
        quoteEn: "You invented 'God', 'fate', 'karma' to continue being helpless mortals. I'm here to expose this lie.",
        contentZh: "赛斯的目的不是建立宗教，而是提醒你忘记的事实。",
        contentEn: "Seth's purpose is not to establish religion, but to remind you of forgotten facts."
      },
      {
        date: "2026-01-04",
        titleZh: "第一记当头棒喝",
        titleEn: "The First Wake-Up Call",
        quoteZh: "你就是你实相的唯一创造者。没有例外，没有借口，没有任何更高力量在替你决定任何事。",
        quoteEn: "You are the sole creator of your reality. No exceptions, no excuses, no higher power decides anything for you.",
        contentZh: "关于责任的终极定义。",
        contentEn: "The ultimate definition of 'responsibility'."
      },
      {
        date: "2026-01-05",
        titleZh: "那面不敢看的镜子",
        titleEn: "The Mirror You Dare Not Face",
        quoteZh: "你拒绝承认的第一秒，就开始受苦。你愿意承认的第一秒，就开始觉醒。",
        quoteEn: "The moment you refuse to acknowledge, you begin to suffer. The moment you acknowledge, you begin to awaken.",
        contentZh: "为什么人类拒绝承认自己有神性？",
        contentEn: "Why do humans refuse to acknowledge their divinity?"
      },
      {
        date: "2026-01-06",
        titleZh: "三维世界的局限",
        titleEn: "Limitations of the 3D World",
        quoteZh: "这本书从来不是珍写给你的，而是我直接写给你内在的你。珍只是我借用的钢笔。",
        quoteEn: "This book was never 'written by Jane to you', but 'written directly by me to the you within'. Jane is just my borrowed pen.",
        contentZh: "赛斯如何通过珍·罗伯茨传递信息（心理回旋面）。",
        contentEn: "How Seth transmits information through Jane Roberts (psychological spiral window)."
      },
      {
        date: "2026-01-07",
        titleZh: "本周复盘——你准备好上楼了吗？",
        titleEn: "Weekly Review—Ready to Go Upstairs?",
        quoteZh: "礼貌的敲门声结束了。接下来，我们要把你从豪宅一楼的客厅里拽出来。",
        quoteEn: "The polite knocking is over. Next, we're pulling you out of the first-floor living room of your mansion.",
        contentZh: "总结第一章第一节。",
        contentEn: "Summary of Chapter 1, Section 1."
      },
      {
        date: "2026-01-08",
        titleZh: "你只是住在客厅的囚徒",
        titleEn: "You're Just a Prisoner in the Living Room",
        quoteZh: "赛斯要带你上楼，去看看这座豪宅真正的屋主——内我。",
        quoteEn: "Seth will take you upstairs to meet the true owner of this mansion—your Inner Self.",
        contentZh: "豪宅比喻。你以为五官（窗户）和家具（情绪）就是全部，其实你只住在一楼。",
        contentEn: "The mansion metaphor. You think your five senses (windows) and furniture (emotions) are everything, but you only live on the first floor."
      },
      {
        date: "2026-01-09",
        titleZh: "内我到底在管什么？",
        titleEn: "What Does the Inner Self Actually Manage?",
        quoteZh: "你之所以能活着一秒钟，全靠它。它一旦停工一秒，你立刻死亡。",
        quoteEn: "You can live for a second because of it. If it stops for one second, you die immediately.",
        contentZh: "内我的工作清单（细胞、心跳、伤口愈合）。",
        contentEn: "The Inner Self's task list (cells, heartbeat, wound healing)."
      },
      {
        date: "2026-01-10",
        titleZh: "为什么你听不见它？",
        titleEn: "Why Can't You Hear It?",
        quoteZh: "只有关掉客厅的音响，你才会发现：原来隔壁一直有人在为你工作。",
        quoteEn: "Only by turning off the living room speakers will you discover: someone has always been working for you next door.",
        contentZh: "外我像个尖叫的熊孩子，噪音太大。",
        contentEn: "The outer ego is like a screaming child, too noisy."
      },
      {
        date: "2026-01-11",
        titleZh: "内我也会犯错吗？",
        titleEn: "Does the Inner Self Make Mistakes?",
        quoteZh: "你开玩笑说我想死，它立刻去停你的心脏。它是个不懂幽默感的忠诚管家。",
        quoteEn: "When you jokingly say 'I want to die', it immediately tries to stop your heart. It's a loyal butler with no sense of humor.",
        contentZh: "内我对你的绝对忠诚。",
        contentEn: "The Inner Self's absolute loyalty to you."
      },
      {
        date: "2026-01-12",
        titleZh: "疾病是谁制造的？",
        titleEn: "Who Creates Disease?",
        quoteZh: "你从嘴里说出的每一句丧气话，都被内我当成了最高指令去执行。",
        quoteEn: "Every discouraging word from your mouth is taken as a supreme command by the Inner Self.",
        contentZh: "内我执行外我的指令。",
        contentEn: "The Inner Self executes the outer ego's commands."
      },
      {
        date: "2026-01-13",
        titleZh: "如何和内我做朋友？",
        titleEn: "How to Befriend Your Inner Self?",
        quoteZh: "谢谢你一直为我工作，今晚请替我疗愈。",
        quoteEn: "Thank you for always working for me. Please heal me tonight.",
        contentZh: "具体的练习方法。",
        contentEn: "Specific practice methods.",
        actionZh: "今晚睡前，把身体交给它，说一句：谢谢你一直为我工作，今晚请替我疗愈。",
        actionEn: "Tonight before sleep, surrender your body to it and say: 'Thank you for always working for me. Please heal me tonight.'"
      },
      {
        date: "2026-01-14",
        titleZh: "最残酷也最温柔的真相",
        titleEn: "The Cruelest Yet Gentlest Truth",
        quoteZh: "你以为你醒着，其实外我在做梦；真正醒着的，永远是内我。",
        quoteEn: "You think you're awake, but the outer ego is dreaming; the one truly awake is always the Inner Self.",
        contentZh: "谁在做梦？谁在醒着？",
        contentEn: "Who is dreaming? Who is awake?"
      },
      {
        date: "2026-01-15",
        titleZh: "死后去哪里？",
        titleEn: "Where Do You Go After Death?",
        quoteZh: "我的世界不是你们死后要去的地方。想进我这个层面，你还要死很多次。",
        quoteEn: "My world is not where you go after death. To reach my level, you need to die many more times.",
        contentZh: "打破天堂地狱的幻想。",
        contentEn: "Breaking the illusion of heaven and hell."
      },
      {
        date: "2026-01-16",
        titleZh: "没有房子的家",
        titleEn: "A Home Without Houses",
        quoteZh: "你们用十年建成的房子，我一个念头就完成。这不是炫耀，这是意识本来的速度。",
        quoteEn: "What takes you ten years to build, I complete with one thought. This isn't bragging—this is consciousness's natural speed.",
        contentZh: "意念即实相。",
        contentEn: "Thought is reality."
      },
      {
        date: "2026-01-17",
        titleZh: "我们为什么这么慢？",
        titleEn: "Why Are We So Slow?",
        quoteZh: "你们之所以觉得慢，只是因为你们相信慢。你们把创造力当奢侈品，我们把它当空气。",
        quoteEn: "You feel slow because you believe in 'slow'. You treat creativity as luxury; we treat it as air.",
        contentZh: "物质世界的延迟属性。",
        contentEn: "The delay property of the physical world."
      },
      {
        date: "2026-01-18",
        titleZh: "空间不是容器",
        titleEn: "Space Is Not a Container",
        quoteZh: "你们的空间有里面和外面，我的空间只有更里面。",
        quoteEn: "Your space has 'inside' and 'outside'; my space only has 'deeper inside'.",
        contentZh: "空间是意识的肌肉。",
        contentEn: "Space is the muscle of consciousness."
      },
      {
        date: "2026-01-19",
        titleZh: "没有身体的情感",
        titleEn: "Emotions Without a Body",
        quoteZh: "赛斯开心时，空间开满花。他对你们的爱，比地球上所有爱情加起来浓烈一万倍。",
        quoteEn: "When Seth is happy, flowers bloom in space. His love for you is ten thousand times more intense than all love on Earth combined.",
        contentZh: "没有荷尔蒙，情感反而更浓烈。",
        contentEn: "Without hormones, emotions become even more intense."
      },
      {
        date: "2026-01-20",
        titleZh: "创造的狂喜",
        titleEn: "The Ecstasy of Creation",
        quoteZh: "每当一个学生明白我是创造者，我会像疯子一样放烟火。",
        quoteEn: "Whenever a student realizes 'I am the creator', I go crazy setting off fireworks.",
        contentZh: "赛斯最常体验的情绪。",
        contentEn: "The emotion Seth experiences most often."
      },
      {
        date: "2026-01-21",
        titleZh: "赛斯的工作",
        titleEn: "Seth's Work",
        quoteZh: "你们是我教过的最笨、也最可爱的学生。我得花二十一年教你们这群幼儿园小孩。",
        quoteEn: "You are the dumbest yet cutest students I've ever taught. I spent 21 years teaching you kindergartners.",
        contentZh: "宇宙最苦命的老师。",
        contentEn: "The universe's most long-suffering teacher."
      },
      {
        date: "2026-01-22",
        titleZh: "形象的真相",
        titleEn: "The Truth About Appearance",
        quoteZh: "你可以一秒钟变成你最想成为的人，也可以变成你最怕的人。我们只是把变身速度加速到了光速。",
        quoteEn: "You can become whoever you most want or fear in one second. We just accelerated transformation to light speed.",
        contentZh: "赛斯可以变身成任何人。",
        contentEn: "Seth can transform into anyone."
      },
      {
        date: "2026-01-23",
        titleZh: "你也在时刻变脸",
        titleEn: "You're Also Constantly Changing",
        quoteZh: "你的愤怒让脸变丑，你的爱让眼睛变亮。你每分每秒都在重新创造身体。",
        quoteEn: "Your anger makes your face ugly; your love makes your eyes bright. You're recreating your body every second.",
        contentZh: "情绪改变相貌。",
        contentEn: "Emotions change appearance."
      },
      {
        date: "2026-01-24",
        titleZh: "时间是海洋，不是河流",
        titleEn: "Time Is an Ocean, Not a River",
        quoteZh: "你们在时间里排队，我们在时间里冲浪。",
        quoteEn: "You queue in time; we surf in time.",
        contentZh: "赛斯的现在包含过去未来。",
        contentEn: "Seth's 'now' contains past and future."
      },
      {
        date: "2026-01-25",
        titleZh: "同时性时间",
        titleEn: "Simultaneous Time",
        quoteZh: "我同时看着珍第一次吓坏，看着罗手抽筋，看着现在的你流泪。这些瞬间是一串珍珠，我一把抓在手里。",
        quoteEn: "I simultaneously watch Jane's first fright, Rob's hand cramping, and you crying now. These moments are a string of pearls I hold in my hand.",
        contentZh: "1963年和2026年是同一个点。",
        contentEn: "1963 and 2026 are the same point."
      },
      {
        date: "2026-01-26",
        titleZh: "你并没有在等死",
        titleEn: "You're Not 'Waiting to Die'",
        quoteZh: "你们把自己关进一个又小、又慢的笼子，然后假装那是宇宙的全部。",
        quoteEn: "You locked yourself in a small, slow cage, then pretend that's all the universe is.",
        contentZh: "现在的状态就是死后的状态之一。",
        contentEn: "Your current state is one of the after-death states."
      },
      {
        date: "2026-01-27",
        titleZh: "笼子的门没锁",
        titleEn: "The Cage Door Isn't Locked",
        quoteZh: "只要你愿意抬头，我立刻把笼子拆了。",
        quoteEn: "Just lift your head, and I'll dismantle the cage immediately.",
        contentZh: "赛斯拿着钥匙站在外面。",
        contentEn: "Seth stands outside holding the key."
      },
      {
        date: "2026-01-28",
        titleZh: "别等下辈子",
        titleEn: "Don't Wait for Next Life",
        quoteZh: "伸手过来。现在。这一秒。因为在我的时间里，根本没有下辈子。",
        quoteEn: "Reach out your hand. Now. This second. Because in my time, there is no 'next life'.",
        contentZh: "当下的力量。",
        contentEn: "The power of now."
      },
      {
        date: "2026-01-29",
        titleZh: "第一月的复盘",
        titleEn: "First Month Review",
        quoteZh: "这一个月，我有没有把责任推给过外在？",
        quoteEn: "This month, did I push responsibility to external factors?",
        contentZh: "回顾我是创造者和内我的概念。",
        contentEn: "Review the concepts of 'I am the creator' and 'Inner Self'.",
        actionZh: "再次对自己说：这一个月，我有没有把责任推给过外在？",
        actionEn: "Ask yourself again: This month, did I blame anything external?"
      },
      {
        date: "2026-01-30",
        titleZh: "预告——身体是你的第一件作品",
        titleEn: "Preview—Your Body Is Your First Creation",
        quoteZh: "你以为你有身体？错。你只有一堆信念，刚好长成了你现在的形状。",
        quoteEn: "You think you have a body? Wrong. You only have a pile of beliefs that happened to grow into your current shape.",
        contentZh: "从意识转向肉体。",
        contentEn: "Shifting from consciousness to body."
      },
      {
        date: "2026-01-31",
        titleZh: "一月最终练习——回家",
        titleEn: "January Final Practice—Coming Home",
        quoteZh: "嘿，我认出你了。",
        quoteEn: "Hey, I recognize you now.",
        contentZh: "结合第二章结尾的冥想。",
        contentEn: "Combined with the meditation at the end of Chapter 2.",
        actionZh: "闭上眼，想象那个没有肉身的赛斯，甚至那个没有肉身的你，正微笑着看着此刻拿着手机的你。说一声：嘿，我认出你了。",
        actionEn: "Close your eyes, imagine the bodiless Seth, or even the bodiless 'you', smiling at you holding your phone. Say: 'Hey, I recognize you now.'"
      }
    ]
  },
  // February - Body & Beliefs
  {
    month: 2,
    themeZh: "身体与信念",
    themeEn: "Body & Beliefs",
    subtitleZh: "细胞是有意识的伙伴，疾病是红色警告",
    subtitleEn: "Cells Are Conscious Partners, Disease Is a Red Warning",
    sourceZh: "《灵魂永生》第三章、第十章",
    sourceEn: "Seth Speaks Chapter 3 & 10",
    goals: [
      { zh: "粉碎身体是生化机器的旧观念", en: "Shatter the old concept of 'body as biochemical machine'" },
      { zh: "建立细胞是有意识的伙伴的新关系", en: "Build a new relationship with 'cells as conscious partners'" },
      { zh: "学会疾病是红色警告信的解读法", en: "Learn to interpret 'disease as red warning letter'" },
      { zh: "掌握自我信念手术的核心技术", en: "Master the core technique of 'self-belief surgery'" },
    ],
    lessons: [
      {
        date: "2026-02-01",
        titleZh: "身体不是你的，是你的幻觉",
        titleEn: "Your Body Isn't Yours, It's Your Illusion",
        quoteZh: "你以为你有一具身体？错。你有一堆信念，而这堆信念刚好长成了你现在摸得到的形状。",
        quoteEn: "You think you have a body? Wrong. You have a pile of beliefs that happen to take the shape you can touch now.",
        contentZh: "身体不是客观存在的机器，是信念实时打印出来的。",
        contentEn: "The body is not an objectively existing machine—it's printed in real-time by your beliefs.",
        actionZh: "摸摸你现在的脸，问自己：这是我现在的哪个信念长出来的？",
        actionEn: "Touch your face now and ask yourself: 'Which of my current beliefs grew this?'"
      },
      {
        date: "2026-02-02",
        titleZh: "实时投影仪",
        titleEn: "Real-Time Projector",
        quoteZh: "你今天照镜子骂自己丑，下一秒你的脸就真的变丑了0.01毫米。你不是在变老，你是在变信。",
        quoteEn: "Call yourself 'ugly' in the mirror today, and your face becomes 0.01mm uglier the next second. You're not aging—you're 'believing'.",
        contentZh: "身体变化的即时性。",
        contentEn: "The immediacy of body changes."
      },
      {
        date: "2026-02-03",
        titleZh: "每七年杀自己一次",
        titleEn: "Kill Yourself Every Seven Years",
        quoteZh: "旧细胞带着旧信念死去，新细胞带着新信念出生。如果你还在受苦，是因为你把旧信念传染给了新细胞。",
        quoteEn: "Old cells die with old beliefs, new cells are born with new beliefs. If you're still suffering, it's because you infected new cells with old beliefs.",
        contentZh: "细胞更新与信念更新。",
        contentEn: "Cell renewal and belief renewal."
      },
      {
        date: "2026-02-04",
        titleZh: "最诚实的镜子",
        titleEn: "The Most Honest Mirror",
        quoteZh: "你嘴上说我很幸福，你的胃溃疡却在说我受够了。身体是你对自己下的最新判决书。",
        quoteEn: "Your mouth says 'I'm happy', but your stomach ulcer says 'I've had enough'. Your body is the latest verdict you've passed on yourself.",
        contentZh: "身体从不撒谎。",
        contentEn: "The body never lies."
      },
      {
        date: "2026-02-05",
        titleZh: "遗传是借口",
        titleEn: "Genetics Is an Excuse",
        quoteZh: "你敢说你没信过遗传不可抗？基因只是蓝图，信念才是施工队。",
        quoteEn: "Dare you say you never believed 'genetics can't be fought'? Genes are just blueprints; beliefs are the construction crew.",
        contentZh: "打破基因决定论。",
        contentEn: "Breaking genetic determinism."
      },
      {
        date: "2026-02-06",
        titleZh: "并没有意外受伤",
        titleEn: "There Are No 'Accidental' Injuries",
        quoteZh: "你切菜切到手，不是因为刀快，是因为你在那一秒想惩罚自己。没有意外，只有精准的自我攻击。",
        quoteEn: "You cut your hand not because the knife was sharp, but because you wanted to punish yourself at that moment. No accidents, only precise self-attacks.",
        contentZh: "受伤的信念根源。",
        contentEn: "The belief root of injuries."
      },
      {
        date: "2026-02-07",
        titleZh: "本周复盘——认领你的作品",
        titleEn: "Weekly Review—Claim Your Creation",
        quoteZh: "看着镜子里的赘肉、皱纹、病痛，说一句：这是我雕刻的。既然是我雕的，我就能重雕。",
        quoteEn: "Look at the fat, wrinkles, and pain in the mirror and say: 'I sculpted this. Since I carved it, I can re-carve it.'",
        contentZh: "对身体负全责。",
        contentEn: "Taking full responsibility for your body."
      },
      {
        date: "2026-02-08",
        titleZh: "50万亿个孩子",
        titleEn: "50 Trillion Children",
        quoteZh: "它们不是为你打工的奴隶，它们是自愿来当你的孩子。它们有记忆、有喜怒哀乐，而且全都在听你说话。",
        quoteEn: "They're not slaves working for you—they volunteered to be your children. They have memories, emotions, and they're all listening to you.",
        contentZh: "细胞的意识。",
        contentEn: "The consciousness of cells."
      },
      {
        date: "2026-02-09",
        titleZh: "别再下毒了",
        titleEn: "Stop Poisoning Them",
        quoteZh: "你说我心脏不好，心肌细胞立刻集体罢工。你说我活不下去了，免疫细胞立刻放下武器。",
        quoteEn: "Say 'my heart is bad', and heart cells go on strike. Say 'I can't go on', and immune cells lay down their weapons.",
        contentZh: "负面语言对细胞的杀伤力。",
        contentEn: "The killing power of negative words on cells."
      },
      {
        date: "2026-02-10",
        titleZh: "细胞的盲目忠诚",
        titleEn: "Cells' Blind Loyalty",
        quoteZh: "你开玩笑说我要死了，细胞含着泪说好，听爸爸的，然后开始停止工作。",
        quoteEn: "You joke 'I want to die', and cells say with tears 'okay, listening to daddy', then start shutting down.",
        contentZh: "细胞不会反抗，只会执行。",
        contentEn: "Cells don't rebel—they only execute."
      },
      {
        date: "2026-02-11",
        titleZh: "对身体的暴政",
        titleEn: "Tyranny Over Your Body",
        quoteZh: "你们吃药、化疗，把细胞当敌人轰炸，却从不低头对它们说一声：对不起，是我错了。",
        quoteEn: "You take drugs, do chemo, bomb cells like enemies, but never bow down to say: 'Sorry, I was wrong.'",
        contentZh: "吃药开刀是对细胞的战争。",
        contentEn: "Medicine and surgery are war on your cells."
      },
      {
        date: "2026-02-12",
        titleZh: "道歉的力量",
        titleEn: "The Power of Apology",
        quoteZh: "今晚把手放在你最痛的部位，说：对不起，让你背锅了。谢谢你一直为我拼命。",
        quoteEn: "Tonight, place your hand on your most painful part and say: 'Sorry for making you take the blame. Thank you for fighting for me.'",
        contentZh: "疗愈第一步——低头。",
        contentEn: "First step of healing—bow your head.",
        actionZh: "今晚把手放在你最痛的部位，说：对不起，让你背锅了。谢谢你一直为我拼命。",
        actionEn: "Tonight, place your hand on your most painful part and say: 'Sorry for making you take the blame. Thank you for fighting for me.'"
      },
      {
        date: "2026-02-13",
        titleZh: "爱的指令",
        titleEn: "Commands of Love",
        quoteZh: "你敢把信念换成爱，你的身体就敢在下一秒变成天堂。",
        quoteEn: "Dare to replace beliefs with love, and your body will dare to become heaven in the next second.",
        contentZh: "如何用爱重写细胞程序。",
        contentEn: "How to rewrite cell programs with love."
      },
      {
        date: "2026-02-14",
        titleZh: "和你的身体谈场恋爱",
        titleEn: "Fall in Love with Your Body",
        quoteZh: "与其等别人送花，不如送给你的细胞一句我爱你。这才是能救命的情话。",
        quoteEn: "Instead of waiting for flowers from others, give your cells an 'I love you'. That's the love talk that saves lives.",
        contentZh: "最高级的自爱。",
        contentEn: "The highest form of self-love.",
        special: "情人节 Valentine's Day"
      },
      {
        date: "2026-02-15",
        titleZh: "疾病不是敌人",
        titleEn: "Disease Is Not the Enemy",
        quoteZh: "疾病是你最好的朋友假扮成敌人来救你。它把你拖到镜子前，逼你看见：你正在用信念自杀。",
        quoteEn: "Disease is your best friend disguised as an enemy to save you. It drags you to the mirror, forcing you to see: you're committing suicide with beliefs.",
        contentZh: "疾病的通信功能。",
        contentEn: "The communication function of disease."
      },
      {
        date: "2026-02-16",
        titleZh: "读懂你的病（一）",
        titleEn: "Read Your Disease (Part 1)",
        quoteZh: "癌症是压抑太久的呐喊：看见我！心脏病是你拒绝听从自己的心。",
        quoteEn: "Cancer is a long-suppressed cry: 'See me!' Heart disease is refusing to listen to your own heart.",
        contentZh: "癌症与心脏病。",
        contentEn: "Cancer and heart disease."
      },
      {
        date: "2026-02-17",
        titleZh: "读懂你的病（二）",
        titleEn: "Read Your Disease (Part 2)",
        quoteZh: "肥胖是因为你觉得世界不安全，需要脂肪做盔甲。疼痛是逼你去感受你一直逃避的痛苦。",
        quoteEn: "Obesity is because you feel the world isn't safe and need fat as armor. Pain forces you to feel what you've been avoiding.",
        contentZh: "疼痛与肥胖。",
        contentEn: "Pain and obesity."
      },
      {
        date: "2026-02-18",
        titleZh: "医生的真实角色",
        titleEn: "The Doctor's True Role",
        quoteZh: "医生、药、手术只是负责把生病这个信念快递给你。医生只是替你按下你自己选好的确认键。",
        quoteEn: "Doctors, medicine, surgery just deliver the belief 'being sick' to you. Doctors just press the 'confirm' button you already chose.",
        contentZh: "医生只是快递员。",
        contentEn: "Doctors are just delivery people."
      },
      {
        date: "2026-02-19",
        titleZh: "为什么药有效？",
        titleEn: "Why Does Medicine Work?",
        quoteZh: "不是药治好了你，是你相信药能治好我这个信念治好了你。药只是信念的道具。",
        quoteEn: "Medicine doesn't heal you—the belief 'medicine can heal me' heals you. Medicine is just a prop for beliefs.",
        contentZh: "安慰剂效应的本质。",
        contentEn: "The essence of the placebo effect."
      },
      {
        date: "2026-02-20",
        titleZh: "没有不治之症",
        titleEn: "No 'Incurable' Disease",
        quoteZh: "所有没治好的病，都是患者死死抱住旧信念不肯松手。",
        quoteEn: "Every uncured disease is a patient clutching old beliefs and refusing to let go.",
        contentZh: "只有不可救药的信念。",
        contentEn: "There are only incurable beliefs."
      },
      {
        date: "2026-02-21",
        titleZh: "本周复盘——收下这封信",
        titleEn: "Weekly Review—Receive This Letter",
        quoteZh: "别再问怎么治好它，先问它想告诉我什么。信读懂了，邮差（病）自然就走了。",
        quoteEn: "Stop asking 'how to cure it', first ask 'what is it trying to tell me'. When the letter is understood, the postman (disease) leaves.",
        contentZh: "停止对抗，开始阅读。",
        contentEn: "Stop fighting, start reading."
      },
      {
        date: "2026-02-22",
        titleZh: "衰老是集体催眠",
        titleEn: "Aging Is Collective Hypnosis",
        quoteZh: "人类衰老不是自然规律，是地球上最成功的集体催眠。你从五岁就开始被注射人会老的毒品。",
        quoteEn: "Human aging isn't natural law—it's Earth's most successful collective hypnosis. You've been injected with 'people age' since you were five.",
        contentZh: "人为什么会老？",
        contentEn: "Why do people age?"
      },
      {
        date: "2026-02-23",
        titleZh: "皱纹是你画上去的",
        titleEn: "You Drew Those Wrinkles",
        quoteZh: "你每一次叹气说岁月不饶人，你的胶原蛋白就流失一点。现在怪谁？",
        quoteEn: "Every time you sigh 'time spares no one', your collagen depletes a bit. Who's to blame now?",
        contentZh: "信念对容貌的刻画。",
        contentEn: "How beliefs carve your appearance."
      },
      {
        date: "2026-02-24",
        titleZh: "死亡是毕业典礼",
        titleEn: "Death Is Graduation",
        quoteZh: "没有意外死亡。所有死亡都是你自己提前按了交卷按钮。你想续约，随时可以。",
        quoteEn: "There are no accidental deaths. All deaths are you pressing 'submit' early. You can renew your contract anytime.",
        contentZh: "死亡是预约制。",
        contentEn: "Death is by appointment."
      },
      {
        date: "2026-02-25",
        titleZh: "别怕死，怕没活过",
        titleEn: "Don't Fear Death, Fear Not Living",
        quoteZh: "你把人会死这个信念当圣旨，所以死神才敢来收你。你敢拔掉这个信念，死神就敢给你放假。",
        quoteEn: "You treat 'people die' as sacred decree, so Death dares collect you. Dare to pull out this belief, and Death will give you a vacation.",
        contentZh: "对死亡的恐惧源于对生的辜负。",
        contentEn: "Fear of death comes from betraying life."
      },
      {
        date: "2026-02-26",
        titleZh: "终极疗愈——对自己开刀",
        titleEn: "Ultimate Healing—Operate on Yourself",
        quoteZh: "把手放在病灶上，说：我知道是你，现在我撤销那个信念。你可以走了。",
        quoteEn: "Place your hand on the affected area and say: 'I know it's you. I now revoke that belief. You can leave.'",
        contentZh: "手术刀练习。",
        contentEn: "The scalpel exercise.",
        actionZh: "把手放在病灶上，说：我知道是你，现在我撤销那个信念。你可以走了。",
        actionEn: "Place your hand on the affected area and say: 'I know it's you. I now revoke that belief. You can leave.'"
      },
      {
        date: "2026-02-27",
        titleZh: "要么杀信念，要么被信念杀",
        titleEn: "Kill Beliefs or Be Killed by Them",
        quoteZh: "刀在你手里。你不敢切除旧信念，旧信念就会切除你的器官。选。",
        quoteEn: "The knife is in your hand. If you don't dare cut out old beliefs, old beliefs will cut out your organs. Choose.",
        contentZh: "最后的通牒。",
        contentEn: "The final ultimatum."
      },
      {
        date: "2026-02-28",
        titleZh: "二月总结——你是你自己的神医",
        titleEn: "February Summary—You Are Your Own Healer",
        quoteZh: "医生只能救你的命，只有你能救你的心。当心变了，命就不用救了，它自己会发光。",
        quoteEn: "Doctors can only save your life; only you can save your heart. When the heart changes, life doesn't need saving—it glows on its own.",
        contentZh: "回顾整个二月。",
        contentEn: "Review of the entire February."
      }
    ]
  },
  // March
  {
    month: 3,
    themeZh: "时间与轮回",
    themeEn: "Time & Reincarnation",
    subtitleZh: "没有前世，只有同时世",
    subtitleEn: "No Past Lives, Only Simultaneous Lives",
    sourceZh: "《灵魂永生》第四章、第六章",
    sourceEn: "Seth Speaks Chapter 4 & 6",
    goals: [
      { zh: "把前世今生的时间轴撕碎，建立同时性时间观", en: "Tear up the timeline of past/present lives, establish simultaneous time view" },
      { zh: "认识存有（Entity），明白你只是剧团里的演员", en: "Recognize the 'Entity', understand you're just an actor in a troupe" },
      { zh: "打破因果报应的恐吓，理解业是自我平衡", en: "Break the threat of 'karma', understand karma is self-balancing" },
      { zh: "和解原生家庭：是你自己求着他们来演反派的", en: "Reconcile with family: you begged them to play villains" },
    ],
    lessons: [
      {
        date: "2026-03-01",
        titleZh: "时间是幻觉之王",
        titleEn: "Time Is the King of Illusions",
        quoteZh: "你们把时间当成监狱的铁栏杆，其实它只是一堵用信念画上去的墙。",
        quoteEn: "You treat time as prison bars, but it's just a wall painted by beliefs.",
        contentZh: "进入第三月，开始质疑时间。",
        contentEn: "Entering the third month, start questioning time."
      },
      {
        date: "2026-03-02",
        titleZh: "过去从未过去",
        titleEn: "The Past Never Passed",
        quoteZh: "你以为童年已经结束？那个五岁的你现在还在那里哭泣，等你回去抱他。",
        quoteEn: "You think childhood is over? That five-year-old you is still there crying, waiting for you to hug them.",
        contentZh: "过去不是已经发生的，而是正在发生的。",
        contentEn: "The past isn't what happened, it's what's happening."
      },
      {
        date: "2026-03-03",
        titleZh: "未来已经到了",
        titleEn: "The Future Has Already Arrived",
        quoteZh: "你担心的那个未来？它早就发生了。你现在只是在看一部你自己写好的剧本。",
        quoteEn: "That future you worry about? It already happened. You're just watching a script you wrote yourself.",
        contentZh: "未来不是会发生的，而是已发生的。",
        contentEn: "The future isn't what will happen, it's what has happened."
      },
      {
        date: "2026-03-04",
        titleZh: "同时性时间",
        titleEn: "Simultaneous Time",
        quoteZh: "把过去、现在、未来想象成三个房间。你以为它们是走廊上的三扇门，其实它们叠在同一个地方。",
        quoteEn: "Imagine past, present, future as three rooms. You think they're three doors in a hallway, but they're stacked in the same place.",
        contentZh: "同时性时间的核心概念。",
        contentEn: "The core concept of simultaneous time."
      },
      {
        date: "2026-03-05",
        titleZh: "你一直在换时间轨",
        titleEn: "You're Always Switching Timelines",
        quoteZh: "每一个念头，你都跳进了一个不同的时间线。你每秒钟死一亿次、生一亿次。",
        quoteEn: "With every thought, you jump into a different timeline. You die and are born a billion times per second.",
        contentZh: "念头与时间线的关系。",
        contentEn: "The relationship between thoughts and timelines."
      },
      {
        date: "2026-03-06",
        titleZh: "为什么你感觉时间在流动？",
        titleEn: "Why Does Time Feel Like It's Flowing?",
        quoteZh: "因为你们的外我一次只能处理一帧画面。你不是在时间里走，是你的注意力在画面之间跳。",
        quoteEn: "Because your outer ego can only process one frame at a time. You're not walking in time; your attention is jumping between frames.",
        contentZh: "时间流动的幻觉来源。",
        contentEn: "The source of the flowing time illusion."
      },
      {
        date: "2026-03-07",
        titleZh: "本周复盘——时间的三维立方体",
        titleEn: "Weekly Review—The 3D Cube of Time",
        quoteZh: "把你的时间线画成一条直线，然后用剪刀剪碎，撒到空中。那才是时间真正的样子。",
        quoteEn: "Draw your timeline as a straight line, then cut it with scissors and scatter it in the air. That's what time really looks like.",
        contentZh: "复盘同时性时间观。",
        contentEn: "Review the simultaneous time concept."
      },
      {
        date: "2026-03-08",
        titleZh: "前世是横向的",
        titleEn: "Past Lives Are Horizontal",
        quoteZh: "你们总说前世今生，好像灵魂排着队轮流投胎。错，它们同时存在，正在平行世界里同时活着。",
        quoteEn: "You always say 'past lives, present life', as if souls queue up to reincarnate. Wrong—they exist simultaneously, living in parallel worlds right now.",
        contentZh: "打破线性轮回观。",
        contentEn: "Break the linear reincarnation view.",
        special: "妇女节 Women's Day"
      },
      {
        date: "2026-03-09",
        titleZh: "你不是轮回的，你是分裂的",
        titleEn: "You Don't Reincarnate, You Split",
        quoteZh: "想象你的灵魂是一块大饼。投胎不是重新做饼，而是切一小块扔进地球的油锅。",
        quoteEn: "Imagine your soul as a big pancake. Incarnation isn't making a new pancake—it's cutting a small piece and throwing it into Earth's frying pan.",
        contentZh: "分裂投胎的比喻。",
        contentEn: "The metaphor of split incarnation."
      },
      {
        date: "2026-03-10",
        titleZh: "认识你的存有（Entity）",
        titleEn: "Meet Your Entity",
        quoteZh: "你只是剧团里的一个演员。存有是整个剧团的老板，同时看着舞台上所有的演员。",
        quoteEn: "You're just one actor in a troupe. The Entity is the boss watching all actors on stage simultaneously.",
        contentZh: "存有（Entity）的概念。",
        contentEn: "The concept of Entity."
      },
      {
        date: "2026-03-11",
        titleZh: "剧团的其他演员",
        titleEn: "Other Actors in the Troupe",
        quoteZh: "你在古埃及的那一世、在未来火星的那一世，现在都醒着，都在呼吸，都在影响你。",
        quoteEn: "Your life in ancient Egypt, your life on future Mars—they're all awake now, all breathing, all influencing you.",
        contentZh: "平行人格的存在。",
        contentEn: "The existence of parallel personalities."
      },
      {
        date: "2026-03-12",
        titleZh: "为什么会有既视感？",
        titleEn: "Why Do You Have Déjà Vu?",
        quoteZh: "既视感不是你经历过这一幕，而是另一个你正在经历，你们的信号交叉了。",
        quoteEn: "Déjà vu isn't you having experienced this scene—it's another you experiencing it right now, and your signals crossed.",
        contentZh: "既视感的真正原因。",
        contentEn: "The real reason for déjà vu."
      },
      {
        date: "2026-03-13",
        titleZh: "你们互相帮助",
        titleEn: "You Help Each Other",
        quoteZh: "你学会的每一课，都会瞬间传给所有平行的你。你在帮他们上课，他们也在帮你交作业。",
        quoteEn: "Every lesson you learn instantly transmits to all parallel yous. You're helping them learn; they're helping you with homework.",
        contentZh: "平行人格之间的连接。",
        contentEn: "The connection between parallel personalities."
      },
      {
        date: "2026-03-14",
        titleZh: "本周复盘——你是一整个剧团",
        titleEn: "Weekly Review—You Are an Entire Troupe",
        quoteZh: "闭上眼，感受另一个你在某个时空正在笑。你们的快乐是同一块蛋糕。",
        quoteEn: "Close your eyes, feel another you laughing in some time-space. Your happiness is the same piece of cake.",
        contentZh: "复盘存有与平行人格。",
        contentEn: "Review Entity and parallel personalities."
      },
      {
        date: "2026-03-15",
        titleZh: "业力不是惩罚",
        titleEn: "Karma Is Not Punishment",
        quoteZh: "你们把业力当成法官的判决书，其实它只是你自己给自己出的考题。",
        quoteEn: "You treat karma as a judge's verdict, but it's just an exam you set for yourself.",
        contentZh: "重新理解业力。",
        contentEn: "Reunderstanding karma."
      },
      {
        date: "2026-03-16",
        titleZh: "没有神在惩罚你",
        titleEn: "No God Is Punishing You",
        quoteZh: "宇宙里没有法庭，没有法官，没有陪审团。只有你自己坐在镜子前审判自己。",
        quoteEn: "There's no court in the universe, no judge, no jury. Only you sitting in front of a mirror judging yourself.",
        contentZh: "打破因果报应的恐吓。",
        contentEn: "Break the threat of karmic retribution."
      },
      {
        date: "2026-03-17",
        titleZh: "业是自我平衡",
        titleEn: "Karma Is Self-Balancing",
        quoteZh: "你杀了人，不是神要惩罚你。而是你自己想体验被杀的感觉，好理解生命的完整。",
        quoteEn: "If you killed someone, it's not God punishing you. It's you wanting to experience being killed to understand life's wholeness.",
        contentZh: "业力的自我平衡本质。",
        contentEn: "The self-balancing nature of karma."
      },
      {
        date: "2026-03-18",
        titleZh: "随时可以撕毁旧合同",
        titleEn: "You Can Tear Up Old Contracts Anytime",
        quoteZh: "你以为前世欠的债要还一辈子？不，你随时可以说我不玩了，然后走出考场。",
        quoteEn: "You think debts from past lives must be repaid forever? No, you can say 'I quit' anytime and walk out of the exam room.",
        contentZh: "业力可以被取消。",
        contentEn: "Karma can be canceled."
      },
      {
        date: "2026-03-19",
        titleZh: "原生家庭不是意外",
        titleEn: "Your Family Is No Accident",
        quoteZh: "你的父母不是随机分配的。是你在出生前跪下来求他们：请来演我的反派。",
        quoteEn: "Your parents weren't randomly assigned. Before birth, you knelt and begged them: 'Please play my villains.'",
        contentZh: "家庭关系的灵魂协议。",
        contentEn: "The soul contract of family relationships."
      },
      {
        date: "2026-03-20",
        titleZh: "他们答应了你的请求",
        titleEn: "They Agreed to Your Request",
        quoteZh: "你妈批评你，是因为你请求她帮你照镜子。你恨她之前，先感谢她愿意演这个苦差事。",
        quoteEn: "Your mom criticizes you because you asked her to be your mirror. Before hating her, thank her for taking on this thankless role.",
        contentZh: "感谢反派演员。",
        contentEn: "Thank the villain actors.",
        special: "春分 Spring Equinox"
      },
      {
        date: "2026-03-21",
        titleZh: "本周复盘——重签家庭合同",
        titleEn: "Weekly Review—Resign the Family Contract",
        quoteZh: "闭上眼，想象你和父母在出生前的约定。说一句：谢谢你们，合同到期了，我毕业了。",
        quoteEn: "Close your eyes, imagine the agreement with your parents before birth. Say: 'Thank you, the contract expired, I graduated.'",
        contentZh: "家庭和解练习。",
        contentEn: "Family reconciliation exercise.",
        actionZh: "闭上眼，想象你和父母在出生前的约定。说一句：谢谢你们，合同到期了，我毕业了。",
        actionEn: "Close your eyes, imagine the agreement with your parents before birth. Say: 'Thank you, the contract expired, I graduated.'"
      },
      {
        date: "2026-03-22",
        titleZh: "童年创伤是你点的菜",
        titleEn: "Childhood Trauma Is Your Order",
        quoteZh: "你以为你是受害者？错。你是编剧、导演、主演、和唯一的观众。",
        quoteEn: "You think you're a victim? Wrong. You're the writer, director, lead actor, and only audience member.",
        contentZh: "创伤的自我编排。",
        contentEn: "The self-orchestration of trauma."
      },
      {
        date: "2026-03-23",
        titleZh: "为什么要点苦菜？",
        titleEn: "Why Order Bitter Dishes?",
        quoteZh: "你的灵魂像个美食家，甜的吃腻了，想尝尝苦的。所有的苦难都是为了丰富你的味觉。",
        quoteEn: "Your soul is like a foodie—tired of sweet, wants to try bitter. All suffering is to enrich your palette.",
        contentZh: "苦难的价值。",
        contentEn: "The value of suffering."
      },
      {
        date: "2026-03-24",
        titleZh: "退菜的权利",
        titleEn: "The Right to Return Dishes",
        quoteZh: "菜点了不代表必须吃完。随时可以喊服务员：不好意思，这道菜我不要了。",
        quoteEn: "Ordering doesn't mean you must finish. You can always tell the waiter: 'Sorry, I don't want this dish anymore.'",
        contentZh: "随时可以停止受苦。",
        contentEn: "You can stop suffering anytime."
      },
      {
        date: "2026-03-25",
        titleZh: "回到点菜的那一刻",
        titleEn: "Return to the Moment of Ordering",
        quoteZh: "在冥想中回到童年创伤发生的前一秒，对小时候的自己说：嘿，这道菜我帮你退了。",
        quoteEn: "In meditation, return to one second before the childhood trauma. Tell your young self: 'Hey, I returned this dish for you.'",
        contentZh: "时间回溯疗愈法。",
        contentEn: "Time regression healing method.",
        actionZh: "今晚冥想时，回到童年创伤的前一秒，告诉小时候的自己：这道菜我帮你退了。",
        actionEn: "Tonight in meditation, return to one second before childhood trauma and tell your young self: 'I returned this dish for you.'"
      },
      {
        date: "2026-03-26",
        titleZh: "重写你的剧本",
        titleEn: "Rewrite Your Script",
        quoteZh: "你不只是演员，你还是编剧。剧本不满意？今晚就改。明天醒来就是新的一集。",
        quoteEn: "You're not just an actor, you're the writer. Unhappy with the script? Rewrite it tonight. Wake up tomorrow to a new episode.",
        contentZh: "主动改写人生剧本。",
        contentEn: "Actively rewriting life's script."
      },
      {
        date: "2026-03-27",
        titleZh: "所有演员都会谢幕",
        titleEn: "All Actors Will Take a Bow",
        quoteZh: "演完这场戏，反派脱下戏服，和你拥抱。在灵魂层面，没有敌人，只有帮你演出的朋友。",
        quoteEn: "After the play, villains take off costumes and hug you. At the soul level, there are no enemies, only friends helping you perform.",
        contentZh: "理解所有关系的本质。",
        contentEn: "Understanding the nature of all relationships."
      },
      {
        date: "2026-03-28",
        titleZh: "本周复盘——戏散了，灯亮了",
        titleEn: "Weekly Review—Play Over, Lights On",
        quoteZh: "想象你人生中最恨的人，看着他脱下戏服，露出微笑的脸。说：谢谢你，辛苦了。",
        quoteEn: "Imagine the person you hate most in life. Watch them remove their costume, revealing a smiling face. Say: 'Thank you, you worked hard.'",
        contentZh: "宽恕练习。",
        contentEn: "Forgiveness exercise.",
        actionZh: "想象你最恨的人脱下戏服，对他说：谢谢你，辛苦了。",
        actionEn: "Imagine the person you hate most removing their costume. Say to them: 'Thank you, you worked hard.'"
      },
      {
        date: "2026-03-29",
        titleZh: "时间是你的画笔",
        titleEn: "Time Is Your Brush",
        quoteZh: "你不是在时间里被推着走，你是拿着时间这支笔在画自己想要的画。",
        quoteEn: "You're not being pushed along by time—you're holding time like a brush, painting what you want.",
        contentZh: "主动使用时间。",
        contentEn: "Actively using time."
      },
      {
        date: "2026-03-30",
        titleZh: "收回时间的主权",
        titleEn: "Reclaim Sovereignty Over Time",
        quoteZh: "从今天起，不再说没时间，改说我选择不把时间花在这里。",
        quoteEn: "From today, stop saying 'no time', say instead 'I choose not to spend time here'.",
        contentZh: "语言与时间主权。",
        contentEn: "Language and time sovereignty."
      },
      {
        date: "2026-03-31",
        titleZh: "三月总结——你是时间的主人",
        titleEn: "March Summary—You Are the Master of Time",
        quoteZh: "过去可以重写，未来可以预定。你不是时间的奴隶，你是时间的画家。",
        quoteEn: "The past can be rewritten, the future can be booked. You're not time's slave; you're time's painter.",
        contentZh: "回顾三月：时间与轮回。",
        contentEn: "Review March: Time & Reincarnation."
      }
    ]
  },
  // April
  {
    month: 4,
    themeZh: "概率与平行宇宙",
    themeEn: "Probabilities & Parallel Lives",
    subtitleZh: "你不是唯一的，你是一整个舰队",
    subtitleEn: "You're Not Alone, You're an Entire Fleet",
    sourceZh: "《灵魂永生》第五章、第十三章",
    sourceEn: "Seth Speaks Chapter 5 & 13",
    goals: [
      { zh: "打破唯一实相的错觉，建立多重宇宙观", en: "Break the illusion of 'only reality', build multiverse view" },
      { zh: "学会跳频技术，从受苦频道跳到享福频道", en: "Learn 'frequency jumping' technique" },
      { zh: "重写个人历史与集体历史", en: "Rewrite personal and collective history" },
      { zh: "理解战争与灾难是集体信念的显化", en: "Understand war and disaster are manifestations of collective beliefs" },
    ],
    lessons: [
      {
        date: "2026-04-01",
        titleZh: "欢迎来到无限游乐场",
        titleEn: "Welcome to the Infinite Playground",
        quoteZh: "你以为你只活这一个版本的人生？错。你同时在无数个版本里活着。",
        quoteEn: "You think you're living just this one version of life? Wrong. You're living in countless versions simultaneously.",
        contentZh: "进入第四月：平行宇宙。",
        contentEn: "Entering the fourth month: Parallel Universes."
      },
      {
        date: "2026-04-02",
        titleZh: "每个选择都会分裂",
        titleEn: "Every Choice Splits",
        quoteZh: "你早上选择穿红衣服，另一个你同时穿了蓝衣服。两个你都是真的。",
        quoteEn: "You chose to wear red this morning; another you simultaneously wore blue. Both yous are real.",
        contentZh: "选择与宇宙分裂。",
        contentEn: "Choice and universe splitting."
      },
      {
        date: "2026-04-03",
        titleZh: "没有选错的人生",
        titleEn: "No Wrong Life Choices",
        quoteZh: "你没有选错，因为所有选择都同时存在。你只是把注意力放在了这个版本。",
        quoteEn: "You didn't choose wrong because all choices exist simultaneously. You just focused your attention on this version.",
        contentZh: "停止后悔。",
        contentEn: "Stop regretting."
      },
      {
        date: "2026-04-04",
        titleZh: "平行版本的你",
        titleEn: "Parallel Versions of You",
        quoteZh: "有一个你是亿万富翁，有一个你在监狱里，有一个你已经死了。他们都是真实的你。",
        quoteEn: "One you is a billionaire, one you is in prison, one you is dead. They're all the real you.",
        contentZh: "无限版本的存在。",
        contentEn: "The existence of infinite versions.",
        special: "清明节 Qingming Festival"
      },
      {
        date: "2026-04-05",
        titleZh: "本周复盘——拥抱所有的你",
        titleEn: "Weekly Review—Embrace All Your Versions",
        quoteZh: "闭上眼，感受另一个版本的你正在狂欢。你们的喜悦是同一首歌。",
        quoteEn: "Close your eyes, feel another version of you celebrating. Your joy is the same song.",
        contentZh: "复盘平行宇宙观。",
        contentEn: "Review parallel universe concept."
      },
      {
        date: "2026-04-06",
        titleZh: "概率是什么？",
        titleEn: "What Are Probabilities?",
        quoteZh: "概率不是还没发生的可能，而是同时存在的现实。你只是选择体验其中一个。",
        quoteEn: "Probabilities aren't unrealized possibilities—they're simultaneously existing realities. You just choose to experience one.",
        contentZh: "概率的本质。",
        contentEn: "The nature of probability."
      },
      {
        date: "2026-04-07",
        titleZh: "跳频技术",
        titleEn: "Frequency Jumping Technique",
        quoteZh: "你想跳到更好的人生版本？改变你的信念频率，你就会自动跳到匹配的平行宇宙。",
        quoteEn: "Want to jump to a better life version? Change your belief frequency, and you'll automatically jump to the matching parallel universe.",
        contentZh: "如何切换平行宇宙。",
        contentEn: "How to switch parallel universes."
      },
      {
        date: "2026-04-08",
        titleZh: "你不是在改变现实",
        titleEn: "You're Not Changing Reality",
        quoteZh: "你不是在改变现实，你是在选择跳进已经存在的另一个现实。一切早就在那里等你。",
        quoteEn: "You're not changing reality—you're choosing to jump into another reality that already exists. Everything is already there waiting for you.",
        contentZh: "显化的真正机制。",
        contentEn: "The real mechanism of manifestation."
      },
      {
        date: "2026-04-09",
        titleZh: "信念是遥控器",
        titleEn: "Belief Is the Remote Control",
        quoteZh: "电视里有一千个频道，你只能看到你按的那个。信念就是你的遥控器。",
        quoteEn: "The TV has a thousand channels; you only see the one you pressed. Belief is your remote control.",
        contentZh: "信念选择实相。",
        contentEn: "Beliefs choose reality."
      },
      {
        date: "2026-04-10",
        titleZh: "换台练习",
        titleEn: "Channel Switching Practice",
        quoteZh: "今天就开始按一个新的按钮。假装你已经是你想成为的人，坚持三天。",
        quoteEn: "Start pressing a new button today. Pretend you're already who you want to be, persist for three days.",
        contentZh: "实操跳频技术。",
        contentEn: "Practicing frequency jumping.",
        actionZh: "今天开始假装你已经是你想成为的那个人，坚持三天看看会发生什么。",
        actionEn: "Start pretending today you're already who you want to be. Persist for three days and see what happens."
      },
      {
        date: "2026-04-11",
        titleZh: "不是吸引，是选择",
        titleEn: "Not Attraction, Selection",
        quoteZh: "吸引力法则说得不对。你不是在吸引东西来，你是在选择跳进已有那个东西的宇宙。",
        quoteEn: "The Law of Attraction got it wrong. You're not attracting things—you're choosing to jump into a universe where that thing already exists.",
        contentZh: "超越吸引力法则。",
        contentEn: "Beyond the Law of Attraction."
      },
      {
        date: "2026-04-12",
        titleZh: "本周复盘——你是宇宙跳跃者",
        titleEn: "Weekly Review—You Are a Universe Jumper",
        quoteZh: "你每一秒都在跳。问题不是能不能跳，而是跳到哪里。选择权永远在你手里。",
        quoteEn: "You're jumping every second. The question isn't whether you can jump, but where to jump. The choice is always yours.",
        contentZh: "复盘跳频技术。",
        contentEn: "Review frequency jumping technique."
      },
      {
        date: "2026-04-13",
        titleZh: "重写过去",
        titleEn: "Rewrite the Past",
        quoteZh: "过去不是固定的。你现在改变对过去的解读，过去就真的改变了。",
        quoteEn: "The past isn't fixed. Change your interpretation of the past now, and the past actually changes.",
        contentZh: "过去是可编辑的。",
        contentEn: "The past is editable."
      },
      {
        date: "2026-04-14",
        titleZh: "受害者故事是你写的",
        titleEn: "You Wrote the Victim Story",
        quoteZh: "你把自己写成了受害者，于是你活在受害者的平行宇宙。重写故事，换个宇宙。",
        quoteEn: "You wrote yourself as a victim, so you live in the victim's parallel universe. Rewrite the story, switch universes.",
        contentZh: "故事决定宇宙。",
        contentEn: "Story determines universe."
      },
      {
        date: "2026-04-15",
        titleZh: "重写童年",
        titleEn: "Rewrite Childhood",
        quoteZh: "今晚在脑海里重新演一遍你的童年，把所有创伤换成祝福。明天你就在一个新的宇宙里醒来。",
        quoteEn: "Tonight, replay your childhood in your mind, replacing all trauma with blessings. Tomorrow you wake up in a new universe.",
        contentZh: "童年重写技术。",
        contentEn: "Childhood rewriting technique.",
        actionZh: "今晚在脑海里重演童年，把创伤换成祝福。",
        actionEn: "Tonight, replay childhood in your mind, replacing trauma with blessings."
      },
      {
        date: "2026-04-16",
        titleZh: "集体信念创造集体实相",
        titleEn: "Collective Beliefs Create Collective Reality",
        quoteZh: "战争不是一个人能创造的。它是一群人共同相信暴力能解决问题的结果。",
        quoteEn: "War isn't created by one person. It's the result of a group collectively believing violence solves problems.",
        contentZh: "集体实相的形成。",
        contentEn: "Formation of collective reality."
      },
      {
        date: "2026-04-17",
        titleZh: "灾难是集体的梦",
        titleEn: "Disasters Are Collective Dreams",
        quoteZh: "地震、瘟疫、经济崩溃——都是人类集体信念的物质化。没有无辜的受害者。",
        quoteEn: "Earthquakes, plagues, economic collapse—all are materializations of collective human beliefs. There are no innocent victims.",
        contentZh: "灾难的集体创造。",
        contentEn: "Collective creation of disasters."
      },
      {
        date: "2026-04-18",
        titleZh: "你在创造历史",
        titleEn: "You Are Creating History",
        quoteZh: "每当你相信世界会越来越糟，你就在往那个平行宇宙推一把。",
        quoteEn: "Every time you believe the world is getting worse, you're pushing toward that parallel universe.",
        contentZh: "个人信念影响集体。",
        contentEn: "Personal beliefs affect the collective."
      },
      {
        date: "2026-04-19",
        titleZh: "本周复盘——选择你想住的地球",
        titleEn: "Weekly Review—Choose the Earth You Want to Live On",
        quoteZh: "有无数个版本的地球，你想住在和平的那个还是战乱的那个？你的信念就是选票。",
        quoteEn: "There are countless versions of Earth. Do you want to live on the peaceful one or the warring one? Your belief is your vote.",
        contentZh: "复盘集体实相。",
        contentEn: "Review collective reality."
      },
      {
        date: "2026-04-20",
        titleZh: "可能性是真实的",
        titleEn: "Possibilities Are Real",
        quoteZh: "你说如果当初我不是那一刻是真实存在的。它在另一个平行宇宙里正在发生。",
        quoteEn: "When you say 'if only I had...'—that moment is real. It's happening right now in another parallel universe.",
        contentZh: "所有可能性都存在。",
        contentEn: "All possibilities exist.",
        special: "谷雨 Grain Rain"
      },
      {
        date: "2026-04-21",
        titleZh: "没有错过的人生",
        titleEn: "No Missed Life",
        quoteZh: "你觉得错过的那个人生，另一个你正在活。你没有错过，只是分工不同。",
        quoteEn: "The life you think you missed—another you is living it. You didn't miss it; you just have different roles.",
        contentZh: "停止遗憾。",
        contentEn: "Stop regretting."
      },
      {
        date: "2026-04-22",
        titleZh: "去拜访另一个你",
        titleEn: "Visit Another You",
        quoteZh: "在冥想中去见那个你想成为的人。他不是想象，他是真实存在的另一个你。",
        quoteEn: "In meditation, meet the person you want to become. They're not imagination—they're a real other you that exists.",
        contentZh: "冥想中的平行自我连接。",
        contentEn: "Connecting with parallel self in meditation.",
        actionZh: "今晚冥想时，去见那个你最想成为的版本的自己。",
        actionEn: "In tonight's meditation, meet the version of yourself you most want to become."
      },
      {
        date: "2026-04-23",
        titleZh: "向他借能量",
        titleEn: "Borrow Energy from Them",
        quoteZh: "那个成功的你、快乐的你、健康的你，他愿意把能量借给你。你只需要开口问。",
        quoteEn: "That successful you, happy you, healthy you—they're willing to lend you energy. You just need to ask.",
        contentZh: "从平行自我获取资源。",
        contentEn: "Getting resources from parallel self."
      },
      {
        date: "2026-04-24",
        titleZh: "合并最好的自己",
        titleEn: "Merge with Your Best Self",
        quoteZh: "想象所有平行的你像水滴一样汇聚，你吸收了他们所有的优点。",
        quoteEn: "Imagine all parallel yous gathering like water droplets. You absorb all their strengths.",
        contentZh: "平行自我整合。",
        contentEn: "Parallel self integration."
      },
      {
        date: "2026-04-25",
        titleZh: "你已经是你想成为的人",
        titleEn: "You Already Are Who You Want to Be",
        quoteZh: "那个最好的你不在未来，他现在就存在。你只需要把注意力移过去。",
        quoteEn: "Your best self isn't in the future—they exist right now. You just need to shift your attention there.",
        contentZh: "改变是瞬间的。",
        contentEn: "Change is instantaneous."
      },
      {
        date: "2026-04-26",
        titleZh: "本周复盘——你是无限的",
        titleEn: "Weekly Review—You Are Infinite",
        quoteZh: "你不是一个人，你是无数个你。你不是一个人生，你是无数个人生。拥抱你的无限性。",
        quoteEn: "You're not one person, you're countless yous. You're not one life, you're countless lives. Embrace your infinity.",
        contentZh: "复盘平行宇宙自我。",
        contentEn: "Review parallel universe self."
      },
      {
        date: "2026-04-27",
        titleZh: "集体跳跃",
        titleEn: "Collective Jumping",
        quoteZh: "当足够多的人同时改变信念，整个地球就会跳进一个新的平行宇宙。",
        quoteEn: "When enough people change beliefs simultaneously, the entire Earth jumps into a new parallel universe.",
        contentZh: "集体意识跃迁。",
        contentEn: "Collective consciousness leap."
      },
      {
        date: "2026-04-28",
        titleZh: "你是先锋队",
        titleEn: "You Are the Vanguard",
        quoteZh: "每当你选择相信美好，你就是在为全人类开辟一条新路。",
        quoteEn: "Every time you choose to believe in goodness, you're paving a new path for all humanity.",
        contentZh: "个人觉醒的集体意义。",
        contentEn: "The collective significance of personal awakening."
      },
      {
        date: "2026-04-29",
        titleZh: "新地球已经存在",
        titleEn: "The New Earth Already Exists",
        quoteZh: "和平的地球、丰盛的地球、觉醒的地球——它们都已经存在。你只需要买票上车。",
        quoteEn: "A peaceful Earth, abundant Earth, awakened Earth—they all already exist. You just need to buy a ticket and get on board.",
        contentZh: "新地球的召唤。",
        contentEn: "The call of the new Earth."
      },
      {
        date: "2026-04-30",
        titleZh: "四月总结——你是舰队的船长",
        titleEn: "April Summary—You Are the Fleet Captain",
        quoteZh: "你不是一艘船，你是一整个舰队。所有的船都在等你的指令。往哪里开，你说了算。",
        quoteEn: "You're not one ship, you're an entire fleet. All ships are waiting for your command. Where to sail is up to you.",
        contentZh: "回顾四月：概率与平行宇宙。",
        contentEn: "Review April: Probabilities & Parallel Lives."
      }
    ]
  },
  // May
  {
    month: 5,
    themeZh: "万物有灵",
    themeEn: "Animism & Consciousness Units",
    subtitleZh: "尘埃是宇宙最小的上帝",
    subtitleEn: "Dust Is the Universe's Smallest God",
    sourceZh: "《灵魂永生》第七章、第十八章",
    sourceEn: "Seth Speaks Chapter 7 & 18",
    goals: [
      { zh: "把人类中心主义踩在脚下", en: "Crush 'human-centrism' underfoot" },
      { zh: "理解万物皆有意识（CU），建立与环境的深层连接", en: "Understand all things have consciousness (CU)" },
      { zh: "向你的房子、食物、空气道歉并致谢", en: "Apologize and thank your house, food, and air" },
      { zh: "学会施受同体的慈悲", en: "Learn the compassion of 'giver and receiver as one'" },
    ],
    lessons: [
      {
        date: "2026-05-01",
        titleZh: "石头在呼吸",
        titleEn: "The Stone Is Breathing",
        quoteZh: "你以为只有人才有意识？路边的石头比你想象的更清醒。",
        quoteEn: "You think only humans have consciousness? The roadside stone is more awake than you imagine.",
        contentZh: "进入第五月：万物有灵。",
        contentEn: "Entering the fifth month: Animism.",
        special: "劳动节 Labor Day"
      },
      {
        date: "2026-05-02",
        titleZh: "意识单位（CU）",
        titleEn: "Consciousness Units (CU)",
        quoteZh: "宇宙最小的单位不是原子，是意识单位。每一个CU都是一个微型上帝。",
        quoteEn: "The universe's smallest unit isn't the atom—it's the consciousness unit. Every CU is a micro-god.",
        contentZh: "CU的概念。",
        contentEn: "The concept of CU."
      },
      {
        date: "2026-05-03",
        titleZh: "尘埃是最小的上帝",
        titleEn: "Dust Is the Smallest God",
        quoteZh: "你脚下的灰尘、你呼吸的空气、你喝的水——都有意识，都在爱着你。",
        quoteEn: "The dust under your feet, the air you breathe, the water you drink—all have consciousness, all are loving you.",
        contentZh: "万物皆有意识。",
        contentEn: "All things have consciousness."
      },
      {
        date: "2026-05-04",
        titleZh: "人类中心主义的傲慢",
        titleEn: "The Arrogance of Human-Centrism",
        quoteZh: "你以为人类站在金字塔顶端？在意识的眼里，你和蚂蚁一样渺小，也一样伟大。",
        quoteEn: "You think humans stand at the pyramid's peak? In consciousness's eyes, you're as small as an ant, and equally great.",
        contentZh: "打破人类中心主义。",
        contentEn: "Breaking human-centrism."
      },
      {
        date: "2026-05-05",
        titleZh: "向一朵花学习",
        titleEn: "Learn from a Flower",
        quoteZh: "花不会焦虑明天能不能开花。它只是存在，然后自然绽放。你比花还蠢。",
        quoteEn: "A flower doesn't worry if it can bloom tomorrow. It just exists and naturally blossoms. You're dumber than a flower.",
        contentZh: "向植物学习存在。",
        contentEn: "Learn being from plants.",
        special: "立夏 Beginning of Summer"
      },
      {
        date: "2026-05-06",
        titleZh: "你的房子在听你说话",
        titleEn: "Your House Is Listening to You",
        quoteZh: "你每天在家里抱怨，墙壁会记住。你每天在家里感恩，天花板会唱歌。",
        quoteEn: "Complain at home every day, the walls remember. Express gratitude daily, the ceiling sings.",
        contentZh: "环境的意识。",
        contentEn: "The consciousness of environment."
      },
      {
        date: "2026-05-07",
        titleZh: "本周复盘——向房子道歉",
        titleEn: "Weekly Review—Apologize to Your House",
        quoteZh: "今天花五分钟，对你住的房子说：谢谢你保护我，对不起之前忽略你。",
        quoteEn: "Spend five minutes today telling your house: 'Thank you for protecting me. Sorry for ignoring you before.'",
        contentZh: "与环境和解。",
        contentEn: "Reconcile with your environment.",
        actionZh: "对你住的房子说：谢谢你保护我，对不起之前忽略你。",
        actionEn: "Tell your house: 'Thank you for protecting me. Sorry for ignoring you before.'"
      },
      {
        date: "2026-05-08",
        titleZh: "食物的牺牲",
        titleEn: "The Sacrifice of Food",
        quoteZh: "每一口你吃进去的食物，都是一个生命选择为你牺牲。你配吗？",
        quoteEn: "Every bite you eat is a life choosing to sacrifice for you. Are you worthy?",
        contentZh: "食物的意识。",
        contentEn: "The consciousness of food."
      },
      {
        date: "2026-05-09",
        titleZh: "感恩的餐前祷告",
        titleEn: "Grateful Pre-Meal Prayer",
        quoteZh: "吃饭前闭眼三秒，对食物说：谢谢你成为我的一部分。",
        quoteEn: "Close your eyes for three seconds before eating, tell the food: 'Thank you for becoming part of me.'",
        contentZh: "与食物和解。",
        contentEn: "Reconcile with food.",
        actionZh: "今天吃饭前，对食物说：谢谢你成为我的一部分。",
        actionEn: "Before eating today, tell your food: 'Thank you for becoming part of me.'"
      },
      {
        date: "2026-05-10",
        titleZh: "水知道答案",
        titleEn: "Water Knows the Answer",
        quoteZh: "你骂水，水的结晶变丑。你爱水，水的结晶变美。你就是70%的水。",
        quoteEn: "Curse water, its crystals turn ugly. Love water, its crystals become beautiful. You are 70% water.",
        contentZh: "水的意识实验。",
        contentEn: "Water consciousness experiments.",
        special: "母亲节 Mother's Day"
      },
      {
        date: "2026-05-11",
        titleZh: "空气在拥抱你",
        titleEn: "Air Is Hugging You",
        quoteZh: "你每一次呼吸，都是空气在亲吻你的肺。你从不孤独，你被万物拥抱着。",
        quoteEn: "Every breath you take is air kissing your lungs. You're never alone; you're embraced by everything.",
        contentZh: "空气的意识。",
        contentEn: "The consciousness of air."
      },
      {
        date: "2026-05-12",
        titleZh: "感谢阳光",
        titleEn: "Thank the Sunlight",
        quoteZh: "太阳每天用生命喂养你，而你从不抬头说一声谢谢。",
        quoteEn: "The sun feeds you with its life every day, yet you never look up to say thank you.",
        contentZh: "太阳的馈赠。",
        contentEn: "The gift of the sun."
      },
      {
        date: "2026-05-13",
        titleZh: "你的衣服在工作",
        titleEn: "Your Clothes Are Working",
        quoteZh: "你的衣服每天保护你的身体，吸收你的能量。你对它们说过谢谢吗？",
        quoteEn: "Your clothes protect your body every day, absorbing your energy. Have you ever thanked them?",
        contentZh: "物品的服务。",
        contentEn: "The service of objects."
      },
      {
        date: "2026-05-14",
        titleZh: "本周复盘——万物感恩练习",
        titleEn: "Weekly Review—Gratitude to All Things",
        quoteZh: "今天对十个物品说谢谢：你的床、你的杯子、你的鞋子……它们都在等你的一句话。",
        quoteEn: "Thank ten objects today: your bed, cup, shoes... They're all waiting for your word.",
        contentZh: "物品感恩练习。",
        contentEn: "Object gratitude practice.",
        actionZh: "今天对十个物品说谢谢。",
        actionEn: "Thank ten objects today."
      },
      {
        date: "2026-05-15",
        titleZh: "动物是你的老师",
        titleEn: "Animals Are Your Teachers",
        quoteZh: "狗比你更懂爱，猫比你更懂放松，鸟比你更懂自由。你该向它们学习。",
        quoteEn: "Dogs understand love better than you, cats understand relaxation better, birds understand freedom better. Learn from them.",
        contentZh: "动物的智慧。",
        contentEn: "The wisdom of animals."
      },
      {
        date: "2026-05-16",
        titleZh: "动物的灵魂合同",
        titleEn: "Animals' Soul Contracts",
        quoteZh: "你的宠物不是偶然来到你身边的。它们签了合同，来教你无条件的爱。",
        quoteEn: "Your pet didn't come to you by accident. They signed a contract to teach you unconditional love.",
        contentZh: "宠物的灵性意义。",
        contentEn: "The spiritual meaning of pets."
      },
      {
        date: "2026-05-17",
        titleZh: "吃肉的业力？",
        titleEn: "The Karma of Eating Meat?",
        quoteZh: "动物不是被你杀的，是自愿献身的。但你要配得上它们的牺牲。",
        quoteEn: "Animals aren't killed by you—they voluntarily sacrifice themselves. But you must be worthy of their sacrifice.",
        contentZh: "重新理解吃肉。",
        contentEn: "Reunderstanding meat eating."
      },
      {
        date: "2026-05-18",
        titleZh: "植物的疼痛",
        titleEn: "The Pain of Plants",
        quoteZh: "你以为植物不会痛？它们只是不会尖叫。尊重每一个生命。",
        quoteEn: "You think plants don't feel pain? They just can't scream. Respect every life.",
        contentZh: "植物的感受。",
        contentEn: "The feelings of plants."
      },
      {
        date: "2026-05-19",
        titleZh: "树在和你说话",
        titleEn: "Trees Are Talking to You",
        quoteZh: "去拥抱一棵树，闭上眼睛听。它有话要对你说。",
        quoteEn: "Go hug a tree, close your eyes and listen. It has something to tell you.",
        contentZh: "与树沟通。",
        contentEn: "Communicating with trees.",
        actionZh: "今天去拥抱一棵树，听听它想对你说什么。",
        actionEn: "Hug a tree today and listen to what it wants to tell you."
      },
      {
        date: "2026-05-20",
        titleZh: "地球是一个生命",
        titleEn: "Earth Is One Life",
        quoteZh: "地球不是一块死石头，她是盖亚，是活的生命。你是她身体里的一个细胞。",
        quoteEn: "Earth isn't a dead rock—she is Gaia, a living being. You're a cell in her body.",
        contentZh: "盖亚假说。",
        contentEn: "The Gaia hypothesis."
      },
      {
        date: "2026-05-21",
        titleZh: "本周复盘——你是地球的一部分",
        titleEn: "Weekly Review—You Are Part of Earth",
        quoteZh: "你伤害地球就是伤害自己，你疗愈自己就是疗愈地球。",
        quoteEn: "Hurting Earth is hurting yourself. Healing yourself is healing Earth.",
        contentZh: "与地球的关系。",
        contentEn: "Your relationship with Earth.",
        special: "小满 Lesser Fullness"
      },
      {
        date: "2026-05-22",
        titleZh: "施与受是一体的",
        titleEn: "Giving and Receiving Are One",
        quoteZh: "当你给予时，你同时在接受。当你接受时，你同时在给予。没有分别。",
        quoteEn: "When you give, you simultaneously receive. When you receive, you simultaneously give. No separation.",
        contentZh: "施受同体。",
        contentEn: "Giver and receiver as one."
      },
      {
        date: "2026-05-23",
        titleZh: "你和我是同一个人",
        titleEn: "You and I Are the Same Person",
        quoteZh: "你伤害别人就是伤害自己，你帮助别人就是帮助自己。因为根本没有别人。",
        quoteEn: "Hurting others is hurting yourself. Helping others is helping yourself. Because there are no 'others'.",
        contentZh: "没有别人。",
        contentEn: "There are no others."
      },
      {
        date: "2026-05-24",
        titleZh: "敌人是你的镜子",
        titleEn: "Your Enemy Is Your Mirror",
        quoteZh: "你讨厌的那个人，是你不敢面对的自己。感谢他帮你照镜子。",
        quoteEn: "The person you hate is the self you dare not face. Thank them for being your mirror.",
        contentZh: "镜子法则。",
        contentEn: "The mirror law."
      },
      {
        date: "2026-05-25",
        titleZh: "伤害是假的",
        titleEn: "Harm Is an Illusion",
        quoteZh: "没有人能真正伤害你，除非你同意。所有的伤害都是自己对自己的背叛。",
        quoteEn: "No one can truly hurt you unless you agree. All harm is your own betrayal of yourself.",
        contentZh: "伤害的本质。",
        contentEn: "The nature of harm."
      },
      {
        date: "2026-05-26",
        titleZh: "宇宙没有垃圾",
        titleEn: "The Universe Has No Garbage",
        quoteZh: "你觉得某些人是垃圾？在宇宙眼里，每一个灵魂都是珍宝。",
        quoteEn: "You think some people are garbage? In the universe's eyes, every soul is a treasure.",
        contentZh: "尊重所有生命。",
        contentEn: "Respect all life."
      },
      {
        date: "2026-05-27",
        titleZh: "连接万物的练习",
        titleEn: "Practice Connecting with All Things",
        quoteZh: "今天走路时，感受脚下的大地、头上的天空、身边的空气。你和它们是一体的。",
        quoteEn: "While walking today, feel the earth below, the sky above, the air around. You are one with them.",
        contentZh: "万物合一练习。",
        contentEn: "Oneness practice.",
        actionZh: "今天走路时，感受与大地、天空、空气的连接。",
        actionEn: "While walking today, feel your connection with earth, sky, and air."
      },
      {
        date: "2026-05-28",
        titleZh: "本周复盘——我就是万物",
        titleEn: "Weekly Review—I Am All Things",
        quoteZh: "你不是在万物之中，你就是万物。万物不在你之外，万物就是你。",
        quoteEn: "You're not among all things—you are all things. All things aren't outside you—all things are you.",
        contentZh: "复盘万物有灵。",
        contentEn: "Review animism."
      },
      {
        date: "2026-05-29",
        titleZh: "慈悲的真正含义",
        titleEn: "The True Meaning of Compassion",
        quoteZh: "慈悲不是可怜别人，是认出所有生命都是自己。",
        quoteEn: "Compassion isn't pitying others—it's recognizing all life as yourself.",
        contentZh: "慈悲的本质。",
        contentEn: "The essence of compassion."
      },
      {
        date: "2026-05-30",
        titleZh: "爱是唯一的语言",
        titleEn: "Love Is the Only Language",
        quoteZh: "石头、动物、植物、人类——我们说的是同一种语言，叫做爱。",
        quoteEn: "Stones, animals, plants, humans—we all speak the same language, called love.",
        contentZh: "爱的普遍性。",
        contentEn: "The universality of love."
      },
      {
        date: "2026-05-31",
        titleZh: "五月总结——你是宇宙的神经元",
        titleEn: "May Summary—You Are the Universe's Neuron",
        quoteZh: "你是宇宙大脑里的一个神经元。当你觉醒，整个宇宙都变得更聪明。",
        quoteEn: "You are a neuron in the universe's brain. When you awaken, the entire universe becomes smarter.",
        contentZh: "回顾五月：万物有灵。",
        contentEn: "Review May: Animism & Consciousness Units."
      }
    ]
  },
  // June
  {
    month: 6,
    themeZh: "梦与出体",
    themeEn: "Dreams & Out of Body",
    subtitleZh: "白天是梦，晚上是醒",
    subtitleEn: "Day Is Dream, Night Is Awake",
    sourceZh: "《灵魂永生》第八章、第十九章",
    sourceEn: "Seth Speaks Chapter 8 & 19",
    goals: [
      { zh: "颠倒黑白：白天是梦，晚上是醒", en: "Flip day and night: daytime is dream, nighttime is awake" },
      { zh: "掌握清醒梦（Lucid Dream）和出体（OOBE）", en: "Master lucid dreaming and out-of-body experience" },
      { zh: "利用梦境解决白天的难题", en: "Use dreams to solve daytime problems" },
      { zh: "认识到肉体只是晚上回家前放在门口的一双破鞋", en: "Realize the body is just old shoes left at the door before going home at night" },
    ],
    lessons: [
      {
        date: "2026-06-01",
        titleZh: "白天是梦",
        titleEn: "Daytime Is the Dream",
        quoteZh: "你以为晚上做梦？其实白天才是梦，晚上你才真正醒过来。",
        quoteEn: "You think you dream at night? Actually, daytime is the dream; at night you truly wake up.",
        contentZh: "进入第六月：梦与出体。",
        contentEn: "Entering the sixth month: Dreams & Out of Body.",
        special: "儿童节 Children's Day"
      },
      {
        date: "2026-06-02",
        titleZh: "睡眠是回家",
        titleEn: "Sleep Is Going Home",
        quoteZh: "每天晚上，你的灵魂都会脱离肉体，回到真正的家充电。",
        quoteEn: "Every night, your soul leaves the body and returns to its true home to recharge.",
        contentZh: "睡眠的灵性功能。",
        contentEn: "The spiritual function of sleep."
      },
      {
        date: "2026-06-03",
        titleZh: "肉体只是晚上的破鞋",
        titleEn: "The Body Is Just Old Shoes at Night",
        quoteZh: "你回家会把鞋脱在门口。肉体就是那双鞋，你睡着时把它扔在门口。",
        quoteEn: "You take off shoes at the door when you come home. The body is those shoes—you leave it at the door when you sleep.",
        contentZh: "身体与灵魂的关系。",
        contentEn: "The relationship between body and soul."
      },
      {
        date: "2026-06-04",
        titleZh: "你每晚都出体",
        titleEn: "You Leave Your Body Every Night",
        quoteZh: "出体不是什么神秘技术，你每天晚上都在做。你只是不记得而已。",
        quoteEn: "Out-of-body isn't some mysterious technique—you do it every night. You just don't remember.",
        contentZh: "出体的普遍性。",
        contentEn: "The universality of out-of-body experiences."
      },
      {
        date: "2026-06-05",
        titleZh: "为什么不记得？",
        titleEn: "Why Don't You Remember?",
        quoteZh: "你的外我像个控制狂，怕你发现它不是老大，所以删除了你的出体记忆。",
        quoteEn: "Your outer ego is like a control freak, afraid you'll discover it's not the boss, so it deletes your out-of-body memories.",
        contentZh: "外我的过滤机制。",
        contentEn: "The filtering mechanism of the outer ego.",
        special: "芒种 Grain in Ear"
      },
      {
        date: "2026-06-06",
        titleZh: "梦是加密的邮件",
        titleEn: "Dreams Are Encrypted Emails",
        quoteZh: "内我每晚给你发邮件，但外我设了垃圾邮件过滤器。学会解码。",
        quoteEn: "The Inner Self sends you emails every night, but the outer ego has a spam filter. Learn to decode.",
        contentZh: "梦的通讯功能。",
        contentEn: "The communication function of dreams."
      },
      {
        date: "2026-06-07",
        titleZh: "本周复盘——记录你的梦",
        titleEn: "Weekly Review—Record Your Dreams",
        quoteZh: "从今天起，床头放笔记本，醒来第一件事写下梦境。钥匙就藏在里面。",
        quoteEn: "From today, keep a notebook by your bed. Write down your dreams first thing upon waking. The key is hidden there.",
        contentZh: "梦境记录练习。",
        contentEn: "Dream recording practice.",
        actionZh: "床头放笔记本，醒来第一件事记录梦境。",
        actionEn: "Keep a notebook by your bed, record dreams first thing upon waking."
      },
      {
        date: "2026-06-08",
        titleZh: "梦里的符号",
        titleEn: "Symbols in Dreams",
        quoteZh: "梦里的水代表情绪，房子代表自我，飞行代表自由。学会读懂内我的语言。",
        quoteEn: "Water in dreams represents emotions, houses represent self, flying represents freedom. Learn to read the Inner Self's language.",
        contentZh: "梦的象征语言。",
        contentEn: "The symbolic language of dreams."
      },
      {
        date: "2026-06-09",
        titleZh: "噩梦是最好的礼物",
        titleEn: "Nightmares Are the Best Gifts",
        quoteZh: "噩梦是你的内我在大喊：醒醒！这里有你必须面对的恐惧！",
        quoteEn: "Nightmares are your Inner Self shouting: 'Wake up! Here's a fear you must face!'",
        contentZh: "噩梦的价值。",
        contentEn: "The value of nightmares."
      },
      {
        date: "2026-06-10",
        titleZh: "重复梦的信息",
        titleEn: "The Message of Recurring Dreams",
        quoteZh: "同一个梦反复出现？因为你没听懂，内我只好一遍遍重播。",
        quoteEn: "Same dream repeating? Because you didn't understand, the Inner Self keeps replaying it.",
        contentZh: "重复梦的解读。",
        contentEn: "Interpreting recurring dreams."
      },
      {
        date: "2026-06-11",
        titleZh: "预知梦",
        titleEn: "Precognitive Dreams",
        quoteZh: "你梦到未来的事不是巧合。时间不存在，梦里你可以随意游走。",
        quoteEn: "Dreaming of future events isn't coincidence. Time doesn't exist; in dreams you can wander freely.",
        contentZh: "梦与时间。",
        contentEn: "Dreams and time."
      },
      {
        date: "2026-06-12",
        titleZh: "在梦里解决问题",
        titleEn: "Solve Problems in Dreams",
        quoteZh: "睡前把问题交给内我：请在梦里给我答案。醒来答案就在那里。",
        quoteEn: "Before sleep, hand the problem to the Inner Self: 'Please give me the answer in my dream.' The answer will be there when you wake.",
        contentZh: "利用梦解决问题。",
        contentEn: "Using dreams to solve problems.",
        actionZh: "今晚睡前把一个问题交给内我，请求在梦里获得答案。",
        actionEn: "Tonight before sleep, hand a problem to your Inner Self and ask for the answer in your dream."
      },
      {
        date: "2026-06-13",
        titleZh: "清醒梦入门",
        titleEn: "Introduction to Lucid Dreaming",
        quoteZh: "清醒梦就是在梦里知道自己在做梦。一旦你知道，你就是梦的主人。",
        quoteEn: "Lucid dreaming is knowing you're dreaming while in the dream. Once you know, you become the master of the dream.",
        contentZh: "清醒梦的概念。",
        contentEn: "The concept of lucid dreaming."
      },
      {
        date: "2026-06-14",
        titleZh: "本周复盘——清醒梦触发",
        titleEn: "Weekly Review—Lucid Dream Trigger",
        quoteZh: "白天每小时问自己一次：我现在是在做梦吗？这个习惯会带进梦里。",
        quoteEn: "Ask yourself once every hour: 'Am I dreaming right now?' This habit will carry into your dreams.",
        contentZh: "清醒梦触发技术。",
        contentEn: "Lucid dream triggering technique.",
        actionZh: "今天每小时问自己一次：我现在是在做梦吗？",
        actionEn: "Ask yourself once every hour today: 'Am I dreaming right now?'"
      },
      {
        date: "2026-06-15",
        titleZh: "清醒梦进阶",
        titleEn: "Advanced Lucid Dreaming",
        quoteZh: "在清醒梦里，你可以飞、可以穿墙、可以变形。物理定律对你无效。",
        quoteEn: "In lucid dreams, you can fly, walk through walls, transform. Physical laws don't apply to you.",
        contentZh: "清醒梦的可能性。",
        contentEn: "The possibilities of lucid dreaming."
      },
      {
        date: "2026-06-16",
        titleZh: "清醒梦疗愈",
        titleEn: "Lucid Dream Healing",
        quoteZh: "在清醒梦里召唤你的内我，请它疗愈你的身体。醒来会有惊喜。",
        quoteEn: "In a lucid dream, summon your Inner Self and ask it to heal your body. There will be a surprise when you wake.",
        contentZh: "利用清醒梦疗愈。",
        contentEn: "Using lucid dreams for healing."
      },
      {
        date: "2026-06-17",
        titleZh: "出体体验（OOBE）",
        titleEn: "Out of Body Experience (OOBE)",
        quoteZh: "出体是有意识地离开肉体。你会看到自己躺在床上，而你漂浮在天花板。",
        quoteEn: "OOBE is consciously leaving the body. You'll see yourself lying in bed while you float at the ceiling.",
        contentZh: "出体的定义。",
        contentEn: "The definition of OOBE."
      },
      {
        date: "2026-06-18",
        titleZh: "出体入门技术",
        titleEn: "OOBE Introduction Technique",
        quoteZh: "睡前躺好，想象自己在爬一根绳子。当身体麻痹时，用意念把自己拉出去。",
        quoteEn: "Lie down before sleep, imagine climbing a rope. When your body becomes paralyzed, pull yourself out with intention.",
        contentZh: "出体基础技术。",
        contentEn: "Basic OOBE technique."
      },
      {
        date: "2026-06-19",
        titleZh: "出体的恐惧",
        titleEn: "The Fear of OOBE",
        quoteZh: "你害怕出体后回不来？放心，肉体是你的锚，你永远会被拉回去。",
        quoteEn: "Afraid you won't return after leaving your body? Relax, your body is your anchor—you'll always be pulled back.",
        contentZh: "克服出体恐惧。",
        contentEn: "Overcoming OOBE fear."
      },
      {
        date: "2026-06-20",
        titleZh: "出体后去哪里？",
        titleEn: "Where Do You Go After Leaving Your Body?",
        quoteZh: "出体后你可以去任何地方：另一个城市、另一个星球、另一个维度。",
        quoteEn: "After leaving your body, you can go anywhere: another city, another planet, another dimension.",
        contentZh: "出体后的可能性。",
        contentEn: "Possibilities after OOBE."
      },
      {
        date: "2026-06-21",
        titleZh: "本周复盘——出体尝试",
        titleEn: "Weekly Review—Trying OOBE",
        quoteZh: "今晚尝试出体。不成功也没关系，重要的是打开这扇门的意愿。",
        quoteEn: "Try OOBE tonight. It's okay if you don't succeed—what matters is your willingness to open this door.",
        contentZh: "出体练习。",
        contentEn: "OOBE practice.",
        special: "夏至 Summer Solstice",
        actionZh: "今晚尝试出体：躺好，想象爬绳子，当身体麻痹时用意念把自己拉出去。",
        actionEn: "Try OOBE tonight: lie down, imagine climbing a rope, when paralyzed pull yourself out with intention."
      },
      {
        date: "2026-06-22",
        titleZh: "睡眠瘫痪是礼物",
        titleEn: "Sleep Paralysis Is a Gift",
        quoteZh: "睡眠瘫痪不是鬼压床，是你的灵魂半出体了。利用它，完成出体。",
        quoteEn: "Sleep paralysis isn't ghost oppression—it's your soul half out. Use it to complete the exit.",
        contentZh: "睡眠瘫痪的真相。",
        contentEn: "The truth about sleep paralysis."
      },
      {
        date: "2026-06-23",
        titleZh: "探索星光体",
        titleEn: "Exploring the Astral Body",
        quoteZh: "出体时你用的不是肉体，是星光体。它不受物理限制，可以穿墙、飞翔。",
        quoteEn: "When out of body, you use the astral body, not the physical one. It's not limited by physics—it can pass through walls, fly.",
        contentZh: "星光体的概念。",
        contentEn: "The concept of the astral body."
      },
      {
        date: "2026-06-24",
        titleZh: "在梦里见已故的人",
        titleEn: "Meeting the Deceased in Dreams",
        quoteZh: "你梦到已故的亲人不是幻觉，是真实的会面。他们一直在等你来。",
        quoteEn: "Dreaming of deceased relatives isn't hallucination—it's a real meeting. They've been waiting for you to come.",
        contentZh: "梦中与逝者相遇。",
        contentEn: "Meeting the dead in dreams."
      },
      {
        date: "2026-06-25",
        titleZh: "请求与逝者会面",
        titleEn: "Request to Meet the Deceased",
        quoteZh: "睡前请求内我：我想在梦里见某某人。如果时机对了，他们会来。",
        quoteEn: "Before sleep, ask your Inner Self: 'I want to meet [person] in my dream.' If the timing is right, they will come.",
        contentZh: "主动约见逝者。",
        contentEn: "Actively arranging to meet the deceased.",
        special: "端午节 Dragon Boat Festival"
      },
      {
        date: "2026-06-26",
        titleZh: "梦中学习",
        titleEn: "Learning in Dreams",
        quoteZh: "你可以在梦里上学、学技能、获取知识。梦是免费的大学。",
        quoteEn: "You can attend school in dreams, learn skills, acquire knowledge. Dreams are a free university.",
        contentZh: "梦的学习功能。",
        contentEn: "The learning function of dreams."
      },
      {
        date: "2026-06-27",
        titleZh: "梦中创造",
        titleEn: "Creating in Dreams",
        quoteZh: "很多艺术家、科学家在梦里得到灵感。你的下一个杰作可能就在今晚的梦里。",
        quoteEn: "Many artists and scientists get inspiration in dreams. Your next masterpiece might be in tonight's dream.",
        contentZh: "梦的创造功能。",
        contentEn: "The creative function of dreams."
      },
      {
        date: "2026-06-28",
        titleZh: "本周复盘——梦是第二人生",
        titleEn: "Weekly Review—Dreams Are a Second Life",
        quoteZh: "你有三分之一的人生在梦里。不利用它，就是浪费生命。",
        quoteEn: "One-third of your life is in dreams. Not using it is wasting life.",
        contentZh: "复盘梦的价值。",
        contentEn: "Review the value of dreams."
      },
      {
        date: "2026-06-29",
        titleZh: "合并白天与黑夜",
        titleEn: "Merge Day and Night",
        quoteZh: "白天的你和晚上的你是同一个人。打通它们，你的力量会翻倍。",
        quoteEn: "The daytime you and nighttime you are the same person. Connect them, and your power doubles.",
        contentZh: "整合日夜意识。",
        contentEn: "Integrating day and night consciousness."
      },
      {
        date: "2026-06-30",
        titleZh: "六月总结——醒来吧，在梦里",
        titleEn: "June Summary—Wake Up, in Your Dreams",
        quoteZh: "真正的觉醒不是不睡觉，而是在睡觉时也保持清醒。你准备好了吗？",
        quoteEn: "True awakening isn't not sleeping—it's staying awake even while sleeping. Are you ready?",
        contentZh: "回顾六月：梦与出体。",
        contentEn: "Review June: Dreams & Out of Body."
      }
    ]
  },
  // July
  {
    month: 7,
    themeZh: "命运与责任",
    themeEn: "Fate & Responsibility",
    subtitleZh: "没有命运，只有回音",
    subtitleEn: "No Fate, Only Echoes",
    sourceZh: "《灵魂永生》第九章、第十六章",
    sourceEn: "Seth Speaks Chapter 9 & 16",
    goals: [
      { zh: "彻底粉碎受害者情结", en: "Completely shatter the 'victim' complex" },
      { zh: "理解金钱是能量、关系是召唤", en: "Understand 'money is energy', 'relationships are summons'" },
      { zh: "学会改信念的暴力方法", en: "Learn violent methods to change beliefs" },
      { zh: "承认生活中的一切都是你亲手订购的", en: "Acknowledge everything in your life was ordered by you" },
    ],
    lessons: [
      {
        date: "2026-07-01",
        titleZh: "命运是回音",
        titleEn: "Fate Is an Echo",
        quoteZh: "你以为命运是天注定？它只是你过去信念的回声。改变信念，命运就改变。",
        quoteEn: "You think fate is predestined? It's just the echo of your past beliefs. Change beliefs, change fate.",
        contentZh: "进入第七月：命运与责任。",
        contentEn: "Entering the seventh month: Fate & Responsibility."
      },
      {
        date: "2026-07-02",
        titleZh: "没有受害者",
        titleEn: "No Victims",
        quoteZh: "你生命中发生的每一件事，都是你亲手招来的。没有例外。",
        quoteEn: "Everything that happens in your life, you personally invited. No exceptions.",
        contentZh: "彻底打破受害者情结。",
        contentEn: "Completely break the victim complex."
      },
      {
        date: "2026-07-03",
        titleZh: "你订购了这一切",
        titleEn: "You Ordered All of This",
        quoteZh: "你的疾病、贫穷、孤独——都是你在某个层面上订购的。退货的唯一方式是改变信念。",
        quoteEn: "Your illness, poverty, loneliness—you ordered them at some level. The only way to return them is to change beliefs.",
        contentZh: "承认自己的创造。",
        contentEn: "Acknowledge your creation."
      },
      {
        date: "2026-07-04",
        titleZh: "责任不是负担",
        titleEn: "Responsibility Isn't a Burden",
        quoteZh: "当你说这是我创造的，你不是在自责，而是在收回权力。",
        quoteEn: "When you say 'I created this', you're not blaming yourself—you're reclaiming power.",
        contentZh: "责任与权力。",
        contentEn: "Responsibility and power."
      },
      {
        date: "2026-07-05",
        titleZh: "本周复盘——认领你的人生",
        titleEn: "Weekly Review—Claim Your Life",
        quoteZh: "看着你人生中最糟糕的事，说：这是我创造的。然后问：我为什么要创造它？",
        quoteEn: "Look at the worst thing in your life and say: 'I created this.' Then ask: 'Why did I create it?'",
        contentZh: "认领练习。",
        contentEn: "Claiming practice.",
        actionZh: "对人生中最糟糕的事说：这是我创造的。然后问：我为什么要创造它？",
        actionEn: "Tell the worst thing in your life: 'I created this.' Then ask: 'Why did I create it?'"
      },
      {
        date: "2026-07-06",
        titleZh: "金钱是能量",
        titleEn: "Money Is Energy",
        quoteZh: "你缺钱不是因为钱不够，是因为你的能量场在排斥它。",
        quoteEn: "You lack money not because there isn't enough—it's because your energy field repels it.",
        contentZh: "金钱的能量本质。",
        contentEn: "The energetic nature of money.",
        special: "小暑 Lesser Heat"
      },
      {
        date: "2026-07-07",
        titleZh: "你对金钱的信念",
        titleEn: "Your Beliefs About Money",
        quoteZh: "钱是罪恶的、有钱人是坏人——这些信念正在驱赶金钱离开你。",
        quoteEn: "'Money is evil', 'rich people are bad'—these beliefs are driving money away from you.",
        contentZh: "检视金钱信念。",
        contentEn: "Examine money beliefs."
      },
      {
        date: "2026-07-08",
        titleZh: "改写金钱程序",
        titleEn: "Rewrite the Money Program",
        quoteZh: "今天开始说：金钱是爱的流动，我值得拥有丰盛。",
        quoteEn: "Start saying today: 'Money is the flow of love. I deserve abundance.'",
        contentZh: "重新编程金钱信念。",
        contentEn: "Reprogram money beliefs.",
        actionZh: "今天开始每天对自己说：金钱是爱的流动，我值得拥有丰盛。",
        actionEn: "Start saying daily: 'Money is the flow of love. I deserve abundance.'"
      },
      {
        date: "2026-07-09",
        titleZh: "关系是召唤",
        titleEn: "Relationships Are Summons",
        quoteZh: "你身边的每一个人，都是你用信念召唤来的。包括那些你讨厌的人。",
        quoteEn: "Everyone around you was summoned by your beliefs. Including the ones you hate.",
        contentZh: "关系的吸引法则。",
        contentEn: "The law of attraction in relationships."
      },
      {
        date: "2026-07-10",
        titleZh: "为什么总是遇到渣男/渣女？",
        titleEn: "Why Always Meet Bad Partners?",
        quoteZh: "你一直吸引渣的人，是因为你相信自己只配得到渣的。改变这个信念。",
        quoteEn: "You keep attracting bad people because you believe you only deserve bad ones. Change this belief.",
        contentZh: "关系模式的根源。",
        contentEn: "The root of relationship patterns."
      },
      {
        date: "2026-07-11",
        titleZh: "健康是信念的打印",
        titleEn: "Health Is Printed by Beliefs",
        quoteZh: "你的身体是你信念的3D打印结果。想换身体？先换信念。",
        quoteEn: "Your body is the 3D print of your beliefs. Want a new body? Change beliefs first.",
        contentZh: "健康与信念。",
        contentEn: "Health and beliefs."
      },
      {
        date: "2026-07-12",
        titleZh: "本周复盘——检查你的订单",
        titleEn: "Weekly Review—Check Your Orders",
        quoteZh: "列出你人生中不满意的三件事，问自己：是我的什么信念点了这道菜？",
        quoteEn: "List three unsatisfying things in your life and ask: 'What belief of mine ordered this dish?'",
        contentZh: "信念检视练习。",
        contentEn: "Belief examination practice.",
        actionZh: "列出三件不满意的事，找出背后的信念。",
        actionEn: "List three unsatisfying things and find the beliefs behind them."
      },
      {
        date: "2026-07-13",
        titleZh: "改信念的暴力方法",
        titleEn: "Violent Methods to Change Beliefs",
        quoteZh: "温柔地改信念太慢了。有时候你需要对旧信念大喊：滚出去！",
        quoteEn: "Gently changing beliefs is too slow. Sometimes you need to yell at old beliefs: 'Get out!'",
        contentZh: "暴力改信念法。",
        contentEn: "Violent belief-changing methods."
      },
      {
        date: "2026-07-14",
        titleZh: "信念手术刀",
        titleEn: "The Belief Scalpel",
        quoteZh: "找出那个让你痛苦的信念，用意念的手术刀把它切掉，然后植入新的。",
        quoteEn: "Find the belief causing pain, cut it out with a mental scalpel, then implant a new one.",
        contentZh: "信念置换技术。",
        contentEn: "Belief replacement technique."
      },
      {
        date: "2026-07-15",
        titleZh: "21天信念改写",
        titleEn: "21-Day Belief Rewrite",
        quoteZh: "一个信念需要21天才能扎根。每天重复新信念21天，它就会成为你的新程序。",
        quoteEn: "A belief takes 21 days to take root. Repeat the new belief daily for 21 days, and it becomes your new program.",
        contentZh: "21天法则。",
        contentEn: "The 21-day rule."
      },
      {
        date: "2026-07-16",
        titleZh: "写下你的新信念",
        titleEn: "Write Down Your New Beliefs",
        quoteZh: "拿起笔，写下十条你想要的新信念。每天早晚各读一遍，读到你相信为止。",
        quoteEn: "Take a pen, write ten new beliefs you want. Read them morning and night until you believe them.",
        contentZh: "信念书写练习。",
        contentEn: "Belief writing practice.",
        actionZh: "写下十条你想要的新信念，每天早晚各读一遍。",
        actionEn: "Write ten new beliefs you want, read them morning and night."
      },
      {
        date: "2026-07-17",
        titleZh: "环境在影响你",
        titleEn: "Environment Influences You",
        quoteZh: "你和五个穷人在一起，你就是第六个。你和五个富人在一起，你就是第六个。",
        quoteEn: "Hang with five poor people, you're the sixth. Hang with five rich people, you're the sixth.",
        contentZh: "环境对信念的影响。",
        contentEn: "Environment's influence on beliefs."
      },
      {
        date: "2026-07-18",
        titleZh: "换掉负能量的人",
        titleEn: "Replace Negative People",
        quoteZh: "那些总是抱怨、消极的人，正在污染你的信念场。你有权离开他们。",
        quoteEn: "Those who always complain and are negative are polluting your belief field. You have the right to leave them.",
        contentZh: "清理能量环境。",
        contentEn: "Cleansing energy environment."
      },
      {
        date: "2026-07-19",
        titleZh: "本周复盘——信念大扫除",
        titleEn: "Weekly Review—Belief Spring Cleaning",
        quoteZh: "这周检查你的信念仓库，把过期的、有毒的统统扔掉。",
        quoteEn: "This week, check your belief warehouse. Throw out everything expired and toxic.",
        contentZh: "信念清理练习。",
        contentEn: "Belief cleansing practice."
      },
      {
        date: "2026-07-20",
        titleZh: "你的话在创造",
        titleEn: "Your Words Are Creating",
        quoteZh: "每一句我不行我做不到我很穷，都在向宇宙下订单。管好你的嘴。",
        quoteEn: "Every 'I can't', 'I'm unable', 'I'm poor' places an order with the universe. Watch your mouth.",
        contentZh: "语言的创造力。",
        contentEn: "The creative power of words."
      },
      {
        date: "2026-07-21",
        titleZh: "停止抱怨",
        titleEn: "Stop Complaining",
        quoteZh: "你抱怨的每一秒，都在让事情变得更糟。闭嘴，或者说好话。",
        quoteEn: "Every second you complain, things get worse. Shut up, or say something good.",
        contentZh: "抱怨的代价。",
        contentEn: "The cost of complaining."
      },
      {
        date: "2026-07-22",
        titleZh: "感恩的魔力",
        titleEn: "The Magic of Gratitude",
        quoteZh: "感恩是最高频的能量。你感恩什么，什么就会倍增。",
        quoteEn: "Gratitude is the highest frequency energy. What you're grateful for multiplies.",
        contentZh: "感恩的创造力。",
        contentEn: "The creative power of gratitude.",
        special: "大暑 Greater Heat"
      },
      {
        date: "2026-07-23",
        titleZh: "感恩练习",
        titleEn: "Gratitude Practice",
        quoteZh: "每天睡前写下三件感恩的事。坚持一个月，你的人生会脱胎换骨。",
        quoteEn: "Write three things you're grateful for before bed every night. Persist for a month, your life will transform.",
        contentZh: "感恩日记。",
        contentEn: "Gratitude journal.",
        actionZh: "从今天开始，每天睡前写下三件感恩的事。",
        actionEn: "Starting today, write three things you're grateful for before bed."
      },
      {
        date: "2026-07-24",
        titleZh: "宽恕是为自己",
        titleEn: "Forgiveness Is for Yourself",
        quoteZh: "你不原谅别人，就像自己喝毒药希望别人死。宽恕是释放你自己。",
        quoteEn: "Not forgiving others is like drinking poison hoping they'll die. Forgiveness releases yourself.",
        contentZh: "宽恕的本质。",
        contentEn: "The essence of forgiveness."
      },
      {
        date: "2026-07-25",
        titleZh: "宽恕练习",
        titleEn: "Forgiveness Practice",
        quoteZh: "想着那个你最恨的人，说：我释放你，我释放我自己。",
        quoteEn: "Think of the person you hate most and say: 'I release you. I release myself.'",
        contentZh: "宽恕冥想。",
        contentEn: "Forgiveness meditation.",
        actionZh: "对你最恨的人说：我释放你，我释放我自己。",
        actionEn: "Say to the person you hate most: 'I release you. I release myself.'"
      },
      {
        date: "2026-07-26",
        titleZh: "本周复盘——责任是自由",
        titleEn: "Weekly Review—Responsibility Is Freedom",
        quoteZh: "当你完全为自己的人生负责，你就完全自由了。没有什么能困住你。",
        quoteEn: "When you take complete responsibility for your life, you become completely free. Nothing can trap you.",
        contentZh: "责任与自由的关系。",
        contentEn: "The relationship between responsibility and freedom."
      },
      {
        date: "2026-07-27",
        titleZh: "预设未来",
        titleEn: "Pre-set the Future",
        quoteZh: "每天早上花五分钟，用想象力预设今天会发生的美好事情。",
        quoteEn: "Spend five minutes every morning imagining the beautiful things that will happen today.",
        contentZh: "预设技术。",
        contentEn: "Pre-setting technique."
      },
      {
        date: "2026-07-28",
        titleZh: "回顾过去",
        titleEn: "Review the Past",
        quoteZh: "每天晚上花五分钟，把今天不满意的事情在脑海里重新演一遍，换成你想要的版本。",
        quoteEn: "Spend five minutes each night replaying unsatisfying events in your mind, replacing them with your desired version.",
        contentZh: "改写技术。",
        contentEn: "Rewriting technique."
      },
      {
        date: "2026-07-29",
        titleZh: "你是自己命运的唯一作者",
        titleEn: "You Are the Sole Author of Your Fate",
        quoteZh: "没有神、没有命运、没有星座能决定你的人生。只有你。",
        quoteEn: "No god, no fate, no zodiac can decide your life. Only you.",
        contentZh: "收回命运主权。",
        contentEn: "Reclaim sovereignty over fate."
      },
      {
        date: "2026-07-30",
        titleZh: "从今天开始新人生",
        titleEn: "Start a New Life Today",
        quoteZh: "过去不能决定未来。你随时可以决定：从现在开始，我是一个全新的人。",
        quoteEn: "The past doesn't determine the future. You can decide anytime: 'From now on, I am a completely new person.'",
        contentZh: "当下的力量。",
        contentEn: "The power of now."
      },
      {
        date: "2026-07-31",
        titleZh: "七月总结——你是你命运的主人",
        titleEn: "July Summary—You Are the Master of Your Fate",
        quoteZh: "命运不是等来的，是创造出来的。拿起笔，写你自己的故事。",
        quoteEn: "Fate isn't waited for—it's created. Pick up the pen, write your own story.",
        contentZh: "回顾七月：命运与责任。",
        contentEn: "Review July: Fate & Responsibility."
      }
    ]
  },
  // August
  {
    month: 8,
    themeZh: "显化与创造",
    themeEn: "Manifestation & Creation",
    subtitleZh: "比疯子还疯的显化技术",
    subtitleEn: "Crazier-Than-Crazy Manifestation Techniques",
    sourceZh: "《灵魂永生》第十一章、第十五章",
    sourceEn: "Seth Speaks Chapter 11 & 15",
    goals: [
      { zh: "掌握比疯子还疯的显化技术", en: "Master 'crazier than crazy' manifestation techniques" },
      { zh: "为性去罪化，理解性是宇宙大爆炸的微缩版", en: "Destigmatize sex, understand sex as a mini Big Bang" },
      { zh: "利用性高潮能量进行疗愈和显化", en: "Use orgasmic energy for healing and manifestation" },
      { zh: "学会假装直到成真", en: "Learn to 'fake it till you make it'" },
    ],
    lessons: [
      {
        date: "2026-08-01",
        titleZh: "你是疯狂的创造者",
        titleEn: "You Are a Crazy Creator",
        quoteZh: "每一秒钟你都在创造。问题是，你在有意识地创造，还是在无意识地乱创？",
        quoteEn: "You're creating every second. The question is: are you creating consciously, or creating chaos unconsciously?",
        contentZh: "进入第八月：显化与创造。",
        contentEn: "Entering the eighth month: Manifestation & Creation."
      },
      {
        date: "2026-08-02",
        titleZh: "显化不是魔法",
        titleEn: "Manifestation Isn't Magic",
        quoteZh: "显化不是什么神秘技术，而是你每天都在做的事。你只是不知道而已。",
        quoteEn: "Manifestation isn't some mysterious technique—it's what you do every day. You just don't know it.",
        contentZh: "显化的本质。",
        contentEn: "The essence of manifestation."
      },
      {
        date: "2026-08-03",
        titleZh: "想象力是上帝之手",
        titleEn: "Imagination Is the Hand of God",
        quoteZh: "你能想象的一切，都能成为现实。想象力不是幻想，是创造的蓝图。",
        quoteEn: "Everything you can imagine can become reality. Imagination isn't fantasy—it's the blueprint of creation.",
        contentZh: "想象力的力量。",
        contentEn: "The power of imagination."
      },
      {
        date: "2026-08-04",
        titleZh: "感受是加速器",
        titleEn: "Feeling Is the Accelerator",
        quoteZh: "光想象还不够，你要感受到它已经发生了。感受有多强烈，显化就有多快。",
        quoteEn: "Just imagining isn't enough—you need to feel it has already happened. The stronger the feeling, the faster the manifestation.",
        contentZh: "感受的重要性。",
        contentEn: "The importance of feeling."
      },
      {
        date: "2026-08-05",
        titleZh: "假装到成真",
        titleEn: "Fake It Till You Make It",
        quoteZh: "在你想要的东西到来之前，先表现得好像它已经来了。宇宙会配合你的表演。",
        quoteEn: "Before what you want arrives, act as if it's already here. The universe will match your performance.",
        contentZh: "假装技术。",
        contentEn: "The faking technique."
      },
      {
        date: "2026-08-06",
        titleZh: "本周复盘——创造练习",
        titleEn: "Weekly Review—Creation Practice",
        quoteZh: "选一件小事，用想象+感受的方式显化它。证明给自己看，这是真的。",
        quoteEn: "Choose something small, manifest it using imagination + feeling. Prove to yourself it's real.",
        contentZh: "显化练习。",
        contentEn: "Manifestation practice.",
        actionZh: "选一件小事，用想象+感受的方式显化它。",
        actionEn: "Choose something small and manifest it using imagination + feeling."
      },
      {
        date: "2026-08-07",
        titleZh: "性是微型宇宙大爆炸",
        titleEn: "Sex Is a Mini Big Bang",
        quoteZh: "性高潮的那一刻，你的能量和宇宙大爆炸的能量是一样的。这就是创造的本质。",
        quoteEn: "At the moment of orgasm, your energy is the same as the Big Bang's. This is the essence of creation.",
        contentZh: "性与创造力。",
        contentEn: "Sex and creativity.",
        special: "立秋 Beginning of Autumn"
      },
      {
        date: "2026-08-08",
        titleZh: "为性去罪化",
        titleEn: "Destigmatize Sex",
        quoteZh: "性不是肮脏的、罪恶的。它是宇宙给你的最高能量工具。",
        quoteEn: "Sex isn't dirty or sinful. It's the highest energy tool the universe gave you.",
        contentZh: "打破性羞耻。",
        contentEn: "Breaking sexual shame."
      },
      {
        date: "2026-08-09",
        titleZh: "性能量的转化",
        titleEn: "Transforming Sexual Energy",
        quoteZh: "性能量可以用来做爱，也可以用来创造、疗愈、觉醒。学会转化它。",
        quoteEn: "Sexual energy can be used for love-making, or for creation, healing, awakening. Learn to transform it.",
        contentZh: "性能量的多元用途。",
        contentEn: "Multiple uses of sexual energy."
      },
      {
        date: "2026-08-10",
        titleZh: "高潮显化法",
        titleEn: "Orgasm Manifestation Method",
        quoteZh: "在高潮的那一刻，把你想要显化的东西放进脑海。那是能量最强的时刻。",
        quoteEn: "At the moment of orgasm, put what you want to manifest in your mind. That's when energy is strongest.",
        contentZh: "利用高潮显化。",
        contentEn: "Using orgasm for manifestation."
      },
      {
        date: "2026-08-11",
        titleZh: "独身也能用性能量",
        titleEn: "Singles Can Use Sexual Energy Too",
        quoteZh: "不需要伴侣，你自己就可以激活并转化性能量。这是你的内在宝藏。",
        quoteEn: "You don't need a partner—you can activate and transform sexual energy yourself. It's your inner treasure.",
        contentZh: "独身者的性能量运用。",
        contentEn: "Sexual energy use for singles."
      },
      {
        date: "2026-08-12",
        titleZh: "本周复盘——神圣的性",
        titleEn: "Weekly Review—Sacred Sexuality",
        quoteZh: "这周重新审视你对性的看法。它是羞耻的，还是神圣的？",
        quoteEn: "This week, re-examine your views on sex. Is it shameful, or sacred?",
        contentZh: "复盘性观念。",
        contentEn: "Review sexual beliefs."
      },
      {
        date: "2026-08-13",
        titleZh: "愿景板",
        titleEn: "Vision Board",
        quoteZh: "把你想要的生活做成一张图，每天看它，感受它。这是最直接的显化工具。",
        quoteEn: "Make a picture of the life you want, look at it daily, feel it. This is the most direct manifestation tool.",
        contentZh: "愿景板技术。",
        contentEn: "Vision board technique.",
        actionZh: "今天制作一张愿景板，贴上你想要的生活图片。",
        actionEn: "Make a vision board today with pictures of the life you want."
      },
      {
        date: "2026-08-14",
        titleZh: "脚本写作",
        titleEn: "Script Writing",
        quoteZh: "写下你理想生活的一天，像写小说一样详细。然后每天读一遍，感受它。",
        quoteEn: "Write a day in your ideal life in detail like a novel. Read it daily and feel it.",
        contentZh: "脚本显化法。",
        contentEn: "Script manifestation method."
      },
      {
        date: "2026-08-15",
        titleZh: "369法则",
        titleEn: "The 369 Method",
        quoteZh: "早上写3遍你想要的，下午写6遍，晚上写9遍。坚持21天。",
        quoteEn: "Morning: write what you want 3 times. Afternoon: 6 times. Night: 9 times. Persist for 21 days.",
        contentZh: "369显化法。",
        contentEn: "369 manifestation method."
      },
      {
        date: "2026-08-16",
        titleZh: "新月许愿",
        titleEn: "New Moon Wishing",
        quoteZh: "每个新月是播种的最佳时机。写下你的愿望，宇宙会帮你孵化。",
        quoteEn: "Each new moon is the best time to plant seeds. Write your wishes, and the universe will incubate them.",
        contentZh: "月相与显化。",
        contentEn: "Moon phases and manifestation."
      },
      {
        date: "2026-08-17",
        titleZh: "放手的艺术",
        titleEn: "The Art of Letting Go",
        quoteZh: "许完愿就放手。抓得太紧反而推开它。像点外卖一样，点完就等它送来。",
        quoteEn: "Make your wish then let go. Gripping too tight pushes it away. Like ordering takeout—order and wait for delivery.",
        contentZh: "放手与信任。",
        contentEn: "Letting go and trusting."
      },
      {
        date: "2026-08-18",
        titleZh: "为什么显化不成功？",
        titleEn: "Why Doesn't Manifestation Work?",
        quoteZh: "99%的显化失败是因为潜意识在说不。表面想要，内心恐惧。",
        quoteEn: "99% of manifestation failures are because the subconscious says 'no'. Surface desire, inner fear.",
        contentZh: "显化失败的原因。",
        contentEn: "Reasons manifestation fails."
      },
      {
        date: "2026-08-19",
        titleZh: "本周复盘——清除阻碍",
        titleEn: "Weekly Review—Clear the Obstacles",
        quoteZh: "找出那个在潜意识里说我不配的声音，把它揪出来消灭。",
        quoteEn: "Find that voice in your subconscious saying 'I don't deserve it', drag it out and eliminate it.",
        contentZh: "清除潜意识阻碍。",
        contentEn: "Clear subconscious obstacles."
      },
      {
        date: "2026-08-20",
        titleZh: "先给出去",
        titleEn: "Give First",
        quoteZh: "你想要钱？先给别人钱。你想要爱？先给别人爱。给出去的会倍增回来。",
        quoteEn: "Want money? Give money first. Want love? Give love first. What you give comes back multiplied.",
        contentZh: "给予的力量。",
        contentEn: "The power of giving."
      },
      {
        date: "2026-08-21",
        titleZh: "丰盛意识",
        titleEn: "Abundance Consciousness",
        quoteZh: "穷人思维是僧多粥少，丰盛意识是宇宙无限。你用哪种意识，就活在哪种现实。",
        quoteEn: "Poverty mindset: 'not enough to go around.' Abundance consciousness: 'universe is infinite.' Which you use determines your reality.",
        contentZh: "培养丰盛意识。",
        contentEn: "Cultivating abundance consciousness."
      },
      {
        date: "2026-08-22",
        titleZh: "金钱冥想",
        titleEn: "Money Meditation",
        quoteZh: "闭上眼，想象金钱像水一样流向你，从四面八方涌来。感受富有的感觉。",
        quoteEn: "Close your eyes, imagine money flowing to you like water from all directions. Feel the feeling of being rich.",
        contentZh: "金钱冥想练习。",
        contentEn: "Money meditation practice.",
        actionZh: "今天做一次金钱冥想：想象金钱从四面八方流向你。",
        actionEn: "Do a money meditation today: imagine money flowing to you from all directions."
      },
      {
        date: "2026-08-23",
        titleZh: "健康显化",
        titleEn: "Health Manifestation",
        quoteZh: "想象你的身体充满光，每个细胞都在欢唱健康健康健康。",
        quoteEn: "Imagine your body filled with light, every cell singing 'health, health, health.'",
        contentZh: "健康的显化技术。",
        contentEn: "Health manifestation technique.",
        special: "处暑 End of Heat"
      },
      {
        date: "2026-08-24",
        titleZh: "关系显化",
        titleEn: "Relationship Manifestation",
        quoteZh: "想象你理想中的伴侣就在身边，感受和他/她在一起的温暖。",
        quoteEn: "Imagine your ideal partner right beside you, feel the warmth of being with them.",
        contentZh: "关系的显化技术。",
        contentEn: "Relationship manifestation technique."
      },
      {
        date: "2026-08-25",
        titleZh: "感谢法",
        titleEn: "The Gratitude Method",
        quoteZh: "不是等到拥有了才感谢，而是先感谢，然后才拥有。谢谢你让我发财。",
        quoteEn: "Don't wait until you have it to give thanks—give thanks first, then you'll have it. 'Thank you for making me rich.'",
        contentZh: "提前感恩。",
        contentEn: "Gratitude in advance."
      },
      {
        date: "2026-08-26",
        titleZh: "本周复盘——显化日记",
        titleEn: "Weekly Review—Manifestation Journal",
        quoteZh: "记录你这周所有的显化成功，不管多小。这会增强你的信心。",
        quoteEn: "Record all your manifestation successes this week, no matter how small. This builds confidence.",
        contentZh: "显化记录。",
        contentEn: "Manifestation recording."
      },
      {
        date: "2026-08-27",
        titleZh: "集体显化",
        titleEn: "Collective Manifestation",
        quoteZh: "一群人一起显化，力量是指数级的。找到你的同频人。",
        quoteEn: "A group manifesting together has exponential power. Find your frequency-matching people.",
        contentZh: "集体力量。",
        contentEn: "Collective power."
      },
      {
        date: "2026-08-28",
        titleZh: "创造者的责任",
        titleEn: "Creator's Responsibility",
        quoteZh: "能力越大，责任越大。当你学会显化，要用它创造美好，而不是自私。",
        quoteEn: "With great power comes great responsibility. When you learn to manifest, use it to create beauty, not selfishness.",
        contentZh: "显化的道德。",
        contentEn: "The ethics of manifestation."
      },
      {
        date: "2026-08-29",
        titleZh: "为地球显化",
        titleEn: "Manifest for Earth",
        quoteZh: "不只为自己显化，也为地球显化和平、丰盛、觉醒。",
        quoteEn: "Don't just manifest for yourself—manifest peace, abundance, awakening for Earth.",
        contentZh: "利他显化。",
        contentEn: "Altruistic manifestation."
      },
      {
        date: "2026-08-30",
        titleZh: "你已经是创造者",
        titleEn: "You Are Already a Creator",
        quoteZh: "不是学会创造，而是记起你一直都是创造者。你只是忘了而已。",
        quoteEn: "It's not about learning to create—it's remembering you've always been a creator. You just forgot.",
        contentZh: "记起创造者身份。",
        contentEn: "Remember your creator identity."
      },
      {
        date: "2026-08-31",
        titleZh: "八月总结——你是宇宙的艺术家",
        titleEn: "August Summary—You Are the Universe's Artist",
        quoteZh: "宇宙是你的画布，想象力是你的画笔，感受是你的颜料。去创造你的杰作吧。",
        quoteEn: "The universe is your canvas, imagination is your brush, feeling is your paint. Go create your masterpiece.",
        contentZh: "回顾八月：显化与创造。",
        contentEn: "Review August: Manifestation & Creation."
      }
    ]
  },
  // September
  {
    month: 9,
    themeZh: "感官与扩张",
    themeEn: "Senses & Expansion",
    subtitleZh: "开启内在感官，与存有对话",
    subtitleEn: "Activate Inner Senses, Dialogue with Entity",
    sourceZh: "《灵魂永生》第十二章",
    sourceEn: "Seth Speaks Chapter 12",
    goals: [
      { zh: "认识到五官的局限性（你是瞎子）", en: "Recognize the limitations of five senses (you are blind)" },
      { zh: "开启内在感官的四把钥匙", en: "Unlock the four keys of 'inner senses'" },
      { zh: "体验概念感知和意识扩张", en: "Experience 'conceptual sensing' and 'consciousness expansion'" },
      { zh: "与你的存有（Entity）建立直接对话", en: "Establish direct dialogue with your 'Entity'" },
    ],
    lessons: [
      {
        date: "2026-09-01",
        titleZh: "你是瞎子",
        titleEn: "You Are Blind",
        quoteZh: "你以为你看见了世界？你只看见了光谱的0.0035%。你几乎是全盲的。",
        quoteEn: "You think you see the world? You only see 0.0035% of the spectrum. You're practically blind.",
        contentZh: "进入第九月：感官与扩张。",
        contentEn: "Entering the ninth month: Senses & Expansion."
      },
      {
        date: "2026-09-02",
        titleZh: "五感是监狱",
        titleEn: "Five Senses Are a Prison",
        quoteZh: "五官是你用来体验物质世界的工具，但它们也是限制你感知更多的牢笼。",
        quoteEn: "Five senses are tools for experiencing the physical world, but they're also cages limiting your perception of more.",
        contentZh: "五感的局限性。",
        contentEn: "The limitations of five senses."
      },
      {
        date: "2026-09-03",
        titleZh: "内在感官",
        titleEn: "Inner Senses",
        quoteZh: "除了五官，你还有一套内在感官。它们被封印了，但可以被激活。",
        quoteEn: "Besides five senses, you have a set of inner senses. They've been sealed but can be activated.",
        contentZh: "内在感官的概念。",
        contentEn: "The concept of inner senses."
      },
      {
        date: "2026-09-04",
        titleZh: "第一把钥匙：概念感知",
        titleEn: "First Key: Conceptual Sensing",
        quoteZh: "不用眼睛看，不用耳朵听，直接用意识感知概念的本质。",
        quoteEn: "Without using eyes to see or ears to hear, directly perceive the essence of concepts with consciousness.",
        contentZh: "概念感知能力。",
        contentEn: "Conceptual sensing ability."
      },
      {
        date: "2026-09-05",
        titleZh: "本周复盘——练习概念感知",
        titleEn: "Weekly Review—Practice Conceptual Sensing",
        quoteZh: "闭上眼，想一个抽象概念（比如爱），不用语言描述它，直接感受它是什么。",
        quoteEn: "Close your eyes, think of an abstract concept (like love), don't describe it in words, just feel what it is.",
        contentZh: "概念感知练习。",
        contentEn: "Conceptual sensing practice.",
        actionZh: "闭上眼，想一个抽象概念（如爱），不用语言，直接感受它的本质。",
        actionEn: "Close your eyes, think of an abstract concept (like love), feel its essence without words."
      },
      {
        date: "2026-09-06",
        titleZh: "第二把钥匙：心理时间旅行",
        titleEn: "Second Key: Psychological Time Travel",
        quoteZh: "你可以用意识回到过去或去到未来。不是想象，是真正的到达。",
        quoteEn: "You can use consciousness to return to the past or go to the future. Not imagination—real arrival.",
        contentZh: "心理时间旅行。",
        contentEn: "Psychological time travel."
      },
      {
        date: "2026-09-07",
        titleZh: "第三把钥匙：心灵感应",
        titleEn: "Third Key: Telepathy",
        quoteZh: "你本来就能读取别人的思想。只是你的外我太吵了，听不到。",
        quoteEn: "You can originally read others' thoughts. It's just that your outer ego is too noisy to hear.",
        contentZh: "心灵感应能力。",
        contentEn: "Telepathic ability.",
        special: "白露 White Dew"
      },
      {
        date: "2026-09-08",
        titleZh: "第四把钥匙：遥视",
        titleEn: "Fourth Key: Remote Viewing",
        quoteZh: "你可以用意识看到千里之外的画面。距离是幻觉。",
        quoteEn: "You can use consciousness to see scenes thousands of miles away. Distance is an illusion.",
        contentZh: "遥视能力。",
        contentEn: "Remote viewing ability."
      },
      {
        date: "2026-09-09",
        titleZh: "如何激活内在感官",
        titleEn: "How to Activate Inner Senses",
        quoteZh: "安静下来。让外我闭嘴。然后，等待。内在感官会自己打开。",
        quoteEn: "Quiet down. Silence the outer ego. Then wait. Inner senses will open by themselves.",
        contentZh: "激活内在感官的方法。",
        contentEn: "Methods to activate inner senses."
      },
      {
        date: "2026-09-10",
        titleZh: "与存有对话",
        titleEn: "Dialogue with Entity",
        quoteZh: "你的存有一直在等你。只要你安静下来问，它就会回答。",
        quoteEn: "Your Entity has been waiting for you. Just quiet down and ask, and it will answer.",
        contentZh: "与存有建立连接。",
        contentEn: "Establishing connection with Entity.",
        special: "中秋节 Mid-Autumn Festival"
      },
      {
        date: "2026-09-11",
        titleZh: "本周复盘——静默练习",
        titleEn: "Weekly Review—Silence Practice",
        quoteZh: "今天花30分钟，什么都不做，只是存在。看看会发生什么。",
        quoteEn: "Spend 30 minutes today doing nothing, just being. See what happens.",
        contentZh: "静默练习。",
        contentEn: "Silence practice.",
        actionZh: "今天花30分钟，什么都不做，只是存在。",
        actionEn: "Spend 30 minutes today doing nothing, just being."
      },
      {
        date: "2026-09-12",
        titleZh: "意识扩张",
        titleEn: "Consciousness Expansion",
        quoteZh: "你的意识可以扩张到包含整个房间、整栋楼、整个城市、整个地球。",
        quoteEn: "Your consciousness can expand to include the whole room, building, city, Earth.",
        contentZh: "意识扩张的可能性。",
        contentEn: "Possibilities of consciousness expansion."
      },
      {
        date: "2026-09-13",
        titleZh: "扩张练习",
        titleEn: "Expansion Practice",
        quoteZh: "闭上眼，想象你的意识像气球一样膨胀，越来越大，越来越大……",
        quoteEn: "Close your eyes, imagine your consciousness inflating like a balloon, bigger and bigger...",
        contentZh: "意识扩张练习。",
        contentEn: "Consciousness expansion practice.",
        actionZh: "闭上眼，想象你的意识像气球一样越来越大，直到包含整个地球。",
        actionEn: "Close your eyes, imagine your consciousness expanding like a balloon until it includes the entire Earth."
      },
      {
        date: "2026-09-14",
        titleZh: "收缩到原子",
        titleEn: "Contract to an Atom",
        quoteZh: "你的意识也可以收缩到一个原子那么小，进入微观世界探险。",
        quoteEn: "Your consciousness can also contract to the size of an atom, exploring the microscopic world.",
        contentZh: "意识收缩。",
        contentEn: "Consciousness contraction."
      },
      {
        date: "2026-09-15",
        titleZh: "进入物体",
        titleEn: "Enter Objects",
        quoteZh: "把你的意识放进一块石头、一棵树、一杯水里。感受它们的存在。",
        quoteEn: "Put your consciousness into a stone, a tree, a glass of water. Feel their existence.",
        contentZh: "物体探索练习。",
        contentEn: "Object exploration practice."
      },
      {
        date: "2026-09-16",
        titleZh: "进入动物",
        titleEn: "Enter Animals",
        quoteZh: "把你的意识放进一只猫、一只鸟、一条鱼里。体验它们的感知。",
        quoteEn: "Put your consciousness into a cat, a bird, a fish. Experience their perception.",
        contentZh: "动物探索练习。",
        contentEn: "Animal exploration practice."
      },
      {
        date: "2026-09-17",
        titleZh: "进入他人",
        titleEn: "Enter Others",
        quoteZh: "你可以用意识进入另一个人，感受他们的感受。这就是真正的同理心。",
        quoteEn: "You can use consciousness to enter another person, feel their feelings. This is true empathy.",
        contentZh: "同理心练习。",
        contentEn: "Empathy practice."
      },
      {
        date: "2026-09-18",
        titleZh: "本周复盘——成为他人",
        titleEn: "Weekly Review—Become Others",
        quoteZh: "选一个你不理解的人，用意识进入他们，感受他们为什么那样做。",
        quoteEn: "Choose someone you don't understand, enter them with consciousness, feel why they do what they do.",
        contentZh: "同理心练习。",
        contentEn: "Empathy practice."
      },
      {
        date: "2026-09-19",
        titleZh: "直觉是内在感官的信号",
        titleEn: "Intuition Is Inner Sense Signal",
        quoteZh: "每当你有一个莫名其妙的感觉，那是你的内在感官在说话。学会听它。",
        quoteEn: "Whenever you have an unexplainable feeling, that's your inner senses speaking. Learn to listen.",
        contentZh: "直觉的本质。",
        contentEn: "The nature of intuition."
      },
      {
        date: "2026-09-20",
        titleZh: "信任你的直觉",
        titleEn: "Trust Your Intuition",
        quoteZh: "直觉从来没骗过你。骗你的是你的头脑。下次，先听直觉，再用头脑。",
        quoteEn: "Intuition never lied to you. Your mind did. Next time, listen to intuition first, then use your mind.",
        contentZh: "直觉信任练习。",
        contentEn: "Intuition trust practice."
      },
      {
        date: "2026-09-21",
        titleZh: "开发第六感",
        titleEn: "Develop the Sixth Sense",
        quoteZh: "第六感不是特异功能，是人人都有的正常能力。只是大多数人把它关掉了。",
        quoteEn: "The sixth sense isn't a special power—it's a normal ability everyone has. Most people just turned it off.",
        contentZh: "第六感的本质。",
        contentEn: "The nature of the sixth sense."
      },
      {
        date: "2026-09-22",
        titleZh: "打开第三只眼",
        titleEn: "Open the Third Eye",
        quoteZh: "第三只眼不在额头，在你的松果体。它是连接更高维度的天线。",
        quoteEn: "The third eye isn't on the forehead—it's in your pineal gland. It's the antenna connecting to higher dimensions.",
        contentZh: "松果体与第三只眼。",
        contentEn: "Pineal gland and third eye.",
        special: "秋分 Autumn Equinox"
      },
      {
        date: "2026-09-23",
        titleZh: "本周复盘——松果体冥想",
        titleEn: "Weekly Review—Pineal Gland Meditation",
        quoteZh: "闭上眼，把注意力集中在额头正中偏后的位置。想象那里有一个发光的水晶球。",
        quoteEn: "Close your eyes, focus attention on the center back of your forehead. Imagine a glowing crystal ball there.",
        contentZh: "松果体冥想。",
        contentEn: "Pineal gland meditation.",
        actionZh: "闭上眼，把注意力集中在松果体位置，想象那里有一个发光的水晶球。",
        actionEn: "Close your eyes, focus on your pineal gland location, imagine a glowing crystal ball there."
      },
      {
        date: "2026-09-24",
        titleZh: "通灵不是少数人的特权",
        titleEn: "Channeling Isn't a Privilege for Few",
        quoteZh: "每个人都可以通灵。你只需要安静下来，打开接收器。",
        quoteEn: "Everyone can channel. You just need to quiet down and turn on the receiver.",
        contentZh: "通灵的普遍性。",
        contentEn: "The universality of channeling."
      },
      {
        date: "2026-09-25",
        titleZh: "如何开始通灵",
        titleEn: "How to Start Channeling",
        quoteZh: "放松身体，清空头脑，然后问一个问题，等待答案自己浮现。",
        quoteEn: "Relax your body, empty your mind, ask a question, and wait for the answer to emerge.",
        contentZh: "通灵入门。",
        contentEn: "Introduction to channeling."
      },
      {
        date: "2026-09-26",
        titleZh: "区分噪音和信号",
        titleEn: "Distinguish Noise from Signal",
        quoteZh: "不是所有的声音都是通灵。学会区分哪些是内我的信息，哪些是外我的噪音。",
        quoteEn: "Not all voices are channeling. Learn to distinguish Inner Self's messages from outer ego's noise.",
        contentZh: "辨别真假信息。",
        contentEn: "Discerning true and false messages."
      },
      {
        date: "2026-09-27",
        titleZh: "自动书写",
        titleEn: "Automatic Writing",
        quoteZh: "拿起笔，放松，让手自己动。不要想，只是写。看看会写出什么。",
        quoteEn: "Pick up a pen, relax, let your hand move by itself. Don't think, just write. See what comes out.",
        contentZh: "自动书写练习。",
        contentEn: "Automatic writing practice.",
        actionZh: "今天尝试自动书写：拿起笔，放松，让手自己动，不要想，只是写。",
        actionEn: "Try automatic writing today: pick up a pen, relax, let your hand move by itself, don't think, just write."
      },
      {
        date: "2026-09-28",
        titleZh: "你的感官正在进化",
        titleEn: "Your Senses Are Evolving",
        quoteZh: "人类正处于感官升级的时代。你正在学会用新的方式感知世界。",
        quoteEn: "Humanity is in an era of sensory upgrade. You're learning to perceive the world in new ways.",
        contentZh: "感官进化。",
        contentEn: "Sensory evolution."
      },
      {
        date: "2026-09-29",
        titleZh: "感官合一",
        titleEn: "Sensory Unity",
        quoteZh: "最终，五官和内在感官会合一。你会用整个存在去感知，而不只是用眼睛和耳朵。",
        quoteEn: "Eventually, five senses and inner senses merge. You'll perceive with your whole being, not just eyes and ears.",
        contentZh: "感官整合。",
        contentEn: "Sensory integration."
      },
      {
        date: "2026-09-30",
        titleZh: "九月总结——打开所有的门",
        titleEn: "September Summary—Open All the Doors",
        quoteZh: "你有无数扇感知的门。这个月，你学会了打开几扇。继续探索，还有更多。",
        quoteEn: "You have countless doors of perception. This month, you learned to open some. Keep exploring—there are more.",
        contentZh: "回顾九月：感官与扩张。",
        contentEn: "Review September: Senses & Expansion."
      }
    ]
  },
  // October
  {
    month: 10,
    themeZh: "破除偶像",
    themeEn: "Breaking Idols",
    subtitleZh: "砸碎神像，收回权力",
    subtitleEn: "Smash the Idols, Reclaim Your Power",
    sourceZh: "《灵魂永生》第十四章、附录一",
    sourceEn: "Seth Speaks Chapter 14 & Appendix 1",
    goals: [
      { zh: "把你跪了一辈子的神像砸碎", en: "Smash the idols you've knelt to your whole life" },
      { zh: "理解所有宗教都是奴隶合同", en: "Understand all religions are 'slave contracts'" },
      { zh: "揭开耶稣被钉十字架的历史真相", en: "Reveal the historical truth of Jesus's crucifixion" },
      { zh: "收回外包给神的权力，承认我就是神", en: "Reclaim power outsourced to gods, acknowledge 'I am God'" },
    ],
    lessons: [
      {
        date: "2026-10-01",
        titleZh: "你跪了多少神像？",
        titleEn: "How Many Idols Have You Knelt To?",
        quoteZh: "从小到大，你在多少神像前跪下？父母、老师、领导、上帝……现在该站起来了。",
        quoteEn: "Growing up, how many idols did you kneel before? Parents, teachers, bosses, God... It's time to stand up.",
        contentZh: "进入第十月：破除偶像。",
        contentEn: "Entering the tenth month: Breaking Idols.",
        special: "国庆节 National Day"
      },
      {
        date: "2026-10-02",
        titleZh: "偶像是恐惧的产物",
        titleEn: "Idols Are Products of Fear",
        quoteZh: "人类创造神，是因为恐惧。我无法保护自己，所以需要一个更强大的来保护我。",
        quoteEn: "Humans created gods out of fear. 'I can't protect myself, so I need something stronger to protect me.'",
        contentZh: "偶像的心理根源。",
        contentEn: "The psychological root of idols."
      },
      {
        date: "2026-10-03",
        titleZh: "宗教是奴隶合同",
        titleEn: "Religion Is a Slave Contract",
        quoteZh: "大多数宗教的核心逻辑是：你是有罪的，需要某个更高的力量来拯救你。这是奴役。",
        quoteEn: "Most religions' core logic: 'You are sinful and need a higher power to save you.' This is enslavement.",
        contentZh: "宗教的本质。",
        contentEn: "The essence of religion."
      },
      {
        date: "2026-10-04",
        titleZh: "你不需要被拯救",
        titleEn: "You Don't Need to Be Saved",
        quoteZh: "你从来没有迷失过。你是假装迷失来玩这个游戏的。游戏结束了，醒来吧。",
        quoteEn: "You were never lost. You pretended to be lost to play this game. Game over—wake up.",
        contentZh: "打破救赎幻觉。",
        contentEn: "Breaking the salvation illusion."
      },
      {
        date: "2026-10-05",
        titleZh: "本周复盘——列出你的偶像",
        titleEn: "Weekly Review—List Your Idols",
        quoteZh: "写下你人生中崇拜过的所有人、事、物。问自己：我为什么把权力给了他们？",
        quoteEn: "Write down everyone and everything you've worshipped in life. Ask: 'Why did I give them my power?'",
        contentZh: "偶像清单。",
        contentEn: "Idol list.",
        actionZh: "写下你崇拜过的所有人、事、物，问自己为什么把权力给了他们。",
        actionEn: "Write down all you've worshipped and ask why you gave them your power."
      },
      {
        date: "2026-10-06",
        titleZh: "耶稣没有被钉死",
        titleEn: "Jesus Wasn't Crucified",
        quoteZh: "赛斯说：耶稣没有被钉十字架。这个故事是后人编造的，用来制造罪恶感和控制。",
        quoteEn: "Seth says: Jesus wasn't crucified. This story was fabricated later to create guilt and control.",
        contentZh: "十字架的真相。",
        contentEn: "The truth of the crucifixion."
      },
      {
        date: "2026-10-07",
        titleZh: "耶稣的真正教导",
        titleEn: "Jesus's True Teaching",
        quoteZh: "耶稣真正想说的是：你和我一样，是神的孩子。你有和我同样的力量。",
        quoteEn: "What Jesus really wanted to say: 'You are like me, a child of God. You have the same power as me.'",
        contentZh: "耶稣的本意。",
        contentEn: "Jesus's true intention."
      },
      {
        date: "2026-10-08",
        titleZh: "佛陀不是神",
        titleEn: "Buddha Is Not a God",
        quoteZh: "佛陀从来没有说过要拜他。他说的是：成为你自己的灯。",
        quoteEn: "Buddha never said to worship him. He said: 'Be your own lamp.'",
        contentZh: "佛陀的本意。",
        contentEn: "Buddha's true intention.",
        special: "寒露 Cold Dew"
      },
      {
        date: "2026-10-09",
        titleZh: "所有大师都在说同一件事",
        titleEn: "All Masters Say the Same Thing",
        quoteZh: "耶稣、佛陀、老子、克里希那——他们都在说：你就是你要找的那个。",
        quoteEn: "Jesus, Buddha, Laozi, Krishna—they all say: 'You are the one you've been looking for.'",
        contentZh: "大师的共同信息。",
        contentEn: "The common message of masters."
      },
      {
        date: "2026-10-10",
        titleZh: "不要崇拜赛斯",
        titleEn: "Don't Worship Seth",
        quoteZh: "赛斯自己说：不要把我当神。我只是一个老师，来提醒你本来就知道的事。",
        quoteEn: "Seth himself says: 'Don't treat me as a god. I'm just a teacher reminding you of what you already know.'",
        contentZh: "赛斯的警告。",
        contentEn: "Seth's warning."
      },
      {
        date: "2026-10-11",
        titleZh: "不要崇拜Mike",
        titleEn: "Don't Worship Mike",
        quoteZh: "我只是一个翻译官。我的工作是把赛斯的话翻译给你听。真正的老师在你里面。",
        quoteEn: "I'm just a translator. My job is to translate Seth's words for you. The real teacher is inside you.",
        contentZh: "Mike的定位。",
        contentEn: "Mike's role."
      },
      {
        date: "2026-10-12",
        titleZh: "本周复盘——砸碎第一个偶像",
        titleEn: "Weekly Review—Smash the First Idol",
        quoteZh: "选一个你最崇拜的人，在心里对他们说：谢谢你，但我不再需要你来定义我了。",
        quoteEn: "Choose your most worshipped person, say in your heart: 'Thank you, but I no longer need you to define me.'",
        contentZh: "砸碎偶像练习。",
        contentEn: "Idol smashing practice.",
        actionZh: "对你最崇拜的人说：谢谢你，但我不再需要你来定义我了。",
        actionEn: "Say to your most worshipped person: 'Thank you, but I no longer need you to define me.'"
      },
      {
        date: "2026-10-13",
        titleZh: "权威是幻觉",
        titleEn: "Authority Is an Illusion",
        quoteZh: "没有人有权力定义你是谁、你应该怎么活。所有的权威都是你给的。",
        quoteEn: "No one has the power to define who you are or how you should live. All authority was given by you.",
        contentZh: "权威的本质。",
        contentEn: "The nature of authority."
      },
      {
        date: "2026-10-14",
        titleZh: "收回你的权力",
        titleEn: "Reclaim Your Power",
        quoteZh: "你外包给父母的、给老师的、给社会的、给神的权力，现在统统收回。",
        quoteEn: "The power you outsourced to parents, teachers, society, God—take it all back now.",
        contentZh: "收回权力。",
        contentEn: "Reclaiming power."
      },
      {
        date: "2026-10-15",
        titleZh: "承认：我就是神",
        titleEn: "Acknowledge: I Am God",
        quoteZh: "这句话让你害怕吗？这不是狂妄，这是真相。你是一切万有的一个碎片。",
        quoteEn: "Does this sentence scare you? This isn't arrogance—it's truth. You are a fragment of All That Is.",
        contentZh: "神圣身份的认领。",
        contentEn: "Claiming divine identity."
      },
      {
        date: "2026-10-16",
        titleZh: "我就是神不意味着我是唯一的神",
        titleEn: "'I Am God' Doesn't Mean I'm the Only God",
        quoteZh: "你是神，我是神，他也是神。每一个意识都是神。这是包容，不是排他。",
        quoteEn: "You are God, I am God, they are God. Every consciousness is God. This is inclusive, not exclusive.",
        contentZh: "神性的普遍性。",
        contentEn: "The universality of divinity."
      },
      {
        date: "2026-10-17",
        titleZh: "本周复盘——对镜子说我是神",
        titleEn: "Weekly Review—Say 'I Am God' to the Mirror",
        quoteZh: "今天对着镜子说十遍：我是神。注意你的身体反应和情绪变化。",
        quoteEn: "Today, say 'I am God' to the mirror ten times. Notice your body's reaction and emotional changes.",
        contentZh: "神性认领练习。",
        contentEn: "Divinity claiming practice.",
        actionZh: "对着镜子说十遍：我是神。注意你的身体和情绪反应。",
        actionEn: "Say 'I am God' to the mirror ten times. Notice your body and emotional reactions."
      },
      {
        date: "2026-10-18",
        titleZh: "恐惧是最后一个偶像",
        titleEn: "Fear Is the Last Idol",
        quoteZh: "你砸碎了所有外在的偶像，但还有一个住在你心里：恐惧。现在轮到它了。",
        quoteEn: "You smashed all external idols, but one still lives in your heart: fear. Now it's its turn.",
        contentZh: "恐惧作为最终偶像。",
        contentEn: "Fear as the final idol."
      },
      {
        date: "2026-10-19",
        titleZh: "直面你的恐惧",
        titleEn: "Face Your Fears",
        quoteZh: "写下你最深的恐惧。看着它。它真的有你想象的那么可怕吗？",
        quoteEn: "Write down your deepest fear. Look at it. Is it really as terrifying as you imagined?",
        contentZh: "恐惧直面练习。",
        contentEn: "Fear-facing practice.",
        actionZh: "写下你最深的恐惧，看着它，问自己：它真的有那么可怕吗？",
        actionEn: "Write your deepest fear, look at it, ask: 'Is it really that terrifying?'"
      },
      {
        date: "2026-10-20",
        titleZh: "恐惧只是幻觉",
        titleEn: "Fear Is Just an Illusion",
        quoteZh: "恐惧是你想象出来的。它只存在于你的头脑里，而不在现实中。",
        quoteEn: "Fear is imagined. It only exists in your mind, not in reality.",
        contentZh: "恐惧的本质。",
        contentEn: "The nature of fear."
      },
      {
        date: "2026-10-21",
        titleZh: "拥抱你的阴影",
        titleEn: "Embrace Your Shadow",
        quoteZh: "你害怕的、讨厌的、否认的那部分自己，现在是时候把它拥抱回来了。",
        quoteEn: "The part of yourself you fear, hate, and deny—it's time to embrace it back.",
        contentZh: "阴影整合。",
        contentEn: "Shadow integration."
      },
      {
        date: "2026-10-22",
        titleZh: "黑暗是光的另一面",
        titleEn: "Darkness Is the Other Side of Light",
        quoteZh: "没有黑暗就没有光，没有恐惧就没有勇气。接受整体的自己。",
        quoteEn: "Without darkness there's no light, without fear there's no courage. Accept your whole self.",
        contentZh: "二元性的整合。",
        contentEn: "Integration of duality."
      },
      {
        date: "2026-10-23",
        titleZh: "本周复盘——与阴影对话",
        titleEn: "Weekly Review—Dialogue with Your Shadow",
        quoteZh: "在冥想中，邀请你的阴影面出来。问它：你想告诉我什么？",
        quoteEn: "In meditation, invite your shadow to come out. Ask it: 'What do you want to tell me?'",
        contentZh: "阴影对话练习。",
        contentEn: "Shadow dialogue practice.",
        special: "霜降 Frost Descent"
      },
      {
        date: "2026-10-24",
        titleZh: "死亡是最大的偶像",
        titleEn: "Death Is the Biggest Idol",
        quoteZh: "你最崇拜、最恐惧的偶像是死亡。现在是时候把这个偶像也砸了。",
        quoteEn: "The idol you worship and fear most is death. Time to smash this idol too.",
        contentZh: "死亡作为偶像。",
        contentEn: "Death as idol."
      },
      {
        date: "2026-10-25",
        titleZh: "死亡不存在",
        titleEn: "Death Doesn't Exist",
        quoteZh: "你从来没有出生过，所以你永远不会死。你只是换了一套衣服。",
        quoteEn: "You were never born, so you'll never die. You just changed clothes.",
        contentZh: "死亡的真相。",
        contentEn: "The truth of death."
      },
      {
        date: "2026-10-26",
        titleZh: "练习死亡",
        titleEn: "Practice Dying",
        quoteZh: "今晚睡觉时，想象这是你最后一口气。感受那种彻底放松的感觉。那就是死亡。",
        quoteEn: "Tonight before sleep, imagine this is your last breath. Feel that complete relaxation. That's death.",
        contentZh: "死亡冥想。",
        contentEn: "Death meditation.",
        actionZh: "今晚睡觉时，想象这是你最后一口气，感受彻底放松。",
        actionEn: "Tonight before sleep, imagine this is your last breath, feel complete relaxation."
      },
      {
        date: "2026-10-27",
        titleZh: "自由了",
        titleEn: "Free at Last",
        quoteZh: "当你不再害怕死亡，你就真正自由了。没有什么能威胁你了。",
        quoteEn: "When you no longer fear death, you're truly free. Nothing can threaten you anymore.",
        contentZh: "死亡恐惧的超越。",
        contentEn: "Transcending fear of death."
      },
      {
        date: "2026-10-28",
        titleZh: "你是自己的神",
        titleEn: "You Are Your Own God",
        quoteZh: "现在你知道了：你不需要任何外在的神、救世主、权威。你自己就是。",
        quoteEn: "Now you know: you don't need any external god, savior, authority. You are it yourself.",
        contentZh: "内在神性的确认。",
        contentEn: "Confirmation of inner divinity."
      },
      {
        date: "2026-10-29",
        titleZh: "站起来",
        titleEn: "Stand Up",
        quoteZh: "跪了这么久，腿麻了吧？站起来，伸展一下。感受站立的力量。",
        quoteEn: "Been kneeling so long, legs numb? Stand up, stretch. Feel the power of standing.",
        contentZh: "站立的力量。",
        contentEn: "The power of standing."
      },
      {
        date: "2026-10-30",
        titleZh: "本周复盘——清空神坛",
        titleEn: "Weekly Review—Clear the Altar",
        quoteZh: "想象你心里有一个神坛，上面摆满了偶像。今天把它们全部清空。",
        quoteEn: "Imagine an altar in your heart filled with idols. Today, clear them all out.",
        contentZh: "清空神坛练习。",
        contentEn: "Altar clearing practice."
      },
      {
        date: "2026-10-31",
        titleZh: "十月总结——你是自己的神",
        titleEn: "October Summary—You Are Your Own God",
        quoteZh: "神坛清空了，现在只有一个人站在那里：你。你就是你一直在找的那个神。",
        quoteEn: "The altar is cleared. Now only one person stands there: you. You are the god you've been looking for.",
        contentZh: "回顾十月：破除偶像。",
        contentEn: "Review October: Breaking Idols.",
        special: "万圣节 Halloween"
      }
    ]
  },
  // November
  {
    month: 11,
    themeZh: "地球游戏",
    themeEn: "The Earth Game",
    subtitleZh: "毕业考：从受害者到创造者",
    subtitleEn: "Final Exam: From Victim to Creator",
    sourceZh: "《灵魂永生》第十七章、附录三",
    sourceEn: "Seth Speaks Chapter 17 & Appendix 3",
    goals: [
      { zh: "认清地球是宇宙的特训班/戒网中心", en: "Recognize Earth as the universe's 'boot camp'" },
      { zh: "人类是叛逆的中二期少年", en: "Humans are rebellious teenagers in their edgy phase" },
      { zh: "唯一的毕业考题目：把受害者变成创造者", en: "Only exam question: transform 'victim' into 'creator'" },
      { zh: "掌握终极一招，随时自我解脱", en: "Master the 'ultimate move' for instant self-liberation" },
    ],
    lessons: [
      {
        date: "2026-11-01",
        titleZh: "欢迎来到地球训练营",
        titleEn: "Welcome to Earth Boot Camp",
        quoteZh: "地球不是度假村，是特种部队训练营。你来这里是来受训的，不是来享乐的。",
        quoteEn: "Earth isn't a resort—it's a special forces boot camp. You came here to train, not to vacation.",
        contentZh: "进入第十一月：地球游戏。",
        contentEn: "Entering the eleventh month: The Earth Game."
      },
      {
        date: "2026-11-02",
        titleZh: "为什么选择地球？",
        titleEn: "Why Choose Earth?",
        quoteZh: "地球是宇宙里最难的学校之一。你选择来这里，是因为你想要最快的成长。",
        quoteEn: "Earth is one of the hardest schools in the universe. You chose to come here because you wanted the fastest growth.",
        contentZh: "地球的特殊性。",
        contentEn: "The uniqueness of Earth."
      },
      {
        date: "2026-11-03",
        titleZh: "二元性的挑战",
        titleEn: "The Challenge of Duality",
        quoteZh: "地球的特色是二元性：光与暗、善与恶、生与死。你来这里就是为了体验这个挑战。",
        quoteEn: "Earth's specialty is duality: light and dark, good and evil, life and death. You came here to experience this challenge.",
        contentZh: "二元性的目的。",
        contentEn: "The purpose of duality."
      },
      {
        date: "2026-11-04",
        titleZh: "遗忘是游戏的一部分",
        titleEn: "Forgetting Is Part of the Game",
        quoteZh: "你忘记了自己是谁，这不是意外，是游戏设定。没有遗忘，就没有发现的惊喜。",
        quoteEn: "You forgot who you are—this isn't an accident, it's a game setting. Without forgetting, there's no surprise of discovery.",
        contentZh: "遗忘的设计。",
        contentEn: "The design of forgetting."
      },
      {
        date: "2026-11-05",
        titleZh: "人类是叛逆的少年",
        titleEn: "Humans Are Rebellious Teenagers",
        quoteZh: "人类就像宇宙的中二期少年，觉得自己什么都懂，其实什么都不懂。",
        quoteEn: "Humans are like the universe's edgy teenagers, thinking they know everything but knowing nothing.",
        contentZh: "人类的发展阶段。",
        contentEn: "Humanity's developmental stage."
      },
      {
        date: "2026-11-06",
        titleZh: "本周复盘——你来地球学什么？",
        titleEn: "Weekly Review—What Did You Come to Earth to Learn?",
        quoteZh: "闭上眼，问你的内我：我这一生的主要功课是什么？",
        quoteEn: "Close your eyes, ask your Inner Self: 'What is my main lesson this life?'",
        contentZh: "功课觉察练习。",
        contentEn: "Lesson awareness practice.",
        actionZh: "闭上眼，问你的内我：我这一生的主要功课是什么？",
        actionEn: "Close your eyes, ask your Inner Self: 'What is my main lesson this life?'"
      },
      {
        date: "2026-11-07",
        titleZh: "唯一的考题",
        titleEn: "The Only Exam Question",
        quoteZh: "地球只有一道考题：你能不能从受害者变成创造者？",
        quoteEn: "Earth has only one exam question: Can you transform from victim to creator?",
        contentZh: "地球的核心考题。",
        contentEn: "Earth's core exam question.",
        special: "立冬 Beginning of Winter"
      },
      {
        date: "2026-11-08",
        titleZh: "受害者意识",
        titleEn: "Victim Consciousness",
        quoteZh: "受害者说：是他们害的我。创造者说：是我选择了这个体验。",
        quoteEn: "Victim says: 'They hurt me.' Creator says: 'I chose this experience.'",
        contentZh: "受害者与创造者的区别。",
        contentEn: "The difference between victim and creator."
      },
      {
        date: "2026-11-09",
        titleZh: "创造者意识",
        titleEn: "Creator Consciousness",
        quoteZh: "创造者知道：没有什么是发生在我身上的，一切都是经由我发生的。",
        quoteEn: "Creator knows: Nothing happens to me, everything happens through me.",
        contentZh: "创造者的觉知。",
        contentEn: "Creator's awareness."
      },
      {
        date: "2026-11-10",
        titleZh: "检视你的受害者剧本",
        titleEn: "Examine Your Victim Script",
        quoteZh: "你在哪些事情上还在演受害者？列出来，一个一个转化。",
        quoteEn: "Where are you still playing victim? List them, transform them one by one.",
        contentZh: "受害者剧本觉察。",
        contentEn: "Victim script awareness.",
        actionZh: "列出你还在演受害者的事情，准备一个一个转化。",
        actionEn: "List things where you're still playing victim, prepare to transform them one by one."
      },
      {
        date: "2026-11-11",
        titleZh: "转化受害者剧本",
        titleEn: "Transform the Victim Script",
        quoteZh: "把每一个他害了我改成我选择了这个体验，为了学习某个功课。",
        quoteEn: "Change every 'they hurt me' to 'I chose this experience to learn a certain lesson.'",
        contentZh: "剧本转化练习。",
        contentEn: "Script transformation practice."
      },
      {
        date: "2026-11-12",
        titleZh: "本周复盘——我是创造者",
        titleEn: "Weekly Review—I Am a Creator",
        quoteZh: "对着镜子说十遍：我不是受害者，我是创造者。我创造我自己的实相。",
        quoteEn: "Say to the mirror ten times: 'I am not a victim, I am a creator. I create my own reality.'",
        contentZh: "创造者宣言。",
        contentEn: "Creator declaration.",
        actionZh: "对着镜子说十遍：我不是受害者，我是创造者。我创造我自己的实相。",
        actionEn: "Say to the mirror ten times: 'I am not a victim, I am a creator. I create my own reality.'"
      },
      {
        date: "2026-11-13",
        titleZh: "地球在升级",
        titleEn: "Earth Is Upgrading",
        quoteZh: "地球正在从三维升到五维。你不是在见证历史，你是在创造历史。",
        quoteEn: "Earth is upgrading from 3D to 5D. You're not witnessing history—you're creating it.",
        contentZh: "地球的维度升级。",
        contentEn: "Earth's dimensional upgrade."
      },
      {
        date: "2026-11-14",
        titleZh: "你是先锋队",
        titleEn: "You Are the Vanguard",
        quoteZh: "你读到这些内容不是偶然。你是来帮助地球升级的先锋队成员。",
        quoteEn: "You're reading this content for a reason. You're a vanguard member here to help Earth upgrade.",
        contentZh: "使命觉醒。",
        contentEn: "Mission awakening."
      },
      {
        date: "2026-11-15",
        titleZh: "你的使命",
        titleEn: "Your Mission",
        quoteZh: "你的使命不是改变别人，而是改变自己。当你发光，黑暗自然退去。",
        quoteEn: "Your mission isn't to change others, but to change yourself. When you shine, darkness naturally recedes.",
        contentZh: "个人使命。",
        contentEn: "Personal mission."
      },
      {
        date: "2026-11-16",
        titleZh: "不要试图叫醒别人",
        titleEn: "Don't Try to Wake Others Up",
        quoteZh: "每个人都有自己醒来的时机。你只需要做好自己的功课，当一个灯塔。",
        quoteEn: "Everyone has their own timing to awaken. Just do your homework and be a lighthouse.",
        contentZh: "尊重他人节奏。",
        contentEn: "Respecting others' pace."
      },
      {
        date: "2026-11-17",
        titleZh: "本周复盘——我的使命",
        titleEn: "Weekly Review—My Mission",
        quoteZh: "闭上眼，问你的内我：我这一生的使命是什么？等待答案浮现。",
        quoteEn: "Close your eyes, ask your Inner Self: 'What is my mission this life?' Wait for the answer to emerge.",
        contentZh: "使命探索练习。",
        contentEn: "Mission exploration practice."
      },
      {
        date: "2026-11-18",
        titleZh: "终极一招",
        titleEn: "The Ultimate Move",
        quoteZh: "无论发生什么，都说一句：谢谢，这正是我需要的。然后看看会发生什么。",
        quoteEn: "No matter what happens, say: 'Thank you, this is exactly what I need.' Then see what happens.",
        contentZh: "终极一招。",
        contentEn: "The ultimate move.",
        actionZh: "今天无论发生什么，都说一句：谢谢，这正是我需要的。",
        actionEn: "Today, no matter what happens, say: 'Thank you, this is exactly what I need.'"
      },
      {
        date: "2026-11-19",
        titleZh: "一切都是完美的",
        titleEn: "Everything Is Perfect",
        quoteZh: "从更高的视角看，一切都已经完美了。你只是在假装它不完美，好玩这个游戏。",
        quoteEn: "From a higher perspective, everything is already perfect. You're just pretending it's not to play this game.",
        contentZh: "完美的视角。",
        contentEn: "The perspective of perfection."
      },
      {
        date: "2026-11-20",
        titleZh: "接受当下",
        titleEn: "Accept the Present",
        quoteZh: "停止和当下抗争。当下就是完美的，包括你认为不完美的部分。",
        quoteEn: "Stop fighting the present. The present is perfect, including the parts you think are imperfect.",
        contentZh: "当下的接纳。",
        contentEn: "Accepting the present."
      },
      {
        date: "2026-11-21",
        titleZh: "感恩一切",
        titleEn: "Gratitude for Everything",
        quoteZh: "感恩好的事情很容易，能感恩坏的事情才是真功夫。",
        quoteEn: "Being grateful for good things is easy. Being grateful for bad things is the real skill.",
        contentZh: "全然感恩。",
        contentEn: "Complete gratitude."
      },
      {
        date: "2026-11-22",
        titleZh: "本周复盘——感恩挑战",
        titleEn: "Weekly Review—Gratitude Challenge",
        quoteZh: "找出你人生中最糟糕的事，对它说：谢谢你，你教会了我什么。",
        quoteEn: "Find the worst thing in your life and say: 'Thank you, what did you teach me?'",
        contentZh: "感恩挑战练习。",
        contentEn: "Gratitude challenge practice.",
        special: "小雪 Minor Snow"
      },
      {
        date: "2026-11-23",
        titleZh: "游戏快结束了",
        titleEn: "The Game Is Almost Over",
        quoteZh: "这一年的课程接近尾声。你准备好毕业了吗？",
        quoteEn: "This year's course is nearing its end. Are you ready to graduate?",
        contentZh: "课程接近尾声。",
        contentEn: "Course nearing conclusion."
      },
      {
        date: "2026-11-24",
        titleZh: "回顾你的成长",
        titleEn: "Review Your Growth",
        quoteZh: "从1月1日到现在，你发生了什么变化？写下来。",
        quoteEn: "From January 1st to now, what has changed in you? Write it down.",
        contentZh: "成长回顾。",
        contentEn: "Growth review.",
        actionZh: "写下从1月1日到现在，你发生了什么变化。",
        actionEn: "Write down what has changed in you from January 1st to now."
      },
      {
        date: "2026-11-25",
        titleZh: "还有什么没完成？",
        titleEn: "What's Still Incomplete?",
        quoteZh: "还有什么信念没清理？还有什么恐惧没面对？还有什么功课没做完？",
        quoteEn: "What beliefs are still uncleared? What fears still unfaced? What lessons still incomplete?",
        contentZh: "未完成事项检视。",
        contentEn: "Incomplete items review."
      },
      {
        date: "2026-11-26",
        titleZh: "最后的清理",
        titleEn: "Final Clearing",
        quoteZh: "在年底之前，把所有积压的功课都做完。轻装上路，迎接新的一年。",
        quoteEn: "Before year-end, complete all backlogged lessons. Travel light, welcome the new year.",
        contentZh: "年末清理。",
        contentEn: "Year-end clearing.",
        special: "感恩节 Thanksgiving"
      },
      {
        date: "2026-11-27",
        titleZh: "你已经不是年初的你",
        titleEn: "You're No Longer Who You Were at Year Start",
        quoteZh: "回看年初的自己，像在看一个陌生人吗？这就是成长。",
        quoteEn: "Looking back at yourself at year start, like looking at a stranger? That's growth.",
        contentZh: "成长确认。",
        contentEn: "Growth confirmation."
      },
      {
        date: "2026-11-28",
        titleZh: "本周复盘——向过去的自己告别",
        titleEn: "Weekly Review—Say Goodbye to Past Self",
        quoteZh: "在冥想中，向年初的那个你说再见。感谢他/她带你走到今天。",
        quoteEn: "In meditation, say goodbye to the you from year start. Thank them for bringing you here.",
        contentZh: "告别过去自己。",
        contentEn: "Saying goodbye to past self."
      },
      {
        date: "2026-11-29",
        titleZh: "准备迎接最后一月",
        titleEn: "Prepare for the Final Month",
        quoteZh: "十二月是合一与回家的月份。准备好放下一切，回到光中了吗？",
        quoteEn: "December is the month of homecoming. Ready to let go of everything and return to the light?",
        contentZh: "迎接最后一月。",
        contentEn: "Welcoming the final month."
      },
      {
        date: "2026-11-30",
        titleZh: "十一月总结——游戏接近尾声",
        titleEn: "November Summary—The Game Is Ending",
        quoteZh: "你已经完成了大部分功课。现在，准备迎接最后的高潮——回家。",
        quoteEn: "You've completed most of your homework. Now, prepare for the final climax—homecoming.",
        contentZh: "回顾十一月：地球游戏。",
        contentEn: "Review November: The Earth Game."
      }
    ]
  },
  // December
  {
    month: 12,
    themeZh: "合一与回家",
    themeEn: "Homecoming",
    subtitleZh: "死亡高潮，杀死小我，回归光中",
    subtitleEn: "Death Orgasm, Kill the Ego, Return to Light",
    sourceZh: "《灵魂永生》第二十章、二十一章、二十二章",
    sourceEn: "Seth Speaks Chapter 20, 21, 22",
    goals: [
      { zh: "理解死亡是宇宙级的性高潮", en: "Understand death as a cosmic orgasm" },
      { zh: "彻底杀死小我，成为一切万有", en: "Completely kill the ego, become 'All That Is'" },
      { zh: "接受赛斯的最后拥抱与告别", en: "Receive Seth's final embrace and farewell" },
      { zh: "合上书，回到绝对的寂静与光中", en: "Close the book, return to absolute silence and light" },
    ],
    lessons: [
      {
        date: "2026-12-01",
        titleZh: "回家的路",
        titleEn: "The Way Home",
        quoteZh: "一年的旅程接近终点。不是真正的终点，而是一个新的起点。",
        quoteEn: "A year's journey nears its end. Not a real end, but a new beginning.",
        contentZh: "进入第十二月：合一与回家。",
        contentEn: "Entering the twelfth month: Homecoming."
      },
      {
        date: "2026-12-02",
        titleZh: "死亡是宇宙级的高潮",
        titleEn: "Death Is a Cosmic Orgasm",
        quoteZh: "死亡不是痛苦的终结，而是狂喜的开始。它比性高潮强烈一万倍。",
        quoteEn: "Death isn't the painful end—it's the beginning of ecstasy. It's ten thousand times more intense than orgasm.",
        contentZh: "死亡的本质。",
        contentEn: "The nature of death."
      },
      {
        date: "2026-12-03",
        titleZh: "你已经死过很多次",
        titleEn: "You've Died Many Times",
        quoteZh: "每次睡觉你都死一次，每次蜕变你都死一次。死亡是你最熟悉的朋友。",
        quoteEn: "You die every time you sleep, every time you transform. Death is your most familiar friend.",
        contentZh: "死亡的常态性。",
        contentEn: "The normalcy of death."
      },
      {
        date: "2026-12-04",
        titleZh: "死后会发生什么？",
        titleEn: "What Happens After Death?",
        quoteZh: "死后你会回顾这一生，然后决定下一步去哪里。没有审判，只有自我反思。",
        quoteEn: "After death you'll review this life, then decide where to go next. No judgment, only self-reflection.",
        contentZh: "死后的过程。",
        contentEn: "The post-death process."
      },
      {
        date: "2026-12-05",
        titleZh: "本周复盘——预演死亡",
        titleEn: "Weekly Review—Rehearse Death",
        quoteZh: "闭上眼，想象你刚刚死了。你会回顾这一生的什么？你会有什么遗憾？",
        quoteEn: "Close your eyes, imagine you just died. What would you review from this life? What would you regret?",
        contentZh: "死亡冥想。",
        contentEn: "Death meditation.",
        actionZh: "闭上眼，想象你刚刚死了。回顾这一生，你会有什么遗憾？",
        actionEn: "Close your eyes, imagine you just died. Reviewing this life, what would you regret?"
      },
      {
        date: "2026-12-06",
        titleZh: "小我必须死",
        titleEn: "The Ego Must Die",
        quoteZh: "真正的觉醒不是让小我变得更好，而是让小我彻底死亡。",
        quoteEn: "True awakening isn't making the ego better—it's letting the ego completely die.",
        contentZh: "小我的死亡。",
        contentEn: "Death of the ego."
      },
      {
        date: "2026-12-07",
        titleZh: "杀死小我",
        titleEn: "Kill the Ego",
        quoteZh: "不是慢慢饿死它，而是一刀砍下去。你准备好了吗？",
        quoteEn: "Don't starve it slowly—cut it down in one stroke. Are you ready?",
        contentZh: "小我的终结。",
        contentEn: "The end of ego.",
        special: "大雪 Major Snow"
      },
      {
        date: "2026-12-08",
        titleZh: "小我死后是什么？",
        titleEn: "What's After Ego Death?",
        quoteZh: "小我死后，你会发现：原来一直都没有小我。那只是一个幻觉。",
        quoteEn: "After ego death, you'll discover: there never was an ego. It was just an illusion.",
        contentZh: "超越小我。",
        contentEn: "Beyond ego."
      },
      {
        date: "2026-12-09",
        titleZh: "你是谁？",
        titleEn: "Who Are You?",
        quoteZh: "剥掉名字、身份、角色、故事，你是谁？",
        quoteEn: "Strip away name, identity, roles, story—who are you?",
        contentZh: "终极问题。",
        contentEn: "The ultimate question."
      },
      {
        date: "2026-12-10",
        titleZh: "你是一切",
        titleEn: "You Are Everything",
        quoteZh: "你不是这个身体，你不是这个头脑。你是一切万有的一个表达。",
        quoteEn: "You're not this body, not this mind. You are an expression of All That Is.",
        contentZh: "真正的身份。",
        contentEn: "True identity."
      },
      {
        date: "2026-12-11",
        titleZh: "本周复盘——我是谁？",
        titleEn: "Weekly Review—Who Am I?",
        quoteZh: "坐下来，反复问自己：我是谁？不要用头脑回答，等待答案自己浮现。",
        quoteEn: "Sit down, repeatedly ask yourself: 'Who am I?' Don't answer with the mind—wait for the answer to emerge.",
        contentZh: "自我探询。",
        contentEn: "Self-inquiry.",
        actionZh: "反复问自己：我是谁？不要用头脑回答，等待答案浮现。",
        actionEn: "Repeatedly ask: 'Who am I?' Don't answer with mind, wait for answer to emerge."
      },
      {
        date: "2026-12-12",
        titleZh: "合一的体验",
        titleEn: "The Experience of Oneness",
        quoteZh: "有那么一刻，你会突然感到：我和一切都是一体的。那就是回家。",
        quoteEn: "There'll be a moment when you suddenly feel: 'I am one with everything.' That's homecoming.",
        contentZh: "合一体验。",
        contentEn: "Oneness experience."
      },
      {
        date: "2026-12-13",
        titleZh: "分离是幻觉",
        titleEn: "Separation Is Illusion",
        quoteZh: "你从来没有和任何东西分离过。分离只是一个有趣的游戏。",
        quoteEn: "You were never separated from anything. Separation was just an interesting game.",
        contentZh: "分离的幻觉。",
        contentEn: "The illusion of separation."
      },
      {
        date: "2026-12-14",
        titleZh: "一切都是一",
        titleEn: "All Is One",
        quoteZh: "你、我、他、石头、星星、宇宙——都是同一个东西的不同表达。",
        quoteEn: "You, me, them, stones, stars, the universe—all are different expressions of the same thing.",
        contentZh: "万物一体。",
        contentEn: "All things are one."
      },
      {
        date: "2026-12-15",
        titleZh: "体验合一",
        titleEn: "Experience Oneness",
        quoteZh: "今天花几分钟，感受你和周围一切的边界消失。你不是在世界里，你就是世界。",
        quoteEn: "Spend a few minutes today feeling the boundaries between you and everything around dissolve. You're not in the world—you are the world.",
        contentZh: "合一练习。",
        contentEn: "Oneness practice.",
        actionZh: "花几分钟感受你和周围一切的边界消失。",
        actionEn: "Spend a few minutes feeling boundaries between you and everything dissolve."
      },
      {
        date: "2026-12-16",
        titleZh: "回到光中",
        titleEn: "Return to the Light",
        quoteZh: "你从光中来，现在你正在回到光中。整个旅程就是一个圆。",
        quoteEn: "You came from light, now you're returning to light. The whole journey is a circle.",
        contentZh: "回归之旅。",
        contentEn: "The return journey."
      },
      {
        date: "2026-12-17",
        titleZh: "本周复盘——光的冥想",
        titleEn: "Weekly Review—Light Meditation",
        quoteZh: "闭上眼，想象自己变成纯粹的光。没有身体，没有思想，只有光。",
        quoteEn: "Close your eyes, imagine becoming pure light. No body, no thoughts, just light.",
        contentZh: "光的冥想。",
        contentEn: "Light meditation.",
        actionZh: "闭上眼，想象自己变成纯粹的光。",
        actionEn: "Close your eyes, imagine becoming pure light."
      },
      {
        date: "2026-12-18",
        titleZh: "赛斯的告别",
        titleEn: "Seth's Farewell",
        quoteZh: "赛斯说：我从来没有离开过你，因为我就是你。现在你知道了。",
        quoteEn: "Seth says: 'I never left you, because I am you. Now you know.'",
        contentZh: "赛斯的最后信息。",
        contentEn: "Seth's final message."
      },
      {
        date: "2026-12-19",
        titleZh: "Mike的告别",
        titleEn: "Mike's Farewell",
        quoteZh: "这一年的陪伴到此结束。但你不需要我了，因为你已经知道：你自己就是答案。",
        quoteEn: "This year's companionship ends here. But you don't need me anymore—you already know you are the answer.",
        contentZh: "Mike的告别。",
        contentEn: "Mike's farewell."
      },
      {
        date: "2026-12-20",
        titleZh: "你不需要任何人",
        titleEn: "You Don't Need Anyone",
        quoteZh: "你不需要赛斯，不需要Mike，不需要任何大师。你自己就是大师。",
        quoteEn: "You don't need Seth, don't need Mike, don't need any master. You are the master.",
        contentZh: "独立宣言。",
        contentEn: "Declaration of independence."
      },
      {
        date: "2026-12-21",
        titleZh: "冬至——最长的夜",
        titleEn: "Winter Solstice—The Longest Night",
        quoteZh: "今天是一年中最长的夜。从明天起，光会越来越多。你也是。",
        quoteEn: "Today is the longest night of the year. From tomorrow, light will increase. So will you.",
        contentZh: "冬至的意义。",
        contentEn: "The meaning of winter solstice.",
        special: "冬至 Winter Solstice"
      },
      {
        date: "2026-12-22",
        titleZh: "黎明前的黑暗",
        titleEn: "Darkness Before Dawn",
        quoteZh: "最黑暗的时刻就在黎明之前。如果你还在黑暗中，恭喜你，光就要来了。",
        quoteEn: "The darkest moment is just before dawn. If you're still in darkness, congratulations—light is coming.",
        contentZh: "黎明即将到来。",
        contentEn: "Dawn is coming."
      },
      {
        date: "2026-12-23",
        titleZh: "感谢这一年",
        titleEn: "Thank This Year",
        quoteZh: "感谢这一年的每一天，每一个挑战，每一次成长。它们都是礼物。",
        quoteEn: "Thank every day of this year, every challenge, every growth. They were all gifts.",
        contentZh: "年度感恩。",
        contentEn: "Annual gratitude."
      },
      {
        date: "2026-12-24",
        titleZh: "平安夜——内在的平安",
        titleEn: "Christmas Eve—Inner Peace",
        quoteZh: "真正的平安不在外面，在你里面。今晚，安住在那个平安中。",
        quoteEn: "True peace isn't outside—it's inside you. Tonight, rest in that peace.",
        contentZh: "内在平安。",
        contentEn: "Inner peace.",
        special: "平安夜 Christmas Eve"
      },
      {
        date: "2026-12-25",
        titleZh: "圣诞——你就是礼物",
        titleEn: "Christmas—You Are the Gift",
        quoteZh: "你不需要等待礼物，你就是宇宙给自己最好的礼物。",
        quoteEn: "You don't need to wait for a gift—you are the universe's best gift to itself.",
        contentZh: "你是礼物。",
        contentEn: "You are the gift.",
        special: "圣诞节 Christmas Day"
      },
      {
        date: "2026-12-26",
        titleZh: "放下这本书",
        titleEn: "Put Down This Book",
        quoteZh: "现在，放下《灵魂永生》。你不再需要它了，因为你已经活出了它。",
        quoteEn: "Now, put down 'Seth Speaks'. You no longer need it—you're already living it.",
        contentZh: "放下经典。",
        contentEn: "Let go of the classics."
      },
      {
        date: "2026-12-27",
        titleZh: "放下所有的教导",
        titleEn: "Let Go of All Teachings",
        quoteZh: "所有的教导都是手指，指向月亮。现在你看到月亮了，放下手指。",
        quoteEn: "All teachings are fingers pointing at the moon. Now you see the moon—let go of the fingers.",
        contentZh: "超越教导。",
        contentEn: "Beyond teachings."
      },
      {
        date: "2026-12-28",
        titleZh: "放下寻找",
        titleEn: "Stop Seeking",
        quoteZh: "停止寻找。你要找的东西从来没有丢失过。它一直在这里，等你回头。",
        quoteEn: "Stop seeking. What you're looking for was never lost. It's always been here, waiting for you to turn around.",
        contentZh: "停止追寻。",
        contentEn: "Stop the search."
      },
      {
        date: "2026-12-29",
        titleZh: "只是存在",
        titleEn: "Just Be",
        quoteZh: "不需要做什么，不需要成为什么。你已经是你需要成为的一切。只是存在。",
        quoteEn: "No need to do anything, no need to become anything. You already are everything you need to be. Just be.",
        contentZh: "纯粹存在。",
        contentEn: "Pure being."
      },
      {
        date: "2026-12-30",
        titleZh: "本周复盘——回顾整年",
        titleEn: "Weekly Review—Review the Whole Year",
        quoteZh: "花些时间，回顾这365天。你学到了什么？你成为了谁？",
        quoteEn: "Take time to review these 365 days. What did you learn? Who did you become?",
        contentZh: "年度回顾。",
        contentEn: "Annual review.",
        actionZh: "花时间回顾这365天，写下你学到了什么，你成为了谁。",
        actionEn: "Take time to review these 365 days, write what you learned and who you became."
      },
      {
        date: "2026-12-31",
        titleZh: "归零——新的开始",
        titleEn: "Return to Zero—A New Beginning",
        quoteZh: "旅程结束了，也刚刚开始。合上书，闭上眼，回到那无限的寂静与光中。你已经回家了。",
        quoteEn: "The journey ends, and just begins. Close the book, close your eyes, return to infinite silence and light. You're home.",
        contentZh: "回顾十二月：合一与回家。年度完结。",
        contentEn: "Review December: Homecoming. Year complete.",
        special: "除夕 New Year's Eve"
      }
    ]
  }
];

// Helper function to get month data
export function getMonthData(month: number): MonthData | undefined {
  return monthsData.find(m => m.month === month);
}

// Helper function to get lesson by date
export function getLessonByDate(dateStr: string): DailyLesson | undefined {
  for (const month of monthsData) {
    const lesson = month.lessons.find(l => l.date === dateStr);
    if (lesson) return lesson;
  }
  return undefined;
}

// Helper function to get quarter by month
export function getQuarterByMonth(month: number): QuarterData | undefined {
  return quarters.find(q => q.months.includes(month));
}
