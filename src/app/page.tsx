'use client';

import Header from '@/components/layout/Header';
import ElapsedDays from '@/components/features/ElapsedDays';
import ProgressBar from '@/components/features/ProgressBar';
import RemainingDays from '@/components/features/RemainingDays';
import YearMessage from '@/components/features/YearMessage';
import { useYearProgress } from '@/hooks/useYearProgress';

export default function Home() {
  const progress = useYearProgress();

  return (
    <div className="flex flex-col min-h-screen">
      <Header year={progress.year} />
      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-12">
        {/* 経過日数 */}
        <ElapsedDays
          elapsedDays={progress.elapsedDays}
          totalDays={progress.totalDays}
        />

        {/* プログレスバー */}
        <ProgressBar progressRate={progress.progressRate} />

        {/* 経過時間 */}
        <RemainingDays
          remainingDays={progress.remainingDays}
          remainingTime={progress.remainingTime}
        />

        {/* メッセージ */}
        <YearMessage progressRate={progress.progressRate} />
      </main>
    </div>
  );
}
