import type { YearProgress } from '@/hooks/useYearProgress';

type Props = Pick<YearProgress, 'year'>;

export default function Header({ year }: Props) {
  return (
    <header className="w-full py-4 px-6">
      <div className="flex items-center justify-center">
        <h1
          className="font-bold tracking-wide"
          style={{ fontSize: 'var(--font-size-xl)' }}
        >
          {year}年
        </h1>
        {/* ボタンエリア：ダークモード、シェアなど（予定） */}
      </div>
    </header>
  );
}
