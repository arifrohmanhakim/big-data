'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Table, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Transaction } from '@/types/transaction';

interface VirtualizedTableProps {
  table: Table<Transaction>;
  onRenderMetrics?: (metrics: { durationMs: number; renderedRows: number }) => void;
}

export function VirtualizedTable({ table, onRenderMetrics }: VirtualizedTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 52,
    overscan: 12,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? (virtualRows[0]?.start ?? 0) : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0)
      : 0;

  useLayoutEffect(() => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      if (onRenderMetrics) {
        onRenderMetrics({
          durationMs: Math.max(0.5, Math.round(duration * 10) / 10),
          renderedRows: virtualRows.length,
        });
      }
    };
  }, [virtualRows, onRenderMetrics]);

  return (
    <div
      ref={tableContainerRef}
      className="relative overflow-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 h-[600px] shadow-xs"
    >
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10 bg-neutral-50 dark:bg-neutral-800/90 backdrop-blur-xs border-b border-neutral-200 dark:border-neutral-800">
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
            <>
              {paddingTop > 0 && (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    style={{ height: `${paddingTop}px` }}
                    className="p-0 border-0"
                  />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
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
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    style={{ height: `${paddingBottom}px` }}
                    className="p-0 border-0"
                  />
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
