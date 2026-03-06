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
  const [now, setNow] = useState<Date>(() => debugDate ?? getNowJST());

  const current = debugDate ?? now;

  const remainingDays = getRemainingDays(current);
  const isLastDay = remainingDays < 1;

  // 深夜0時に日付を更新
  useEffect(() => {
    // デバッグ日時が指定されている場合はタイマー不要
    if (debugDate) return;

    if (isLastDay) {
      const interval = setInterval(() => {
        setNow(getNowJST());
      }, 1000);
      return () => clearInterval(interval);
    }

    const scheduleUpdate = () => {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const msUntilMidnight = tomorrow.getTime() - Date.now();

      const timeout = setTimeout(() => {
        setNow(getNowJST());
        scheduleUpdate();
      }, msUntilMidnight);

      return timeout;
    };

    const timeout = scheduleUpdate();
    return () => clearTimeout(timeout);
  }, [isLastDay, debugDate]);

  return {
    year: current.getFullYear(),
    totalDays: getTotalDays(current),
    elapsedDays: getElapsedDays(current),
    remainingDays,
    remainingTime: getRemainingTime(current),
    progressRate: getProgressRate(current),
  };
}
