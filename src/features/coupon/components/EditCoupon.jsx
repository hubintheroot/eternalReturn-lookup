import { getCoupons, supabase } from '../../../supabase/supabase';
import { couponSort } from '../../../common/utils/utils';
import CouponForm from './CouponForm';

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
    console.error('edit coupon error:', err);
    return { ok: false, data: null, message: err.message };
  }
}

export default function EditCoupon({ handler, onClose, data }) {
  const editCoupon = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const name = formData.coupon_name;
    const code = formData.coupon_code;
    const reward = formData.coupon_reward;
    const expiresAt = formData.coupon_expiresAt;

    if (!name.trim()) {
      handler.toast.failed('쿠폰 이름을 입력해주세요.');
      return;
    } else if (!code.trim()) {
      handler.toast.failed('쿠폰 코드를 입력해주세요.');
      return;
    } else if (code.replace(/[a-zA-Z0-9]/g, '').length !== 0) {
      handler.toast.failed('정상적인 쿠폰 코드를 입력해주세요.');
      return;
    } else if (handler.isDuplicatedCoupon(code) && !data.code === code) {
      handler.toast.failed('이미 등록된 쿠폰입니다.');
      return;
    } else if (!reward.trim()) {
      handler.toast.failed('보상을 입력해주세요.');
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
        handler.toast.alert('수정 권한이 없습니다.');
      else {
        handler.toast.success('수정되었습니다.');
        handler.setData(res.data);
      }
      onClose();
    } else {
      handler.toast.failed('알 수 없는 에러가 발생했습니다.');
      console.error(res.message);
    }
  };

  return (
    <CouponForm
      text={{
        title: '쿠폰 수정',
        sub: '수정할 쿠폰 정보를 입력하세요.',
        button: '수정하기',
      }}
      onSubmit={editCoupon}
      onClose={onClose}
      data={data}
    />
  );
}
