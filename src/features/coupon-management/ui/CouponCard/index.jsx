import { useRef, useState } from 'react';
import styled from 'styled-components';
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
    <Card $isActive={data.is_active}>
      <div>
        <TitleBox>
          <Title $isActive={data.is_active}>{data.name}</Title>
          {isLogin && permission && (
            <ModifyBox>
              <ModifyButton onClick={buttonHandler.edit}>
                <EditButtonSVG />
              </ModifyButton>
              <DeleteButton onClick={buttonHandler.del}>
                <DeleteButtonSVG />
              </DeleteButton>
            </ModifyBox>
          )}
        </TitleBox>
        <Reward $isActive={data.is_active}>{data.description}</Reward>
      </div>
      <div>
        <CodeBox $isActive={data.is_active}>
          <Code $isActive={data.is_active}>{data.code}</Code>
          <CopyButton onClick={copyHandler}>
            <CopyButtonSVG />
          </CopyButton>
        </CodeBox>
        <ExpiresAt $isActive={data.is_active}>
          {!data.is_active ? `만료` : data.expires_at ? `${expiresAt}` : `영구`}
        </ExpiresAt>
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
    </Card>
  );
}

const Button = styled.button`
  cursor: pointer;
  color: rgb(107, 114, 128);
  transition: color 0.2s;
  &:hover {
    color: rgb(17, 24, 39);
  }
`;
const InnerIcon = styled.div`
  & svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) => (!props.$isActive ? '#44444E' : '#fff')};
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  box-sizing: border-box;
  padding: 1.5rem;
  transition: transform 0.2s;
`;
const TitleBox = styled(InnerIcon)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;
const Title = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: ${(props) => (!props.$isActive ? '#D3DAD9' : 'rgb(17, 24, 39)')};
`;
const ModifyBox = styled.div`
  display: flex;
  height: 2rem;
  gap: 0.25rem;
`;
const ModifyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 0.5rem;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
const DeleteButton = styled(ModifyButton)`
  &:hover {
    color: rgb(211, 47, 47);
  }
`;
const Reward = styled.p`
  font-size: 0.875rem;
  color: ${(props) => (!props.$isActive ? '#D3DAD9' : 'rgb(107, 114, 128)')};
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;
const CodeBox = styled(InnerIcon)`
  display: flex;
  align-items: center;
  background-color: ${(props) => (!props.$isActive ? '#D3DAD9' : '#fff')};
  border: ${(props) => (!props.$isActive ? 'none' : '1px dashed #e5e7eb')};
  border-radius: 0.5rem;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
`;
const Code = styled.p`
  margin: 0;
  font-size: 1rem;
  flex: 1 1 0%;
  color: ${(props) =>
    !props.$isActive ? 'rgb(60, 60, 60)' : 'rgb(79, 70, 229)'};
  font-weight: 600;
`;
const CopyButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
`;
const ExpiresAt = styled.div`
  font-size: 0.75rem;
  /* color: rgb(107, 114, 128); */
  color: ${(props) =>
    !props.$isActive ? 'rgb(211, 47, 47);' : 'rgb(107, 114, 128)'};
`;
