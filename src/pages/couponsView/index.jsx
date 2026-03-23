import * as Styled from './couponsView.styled';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserInfoStore } from '@/entities/user/store';
import { getCoupons } from '@/shared/api/supabase';
import CouponCard from '@/features/coupon-management/ui/CouponCard';
import Modal from '@/shared/ui/Modal';
import Toast from '@/shared/ui/Toast';
import AddCoupon from '@/features/coupon-management/ui/AddCoupon';
import LanguageSwitcher from '@/features/coupon-management/ui/LanguageSwitcher';
import { couponSort } from '@/shared/lib/utils';
import { LocalData } from '@/shared/lib/localData';
import { GiftBoxSVG, PlusIconSVG } from '@/shared/ui/SVG';

export default function CouponsView() {
  const { t } = useTranslation('coupon');
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
      toastHandler.alert(t('loginRequired'));
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
          <Styled.Title>{t('title')}</Styled.Title>
        </Styled.TitleBox>
        <Styled.AddButton onClick={addCouponHandler}>
          <PlusIconSVG />
          {t('add')}
        </Styled.AddButton>
        <LanguageSwitcher />
      </Styled.TitleContainer>
      {loading ? (
        <Styled.Container>
          <div>{t('loading')}</div>
        </Styled.Container>
      ) : (
        <Styled.Container>
          {data.length !== 0 ? (
            <>
              <h2>{t('activeSection')}</h2>
              <Styled.CouponContainer>
                {data
                  .filter((coupon) => coupon.is_active)
                  .map((coupon) => (
                    <CouponCard
                      key={coupon.id}
                      data={coupon}
                      isLogin={!!user}
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
              <Styled.SectionDivider />
              <h2>{t('expiredSection')}</h2>
              <Styled.CouponContainer>
                {getExpiredCoupons(data).map((coupon) => (
                    <CouponCard
                      key={coupon.id}
                      data={coupon}
                      isLogin={!!user}
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
              <p>{t('empty')}</p>
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

function getExpiredCoupons(data) {
  const expired = data.filter((coupon) => !coupon.is_active);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recent = expired.filter((coupon) => new Date(coupon.expires_at) >= sevenDaysAgo);
  if (recent.length > 0) return recent;
  return [...expired]
    .sort((a, b) => new Date(b.expires_at) - new Date(a.expires_at))
    .slice(0, 4);
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
