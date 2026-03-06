'use client';

import Header from '@/components/layout/Header';
import ElapsedDays from '@/components/features/ElapsedDays';
import ProgressBar from '@/components/features/ProgressBar';
import { useYearProgress } from '@/hooks/useYearProgress';

export default function Home() {
  const progress = useYearProgress();
  const testProgress = {...progress, progressRate: 50}

  return (
    <div className="flex flex-col min-h-screen">
      <Header year={testProgress.year} />
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <ElapsedDays
          elapsedDays={testProgress.elapsedDays}
          totalDays={testProgress.totalDays}
        />
        <ProgressBar progressRate={testProgress.progressRate} />
      </main>
    </div>
  );
}
