import { useTranslation } from 'react-i18next';
import * as Styled from './DeleteCoupon.styled';
import { getCoupons, supabase } from '@/shared/api/supabase';
import { couponSort, formatDate } from '@/shared/lib/utils';
import Button from '@/shared/ui/Button';
import { XIconSVG } from '@/shared/ui/SVG';
import type { Coupon, CouponHandler } from '@/shared/types';
import { useState } from 'react';

type DeleteResult =
  | {
      ok: true;
      data: Coupon[];
    }
  | {
      ok: false;
      data: null;
    };

async function del(id: number): Promise<DeleteResult> {
  try {
    const { error } = await supabase().from('Coupons').delete().eq('id', id);
    if (error) throw error;

    const coupons = await getCoupons();

    return { ok: true, data: couponSort(coupons.data ?? []) };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('delete coupon error:', err);
    }
    return { ok: false, data: null };
  }
}

interface DeleteCouponProps {
  handler: Omit<CouponHandler, 'isUsed'>;
  onClose: () => void;
  data: Coupon;
}

export default function DeleteCoupon({
  handler,
  onClose,
  data,
}: DeleteCouponProps) {
  const [processing, setProcessing] = useState(false);
  const { t } = useTranslation('coupon');
  const deleteCoupon = async () => {
    if (window.confirm(t('delete.confirm'))) {
      setProcessing(true);
      try {
        const res = await del(data.id);
        if (res.ok) {
          handler.toast.success(t('delete.success'));
          handler.setData(res.data);
        } else {
          handler.toast.failed(t('error.unknown'));
        }
      } finally {
        setProcessing(false);
        onClose();
      }
    }
  };
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.CloseBox>
          <Button eventHandler={onClose}>
            <XIconSVG />
          </Button>
        </Styled.CloseBox>
        <h2>{t('delete.title')}</h2>
        <p>{t('delete.subtitle')}</p>
      </Styled.Header>
      <div>
        <Styled.InfoBox>
          <Styled.Info>
            <Styled.SubTitle>{t('delete.codeLabel')}</Styled.SubTitle>
            <Styled.Text>{data.code}</Styled.Text>
          </Styled.Info>
          <Styled.Info>
            <Styled.SubTitle>{t('delete.rewardLabel')}</Styled.SubTitle>
            <Styled.Text>{data.description}</Styled.Text>
          </Styled.Info>
          <Styled.Info>
            <Styled.SubTitle>{t('delete.expiresAtLabel')}</Styled.SubTitle>
            <Styled.Text>
              {data.expires_at
                ? formatDate(new Date(data.expires_at), false).replace('T', ' ')
                : t('permanent')}
            </Styled.Text>
          </Styled.Info>
        </Styled.InfoBox>
        <Styled.DeleteBox>
          <Button
            eventHandler={deleteCoupon}
            text={t('delete.submit')}
            color={'#fff'}
            hoverColor={'none'}
            backgroundColor={'#000'}
            hoverBackgroundColor={'rgb(51, 51, 51)'}
            disabled={processing}
          />
        </Styled.DeleteBox>
      </div>
    </Styled.Container>
  );
}
