'use client';

import { motion } from 'motion/react';
import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'progressRate'>;

export default function ProgressBar({ progressRate }: Props) {
  // パーセント表示がはみ出さないよう端を調整
  const clampedLeft = Math.min(Math.max(progressRate, 8), 92);

  return (
    <div className="flex flex-col w-full max-w-lg px-4 mt-8">
      {/* バー全体 */}
      <div className="relative w-full py-2">
        {/* パーセント表示 */}
        <motion.p
          className="absolute -top-5 -translate-x-1/2 font-number font-bold"
          style={{
            left: `${clampedLeft}%`,
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-accent)',
          }}
          initial={{ left: '0%' }}
          animate={{ left: `${clampedLeft}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {progressRate}%
        </motion.p>

        {/* バー本体 */}
        <div
          className="relative w-full h-1 rounded-full"
          style={{ backgroundColor: 'var(--color-progress-track)' }}
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
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: 'var(--color-progress-fill)' }}
          initial={{ left: '0%' }}
          animate={{ left: `${progressRate}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* 鼓動アニメーション */}
          <motion.div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: 'var(--color-progress-fill)' }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      {/* 0%と100%のラベル */}
      <div
        className="flex justify-between w-full mt-1"
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-subtext)',
        }}
      >
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
