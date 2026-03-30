'use client';

import { motion } from 'motion/react';
import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'progressRate'>;

const CLAMP_MIN_PERCENT = 8;
const CLAMP_MAX_PERCENT = 92;

export default function ProgressBar({ progressRate }: Props) {
  // % 表示がバーの端ではみ出さないよう、表示位置を CLAMP_MIN_PERCENT~CLAMP_MAX_PERCENT% に制限する
  const clampedLeft = Math.min(
    Math.max(progressRate, CLAMP_MIN_PERCENT),
    CLAMP_MAX_PERCENT
  );

  return (
    <div className="flex flex-col w-full max-w-lg px-4 mt-8">
      {/* バー全体 */}
      <div className="relative w-full py-2">
        {/* パーセント表示 */}
        <motion.p
          className="absolute -top-5 -translate-x-1/2 font-number"
          style={{
            left: `${clampedLeft}%`,
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-accent)',
            fontWeight: 700,
          }}
          initial={{ left: '0%' }}
          animate={{ left: `${clampedLeft}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {progressRate}%
        </motion.p>

        {/* バー本体 */}
        <div
          className="relative w-full rounded-full"
          style={{
            height: 'var(--progress-bar-height)',
            backgroundColor: 'var(--color-progress-track)',
          }}
        >
          {/* 塗り */}
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{ backgroundColor: 'var(--color-progress-fill)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progressRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* ピン */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${progressRate}%`,
            width: 'var(--progress-pin-size)',
            height: 'var(--progress-pin-size)',
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          }}
          initial={{ left: '0%' }}
          animate={{ left: `${progressRate}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
