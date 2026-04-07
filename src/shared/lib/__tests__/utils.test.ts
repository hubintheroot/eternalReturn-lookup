import { describe, it, expect } from 'vitest';
import { couponSort, formatDate } from '../utils';
import type { Coupon } from '@/shared/types';

function makeCoupon(overrides: Partial<Coupon> = {}): Coupon {
  return {
    id: 1,
    code: 'TEST',
    name: 'Test',
    description: 'reward',
    is_active: true,
    expires_at: null,
    created_by: 'user',
    ...overrides,
  };
}

describe('couponSort', () => {
  it('active 쿠폰이 inactive보다 앞에 온다', () => {
    const coupons = [
      makeCoupon({ id: 1, is_active: false, expires_at: '2024-01-01T00:00:00Z' }),
      makeCoupon({ id: 2, is_active: true, expires_at: '2024-06-01T00:00:00Z' }),
    ];
    const sorted = couponSort(coupons);
    expect(sorted[0]!.id).toBe(2);
    expect(sorted[1]!.id).toBe(1);
  });

  it('expires_at이 null인 쿠폰(무기한)은 날짜가 있는 쿠폰 뒤에 온다', () => {
    const coupons = [
      makeCoupon({ id: 1, is_active: true, expires_at: null }),
      makeCoupon({ id: 2, is_active: true, expires_at: '2024-06-01T00:00:00Z' }),
    ];
    const sorted = couponSort(coupons);
    expect(sorted[0]!.id).toBe(2);
    expect(sorted[1]!.id).toBe(1);
  });

  it('같은 active 상태에서 만료일 오름차순 정렬', () => {
    const coupons = [
      makeCoupon({ id: 1, is_active: true, expires_at: '2024-12-01T00:00:00Z' }),
      makeCoupon({ id: 2, is_active: true, expires_at: '2024-03-01T00:00:00Z' }),
      makeCoupon({ id: 3, is_active: true, expires_at: '2024-06-01T00:00:00Z' }),
    ];
    const sorted = couponSort(coupons);
    expect(sorted.map((c) => c.id)).toEqual([2, 3, 1]);
  });

  it('원본 배열을 변경하지 않는다', () => {
    const coupons = [
      makeCoupon({ id: 2, is_active: false }),
      makeCoupon({ id: 1, is_active: true }),
    ];
    const original = [...coupons];
    couponSort(coupons);
    expect(coupons).toEqual(original);
  });

  it('빈 배열을 처리한다', () => {
    expect(couponSort([])).toEqual([]);
  });
});

describe('formatDate', () => {
  const date = new Date(2024, 5, 15, 14, 30); // 2024-06-15 14:30

  it('isText=true일 때 한국어 텍스트 포맷 반환', () => {
    const result = formatDate(date, true);
    expect(result).toBe('2024년 06월 15일 14:30');
  });

  it('isText=false(기본값)일 때 ISO-like 포맷 반환', () => {
    const result = formatDate(date);
    expect(result).toBe('2024-06-15T14:30');
  });

  it('한 자리 월/일/시/분에 0 패딩 적용', () => {
    const earlyDate = new Date(2024, 0, 5, 3, 7); // 2024-01-05 03:07
    expect(formatDate(earlyDate)).toBe('2024-01-05T03:07');
    expect(formatDate(earlyDate, true)).toBe('2024년 01월 05일 03:07');
  });
});
