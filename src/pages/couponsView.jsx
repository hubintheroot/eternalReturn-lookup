import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getCoupons } from "../supabase/supabase";
import styled from "styled-components";
import CouponCard from "../components/CouponCard";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import AddCoupon from "../components/Coupon/AddCoupon";
import { couponSort } from "../util/utils";
import { LocalData } from "../util/localData";
// TODO: MUI쓰자..
export default function CouponsView() {
  const user = useSelector((state) => state.userInfo.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({
    isShow: false,
    message: null,
    status: null,
  });
  const timerRef = useRef(null);

  useEffect(() => {
    // TODO: isUsed와 isActive로 사용됨과 만료됨을 처리하자
    const getData = async () => {
      try {
        const coupons = await getCoupons();
        const localData = LocalData.get("Personalization").filter(
          (item) => item.is_used
        );

        localData.forEach((nextData) => {
          for (let i in coupons.data) {
            if (nextData.code === coupons.data[i].code) {
              coupons.data[i] = nextData;
            }
          }
        });

        const nextData = couponSort(coupons.data);
        setData(nextData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  const isUsedHandler = (usedCoupon) => {
    const nextData = setCouponUsed(data, usedCoupon);
    setData(nextData);
  };

  const toastHandler = {
    show: (nextData) => {
      setToast({ isShow: true, ...nextData, timer: timerRef });
    },
    hide: () => {
      setToast({
        isShow: false,
        message: "",
        status: "failed",
        timer: timerRef,
      });
    },
    alert: function (message) {
      this.show({ message: message, status: "alert" });
    },
    success: function (message) {
      this.show({ message: message, status: "successed" });
    },
    failed: function (message) {
      this.show({ message: message, status: "failed" });
    },
  };

  const modalHandler = {
    show: () => setShowModal(true),
    hide: () => setShowModal(false),
  };

  // TODO: 구현 목록
  // 1. supabase에서 쿠폰 데이터 가져오기 (완)
  // 2. 쿠폰 등록 구현 (완)
  // 3. 종료된 쿠폰은 아래로 정렬하기 필요 (완)
  // TODO: 복사 구현
  // 1. 복사 하기 (완)
  // 2. toast 알림 portal 사용하기 (완)
  // 3. toast가 일정 시간 후 unmount되게 만들어야함 (완)
  // TODO: 회원 기능
  // 1. 회원 가입 기능 KAKAO OAuth 2.0을 통해 구현 (완)
  // 2. 쿠폰 등록 기능 구현 (완)
  // 3. 회원 페이지 (완)
  // 3. 회원 탈퇴 기능 구현 (완)
  function isDuplicatedCoupon(newCoupon) {
    return data.some((old) => old.code === newCoupon.toUpperCase());
  }

  return (
    <div>
      <div>
        <Title>쿠폰 리스트</Title>
      </div>
      {loading ? (
        <Section>
          <div>loading...</div>
        </Section>
      ) : (
        <Section>
          {data.length !== 0 ? (
            <Ol>
              {data.map((coupon) => (
                <CouponCard
                  key={coupon.id}
                  data={coupon}
                  isLogin={user ? true : false}
                  permission={user?.id === coupon.created_by}
                  handler={{
                    setData: setData,
                    isDuplicatedCoupon: isDuplicatedCoupon,
                    isUsed: isUsedHandler,
                    toast: toastHandler,
                  }}
                />
              ))}
            </Ol>
          ) : (
            <div>등록된 쿠폰이 없어요!</div>
          )}
        </Section>
      )}
      {user && <CouponAdd onClick={modalHandler.show}>쿠폰 등록</CouponAdd>}
      {showModal && (
        <Modal>
          <AddCoupon
            handler={{
              setData: setData,
              isDuplicatedCoupon: isDuplicatedCoupon,
              toast: toastHandler,
            }}
            onClose={modalHandler.hide}
          />
        </Modal>
      )}
      {toast.isShow && <Toast data={toast} handler={toastHandler} />}
    </div>
  );
}

function setCouponUsed(oldData, usedCoupon = null) {
  const tempData = [...oldData];
  const tempCoupon = { ...usedCoupon };
  const index = tempData.indexOf(usedCoupon);
  tempCoupon.is_used = true;
  tempData[index] = tempCoupon;
  const nextData = couponSort(tempData);
  LocalData.set("Personalization", nextData);
  return nextData;
}

const Section = styled.section`
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    max-width: 960px;
  }
`;
const CouponAdd = styled.div`
  width: 128px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 100px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 4px;
  padding: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translate(-50%, 0);
`;
const Ol = styled.ol`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-items: center;
    gap: 1rem;
  }
`;
const Title = styled.h2`
  text-align: center;
`;
