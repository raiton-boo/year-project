type MessageEntry = {
  threshold: number;
  text: string;
};

const MESSAGES: MessageEntry[] = [
  { threshold: 5, text: '今年が始まったばかり' },
  { threshold: 40, text: 'まだまだこれから' },
  { threshold: 50, text: 'もうすぐ後半戦' },
  { threshold: 60, text: '今年も後半へ' },
  { threshold: 90, text: '残りわずか' },
  { threshold: 100, text: 'カウントダウン開始' },
];

export function getYearMessage(progressRate: number): string {
  const entry = MESSAGES.find((m) => progressRate < m.threshold);
  return entry?.text ?? 'もうすぐ新年';
}