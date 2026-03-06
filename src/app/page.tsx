'use client';

import Header from '@/components/layout/Header';
import ElapsedDays from '@/components/features/ElapsedDays';
import ProgressBar from '@/components/features/ProgressBar';
import { useYearProgress } from '@/hooks/useYearProgress';

export default function Home() {
  const progress = useYearProgress();

  return (
    <div className="flex flex-col min-h-screen">
      <Header year={progress.year} />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <ElapsedDays
          elapsedDays={progress.elapsedDays}
          totalDays={progress.totalDays}
        />
        <ProgressBar progressRate={progress.progressRate} />
      </main>
    </div>
  );
}
