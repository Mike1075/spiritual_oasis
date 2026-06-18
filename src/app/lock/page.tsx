import type { Metadata } from "next";
import LockClient from "@/components/lock/LockClient";
import AssistantWidget from "@/components/assistant/AssistantWidget";

// 私域专用页：不进搜索引擎，入口只通过意向群/客服发放
export const metadata: Metadata = {
  title: "618 锁位 · 锁定席位通道 | 人生方向设计",
  description: "618 元锁定席位，全额抵学费；3 人拼团享 8 折。仅限受邀访问。",
  robots: { index: false, follow: false },
};

export default function LockPage() {
  return (
    <>
      <LockClient />
      <AssistantWidget />
    </>
  );
}
