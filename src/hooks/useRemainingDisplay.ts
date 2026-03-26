'use client';

import { useState, useEffect, useRef } from 'react';
import { getNowJST, getRemainingTime } from '@/lib/time';
import type { RemainingTime } from '@/lib/time';

const STORAGE_KEY = 'remainingDays_isExpanded';

type Props = {
  remainingDays: number;
  remainingTime: RemainingTime;
};

export function useRemainingDisplay({ remainingDays, remainingTime }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [liveTime, setLiveTime] = useState(remainingTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isUnderMonth = remainingDays < 30;
  const isUnderThreeDays = remainingDays < 3;
  const isUnderOneDay = remainingDays < 1;
  const isExpanding = isExpanded || isUnderOneDay;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    queueMicrotask(() => {
      setIsMounted(true);
      setIsExpanded(saved === 'true');
    });
  }, []);

  useEffect(() => {
    if (!isExpanding) return;

    intervalRef.current = setInterval(() => {
      setLiveTime(getRemainingTime(getNowJST()));
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isExpanding]);

  const handleToggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    localStorage.setItem(STORAGE_KEY, String(next));
  };

  return {
    isMounted,
    isExpanded,
    isExpanding,
    isUnderMonth,
    isUnderThreeDays,
    isUnderOneDay,
    displayTime: isExpanding ? liveTime : remainingTime,
    handleToggle,
  };
}
