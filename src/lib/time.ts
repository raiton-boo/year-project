import {
  getDayOfYear,
  isLeapYear,
  differenceInDays,
  endOfYear,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

const TIMEZONE = 'Asia/Tokyo';

/** 現在時刻をJSTに変換して返す */
export function getNowJST(): Date {
  return toZonedTime(new Date(), TIMEZONE);
}

/** 今年の総日数 (うるう年対応) */
export function getTotalDays(now: Date): number {
  return isLeapYear(now) ? 366 : 365;
}

/** 経過日数 (1/1を1日目とする) */
export function getElapsedDays(now: Date): number {
  return getDayOfYear(now);
}

/** 残り日数 */
export function getRemainingDays(now: Date): number {
  return differenceInDays(endOfYear(now), now);
}

/** 経過率 (0~100) */
export function getProgressRate(now: Date): number {
  const total = getTotalDays(now);
  const elapsed = getElapsedDays(now);
  return Math.min(Math.round((elapsed / total) * 100), 100);
}

/** 年末までの残り時間を詳細に返す */
export function getRemainingTime(now: Date): RemainingTime {
  const end = endOfYear(now);
  const diffMs = end.getTime() - now.getTime();

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};
