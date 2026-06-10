// 旧版 10 题自测已升级为「AI 定位罗盘」(/compass)，此处仅做跳转以兼容已分发的旧链接。
import { redirect } from "next/navigation";

export default async function GaokaoPage({
  searchParams,
}: {
  searchParams: Promise<{ ep?: string }>;
}) {
  const { ep } = await searchParams;
  redirect(ep ? `/compass?ep=${encodeURIComponent(ep)}` : "/compass");
}
