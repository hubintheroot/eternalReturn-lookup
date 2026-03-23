import { useTranslation } from 'react-i18next';
import { getCoupons, supabase } from '@/shared/api/supabase';
import { couponSort } from '@/shared/lib/utils';
import CouponForm from '../CouponForm';

async function update(nextData, id) {
  try {
    const { data, error } = await supabase()
      .from('Coupons')
      .update(nextData)
      .eq('id', id)
      .select();
    if (error) throw error;
    const coupons = await getCoupons();

    return { ok: true, data: couponSort(coupons.data), editData: data };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.error('edit coupon error:', err);
    }
    return { ok: false, data: null, message: err.message };
  }
}

export default function EditCoupon({ handler, onClose, data }) {
  const { t } = useTranslation('coupon');
  const editCoupon = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const name = formData.coupon_name;
    const code = formData.coupon_code;
    const reward = formData.coupon_reward;
    const expiresAt = formData.coupon_expiresAt;

    if (!name.trim()) {
      handler.toast.failed(t('validation.nameRequired'));
      return;
    } else if (!code.trim()) {
      handler.toast.failed(t('validation.codeRequired'));
      return;
    } else if (code.replace(/[a-zA-Z0-9]/g, '').length !== 0) {
      handler.toast.failed(t('validation.codeInvalid'));
      return;
    } else if (handler.isDuplicatedCoupon(code) && !data.code === code) {
      handler.toast.failed(t('validation.codeDuplicate'));
      return;
    } else if (!reward.trim()) {
      handler.toast.failed(t('validation.rewardRequired'));
      return;
    } else if (formData.coupon_noExpiry !== 'on' && !expiresAt) {
      handler.toast.failed(t('validation.expiresAtRequired'));
      return;
    }

    const nextData = {
      name: name,
      code: code.toUpperCase(),
      description: reward,
      expires_at:
        expiresAt === undefined ? null : new Date(expiresAt).toISOString(),
      is_active: true,
    };

    const res = await update(nextData, data.id);
    if (res.ok) {
      if (res.editData.length === 0)
        handler.toast.alert(t('edit.noPermission'));
      else {
        handler.toast.success(t('edit.success'));
        handler.setData(res.data);
      }
      onClose();
    } else {
      handler.toast.failed(t('error.unknown'));
      if (import.meta.env.DEV) {
        console.error(res.message);
      }
    }
  };

  return (
    <CouponForm
      text={{
        title: t('edit.title'),
        sub: t('edit.subtitle'),
        button: t('edit.submit'),
      }}
      onSubmit={editCoupon}
      onClose={onClose}
      data={data}
    />
  );
}
