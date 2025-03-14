import styled from "styled-components";
import { getCoupons, supabase } from "../../supabase/supabase";
import { LocalData } from "../../util/localData";
import { couponSort } from "../../util/utils";
import Button from "../ui/Button";
import { XIconSVG } from "../ui/SVG";

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
    <Container>
      <Header>
        <CloseBox>
          <Button eventHandler={onClose}>
            <XIconSVG />
          </Button>
        </CloseBox>
        <h2>쿠폰 정보</h2>
        <p>삭제할 쿠폰 정보를 조회합니다.</p>
      </Header>
      <div>
        <InfoBox>
          <Info>
            <SubTitle>쿠폰코드</SubTitle>
            <Text>{data.code}</Text>
          </Info>
          <Info>
            <SubTitle>보상</SubTitle>
            <Text>{data.description}</Text>
          </Info>
          <Info>
            <SubTitle>만료일</SubTitle>
            <Text>{data.expires_at || "영구"}</Text>
          </Info>
        </InfoBox>
        <DeleteBox>
          <Button
            eventHandler={deleteCoupon}
            text={"제거하기"}
            color={"#fff"}
            hoverColor={"none"}
            backgroundColor={"#000"}
            hoverBackgroundColor={"rgb(51, 51, 51)"}
            display={"block"}
          />
        </DeleteBox>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: calc(100% - 2.5rem);
  max-width: 28rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1rem;
  word-break: keep-all;
  @media screen and (min-width: 768px) {
    width: 100%;
  }
`;
const Header = styled.div`
  text-align: center;
  & > h2 {
    font-weight: 600;
    font-size: 1.25rem;
    line-height: 1.25rem;
    margin: 0 0 0.5rem;
    padding: 0;
  }
  & > p {
    font-size: 0.9rem;
    margin: 0;
    padding: 0;
    color: rgb(113, 113, 122);
  }
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  /* justify-content: space-between; */
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px;
  border-style: solid;
  border-color: #e5e5e8;
`;
const SubTitle = styled.span`
  color: rgb(113, 113, 122);
  line-height: 1rem;
  font-size: 1rem;
`;
const Text = styled.span`
  line-height: 0.8rem;
  font-size: 0.8rem;
  @media screen and(min-width: 768px) {
    line-height: 1rem;
    font-size: 1rem;
  }
`;
const ButtonBox = styled.div`
  display: flex;
`;
const CloseBox = styled(ButtonBox)`
  justify-content: flex-end;
`;
const DeleteBox = styled(ButtonBox)`
  justify-content: center;
  padding: 1rem 0;
`;
