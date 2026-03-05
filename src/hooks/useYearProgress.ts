'use client';

import { useState, useEffect } from 'react';
import {
  getNowJST,
  getTotalDays,
  getElapsedDays,
  getRemainingDays,
  getProgressRate,
} from '@/lib/time';

export type YearProgress = {
  year: number;
  totalDays: number;
  elapsedDays: number;
  remainingDays: number;
  progressRate: number;
};

export function useYearProgress(): YearProgress {
  const [now, setNow] = useState<Date>(() => getNowJST());

  // 深夜0時に日付を更新
  useEffect(() => {
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
  }, []);

  return {
    year: now.getFullYear(),
    totalDays: getTotalDays(now),
    elapsedDays: getElapsedDays(now),
    remainingDays: getRemainingDays(now),
    progressRate: getProgressRate(now),
  };
}
