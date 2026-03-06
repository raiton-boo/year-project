'use client';

import { useState, useEffect } from 'react';
import {
  getNowJST,
  getTotalDays,
  getElapsedDays,
  getRemainingDays,
  getProgressRate,
  getRemainingTime,
} from '@/lib/time';
import type { RemainingTime } from '@/lib/time';

export type YearProgress = {
  year: number;
  totalDays: number;
  elapsedDays: number;
  remainingDays: number;
  remainingTime: RemainingTime;
  progressRate: number;
};

export function useYearProgress(debugDate?: Date): YearProgress {
  const [now, setNow] = useState<Date>(() => getNowJST());

  const current = debugDate ?? now;
  const remainingDays = getRemainingDays(current);

  // 深夜0時に日付を更新
  useEffect(() => {
    if (debugDate) return;

    // 残り1日未満も含め、常に深夜0時に更新する
    // 秒単位の更新はuseRemainingDisplayが担当
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - Date.now();

    const timeout = setTimeout(() => {
      setNow(getNowJST());
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [debugDate]);

  return {
    year: current.getFullYear(),
    totalDays: getTotalDays(current),
    elapsedDays: getElapsedDays(current),
    remainingDays,
    remainingTime: getRemainingTime(current),
    progressRate: getProgressRate(current),
  };
}
