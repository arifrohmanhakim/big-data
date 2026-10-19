'use client';

import React, { useState, useCallback } from 'react';
import { useTransactionData } from '@/hooks/useTransactionData';
import { useTransactionTable } from '@/hooks/useTransactionTable';
import { MetricCard } from './MetricCard';
import { TableControls } from './TableControls';
import { PerformanceBanner } from './PerformanceBanner';
import { VirtualizedTable } from './VirtualizedTable';
import { UnvirtualizedTable } from './UnvirtualizedTable';
import { Database, DollarSign, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

export function DashboardView() {
  const [rowCount, setRowCount] = useState<number>(5000);
  const [isVirtualized, setIsVirtualized] = useState<boolean>(true);
  const [renderMetrics, setRenderMetrics] = useState<{
    durationMs: number;
    renderedRows: number;
  }>({
    durationMs: 2.1,
    renderedRows: 26,
  });

  const {
    transactions,
    summaryMetrics,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useTransactionData({ rowCount });

  const {
    table,
    globalFilter,
    setGlobalFilter,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    totalFilteredCount,
  } = useTransactionTable({ data: transactions });

  const handleRenderMetrics = useCallback(
    (metrics: { durationMs: number; renderedRows: number }) => {
      setRenderMetrics(metrics);
    },
    []
  );

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="space-y-6">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Records Loaded"
          value={summaryMetrics.totalRows.toLocaleString('en-US')}
          subValue="Fetched via TanStack Query"
          icon={Database}
          variant="info"
        />
        <MetricCard
          title="Total Transaction Volume"
          value={currencyFormatter.format(summaryMetrics.totalVolume)}
          subValue="Cumulative sales volume"
          icon={DollarSign}
          variant="success"
        />
        <MetricCard
          title="Average Order Value"
          value={currencyFormatter.format(summaryMetrics.averageAmount)}
          subValue="Mean revenue per order"
          icon={BarChart3}
          variant="default"
        />
        <MetricCard
          title="Completion Rate"
          value={
            summaryMetrics.totalRows > 0
              ? `${Math.round((summaryMetrics.completedCount / summaryMetrics.totalRows) * 100)}%`
              : '0%'
          }
          subValue={`${summaryMetrics.completedCount.toLocaleString('en-US')} completed orders`}
          icon={CheckCircle2}
          variant="warning"
        />
      </div>

      {/* Performance Diagnostics Banner */}
      <PerformanceBanner
        isVirtualized={isVirtualized}
        renderDurationMs={renderMetrics.durationMs}
        renderedDomRows={renderMetrics.renderedRows}
        totalFilteredCount={totalFilteredCount}
      />

      {/* Controls & Filters */}
      <TableControls
        searchQuery={globalFilter}
        onSearchChange={setGlobalFilter}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        rowCount={rowCount}
        onRowCountChange={setRowCount}
        isVirtualized={isVirtualized}
        onToggleVirtualized={setIsVirtualized}
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
      />

      {/* Table Data Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-80 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="w-8 h-8 border-3 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-white rounded-full animate-spin" />
          <p className="mt-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            Preparing and optimizing {rowCount.toLocaleString('en-US')} transaction rows...
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-64 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400">
          <AlertCircle className="w-8 h-8 mb-2" />
          <p className="text-sm font-medium">Failed to load transaction data.</p>
          <button
            onClick={() => refetch()}
            className="mt-3 px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      ) : isVirtualized ? (
        <VirtualizedTable table={table} onRenderMetrics={handleRenderMetrics} />
      ) : (
        <UnvirtualizedTable table={table} onRenderMetrics={handleRenderMetrics} />
      )}
    </div>
  );
}
