import type { Metadata } from "next";
import LockClient from "@/components/lock/LockClient";
import AssistantWidget from "@/components/assistant/AssistantWidget";

export const metadata: Metadata = {
  title: "618 锁位 · 3 人拼团通道 | 人生方向设计",
  description: "618 元锁定席位，全额抵学费；3 人拼团享 8 折立省 1396。",
};

export default function LockPage() {
  return (
    <>
      <LockClient />
      <AssistantWidget />
    </>
  );
}
