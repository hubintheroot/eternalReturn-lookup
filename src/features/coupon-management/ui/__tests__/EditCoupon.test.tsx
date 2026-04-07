import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditCoupon from '../EditCoupon';
import type { Coupon, CouponHandler } from '@/shared/types';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'edit.title': '쿠폰 수정',
        'edit.subtitle': '쿠폰을 수정합니다',
        'edit.submit': '수정',
        'edit.success': '수정 성공',
        'edit.noPermission': '권한 없음',
        'validation.nameRequired': '이름 필수',
        'validation.codeRequired': '코드 필수',
        'validation.codeInvalid': '코드 형식 오류',
        'validation.codeDuplicate': '코드 중복',
        'validation.rewardRequired': '보상 필수',
        'validation.expiresAtRequired': '만료일 필수',
        'error.unknown': '알 수 없는 에러',
        'form.name': '쿠폰 이름',
        'form.code': '쿠폰 코드',
        'form.reward': '보상',
        'form.neverExpires': '만료 없음',
        'form.expiresAt': '만료일',
        'form.dateFormat': 'yyyy/MM/dd HH:mm',
        'form.datePlaceholder': '날짜 선택',
        'form.parseFmt': 'yyyy/MM/dd HH:mm',
      };
      return map[key] ?? key;
    },
    i18n: { language: 'ko' },
  }),
}));

vi.mock('react-datepicker', () => ({
  __esModule: true,
  default: () => <input data-testid="datepicker" />,
  registerLocale: vi.fn(),
}));
vi.mock('date-fns/locale/ko', () => ({ ko: {} }));
vi.mock('date-fns/locale/en-US', () => ({ enUS: {} }));
vi.mock('date-fns/locale/ja', () => ({ ja: {} }));

vi.mock('@/shared/api/supabase', () => ({
  supabase: () => ({
    from: () => ({
      update: () => ({
        eq: () => ({
          select: () =>
            Promise.resolve({ data: [{ id: 1 }], error: null }),
        }),
      }),
    }),
  }),
  getCoupons: vi.fn(() => Promise.resolve({ data: [] })),
}));

const existingCoupon: Coupon = {
  id: 1,
  code: 'OLDCODE',
  name: '기존 쿠폰',
  description: '기존 보상',
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

describe('EditCoupon', () => {
  let handler: ReturnType<typeof makeHandler>;
  const onClose = vi.fn();

  beforeEach(() => {
    handler = makeHandler();
    onClose.mockClear();
  });

  it('수정 폼이 기존 데이터로 채워져 렌더링된다', () => {
    render(<EditCoupon handler={handler} onClose={onClose} data={existingCoupon} />);
    expect(screen.getByText('쿠폰 수정')).toBeInTheDocument();
    expect(screen.getByDisplayValue('기존 쿠폰')).toBeInTheDocument();
    expect(screen.getByDisplayValue('OLDCODE')).toBeInTheDocument();
    expect(screen.getByDisplayValue('기존 보상')).toBeInTheDocument();
  });

  it('이름을 지우고 제출하면 toast.failed 호출', () => {
    render(<EditCoupon handler={handler} onClose={onClose} data={existingCoupon} />);

    const nameInput = screen.getByDisplayValue('기존 쿠폰');
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('수정'));

    expect(handler.toast.failed).toHaveBeenCalledWith('이름 필수');
  });

  it('코드를 지우고 제출하면 toast.failed 호출', () => {
    render(<EditCoupon handler={handler} onClose={onClose} data={existingCoupon} />);

    const codeInput = screen.getByDisplayValue('OLDCODE');
    fireEvent.change(codeInput, { target: { value: '' } });
    fireEvent.click(screen.getByText('수정'));

    expect(handler.toast.failed).toHaveBeenCalledWith('코드 필수');
  });

  it('유효한 데이터로 제출하면 성공 토스트와 onClose 호출', async () => {
    render(<EditCoupon handler={handler} onClose={onClose} data={existingCoupon} />);

    fireEvent.click(screen.getByText('수정'));

    await vi.waitFor(() => {
      expect(handler.toast.success).toHaveBeenCalledWith('수정 성공');
    });
    expect(onClose).toHaveBeenCalled();
  });
});
