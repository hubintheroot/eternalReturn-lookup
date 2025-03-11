import { getCoupons, supabase } from "../../supabase/supabase";
import { LocalData } from "../../util/localData";
import { couponSort } from "../../util/utils";

async function del(id) {
  try {
    const { error } = await supabase().from("Coupons").delete().eq("id", id);
    if (error) throw error;

    const coupons = await getCoupons();
    const usedCoupons = LocalData.get("Personalization").filter(
      (item) => item.is_used
    );

    usedCoupons.forEach((coupon) => {
      for (let i in coupons.data) {
        if (coupon.code === coupons.data[i].code)
          coupons.data[i].is_used = coupon.is_used;
      }
    });

    return { ok: true, data: couponSort(coupons.data) };
  } catch (err) {
    console.error("delete coupon error:", err);
    return { ok: false, data: null };
  }
}

export default function DeleteCoupon({ handler, onClose, data }) {
  //   console.log(data, handler);
  const deleteCoupon = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const res = await del(data.id);
      if (res.ok) {
        handler.toast.success("쿠폰이 삭제되었습니다.");
        handler.setData(res.data);
      } else {
        handler.toast.failed("알 수 없는 에러가 발생했습니다.");
      }
      onClose();
    } else {
      console.log("cancel");
    }
  };
  return (
    <div>
      <div onClick={onClose}>닫기</div>
      <section>
        <div>쿠폰코드: {data.code}</div>
        <div>보상: {data.description}</div>
        <div>기한: {data.expires_at}</div>
        <div onClick={deleteCoupon}>삭제하기</div>
      </section>
    </div>
  );
}
