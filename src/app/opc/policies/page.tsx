// OPC 城市政策库浏览页 —— /opc/policies
// 服务端读取飞书表(已过滤🔴),注入客户端筛选组件。ISR 缓存 1 小时。
import type { Metadata } from "next";
import { getOpcPolicies } from "@/lib/opcPolicies";
import PolicyLibrary from "@/components/opc/PolicyLibrary";

export const runtime = "nodejs";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "全国 OPC 一人公司城市政策库 | 心灵家园 MAS-Life OS",
  description:
    "覆盖全国数十城的一人公司 / 超级个体 / 个体户扶持政策与创业社区,带核实状态与官方出处。算力券、落户补贴、免租工位、税收优惠一站查。",
};

export default async function OpcPoliciesPage() {
  const items = await getOpcPolicies();
  return <PolicyLibrary items={items} />;
}
