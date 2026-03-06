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
      <p
        className="font-number font-bold leading-none"
        style={{ fontSize: 'var(--font-size-display)' }}
      >
        {elapsedDays}
      </p>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-subtext)',
        }}
      >
        日目 / {totalDays}日
      </p>
    </div>
  );
}
