'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { Transaction } from '@/types/transaction';

interface UnvirtualizedTableProps {
  table: Table<Transaction>;
  onRenderMetrics?: (metrics: { durationMs: number; renderedRows: number }) => void;
}

export function UnvirtualizedTable({ table, onRenderMetrics }: UnvirtualizedTableProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  useLayoutEffect(() => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      if (onRenderMetrics) {
        onRenderMetrics({
          durationMs: Math.round(duration * 10) / 10,
          renderedRows: rows.length,
        });
      }
    };
  }, [rows, onRenderMetrics]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-auto rounded-xl border border-rose-300 dark:border-rose-900/60 bg-white dark:bg-neutral-900 h-[600px] shadow-xs"
    >
      <div className="sticky top-0 z-20 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 text-xs px-4 py-2 border-b border-rose-200 dark:border-rose-900 font-medium">
        ⚠️ Conventional Mode: Rendering all {rows.length.toLocaleString('en-US')} rows directly into the DOM. Notice the scroll and filter lag.
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-8 z-10 bg-neutral-50 dark:bg-neutral-800/90 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
                  className="px-4 py-3.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="py-16 text-center text-sm text-neutral-500 dark:text-neutral-400"
              >
                No transaction records match the filter criteria.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{ width: `${cell.column.getSize()}px` }}
                    className="px-4 py-3 text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
