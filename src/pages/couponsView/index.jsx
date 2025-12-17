import * as Styled from './couponsView.styled';
import { useEffect, useRef, useState } from 'react';
import { useUserInfoStore } from '@/entities/user/store';
import { getCoupons } from '@/shared/api/supabase';
import CouponCard from '@/features/coupon-management/ui/CouponCard';
import Modal from '@/shared/ui/Modal';
import Toast from '@/shared/ui/Toast';
import AddCoupon from '@/features/coupon-management/ui/AddCoupon';
import { couponSort } from '@/shared/lib/utils';
import { LocalData } from '@/shared/lib/localData';
import { GiftBoxSVG, PlusIconSVG } from '@/shared/ui/SVG';

export default function CouponsView() {
  const user = useUserInfoStore((state) => state.user);
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
    const getData = async () => {
      try {
        const coupons = await getCoupons();
        // const coupons = [];
        if (coupons) {
          const nextData = couponSort(coupons.data);
          setData(nextData);
        }
        setLoading(false);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error(err);
        }
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
        message: '',
        status: 'failed',
        timer: timerRef,
      });
    },
    alert: function (message) {
      this.show({ message: message, status: 'alert' });
    },
    success: function (message) {
      this.show({ message: message, status: 'successed' });
    },
    failed: function (message) {
      this.show({ message: message, status: 'failed' });
    },
  };

  const modalHandler = {
    show: () => setShowModal(true),
    hide: () => setShowModal(false),
  };

  const addCouponHandler = () => {
    if (user) {
      modalHandler.show();
    } else {
      toastHandler.alert('로그인이 필요합니다.');
    }
  };

  function isDuplicatedCoupon(newCoupon) {
    return data.some((old) => old.code === newCoupon.toUpperCase());
  }

  return (
    <Styled.Section>
      <Styled.TitleContainer>
        <Styled.TitleBox>
          <Styled.GiftIconBox>
            <GiftBoxSVG />
          </Styled.GiftIconBox>
          <Styled.Title>쿠폰</Styled.Title>
        </Styled.TitleBox>
        <Styled.AddButton onClick={addCouponHandler}>
          <PlusIconSVG />
          쿠폰 추가
        </Styled.AddButton>
      </Styled.TitleContainer>
      {loading ? (
        <Styled.Container>
          {/* TODO: 로딩 인터랙션 UI 구현하기 */}
          <div>쿠폰 찾는 중...</div>
        </Styled.Container>
      ) : (
        <Styled.Container>
          {data.length !== 0 ? (
            <>
              <h2>사용 가능한 쿠폰</h2>
              <Styled.CouponContainer>
                {data
                  .filter((coupon) => coupon.is_active)
                  .map((coupon) => (
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
              </Styled.CouponContainer>
              <h2>만료된 쿠폰</h2>
              <Styled.CouponContainer>
                {data
                  .filter((coupon) => !coupon.is_active)
                  .map((coupon) => (
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
              </Styled.CouponContainer>
            </>
          ) : (
            <Styled.EmptyContainer>
              <p>아직 등록된 쿠폰이 없습니다</p>
            </Styled.EmptyContainer>
          )}
        </Styled.Container>
      )}
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
    </Styled.Section>
  );
}

function setCouponUsed(oldData, usedCoupon = null) {
  const tempData = [...oldData];
  const tempCoupon = { ...usedCoupon };
  const index = tempData.indexOf(usedCoupon);
  tempCoupon.is_used = true;
  tempData[index] = tempCoupon;
  const nextData = couponSort(tempData);
  LocalData.set('Personalization', nextData);
  return nextData;
}
