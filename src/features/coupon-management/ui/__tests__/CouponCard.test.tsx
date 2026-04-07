import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CouponCard from '../CouponCard';
import type { Coupon, CouponHandler } from '@/shared/types';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        expired: '만료됨',
        permanent: '무기한',
        copied: '복사됨',
        copyPcOnly: 'PC에서만 가능',
      };
      return map[key] ?? key;
    },
  }),
}));

function makeCoupon(overrides: Partial<Coupon> = {}): Coupon {
  return {
    id: 1,
    code: 'TESTCODE',
    name: '테스트 쿠폰',
    description: '보상 내용',
    is_active: true,
    expires_at: null,
    created_by: 'user',
    ...overrides,
  };
}

function makeHandler(overrides: Partial<CouponHandler> = {}): CouponHandler {
  return {
    setData: vi.fn(),
    isDuplicatedCoupon: vi.fn(() => false),
    isUsed: vi.fn(),
    toast: {
      show: vi.fn(),
      hide: vi.fn(),
      alert: vi.fn(),
      success: vi.fn(),
      failed: vi.fn(),
    },
    ...overrides,
  };
}

describe('CouponCard', () => {
  let handler: CouponHandler;

  beforeEach(() => {
    handler = makeHandler();
  });

  it('쿠폰 이름, 코드, 보상을 렌더링한다', () => {
    render(
      <CouponCard data={makeCoupon()} isLogin={false} permission={false} handler={handler} />
    );
    expect(screen.getByText('테스트 쿠폰')).toBeInTheDocument();
    expect(screen.getByText('TESTCODE')).toBeInTheDocument();
    expect(screen.getByText('보상 내용')).toBeInTheDocument();
  });

  it('active이고 expires_at이 null이면 "무기한" 표시', () => {
    render(
      <CouponCard data={makeCoupon()} isLogin={false} permission={false} handler={handler} />
    );
    expect(screen.getByText('무기한')).toBeInTheDocument();
  });

  it('is_active가 false이면 "만료됨" 표시', () => {
    render(
      <CouponCard
        data={makeCoupon({ is_active: false })}
        isLogin={false}
        permission={false}
        handler={handler}
      />
    );
    expect(screen.getByText('만료됨')).toBeInTheDocument();
  });

  it('expires_at이 있으면 날짜를 포맷하여 표시', () => {
    render(
      <CouponCard
        data={makeCoupon({ expires_at: '2024-06-15T14:30:00Z' })}
        isLogin={false}
        permission={false}
        handler={handler}
      />
    );
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('비로그인 상태에서는 수정/삭제 버튼이 보이지 않는다', () => {
    render(
      <CouponCard data={makeCoupon()} isLogin={false} permission={false} handler={handler} />
    );
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
  });

  it('로그인 + 권한이 있으면 수정/삭제 버튼이 보인다', () => {
    render(
      <CouponCard data={makeCoupon()} isLogin={true} permission={true} handler={handler} />
    );
    const buttons = screen.getAllByRole('button');
    // 복사 1 + 수정 1 + 삭제 1 = 3
    expect(buttons.length).toBe(3);
  });

  it('복사 버튼 클릭 시 toast.show가 호출된다', () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });

    render(
      <CouponCard data={makeCoupon()} isLogin={false} permission={false} handler={handler} />
    );

    const copyButton = screen.getAllByRole('button')[0]!;
    fireEvent.click(copyButton);

    expect(handler.toast.show).toHaveBeenCalled();
  });
});
