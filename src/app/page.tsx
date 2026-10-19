import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardView } from '@/components/dashboard/DashboardView';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/60 dark:bg-neutral-950">
      <DashboardHeader />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardView />
      </main>
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
        Big Data Dashboard Performance Demo &bull; Next.js 16 &bull; TanStack Table &bull; TanStack Query &bull; TanStack Virtual
      </footer>
    </div>
  );
}
