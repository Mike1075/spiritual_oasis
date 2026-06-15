<!-- radar-auto 2026-06-15 OPC 一人公司适配测评落库表 schema（占位文档，线上建表留给主线） -->

# OPC 一人公司适配测评 — 飞书多维表格字段 schema

本文档定义 `/opc` 测评结果落库所需的飞书多维表格（Bitable）字段。
**本分支不创建线上表**——建表与 env 配置留给主线。代码里目标 table id 用占位常量
`src/app/api/opc/tableId.ts` 的 `OPC_TABLE_ID`（默认 `tblOPC_PLACEHOLDER_TODO`，需替换为真实 id）。

## 复用方式（与 compass 完全一致）

- 写入走 `src/lib/feishu.ts` 的 `createBitableRecord(fields, OPC_TABLE_ID)` / `updateBitableRecord(...)`。
- env：唯一机密仍是 `FEISHU_APP_SECRET`（无默认，决定 `feishuConfigured`）。
  - 应用 ID / base appToken / 重试逻辑全部复用 compass 的默认值（`FEISHU_APP_ID`、`FEISHU_BITABLE_APP_TOKEN`）。
  - 建议把 OPC 表建在与 compass 同一个 base（`BMlcbTjznaJL5WsOXsxcgHavnrh`）下，这样应用 `cli_aa948c518565dcba` 的 edit 权限自动覆盖，无需额外授权。
- 新增 env（建表后配置）：`FEISHU_OPC_TABLE_ID` = 真实 table id。
- 缺 `FEISHU_APP_SECRET` 或表未建好时：`/api/opc/save`、`/api/opc/claim` 按 compass 的做法优雅降级（返回 `ok:true`、不阻塞用户、仅 `console.warn`）。

## 建表步骤（TODO，留给主线）

1. 在 compass 同 base 下新建表「OPC一人公司测评结果」。
2. 按下表创建字段（列名必须与代码写入的中文 key 完全一致）。
3. 复制该表 table id（`tbl` 开头）→ 配到 Vercel 环境变量 `FEISHU_OPC_TABLE_ID`。
4. 确认应用对该 base 有 edit 权限。

## 字段表

| 列名（中文，须与代码一致） | 字段类型 | 说明 | 写入端 |
|---|---|---|---|
| 姓名 | 文本 | 匿名时为「（未留资）」；留资后写称呼，未填称呼为「（未填）」 | save / claim |
| 手机/微信 | 文本 | 联系方式；匿名阶段为空，claim 时必填 | save / claim |
| 身份 | 单选 或 文本 | 自由职业者 / 技术开发者 / 内容创作者 / 跨境外贸 / 传统小生意 | save / claim(兜底) |
| 成本类型 | 单选 或 文本 | 算力驱动 / 税优敏感 / 生态依赖 / 跨境合规 / 本地经营 | save / claim(兜底) |
| 推荐城市 | 文本 | 苏州 / 深圳 / 杭州 / 上海临港 / （建议先别注册公司） | save / claim(兜底) |
| 适配度 | 文本 或 数字 | 0-100 的整数（代码以字符串写入，列设为文本最稳妥） | save / claim(兜底) |
| 来源场次 | 单选 或 文本 | 由 ep 参数映射：晚1·意义与方向 / 晚2·真机证据 / 晚3·方法+开售 / OPC页直接进 | save / claim(兜底) |
| 答题摘要 | 文本（多行） | 全部选项 label，按 \n 拼接，≤3000 字 | save / claim(兜底) |
| 报告 | 文本（多行） | Markdown 报告全文，≤20000 字；分享页 `/opc/r/[id]` 读它 | save / claim(兜底) |
| 解锁 | 单选 或 文本 | 「未解锁」（匿名）/「已解锁」（留资后）。分享页只展示「已解锁」记录 | save / claim |
| 状态 | 单选 或 文本 | 「匿名测评」（save）/「新线索」（claim 留资后） | save / claim |

### 类型建议

- 文本类列一律用「多行文本」最省心（飞书富文本读取已在 `fieldText()` 里兼容 string 与 `[{text}]` 数组两种返回）。
- 「身份/成本类型/来源场次/解锁/状态」可设为「单选」便于后续筛选统计，选项值须与上表枚举完全一致。
- 「适配度」即便设为数字列也能写入（代码写的是字符串数字，飞书会按列类型解析），但设为文本最不易报类型错。

## 与 compass 表的差异

OPC 表相对 compass 结果表（`COMPASS_TABLE_ID`）的字段变化：
- 去掉：`测评原型`、`意向方向`（OPC 不走 5 原型 / 方向深挖）。
- 新增：`成本类型`、`推荐城市`、`适配度`（OPC 的确定性结果三件套）。
- 其余（姓名/手机微信/身份/来源场次/答题摘要/报告/解锁/状态）与 compass 同名同义。
