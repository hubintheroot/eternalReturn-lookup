import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import { enUS } from 'date-fns/locale/en-US';
import { ja } from 'date-fns/locale/ja';
import { parse, isValid } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import * as Styled from './CouponForm.styled';
import { XIconSVG } from '@/shared/ui/SVG';
import type { Coupon } from '@/shared/types';

registerLocale('ko', ko);
registerLocale('en', enUS);
registerLocale('ja', ja);

interface CouponFormText {
  title: string;
  sub: string;
  button: string;
}

interface CouponFormProps {
  text: CouponFormText;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onClose: () => void;
  data?: Coupon;
}

export default function CouponForm({
  text,
  onSubmit,
  onClose,
  data,
}: CouponFormProps) {
  const { t, i18n } = useTranslation('coupon');
  const locale = i18n.language; // 'ko' | 'en' | 'ja'

  const [noExpiry, setNoExpiry] = useState(data?.expires_at ? false : true);
  const [expiryDate, setExpiryDate] = useState<Date>(
    data?.expires_at ? new Date(data.expires_at) : new Date(),
  );
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setExpiryDate(data?.expires_at ? new Date(data.expires_at) : new Date());
  }, [data]);

  const checkHandler = () => {
    setNoExpiry(!noExpiry);
  };

  const handleRawChange = (
    e:
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLElement>
      | undefined,
  ) => {
    const value = (e?.target as HTMLInputElement)?.value;
    if (typeof value !== 'string' || !value) return;
    const fmt = t('form.parseFmt');
    const parsed = parse(value, fmt, new Date());
    if (isValid(parsed)) {
      setExpiryDate(parsed);
    }
  };

  return (
    <Styled.Container>
      <Styled.TitleContainer>
        <div>
          <Styled.Title>{text.title}</Styled.Title>
          <Styled.SubTitle>{text.sub}</Styled.SubTitle>
        </div>
        <Styled.CloseButton onClick={onClose}>
          <XIconSVG />
        </Styled.CloseButton>
      </Styled.TitleContainer>
      <Styled.Form
        onSubmit={async (e) => {
          setProcessing(true);
          try {
            await onSubmit(e);
          } finally {
            setProcessing(false);
          }
        }}
      >
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-name">{t('form.name')}</Styled.Label>
          <Styled.Input
            name="coupon_name"
            id="coupon-name"
            placeholder={t('form.name')}
            defaultValue={data?.name}
          />
        </Styled.InputBox>
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-code">{t('form.code')}</Styled.Label>
          <Styled.Input
            name="coupon_code"
            id="coupon-code"
            placeholder={t('form.code')}
            defaultValue={data?.code}
          />
        </Styled.InputBox>
        <Styled.InputBox>
          <Styled.Label htmlFor="coupon-reward">
            {t('form.reward')}
          </Styled.Label>
          <Styled.Input
            name="coupon_reward"
            id="coupon-reward"
            placeholder={t('form.reward')}
            defaultValue={data?.description}
          />
        </Styled.InputBox>
        <Styled.InputCheckBox>
          <Styled.Input
            onChange={checkHandler}
            type="checkbox"
            name="coupon_noExpiry"
            id="coupon-noExpiry"
            checked={noExpiry}
          />
          <Styled.Label htmlFor="coupon-noExpiry">
            {t('form.neverExpires')}
          </Styled.Label>
        </Styled.InputCheckBox>
        {!noExpiry && (
          <Styled.InputBox>
            <Styled.Label>{t('form.expiresAt')}</Styled.Label>
            {/* form 제출용 hidden input — AddCoupon/EditCoupon의 FormData 파싱과 호환 */}
            <input
              type="hidden"
              name="coupon_expiresAt"
              value={expiryDate ? expiryDate.toISOString() : ''}
            />
            <Styled.DatePickerWrapper>
              <DatePicker
                selected={expiryDate}
                onChange={(date: Date | null) =>
                  setExpiryDate(date ?? new Date())
                }
                onChangeRaw={handleRawChange}
                locale={locale}
                showTimeSelect
                popperPlacement="top-start"
                dateFormat={t('form.dateFormat')}
                timeFormat="HH:mm"
                timeIntervals={30}
                minDate={new Date('2023-07-20')}
                maxDate={new Date('2100-01-01')}
                placeholderText={t('form.datePlaceholder')}
              />
            </Styled.DatePickerWrapper>
          </Styled.InputBox>
        )}
        <Styled.AddButtonBox>
          <Styled.AddButton type="submit" disabled={processing}>
            {text.button}
          </Styled.AddButton>
        </Styled.AddButtonBox>
      </Styled.Form>
    </Styled.Container>
  );
}
