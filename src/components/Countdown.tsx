'use client';

import {
  formatFullSeconds,
  getAutoDisplayPattern,
  isManualSwitchLocked,
  msToParts,
  type DisplayPattern,
} from '@/lib/time/format';
import { getRemainingMs } from '@/lib/time/jst';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'countdown-display-pattern';
const TICK_MS = 50;
const STAGGER_STEP = 0.08;

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

function segmentVariants(index: number, total: number) {
  const enterDelay = index * STAGGER_STEP;
  const exitDelay = (total - 1 - index) * STAGGER_STEP;
  return {
    initial: { opacity: 0, scale: 0.6 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.22, ease: 'easeOut', delay: enterDelay },
    },
    exit: {
      opacity: 0,
      scale: 0.6,
      transition: { duration: 0.18, ease: 'easeIn', delay: exitDelay },
    },
  };
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

  if (remainingMs === null) {
    return null;
  }

  const locked = isManualSwitchLocked(remainingMs);
  const pattern = locked
    ? 'full'
    : (manualPattern ?? getAutoDisplayPattern(remainingMs));
  const { days, hours, minutes, seconds } = msToParts(remainingMs);
  const showCentiseconds = pattern === 'full' && !reducedMotion;

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

        <AnimatePresence>
          {pattern !== 'days' && (
            <motion.span
              key="hours"
              variants={segmentVariants(0, 3)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex"
            >
              <span className="font-num"> {hours}</span>
              <span className="font-jp">時間</span>
            </motion.span>
          )}
          {(pattern === 'days-hours-minutes' || pattern === 'full') && (
            <motion.span
              key="minutes"
              variants={segmentVariants(1, 3)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex"
            >
              <span className="font-num"> {minutes}</span>
              <span className="font-jp">分</span>
            </motion.span>
          )}
          {pattern === 'full' && (
            <motion.span
              key="seconds"
              variants={segmentVariants(2, 3)}
              initial="initial"
              animate="animate"
              exit="exit"
              className="inline-flex"
            >
              <span className="font-num">
                {' '}
                {showCentiseconds ? formatFullSeconds(remainingMs) : seconds}
              </span>
              <span className="font-jp">秒</span>
            </motion.span>
          )}
        </AnimatePresence>
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
