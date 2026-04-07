import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddCoupon from '../AddCoupon';
import type { CouponHandler } from '@/shared/types';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
        'add_modal.title': '쿠폰 추가',
        'add_modal.subtitle': '새 쿠폰',
        'add_modal.submit': '추가',
        'add_modal.success': '추가 성공',
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
      insert: () => ({ error: null }),
    }),
  }),
  getCoupons: vi.fn(() => Promise.resolve({ data: [] })),
}));

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

describe('AddCoupon', () => {
  let handler: ReturnType<typeof makeHandler>;
  const onClose = vi.fn();

  beforeEach(() => {
    handler = makeHandler();
    onClose.mockClear();
  });

  it('폼이 렌더링된다', () => {
    render(<AddCoupon handler={handler} onClose={onClose} />);
    expect(screen.getByText('쿠폰 추가')).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
  });

  it('이름이 비어있으면 toast.failed 호출', () => {
    render(<AddCoupon handler={handler} onClose={onClose} />);

    // 코드, 보상만 입력하고 이름은 비움
    fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'CODE1' } });
    fireEvent.change(screen.getByPlaceholderText('보상'), { target: { value: '보상 내용' } });
    fireEvent.click(screen.getByText('추가'));

    expect(handler.toast.failed).toHaveBeenCalledWith('이름 필수');
  });

  it('코드가 비어있으면 toast.failed 호출', () => {
    render(<AddCoupon handler={handler} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '테스트' } });
    fireEvent.change(screen.getByPlaceholderText('보상'), { target: { value: '보상 내용' } });
    fireEvent.click(screen.getByText('추가'));

    expect(handler.toast.failed).toHaveBeenCalledWith('코드 필수');
  });

  it('코드에 특수문자가 있으면 toast.failed 호출', () => {
    render(<AddCoupon handler={handler} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '테스트' } });
    fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'CODE-1!' } });
    fireEvent.change(screen.getByPlaceholderText('보상'), { target: { value: '보상 내용' } });
    fireEvent.click(screen.getByText('추가'));

    expect(handler.toast.failed).toHaveBeenCalledWith('코드 형식 오류');
  });

  it('중복 코드이면 toast.failed 호출', () => {
    (handler.isDuplicatedCoupon as ReturnType<typeof vi.fn>).mockReturnValue(true);
    render(<AddCoupon handler={handler} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '테스트' } });
    fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'EXISTING' } });
    fireEvent.change(screen.getByPlaceholderText('보상'), { target: { value: '보상 내용' } });
    fireEvent.click(screen.getByText('추가'));

    expect(handler.toast.failed).toHaveBeenCalledWith('코드 중복');
  });

  it('보상이 비어있으면 toast.failed 호출', () => {
    render(<AddCoupon handler={handler} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText('쿠폰 이름'), { target: { value: '테스트' } });
    fireEvent.change(screen.getByPlaceholderText('쿠폰 코드'), { target: { value: 'CODE1' } });
    fireEvent.click(screen.getByText('추가'));

    expect(handler.toast.failed).toHaveBeenCalledWith('보상 필수');
  });
});
