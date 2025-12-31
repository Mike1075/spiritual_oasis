import { monthsData, DailyLesson } from "@/data/courses2026";

/**
 * 获取指定日期的每日课程
 * @param date Date对象，默认为今天
 * @returns DailyLesson对象或null
 */
export function getDailyLesson(date: Date = new Date()): DailyLesson | null {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 0-based, so add 1
  const day = date.getDate();

  // 格式化日期为 YYYY-MM-DD
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 查找对应月份的数据
  const monthData = monthsData.find(m => m.month === month);
  if (!monthData) return null;

  // 查找对应日期的课程
  const lesson = monthData.lessons.find(l => l.date === dateString);
  return lesson || null;
}

/**
 * 生成每日背景图URL数组（4张横版图）
 * @param date Date对象，默认为今天
 * @returns 4个图片URL的数组
 */
export function getDailyWallpapers(date: Date = new Date()): string[] {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 年份格式：后两位（如2026 -> 26）
  const yearShort = String(year).slice(-2);

  const baseUrl = "https://pub-810d6e0711de44d396071ecfc5ae9c2a.r2.dev/wallpapers";

  // 生成4张横版图的URL
  // 格式：YY.M.D.EHN.webp（例如：26.1.1.EH1.webp）
  return [1, 2, 3, 4].map(n =>
    `${baseUrl}/${yearShort}/${month}/${yearShort}.${month}.${day}.EH${n}.webp`
  );
}
