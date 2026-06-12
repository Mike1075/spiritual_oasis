// /mas-life/demo「10 年后」共用工具:飞书字段取值 / 思维链剥离 / 北京时间戳

// 飞书文本字段可能返回 string 或 [{text}] 富文本段数组
export function fieldText(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v
      .map((seg) =>
        typeof seg === "object" && seg && "text" in seg
          ? String((seg as { text: unknown }).text)
          : ""
      )
      .join("");
  }
  return "";
}

// M 系列强制输出 <think>…</think> 思维链且无法关闭,落库/展示前必须剥掉
export function stripThink(s: string): string {
  let out = s.replace(/<think>[\s\S]*?<\/think>/g, "");
  // 上游偶发只吐闭标签:闭标签之前全是思维链
  const i = out.indexOf("</think>");
  if (i !== -1) out = out.slice(i + "</think>".length);
  return out.trim();
}

// 服务器跑在 UTC,名额按北京时间的"今天"计
export function beijingNow(): string {
  return new Date(Date.now() + 8 * 3600_000)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
}

export function beijingToday(): string {
  return beijingNow().slice(0, 10);
}

// 全站每日生成上限
export const DEMO_DAILY_LIMIT = 300;

// 罗盘表里匿名/未留资记录的姓名占位值
export function isPlaceholderName(s: string): boolean {
  const t = s.trim();
  return !t || t === "（未填）" || t === "（未留资）";
}
