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
          fontWeight: 500,
        }}
      >
        今日で
      </p>
      <div className="flex items-end gap-1">
        <p
          className="font-number leading-none"
          style={{
            fontSize: 'clamp(3.75rem, 12vw, 6rem)',
            fontWeight: 800,
            letterSpacing: 'var(--letter-spacing-tight)',
          }}
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
