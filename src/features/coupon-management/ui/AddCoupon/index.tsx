import { useTranslation } from 'react-i18next';
import { getCoupons, supabase } from '@/shared/api/supabase';
import { couponSort } from '@/shared/lib/utils';
import CouponForm from '../CouponForm';
import type { Coupon, CouponHandler, CouponInsert } from '@/shared/types';

type InsertResult = {
  ok: true;
  data: Coupon[];
} | {
  ok: false;
  data: null;
};

async function insert(nextData: CouponInsert): Promise<InsertResult> {
  try {
    const { error } = await supabase().from('Coupons').insert(nextData);
    if (error) throw error;

    const coupons = await getCoupons();

    return { ok: true, data: couponSort(coupons.data ?? []) };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('add coupon error:', err);
    }
    return { ok: false, data: null };
  }
}

interface AddCouponProps {
  handler: Omit<CouponHandler, 'isUsed'>;
  onClose: () => void;
}

export default function AddCoupon({ handler, onClose }: AddCouponProps) {
  const { t } = useTranslation('coupon');
  const addCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    const name = formData.coupon_name as string;
    const code = formData.coupon_code as string;
    const reward = formData.coupon_reward as string;
    const expiresAt = formData.coupon_expiresAt as string | undefined;

    if (!name.trim()) {
      handler.toast.failed(t('validation.nameRequired'));
      return;
    } else if (!code.trim()) {
      handler.toast.failed(t('validation.codeRequired'));
      return;
    } else if (code.replace(/[a-zA-Z0-9]/g, '').length !== 0) {
      handler.toast.failed(t('validation.codeInvalid'));
      return;
    } else if (handler.isDuplicatedCoupon(code)) {
      handler.toast.failed(t('validation.codeDuplicate'));
      return;
    } else if (!reward.trim()) {
      handler.toast.failed(t('validation.rewardRequired'));
      return;
    } else if (formData.coupon_noExpiry !== 'on' && !expiresAt) {
      handler.toast.failed(t('validation.expiresAtRequired'));
      return;
    }

    const nextData: CouponInsert = {
      name: name,
      code: code.toUpperCase(),
      description: reward,
      expires_at:
        expiresAt === undefined ? null : new Date(expiresAt).toISOString(),
      is_active: true,
    };

    const res = await insert(nextData);
    if (res.ok) {
      handler.toast.success(t('add_modal.success'));
      handler.setData(res.data);
      onClose();
    } else {
      handler.toast.failed(t('error.unknown'));
    }
  };
  return (
    <CouponForm
      text={{
        title: t('add_modal.title'),
        sub: t('add_modal.subtitle'),
        button: t('add_modal.submit'),
      }}
      onSubmit={addCoupon}
      onClose={onClose}
    />
  );
}
