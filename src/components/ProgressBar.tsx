'use client';

import { ratioToPercent } from '@/lib/time/format';
import { getYearProgressRatio } from '@/lib/time/jst';
import { useEffect, useState } from 'react';

const FILL_DURATION_MS = 1400;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function ProgressBar() {
  const [displayRatio, setDisplayRatio] = useState(0);

  useEffect(() => {
    const target = getYearProgressRatio();
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      setDisplayRatio(target);
      return;
    }

    const start = performance.now();
    let rafId: number;

    const step = (now: number) => {
      const t = Math.min((now - start) / FILL_DURATION_MS, 1);
      setDisplayRatio(easeOutCubic(t) * target);
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const percent = displayRatio * 100;
  const integerPercent = ratioToPercent(displayRatio);

  return (
    <div style={}></div>
  )
}
