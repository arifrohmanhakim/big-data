import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export function MetricCard({
  title,
  value,
  subValue,
  icon: Icon,
  variant = 'default',
}: MetricCardProps) {
  const iconVariants = {
    default: 'text-neutral-600 bg-neutral-100 dark:text-neutral-300 dark:bg-neutral-800',
    success: 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50',
    warning: 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/50',
    info: 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50',
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
        <div className={`p-2 rounded-lg ${iconVariants[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {value}
        </h3>
        {subValue && (
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{subValue}</p>
        )}
      </div>
    </div>
  );
}
