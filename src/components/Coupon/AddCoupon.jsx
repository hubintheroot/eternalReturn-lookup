import { getCoupons, supabase } from "../../supabase/supabase";
import { LocalData } from "../../util/localData";
import { couponSort } from "../../util/utils";
import CouponForm, { itemList } from "./CouponForm";

async function insert(nextData) {
  try {
    const { error } = await supabase().from("Coupons").insert(nextData);
    if (error) throw error;

    const coupons = await getCoupons();
    const usedCoupons = LocalData.get("personal").filter(
      (item) => item.is_used
    );

    usedCoupons.forEach((coupon) => {
      for (let i in coupons.data) {
        if (coupon.id === coupons.data[i].id)
          coupons.data[i].is_used = coupon.is_used;
      }
    });

    return { ok: true, data: couponSort(coupons.data) };
  } catch (err) {
    console.error("add coupon error:", err);

    return { ok: false, data: null };
  }
}

export default function AddCoupon({ handler, onClose }) {
  const addCoupon = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    const couponCode = formData["coupon-code"];
    const desc = [];
    for (let d in formData) {
      if (formData[d] === "on" && d !== "has-expires") {
        itemList.some((item) => {
          if (item.value === d) {
            desc.push(item.title);
            return true;
          } else {
            return false;
          }
        });
      }
    }
    if (couponCode === "") {
      handler.toast.failed("쿠폰을 입력해주세요.");
      return;
    } else if (couponCode.replace(/[a-zA-Z0-9]/g, "").length !== 0) {
      handler.toast.failed("정상적인 쿠폰 코드를 입력해주세요.");
      return;
    } else if (handler.isDuplicatedCoupon(couponCode)) {
      handler.toast.failed("이미 등록된 쿠폰입니다.");
      return;
    } else if (desc.length === 0) {
      handler.toast.failed("쿠폰 선물을 선택해주세요.");
      return;
    }

    const nextData = {
      code: couponCode.toUpperCase(),
      description: desc.join(", "),
      expires_at:
        formData["expires-at"] === undefined
          ? null
          : new Date(formData["expires-at"]).toISOString(),
      is_active: true,
    };
    const res = await insert(nextData);
    if (res.ok) {
      handler.toast.success("쿠폰이 추가되었습니다.");
      handler.setData(res.data);
    } else {
      handler.toast.failed("알 수 없는 에러가 발생했습니다.");
    }
    onClose();
  };
  return (
    <CouponForm title={"쿠폰 추가"} onSubmit={addCoupon} onClose={onClose} />
  );
}
