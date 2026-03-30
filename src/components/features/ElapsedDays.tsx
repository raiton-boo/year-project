'use client';

import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'elapsedDays' | 'totalDays'>;

const labelStyle = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-subtext)',
  fontWeight: 500 as const,
};

const numberStyle = {
  fontSize: 'clamp(3.75rem, 12vw, 6rem)',
  fontWeight: 800 as const,
  letterSpacing: 'var(--letter-spacing-tight)',
};

const unitStyle = {
  fontSize: 'var(--font-size-lg)',
  color: 'var(--color-subtext)',
};

const smallLabelStyle = {
  fontSize: 'var(--font-size-sm)',
  color: 'var(--color-subtext)',
};

export default function ElapsedDays({ elapsedDays, totalDays }: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p style={labelStyle}>今日で</p>
      <div className="flex items-end gap-1">
        <p className="font-number leading-none" style={numberStyle}>
          {elapsedDays}
        </p>
        <p className="mb-3" style={unitStyle}>
          日目
        </p>
        <p style={smallLabelStyle}>/ {totalDays}日</p>
      </div>
    </div>
  );
}
