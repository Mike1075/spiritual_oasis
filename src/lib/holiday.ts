// 节日期间检测：12月20日 - 1月4日
export function isHolidaySeason(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();

  // 12月20日-31日 或 1月1日-4日
  return (month === 11 && day >= 20) || (month === 0 && day <= 4);
}
