import type { YearProgress } from "@/hooks/useYearProgress";

type Props = Pick<YearProgress, "year">;

export default function Header({ year }: Props) {
  return (
    <header className="w-full border-b border-border py-4 px-6">
      <h1
        className="text-center font-bold tracking-wide"
        style={{ fontSize: "var(--font-size-xl)" }}
      >
        {year}年あとどんくらい？
        </h1>
    </header>
  )
}