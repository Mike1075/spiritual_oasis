"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 诚实仪表盘抽屉：默认缩到 hero 右边缘只露一个闪烁把手；点击向左滑出整卡，再点缩回。
// 仅桌面端显示（lg+）；移动端整体隐藏，避免遮挡。
export default function HeroDashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-0 top-28 z-20 hidden lg:block">
      <div
        className={`flex items-stretch transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-[calc(100%-2.75rem)]"
        }`}
      >
        {/* 把手 */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "收起诚实仪表盘" : "展开诚实仪表盘"}
          aria-expanded={open}
          className={`flex w-11 shrink-0 flex-col items-center justify-between rounded-l-2xl border border-r-0 border-[color:var(--os-sys)]/40 bg-[color:var(--os-panel)]/92 py-4 backdrop-blur transition-colors hover:bg-[color:var(--os-panel-2)] ${
            open ? "" : "os-tab-flicker"
          }`}
        >
          <span className="os-dot" />
          <span
            className="os-mono text-[11px] tracking-[0.25em] text-[color:var(--os-sys)]"
            style={{ writingMode: "vertical-rl" }}
          >
            诚实仪表盘 · LIVE
          </span>
          {open ? (
            <ChevronRight className="h-4 w-4 text-[color:var(--os-dim)]" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-[color:var(--os-you)]" />
          )}
        </button>

        {/* 卡片 */}
        <div className="os-panel os-panel--live w-[360px] overflow-hidden rounded-l-none">
          <div className="flex items-center justify-between border-b border-[color:var(--os-line)] px-5 py-3">
            <span className="os-mono text-[11px] tracking-[0.14em] text-[color:var(--os-dim)]">
              诚实仪表盘 / honest-dashboard
            </span>
            <span className="os-mono flex items-center gap-1.5 text-[11px] text-[color:var(--os-sys)]">
              <span className="os-dot" /> live
            </span>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <div className="os-label os-label--you">今天最重要的事</div>
              <div className="mt-1.5 flex items-center gap-2 text-lg font-semibold">
                <span className="text-[color:var(--os-you)]">→</span>
                写出你的赛道一页纸
              </div>
            </div>

            <div className="os-rule" />

            <div>
              <div className="os-label">昨夜系统替你跑</div>
              <div className="os-mono mt-1.5 text-sm text-[color:var(--os-text)]">
                3 个任务 · 生成 12 段文案 · 自检 2 轮
              </div>
            </div>

            <div className="os-rule" />

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="os-label">本月成本</span>
                <span className="os-mono text-sm text-[color:var(--os-text)]">
                  ¥38 / <span className="text-[color:var(--os-dim)]">¥119 封顶</span>
                </span>
              </div>
              <div className="os-gauge">
                <span style={{ width: "32%" }} />
              </div>
            </div>

            <div className="os-rule" />

            <div className="os-mono flex items-center gap-2 text-xs text-[color:var(--os-dim)]">
              <span className="text-[color:var(--os-you)]">你管 Why</span>
              <span className="text-[color:var(--os-faint)]">·</span>
              <span className="text-[color:var(--os-sys)]">系统管执行</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
