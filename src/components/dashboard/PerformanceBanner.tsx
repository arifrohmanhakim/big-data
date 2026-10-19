'use client';

import React from 'react';
import { Gauge, Cpu, CheckCircle2, AlertOctagon } from 'lucide-react';

interface PerformanceBannerProps {
  isVirtualized: boolean;
  renderDurationMs: number;
  renderedDomRows: number;
  totalFilteredCount: number;
}

export function PerformanceBanner({
  isVirtualized,
  renderDurationMs,
  renderedDomRows,
  totalFilteredCount,
}: PerformanceBannerProps) {
  const domSavingsPercentage =
    totalFilteredCount > 0
      ? Math.max(0, Math.round(((totalFilteredCount - renderedDomRows) / totalFilteredCount) * 100))
      : 0;

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isVirtualized
          ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800'
          : 'bg-rose-50/80 border-rose-300 dark:bg-rose-950/30 dark:border-rose-900'
      }`}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Solution Explanation / Problem Diagnosis */}
        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg mt-0.5 ${
              isVirtualized
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300'
            }`}
          >
            {isVirtualized ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <AlertOctagon className="w-5 h-5" />
            )}
          </div>
          <div>
            <h4
              className={`text-sm font-semibold ${
                isVirtualized
                  ? 'text-emerald-900 dark:text-emerald-200'
                  : 'text-rose-900 dark:text-rose-200'
              }`}
            >
              {isVirtualized
                ? 'Active Solution: DOM Virtualization (@tanstack/react-virtual)'
                : 'Detected Bottleneck: 5,000 Rows Without Virtualization'}
            </h4>
            <p
              className={`text-xs mt-0.5 max-w-2xl leading-relaxed ${
                isVirtualized
                  ? 'text-emerald-800 dark:text-emerald-300/80'
                  : 'text-rose-800 dark:text-rose-300/90'
              }`}
            >
              {isVirtualized
                ? `Only rows visible in viewport (${renderedDomRows} rows) are rendered to the DOM. Scroll stays at 60 FPS with minimal memory overhead.`
                : 'Why users complain about lag: Browser is forced to render thousands of DOM elements at once, causing layout thrashing, stuttering scroll, and UI freezes.'}
            </p>
          </div>
        </div>

        {/* Real-time Performance Metrics */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <div className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500 font-medium">
              <Gauge className="w-3.5 h-3.5" />
              <span>Render Time</span>
            </div>
            <p
              className={`text-sm font-bold mt-0.5 ${
                renderDurationMs < 20
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {renderDurationMs} ms
            </p>
          </div>

          <div className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-center min-w-[120px]">
            <div className="flex items-center justify-center gap-1 text-[11px] text-neutral-500 font-medium">
              <Cpu className="w-3.5 h-3.5" />
              <span>DOM Row Nodes</span>
            </div>
            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
              {renderedDomRows.toLocaleString('en-US')}{' '}
              <span className="text-xs font-normal text-neutral-500">
                / {totalFilteredCount.toLocaleString('en-US')}
              </span>
            </p>
          </div>

          {isVirtualized && (
            <div className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-center min-w-[100px]">
              <p className="text-[11px] text-neutral-500 font-medium">DOM Saved</p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                +{domSavingsPercentage}%
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
