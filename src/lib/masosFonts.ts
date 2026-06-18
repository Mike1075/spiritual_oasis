// MAS-Life OS 重设计专用字体（作用域仅限 .masos，不影响 spiritual-oasis 其它品牌页）。
// 只加载拉丁显示字 + 等宽系统字（体积小、性能好）；中文走系统 PingFang/Noto 栈保持清晰。
// 设计语言：等宽字 = "系统读数"的声音（标签/数据/价格/状态行），是整套 OS 识别的主线索。
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const osDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-os-display",
  display: "swap",
});

export const osMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-os-mono",
  display: "swap",
});
