import type { Metadata } from "next";
import OpcClient from "@/components/opc/OpcClient";

// server page 出 metadata（照 mas-life/demo 的 server/client 拆分范式），交互逻辑在 OpcClient
export const metadata: Metadata = {
  title: "OPC 一人公司适配测评 · 该不该开公司、落在哪座城 · 心灵家园",
  description:
    "一个人也能开公司。答 6 题，当场给你一人公司适配度、推荐落地城市（按算力/税优/生态/跨境合规成本类型）、五步注册清单与两大避坑。所有政策数字均为示例，以官方最新政策为准，仅供参考不构成财税法律建议。",
};

export default function OpcPage() {
  return <OpcClient />;
}
