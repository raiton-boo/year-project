'use client';

import {
  formatFullSeconds,
  getAutoDisplayPattern,
  isManualSwitchLocked,
  msToParts,
  type DisplayPattern,
} from '@/lib/time/format';
import { getRemainingMs } from '@/lib/time/jst';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'countdown-display-pattern';
const TICK_MS = 50;
const STAGGER_STEP = 0.08;
const UNMOUNT_GRACE_MS = 450;
const HIDDEN_STATE = { opacity: 0, scale: 0.6 };

const PATTERN_LABELS: Record<DisplayPattern, string> = {
  days: '日',
  'days-hours': '日+時間',
  'days-hours-minutes': '日+時間+分',
  full: 'フル',
};

const PATTERN_ORDER: DisplayPattern[] = [
  'days',
  'days-hours',
  'days-hours-minutes',
  'full',
];

function useDelayedUnmount(active: boolean, delayMs: number): boolean {
  const [mounted, setMounted] = useState(active);
  useEffect(() => {
    if (active) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(false), delayMs);
    return () => clearTimeout(timer);
  }, [active, delayMs]);
  return mounted;
}

function segmentTransition(
  active: boolean,
  enterDelay: number,
  exitDelay: number
) {
  return {
    duration: active ? 0.22 : 0.18,
    ease: active ? 'easeOut' : 'easeIn',
    delay: active ? enterDelay : exitDelay,
  } as const;
}

export function Countdown() {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);
  const [manualPattern, setManualPattern] = useState<DisplayPattern | null>(
    null
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setRemainingMs(getRemainingMs());
    const stored = window.localStorage.getItem(
      STORAGE_KEY
    ) as DisplayPattern | null;
    if (stored && PATTERN_ORDER.includes(stored)) {
      setManualPattern(stored);
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    const id = setInterval(() => {
      setRemainingMs(getRemainingMs());
    }, TICK_MS);

    return () => {
      clearInterval(id);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const locked = remainingMs !== null && isManualSwitchLocked(remainingMs);
  const pattern: DisplayPattern =
    remainingMs === null
      ? 'days'
      : locked
        ? 'full'
        : (manualPattern ?? getAutoDisplayPattern(remainingMs));

  const hoursActive = pattern !== 'days';
  const minutesActive = pattern === 'days-hours-minutes' || pattern === 'full';
  const secondsActive = pattern === 'full';

  const hoursMounted = useDelayedUnmount(hoursActive, UNMOUNT_GRACE_MS);
  const minutesMounted = useDelayedUnmount(minutesActive, UNMOUNT_GRACE_MS);
  const secondsMounted = useDelayedUnmount(secondsActive, UNMOUNT_GRACE_MS);

  if (remainingMs === null) {
    return null;
  }

  const { days, hours, minutes, seconds } = msToParts(remainingMs);
  // 消えている最中(secondsMounted)も、整数表示に切り替えず小数点表示を保つ
  const showCentiseconds = secondsMounted && !reducedMotion;

  function handleSelect(next: DisplayPattern) {
    if (locked) return;
    setManualPattern(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <div>
      <div className="inline-flex">
        <span className="font-jp">あと</span>
        <span className="font-num">{days}</span>
        <span className="font-jp">日</span>

        {hoursMounted && (
          <motion.span
            className="inline-flex"
            initial={HIDDEN_STATE}
            animate={hoursActive ? { opacity: 1, scale: 1 } : HIDDEN_STATE}
            transition={segmentTransition(
              hoursActive,
              0 * STAGGER_STEP,
              2 * STAGGER_STEP
            )}
          >
            <span className="font-num"> {hours}</span>
            <span className="font-jp">時間</span>
          </motion.span>
        )}

        {minutesMounted && (
          <motion.span
            className="inline-flex"
            initial={HIDDEN_STATE}
            animate={minutesActive ? { opacity: 1, scale: 1 } : HIDDEN_STATE}
            transition={segmentTransition(
              minutesActive,
              1 * STAGGER_STEP,
              1 * STAGGER_STEP
            )}
          >
            <span className="font-num"> {minutes}</span>
            <span className="font-jp">分</span>
          </motion.span>
        )}

        {secondsMounted && (
          <motion.span
            className="inline-flex"
            initial={HIDDEN_STATE}
            animate={secondsActive ? { opacity: 1, scale: 1 } : HIDDEN_STATE}
            transition={segmentTransition(
              secondsActive,
              2 * STAGGER_STEP,
              0 * STAGGER_STEP
            )}
          >
            <span className="font-num">
              {' '}
              {showCentiseconds ? formatFullSeconds(remainingMs) : seconds}
            </span>
            <span className="font-jp">秒</span>
          </motion.span>
        )}
      </div>

      <div role="group" aria-label="表示単位の切り替え">
        {PATTERN_ORDER.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => handleSelect(p)}
            disabled={locked}
            aria-pressed={pattern === p}
            className="font-jp"
          >
            {PATTERN_LABELS[p]}
          </button>
        ))}
      </div>
    </div>
  );
}
