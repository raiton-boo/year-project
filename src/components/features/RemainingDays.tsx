'use client';

import { cn } from '@/lib/utils';
import { useRemainingDisplay } from '@/hooks/useRemainingDisplay';
import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'remainingDays' | 'remainingTime'>;

type TimeUnitProps = {
  value: number | string;
  unit: string;
  large?: boolean;
};

function TimeUnit({ value, unit, large = false }: TimeUnitProps) {
  return (
    <div className="flex items-end gap-1 whitespace-nowrap">
      <p
        className="font-number leading-none"
        style={{
          fontSize: large
            ? 'clamp(1.5rem, 5vw, 2.5rem)'
            : 'var(--font-size-xl)',
          fontWeight: 600,
        }}
      >
        {value}
      </p>
      <p
        className={cn(large ? 'mb-3' : 'mb-2')}
        style={{
          fontSize: large ? 'var(--font-size-lg)' : 'var(--font-size-base)',
          color: 'var(--color-subtext)',
        }}
      >
        {unit}
      </p>
    </div>
  );
}

export default function RemainingDays({ remainingDays, remainingTime }: Props) {
  const {
    isMounted,
    isExpanded,
    isExpanding,
    isUnderMonth,
    isUnderThreeDays,
    isUnderOneDay,
    displayTime,
    handleToggle,
  } = useRemainingDisplay({ remainingDays, remainingTime });

  const { days, hours, minutes, seconds } = displayTime;

  const content = (
    <>
      <p
        style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-subtext)',
          fontWeight: 500,
        }}
      >
        残り
      </p>
      <div className="flex items-end gap-2 justify-center flex-nowrap">
        {!isUnderOneDay && <TimeUnit value={days} unit="日" large />}
        {(isUnderMonth || isExpanding) && (
          <TimeUnit value={hours} unit="時間" large={isUnderOneDay} />
        )}
        {(isUnderThreeDays || isExpanding) && (
          <TimeUnit value={minutes} unit="分" large={isUnderOneDay} />
        )}
        {isExpanding && (
          <TimeUnit
            value={seconds.toFixed(2)}
            unit="秒"
            large={isUnderOneDay}
          />
        )}
      </div>
      {!isUnderOneDay && (
        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-subtext)',
          }}
        >
          {isExpanded ? 'タップで戻す' : 'タップで詳細表示'}
        </p>
      )}
    </>
  );

  // マウント前はdiv、マウント後はbuttonに変わる
  if (!isMounted) {
    return (
      <div className="flex flex-col items-center gap-1">
        {content}
      </div>
    );
  }

  return (
    <button
      className="flex flex-col items-center gap-1"
      style={{
        pointerEvents: isUnderOneDay ? 'none' : 'auto',
        cursor: isUnderOneDay ? 'default' : 'pointer',
      }}
      onClick={handleToggle}
    >
      {content}
    </button>
  );
}
