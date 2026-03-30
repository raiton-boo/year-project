'use client';

import { getYearMessage } from '@/lib/message';
import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'progressRate'>;

export default function YearMessage({ progressRate }: Props) {
  const message = getYearMessage(progressRate);

  return (
    <div className="flex items-center justify-center h-8">
      <p
        style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text)',
        }}
      >
        {message}
      </p>
    </div>
  );
}
