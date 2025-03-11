import { getCoupons, supabase } from "../../supabase/supabase";
import { LocalData } from "../../util/localData";
import { couponSort } from "../../util/utils";
import CouponForm, { itemList } from "./CouponForm";

async function update(nextData, id) {
  try {
    const { data, error } = await supabase()
      .from("Coupons")
      .update(nextData)
      .eq("id", id)
      .select();
    if (error) throw error;
    const coupons = await getCoupons();
    const usedCoupons = LocalData.get("Personalization").filter(
      (item) => item.is_used
    );

    usedCoupons.forEach((localData) => {
      for (let i in coupons.data) {
        const oldData = coupons.data[i];
        if (localData.code === oldData.code)
          oldData.is_used = localData.is_used;
      }
    });
    LocalData.set("Personalization", coupons.data);

    return { ok: true, data: couponSort(coupons.data), editData: data };
  } catch (err) {
    console.error("edit coupon error:", err);
    return { ok: false, data: null, message: err.message };
  }
}

export default function EditCoupon({ handler, onClose, data }) {
  const editCoupon = async (e) => {
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
    } else if (
      handler.isDuplicatedCoupon(couponCode) &&
      !data.code === couponCode
    ) {
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
    const res = await update(nextData, data.id);
    if (res.ok) {
      if (res.editData.length === 0)
        handler.toast.alert("수정 권한이 없습니다.");
      else {
        handler.toast.success("쿠폰이 수정되었습니다.");
        handler.setData(res.data);
      }
    } else {
      handler.toast.failed(
        "알 수 없는 에러가 발생했습니다. error message:",
        res.message
      );
    }
    onClose();
  };

  return (
    <CouponForm
      title={"쿠폰 수정"}
      onSubmit={editCoupon}
      onClose={onClose}
      data={data}
    />
  );
}
