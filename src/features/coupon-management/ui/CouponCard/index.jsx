import { useRef, useState } from 'react';
import * as Styled from './CouponCard.styled';
import Modal from '@/shared/ui/Modal';
import EditCoupon from '../EditCoupon';
import DeleteCoupon from '../DeleteCoupon';
import { CopyButtonSVG, DeleteButtonSVG, EditButtonSVG } from '@/shared/ui/SVG';

export default function CouponCard({ data, isLogin, permission, handler }) {
  const [showModal, setModal] = useState(false);
  const mod = useRef();

  let expiresAt = null;

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
    const toastInfo = {
      isShow: true,
      message: null,
      status: null,
    };
    try {
      navigator.clipboard.writeText(data.code);
      toastInfo.message = `쿠폰 코드가 복사되었습니다.`;
      toastInfo.status = 'successed';
    } catch (err) {
      toastInfo.message = `복사는 pc환경을 이용해주세요`;
      toastInfo.status = 'alert';
    } finally {
      handler.toast.show(toastInfo);
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
          {!data.is_active ? `만료` : data.expires_at ? `${expiresAt}` : `영구`}
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
