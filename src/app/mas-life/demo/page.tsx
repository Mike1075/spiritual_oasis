import type { Metadata } from "next";
import DemoClient from "@/components/mas-life/DemoClient";

export const metadata: Metadata = {
  title: "看见 10 年后的你 · 心灵家园",
  description:
    "用你的 AI 人生定位资料，生成 10 年后的某个普通而美好的瞬间——一张画面，一封来自未来的信。AI 畅想，仅供娱乐。",
};

export default function MasLifeDemoPage() {
  return <DemoClient />;
}
