export type DisplayPattern =
  | 'days'
  | 'days-hours'
  | 'days-hours-minutes'
  | 'full';

export interface RemainingParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function msToParts(ms: number): RemainingParts {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

/** 残り時間に応じて自動で決まる表示パターン */
export function getAutoDisplayPattern(ms: number): DisplayPattern {
  if (ms < ONE_DAY_MS) return 'full';
  const { days } = msToParts(ms);
  if (days >= 31) return 'days';
  if (days >= 8) return 'days-hours';
  return 'days-hours-minutes';
}

/** 残り24時間未満かどうか(手動切り替えを無効化する境界) */
export function isManualSwitchLocked(ms: number): boolean {
  return ms < ONE_DAY_MS;
}

/** フル表示用: 現在の秒を小数点第2位まで含めた文字列で返す(例: "4.32") */
export function formatFullSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);
  return `${seconds}.${String(centiseconds).padStart(2, '0')}`;
}
