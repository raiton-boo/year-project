const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** 指定した時刻(UTCエポックms)を、JSTの壁時計時刻として読むためのDateを返す */
function toJSTWallClock(epochMs: number): Date {
  return new Date(epochMs + JST_OFFSET_MS);
}

/** 現在時刻(UTCエポックms)をJSTで見た時の「年」を返す */
export function getCurrentJSTYear(nowMs: number = Date.now()): number {
  return toJSTWallClock(nowMs).getUTCFullYear();
}

/** 指定した年の「1/1 00:00:00 JST」のUTCエポックmsを返す */
export function getYearStartJST(year: number): number {
  return Date.UTC(year, 0, 1, 0, 0, 0, 0) - JST_OFFSET_MS;
}

/** 指定した年の「12/31 23:59:59.999 JST」のUTCエポックmsを返す */
export function getYearEndJST(year: number): number {
  return Date.UTC(year, 11, 31, 23, 59, 59, 999) - JST_OFFSET_MS;
}

/** 現在時刻から、その年の終わりまでの残りミリ秒を返す(マイナスにはならない) */
export function getRemainingMs(nowMs: number = Date.now()): number {
  const year = getCurrentJSTYear(nowMs);
  const remaining = getYearEndJST(year) - nowMs;
  return Math.max(remaining, 0);
}

/** その年(1/1 00:00:00 JST 〜 12/31 23:59:59 JST)の経過率(0〜1)を返す */
export function getYearProgressRatio(nowMs: number = Date.now()): number {
  const year = getCurrentJSTYear(nowMs);
  const start = getYearStartJST(year);
  const end = getYearEndJST(year);
  const ratio = (nowMs - start) / (end - start);
  return Math.min(Math.max(ratio, 0), 1);
}
