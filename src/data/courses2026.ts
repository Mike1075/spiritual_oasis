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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
    lessons: []
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
