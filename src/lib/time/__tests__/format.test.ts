import { describe, expect, it } from 'vitest';
import {
  formatFullSeconds,
  getAutoDisplayPattern,
  isManualSwitchLocked,
  msToParts,
  ratioToPercent,
} from '../format';

describe('format', () => {
  it('31日以上は日のみ', () => {
    expect(getAutoDisplayPattern(31 * 86400 * 1000)).toBe('days');
  });
  it('8〜30日は日+時間', () => {
    expect(getAutoDisplayPattern(10 * 86400 * 1000)).toBe('days-hours');
  });
  it('1〜7日(24時間以上)は日+時間+分', () => {
    expect(getAutoDisplayPattern(5 * 86400 * 1000)).toBe('days-hours-minutes');
  });
  it('24時間未満はフル固定', () => {
    expect(getAutoDisplayPattern(12 * 60 * 60 * 1000)).toBe('full');
    expect(isManualSwitchLocked(12 * 60 * 60 * 1000)).toBe(true);
  });
  it('msToPartsが正しく分解する', () => {
    expect(msToParts(90061000)).toEqual({
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
    });
  });
  it('formatFullSecondsが秒とセンチ秒を正しくフォーマットする', () => {
    expect(formatFullSeconds(4320)).toBe('4.32');
    expect(formatFullSeconds(4000)).toBe('4.00');
    expect(formatFullSeconds(4005)).toBe('4.00'); // 10ms未満は切り捨て
    expect(formatFullSeconds(65000)).toBe('5.00'); // 60秒で繰り上がり、秒は0〜59
  });
  it('ratioToPercentが経過率を整数%に変換する', () => {
    expect(ratioToPercent(0.654)).toBe(65);
    expect(ratioToPercent(0)).toBe(0);
    expect(ratioToPercent(1)).toBe(100);
  });
});
