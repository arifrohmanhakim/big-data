import React from 'react';
import { TransactionPriority, TransactionStatus } from '@/types/transaction';

interface StatusBadgeProps {
  status: TransactionStatus;
}

interface PriorityBadgeProps {
  priority: TransactionPriority;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<TransactionStatus, { label: string; className: string }> = {
    completed: {
      label: 'Completed',
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    },
    pending: {
      label: 'Pending',
      className: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    },
    processing: {
      label: 'Processing',
      className: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    },
    cancelled: {
      label: 'Cancelled',
      className: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    },
  };

  const current = styles[status] ?? styles.pending;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${current.className}`}
    >
      {current.label}
    </span>
  );
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles: Record<TransactionPriority, { label: string; className: string }> = {
    low: {
      label: 'Low',
      className: 'text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800',
    },
    medium: {
      label: 'Medium',
      className: 'text-sky-700 bg-sky-50 dark:text-sky-300 dark:bg-sky-950/40',
    },
    high: {
      label: 'High',
      className: 'text-orange-700 bg-orange-50 dark:text-orange-300 dark:bg-orange-950/40',
    },
    critical: {
      label: 'Critical',
      className: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-950/50 font-semibold',
    },
  };

  const current = styles[priority] ?? styles.low;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${current.className}`}
    >
      {current.label}
    </span>
  );
}
