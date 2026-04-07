import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Styled from './CouponCard.styled';
import Modal from '@/shared/ui/Modal';
import EditCoupon from '../EditCoupon';
import DeleteCoupon from '../DeleteCoupon';
import { CopyButtonSVG, DeleteButtonSVG, EditButtonSVG } from '@/shared/ui/SVG';
import type { Coupon, CouponHandler, ToastStatus } from '@/shared/types';

interface CouponCardProps {
  data: Coupon;
  isLogin: boolean;
  permission: boolean;
  handler: CouponHandler;
}

export default function CouponCard({ data, isLogin, permission, handler }: CouponCardProps) {
  const { t } = useTranslation('coupon');
  const [showModal, setModal] = useState(false);
  const mod = useRef<'edit' | 'del' | undefined>(undefined);

  let expiresAt: string | null = null;

  if (data.expires_at) {
    const date = new Date(data.expires_at);
    expiresAt = `${date.getFullYear().toString()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  const copyHandler = () => {
    const toastInfo: { isShow: boolean; message: string | null; status: ToastStatus | null } = {
      isShow: true,
      message: null,
      status: null,
    };
    try {
      navigator.clipboard.writeText(data.code);
      toastInfo.message = t('copied');
      toastInfo.status = 'successed';
    } catch (err) {
      toastInfo.message = t('copyPcOnly');
      toastInfo.status = 'alert';
    } finally {
      handler.toast.show(toastInfo as { message: string; status: ToastStatus });
    }
  };
  const modalHandler = {
    show: () => {
      setModal(true);
    },
    hide: () => {
      setModal(false);
    },
  };
  const buttonHandler = {
    edit: () => {
      mod.current = 'edit';
      modalHandler.show();
    },
    del: () => {
      mod.current = 'del';
      modalHandler.show();
    },
  };

  return (
    <Styled.Card $isActive={data.is_active}>
      <div>
        <Styled.TitleBox>
          <Styled.Title $isActive={data.is_active}>{data.name}</Styled.Title>
          {isLogin && permission && (
            <Styled.ModifyBox>
              <Styled.ModifyButton onClick={buttonHandler.edit}>
                <EditButtonSVG />
              </Styled.ModifyButton>
              <Styled.DeleteButton onClick={buttonHandler.del}>
                <DeleteButtonSVG />
              </Styled.DeleteButton>
            </Styled.ModifyBox>
          )}
        </Styled.TitleBox>
        <Styled.Reward $isActive={data.is_active}>{data.description}</Styled.Reward>
      </div>
      <div>
        <Styled.CodeBox $isActive={data.is_active}>
          <Styled.Code $isActive={data.is_active}>{data.code}</Styled.Code>
          <Styled.CopyButton onClick={copyHandler}>
            <CopyButtonSVG />
          </Styled.CopyButton>
        </Styled.CodeBox>
        <Styled.ExpiresAt $isActive={data.is_active}>
          {!data.is_active ? t('expired') : data.expires_at ? `${expiresAt}` : t('permanent')}
        </Styled.ExpiresAt>
      </div>
      {showModal && (
        <Modal>
          {mod.current === 'edit' ? (
            <EditCoupon
              onClose={modalHandler.hide}
              data={data}
              handler={handler}
            />
          ) : (
            <DeleteCoupon
              onClose={modalHandler.hide}
              data={data}
              handler={handler}
            />
          )}
        </Modal>
      )}
    </Styled.Card>
  );
}
