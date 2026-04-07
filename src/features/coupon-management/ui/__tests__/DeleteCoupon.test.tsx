import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteCoupon from '../DeleteCoupon';
import type { Coupon, CouponHandler } from '@/shared/types';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'delete.title': '쿠폰 삭제',
        'delete.subtitle': '정말 삭제하시겠습니까?',
        'delete.codeLabel': '코드',
        'delete.rewardLabel': '보상',
        'delete.expiresAtLabel': '만료일',
        'delete.submit': '삭제',
        'delete.confirm': '삭제하시겠습니까?',
        'delete.success': '삭제 성공',
        'error.unknown': '알 수 없는 에러',
        permanent: '무기한',
      };
      return map[key] ?? key;
    },
  }),
}));

vi.mock('@/shared/api/supabase', () => ({
  supabase: () => ({
    from: () => ({
      delete: () => ({
        eq: () => Promise.resolve({ error: null }),
      }),
    }),
  }),
  getCoupons: vi.fn(() => Promise.resolve({ data: [] })),
}));

const testCoupon: Coupon = {
  id: 1,
  code: 'DELCODE',
  name: '삭제 대상',
  description: '보상 내용',
  is_active: true,
  expires_at: null,
  created_by: 'admin',
};

function makeHandler(): Omit<CouponHandler, 'isUsed'> {
  return {
    setData: vi.fn(),
    isDuplicatedCoupon: vi.fn(() => false),
    toast: {
      show: vi.fn(),
      hide: vi.fn(),
      alert: vi.fn(),
      success: vi.fn(),
      failed: vi.fn(),
    },
  };
}

describe('DeleteCoupon', () => {
  let handler: ReturnType<typeof makeHandler>;
  const onClose = vi.fn();

  beforeEach(() => {
    handler = makeHandler();
    onClose.mockClear();
    vi.restoreAllMocks();
  });

  it('쿠폰 정보(코드, 보상, 만료일)를 표시한다', () => {
    render(<DeleteCoupon handler={handler} onClose={onClose} data={testCoupon} />);
    expect(screen.getByText('쿠폰 삭제')).toBeInTheDocument();
    expect(screen.getByText('DELCODE')).toBeInTheDocument();
    expect(screen.getByText('보상 내용')).toBeInTheDocument();
    expect(screen.getByText('무기한')).toBeInTheDocument();
  });

  it('만료일이 있으면 날짜를 표시한다', () => {
    const couponWithExpiry = {
      ...testCoupon,
      expires_at: '2024-06-15T14:30:00Z',
    };
    render(<DeleteCoupon handler={handler} onClose={onClose} data={couponWithExpiry} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 + confirm 승인 시 성공 토스트 호출', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    render(<DeleteCoupon handler={handler} onClose={onClose} data={testCoupon} />);

    fireEvent.click(screen.getByText('삭제'));

    await vi.waitFor(() => {
      expect(handler.toast.success).toHaveBeenCalledWith('삭제 성공');
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('confirm 거부 시 삭제가 실행되지 않는다', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<DeleteCoupon handler={handler} onClose={onClose} data={testCoupon} />);

    fireEvent.click(screen.getByText('삭제'));

    expect(handler.toast.success).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });
});
