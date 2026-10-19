import React from 'react';
import { Layers, Database, Activity } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/75 dark:bg-neutral-900/75 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-bold text-lg shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              Big Data Dashboard
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <Activity className="w-3 h-3" /> 60 FPS Engine
              </span>
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              High-performance table rendering for 5,000+ rows using TanStack Table & Virtual
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
            <Database className="w-3.5 h-3.5 text-neutral-500" />
            <span>TanStack Query + Table + Virtual</span>
          </div>
        </div>
      </div>
    </header>
  );
}
