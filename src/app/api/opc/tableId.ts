// OPC 一人公司适配测评 —— 飞书目标表 ID（占位）
//
// ⚠️ TODO（留给主线，本分支不创建线上表）：
//   1) 在线索 base（与 compass 同 base：FEISHU_BITABLE_APP_TOKEN 默认 BMlcbTjznaJL5WsOXsxcgHavnrh）
//      下按 docs/opc-feishu-table.md 的字段 schema 新建一张「OPC一人公司测评结果」表，拿到真实 table id（tbl 开头）。
//   2) 把真实 table id 配到 Vercel 环境变量 FEISHU_OPC_TABLE_ID，或替换下面的占位默认值。
//   3) 确认应用 cli_aa948c518565dcba 对该 base 有 edit 权限（与 compass 同 base 则已自动覆盖）。
//
// 复用 src/lib/feishu.ts 的 createBitableRecord / updateBitableRecord（同 appToken、同写入方式、同 env：FEISHU_APP_SECRET）。
// 在线上表未建好之前，本占位 id 不是有效表——save/claim 会写入失败，但已按 compass 的做法优雅降级（返回 ok、不报错）。
export const OPC_TABLE_ID =
  process.env.FEISHU_OPC_TABLE_ID || "tblOPC_PLACEHOLDER_TODO";
