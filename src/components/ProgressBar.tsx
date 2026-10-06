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
    <div
      className="w-60 h-60 rounded-full flex items-center justify-center"
      style={{
        background: `conic-gradient(from -90deg, #f2c14e 0%, #cfe36b ${percent}%, rgba(255,255,255,0.1) ${percent}% 100%)`,
      }}
    >
      <div className="w-[73%] h-[73%] rounded-full bg-[#0d1b3a] flex items-center justify-center">
        <span className="font-num">{integerPercent}</span>
      </div>
    </div>
  );
}
