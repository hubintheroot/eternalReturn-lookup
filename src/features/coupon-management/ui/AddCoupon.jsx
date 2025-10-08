import { getCoupons, supabase } from '@/shared/api/supabase';
import { couponSort } from '@/shared/lib/utils';
import CouponForm from './CouponForm';

async function insert(nextData) {
  try {
    const { error } = await supabase().from('Coupons').insert(nextData);
    if (error) throw error;

    const coupons = await getCoupons();

    return { ok: true, data: couponSort(coupons.data) };
  } catch (err) {
    console.error('add coupon error:', err);

    return { ok: false, data: null };
  }
}

export default function AddCoupon({ handler, onClose }) {
  const addCoupon = async (e) => {
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
    } else if (handler.isDuplicatedCoupon(code)) {
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

    const res = await insert(nextData);
    if (res.ok) {
      handler.toast.success('쿠폰이 추가되었습니다.');
      handler.setData(res.data);
      onClose();
    } else {
      handler.toast.failed('알 수 없는 에러가 발생했습니다.');
      console.error(res.message);
    }
  };
  return (
    <CouponForm
      text={{
        title: '새 쿠폰 추가',
        sub: '새로운 쿠폰 정보를 입력하세요.',
        button: '추가하기',
      }}
      onSubmit={addCoupon}
      onClose={onClose}
    />
  );
}
