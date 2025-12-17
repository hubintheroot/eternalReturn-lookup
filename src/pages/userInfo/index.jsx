import * as Styled from './userInfo.styled';
import { useAuth } from '@/shared/lib/AuthProvider';
import Button from '@/shared/ui/Button';
import { XIconSVG } from '@/shared/ui/SVG';

export default function UserInfo({ onClose, data }) {
  const { deleteAccount } = useAuth();

  const resign = async () => {
    if (
      window.confirm(
        '\n탈퇴 시 등록한 쿠폰을 관리할 수 없게 됩니다.\n정말 탈퇴하시겠습니까?'
      )
    ) {
      try {
        await deleteAccount();
        onClose();
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Account deletion failed:', error);
        }
        alert('탈퇴 처리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.CloseBox>
          <Button eventHandler={onClose}>
            <XIconSVG />
          </Button>
        </Styled.CloseBox>
        <h2>실험체 정보</h2>
        <p>실험체의 정보를 조회합니다.</p>
      </Styled.Header>
      <div>
        <Styled.InfoBox>
          <Styled.ImgContainer>
            <Styled.ImgBox>
              <img
                src={data.avatar_url.replace('http:', 'https:')}
                alt="kakao profile"
              />
            </Styled.ImgBox>
          </Styled.ImgContainer>
          <Styled.Info>
            <Styled.SubTitle>닉네임</Styled.SubTitle>
            <Styled.Text>{data.user_name}</Styled.Text>
          </Styled.Info>
          <Styled.Info>
            <Styled.SubTitle>이메일</Styled.SubTitle>
            <Styled.Text>{data.email}</Styled.Text>
          </Styled.Info>
        </Styled.InfoBox>
        <Styled.ResignBox>
          <Button
            eventHandler={resign}
            text={'탈퇴하기'}
            color={'#fff'}
            hoverColor={'none'}
            backgroundColor={'#000'}
            hoverBackgroundColor={'rgb(51, 51, 51)'}
            display={'block'}
          />
        </Styled.ResignBox>
      </div>
    </Styled.Container>
  );
}
