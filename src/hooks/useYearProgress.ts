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
import { toZonedTime } from 'date-fns-tz';

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

    const tomorrowJST = toZonedTime(new Date(), 'Asia/Tokyo');
    tomorrowJST.setDate(tomorrowJST.getDate() + 1);
    tomorrowJST.setHours(0, 0, 0, 0);
    const msUnitlMidnight = tomorrowJST.getTime() - new Date().getTime();

    const timeout = setTimeout(() => {
      setNow(getNowJST());
    }, msUnitlMidnight);

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
