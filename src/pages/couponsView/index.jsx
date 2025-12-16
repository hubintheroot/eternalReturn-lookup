import { useEffect, useRef, useState } from 'react';
import { useUserInfoStore } from '@/entities/user/store';
import { getCoupons } from '@/shared/api/supabase';
import styled from 'styled-components';
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
    <Section>
      <TitleContainer>
        <TitleBox>
          <GiftIconBox>
            <GiftBoxSVG />
          </GiftIconBox>
          <Title>쿠폰</Title>
        </TitleBox>
        <AddButton onClick={addCouponHandler}>
          <PlusIconSVG />
          쿠폰 추가
        </AddButton>
      </TitleContainer>
      {loading ? (
        <Container>
          {/* TODO: 로딩 인터랙션 UI 구현하기 */}
          <div>쿠폰 찾는 중...</div>
        </Container>
      ) : (
        <Container>
          {data.length !== 0 ? (
            <>
              <h2>사용 가능한 쿠폰</h2>
              <CouponContainer>
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
              </CouponContainer>
              <h2>만료된 쿠폰</h2>
              <CouponContainer>
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
              </CouponContainer>
            </>
          ) : (
            <EmptyContainer>
              <p>아직 등록된 쿠폰이 없습니다</p>
            </EmptyContainer>
          )}
        </Container>
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
    </Section>
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

const GiftIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: rgb(79, 70, 229);
  color: #fff;
  border-radius: 0.5rem;
`;
const Section = styled.section`
  position: relative;
  padding: 1rem 1.5rem;
  background-color: rgb(248, 249, 250);
  min-height: calc(100vh - 64px - 64px);
`;
const Container = styled.div`
  @media screen and (min-width: 768px) {
    margin: 0 auto;
    max-width: 80rem;
  }
`;
const EmptyContainer = styled(Container)`
  & > p {
    text-align: center;
    padding: 1rem;
    color: rgb(100, 116, 139);
    border: 1px solid rgb(226, 232, 240);
    border-radius: 0.375rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
    max-width: 960px;
  }
`;
const TitleContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgb(51, 51, 51);
  }
`;
const CouponContainer = styled.div`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;
const Title = styled.h2`
  text-align: center;
`;
