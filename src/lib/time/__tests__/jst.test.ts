import { describe, expect, it } from 'vitest';
import {
  getCurrentJSTYear,
  getRemainingMs,
  getYearEndJST,
  getYearProgressRatio,
  getYearStartJST,
} from '../jst';

describe('jst time utils', () => {
  it('2026年1/1 00:00:00 JSTちょうどの時、経過率は0に近い', () => {
    const start = getYearStartJST(2026);
    expect(getYearProgressRatio(start)).toBeCloseTo(0, 5);
  });

  it('2026年12/31 23:59:59.999 JSTちょうどの時、残りは0', () => {
    const end = getYearEndJST(2026);
    expect(getRemainingMs(end)).toBe(0);
  });

  it('年の途中では経過率が0と1の間になる', () => {
    const mid =
      getYearStartJST(2026) + (getYearEndJST(2026) - getYearStartJST(2026)) / 2;
    const ratio = getYearProgressRatio(mid);
    expect(ratio).toBeGreaterThan(0.49);
    expect(ratio).toBeLessThan(0.51);
  });

  it('getCurrentJSTYearは現在時刻からJSTでの年を正しく返す', () => {
    const year = getCurrentJSTYear();
    expect(year).toBeGreaterThanOrEqual(2026);
  });
});
