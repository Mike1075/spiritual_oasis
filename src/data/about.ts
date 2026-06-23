type Bi = { zh: string; en: string };

export type TimelineItem = {
  year: string;
  zhTitle: string;
  enTitle: string;
  zhDesc: string;
  enDesc: string;
};

export type AboutData = {
  vision: Bi;
  values: Bi[]; // 共建 / 共享 / 共有
  principles: Bi[]; // 青色组织 / 去中心化
  foundation: Bi; // 哲学基石（赛斯）
  timeline: TimelineItem[];
  cobuilder: { intro: Bi; roles: Bi[]; leadSource: string };
};

export const ABOUT: AboutData = {
  vision: {
    zh: "开启人类潜能，引领人类进入新时代。",
    en: "Unlock human potential, and lead humanity into a new era.",
  },
  values: [
    { zh: "共建", en: "Co-build" },
    { zh: "共享", en: "Co-share" },
    { zh: "共有", en: "Co-own" },
  ],
  principles: [
    { zh: "青色组织：去中心化、自主管理、身心整合", en: "Teal organization: decentralized, self-managed, whole-person" },
    { zh: "去中心化：让创造与价值回到每个人手中", en: "Decentralized: creation and value return to each person" },
  ],
  foundation: {
    zh: "以赛斯资料（Seth Material）的宇宙观与「信念创造实相」为哲学基石。",
    en: "Grounded in the Seth Material's worldview and 'beliefs create reality'.",
  },
  // 真实史实取自现有 /about（2020 疫情期线上读书会起步）
  timeline: [
    { year: "2020", zhTitle: "起源", enTitle: "The Beginning", zhDesc: "心灵家园在疫情期间诞生，从线上读书会开始。", enDesc: "Born during the pandemic, starting as an online reading circle." },
    { year: "2021", zhTitle: "成长", enTitle: "Growth", zhDesc: "建立系统课程体系，首批学员突破一千人。", enDesc: "A structured curriculum took shape; the first 1,000 students joined." },
    { year: "2022", zhTitle: "社区成型", enTitle: "Community", zhDesc: "完善线上社区，开启多城市线下活动。", enDesc: "The online community matured; offline gatherings began across cities." },
    { year: "2023", zhTitle: "扩展", enTitle: "Expansion", zhDesc: "全球社区布局，探索更前沿的协作方式。", enDesc: "A global community footprint and new ways to collaborate." },
    { year: "2024", zhTitle: "深耕", enTitle: "Deepening", zhDesc: "课程与陪伴体系深化，社区共建机制成型。", enDesc: "Courses and companionship deepened; co-building mechanisms formed." },
    { year: "2025", zhTitle: "新启航", enTitle: "New Chapter", zhDesc: "迈向以共建·共享·共有为核心的成长型社区。", enDesc: "Toward a growth community built on co-build, co-share, co-own." },
    // TODO(Mike): 如有更准确的年份/里程碑/学员数据，替换以上文案。
  ],
  cobuilder: {
    intro: {
      zh: "心灵家园以共建的方式成立。我们邀请认同愿景的人成为共建者——讲师、志愿者、内容与社区共创者。",
      en: "Spiritual Oasis is built together. We invite those who share the vision to co-build — as teachers, volunteers, and co-creators.",
    },
    roles: [
      { zh: "讲师 / 带领者", en: "Teacher / Facilitator" },
      { zh: "志愿者", en: "Volunteer" },
      { zh: "内容与社区共创", en: "Content & Community Co-creator" },
    ],
    leadSource: "cobuilder",
  },
};

export function validateAbout(a: AboutData): string[] {
  const errs: string[] = [];
  const bi = (b: { zh?: string; en?: string } | undefined, name: string) => {
    if (!b?.zh) errs.push(`${name}.zh empty`);
    if (!b?.en) errs.push(`${name}.en empty`);
  };
  bi(a.vision, "vision");
  bi(a.foundation, "foundation");
  if (!a.values?.length) errs.push("values empty");
  if (!a.principles?.length) errs.push("principles empty");
  if (!a.timeline?.length) errs.push("timeline empty");
  bi(a.cobuilder?.intro, "cobuilder.intro");
  if (!a.cobuilder?.roles?.length) errs.push("cobuilder.roles empty");
  if (a.cobuilder?.leadSource !== "cobuilder") errs.push("cobuilder.leadSource wrong");
  return errs;
}
