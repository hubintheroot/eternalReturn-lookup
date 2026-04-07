import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CouponForm from '../CouponForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const map: Record<string, string> = {
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
  default: (props: { placeholderText?: string }) => (
    <input placeholder={props.placeholderText} data-testid="datepicker" />
  ),
  registerLocale: vi.fn(),
}));

vi.mock('date-fns/locale/ko', () => ({ ko: {} }));
vi.mock('date-fns/locale/en-US', () => ({ enUS: {} }));
vi.mock('date-fns/locale/ja', () => ({ ja: {} }));

describe('CouponForm', () => {
  const defaultText = { title: '쿠폰 추가', sub: '새 쿠폰을 추가합니다', button: '추가' };

  it('제목, 부제, 제출 버튼을 렌더링한다', () => {
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={vi.fn()} />
    );
    expect(screen.getByText('쿠폰 추가')).toBeInTheDocument();
    expect(screen.getByText('새 쿠폰을 추가합니다')).toBeInTheDocument();
    expect(screen.getByText('추가')).toBeInTheDocument();
  });

  it('이름, 코드, 보상 입력 필드가 있다', () => {
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={vi.fn()} />
    );
    expect(screen.getByPlaceholderText('쿠폰 이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('쿠폰 코드')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('보상')).toBeInTheDocument();
  });

  it('"만료 없음" 체크박스가 기본 체크 상태이다 (data 없을 때)', () => {
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={vi.fn()} />
    );
    const checkbox = screen.getByLabelText('만료 없음') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('"만료 없음" 체크 해제 시 DatePicker가 나타난다', () => {
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={vi.fn()} />
    );
    const checkbox = screen.getByLabelText('만료 없음');
    fireEvent.click(checkbox);
    expect(screen.getByTestId('datepicker')).toBeInTheDocument();
  });

  it('data prop이 있으면 입력 필드에 기본값이 채워진다', () => {
    const data = {
      id: 1,
      code: 'ABC123',
      name: '기존 쿠폰',
      description: '기존 보상',
      is_active: true,
      expires_at: '2024-12-01T00:00:00Z',
      created_by: 'admin',
    };
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={vi.fn()} data={data} />
    );
    expect(screen.getByDisplayValue('기존 쿠폰')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ABC123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('기존 보상')).toBeInTheDocument();
  });

  it('닫기 버튼 클릭 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    render(
      <CouponForm text={defaultText} onSubmit={vi.fn()} onClose={onClose} />
    );
    // XIconSVG가 있는 닫기 버튼
    const closeButton = screen.getAllByRole('button')[0]!;
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('폼 제출 시 onSubmit이 호출된다', () => {
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault());
    render(
      <CouponForm text={defaultText} onSubmit={onSubmit} onClose={vi.fn()} />
    );
    fireEvent.click(screen.getByText('추가'));
    expect(onSubmit).toHaveBeenCalledOnce();
  });
});
