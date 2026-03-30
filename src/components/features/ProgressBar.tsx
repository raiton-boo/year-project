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
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 'var(--progress-pin-size)',
            height: 'var(--progress-pin-size)',
            backgroundColor: 'var(--color-progress-fill)',
          }}
          initial={{ left: '0%' }}
          animate={{ left: `${progressRate}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* 鼓動アニメーション */}
          <motion.div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: 'var(--color-progress-fill)' }}
            animate={{ scale: [1, 1.2, 1] }}
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
