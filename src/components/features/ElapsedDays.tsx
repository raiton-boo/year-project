'use client';

import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'elapsedDays' | 'totalDays'>;

export default function ElapsedDays({ elapsedDays, totalDays }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-subtext)',
        }}
      >
        今日で
      </p>
      <div className="flex items-end gap-1">
        <p
          className="font-number font-bold leading-none"
          style={{ fontSize: 'var(--font-size-display)' }}
        >
          {elapsedDays}
        </p>
        <p
          className="mb-3"
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-subtext)',
          }}
        >
          日目
        </p>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-subtext)',
          }}
        >
          / {totalDays}日
        </p>
      </div>
    </div>
  );
}
