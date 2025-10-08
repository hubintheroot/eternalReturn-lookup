import styled from "styled-components";
import { resignHandler } from "@/shared/lib/login";
import { useDispatch } from "react-redux";
import { setUser } from "@/entities/user/model/userInfoSlice";
import Button from "@/shared/ui/Button";
import { XIconSVG } from "@/shared/ui/SVG";

export default function UserInfo({ onClose, data }) {
  const dispatch = useDispatch();
  const resign = () => {
    if (
      window.confirm(
        "\n탈퇴 시 등록한 쿠폰을 관리할 수 없게 됩니다.\n정말 탈퇴하시겠습니까?"
      )
    ) {
      resignHandler();
      dispatch(setUser(null));
      onClose();
    } else {
      return;
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
        <h2>실험체 정보</h2>
        <p>실험체의 정보를 조회합니다.</p>
      </Header>
      <div>
        <InfoBox>
          <ImgContainer>
            <ImgBox>
              <img
                src={data.avatar_url.replace("http:", "https:")}
                alt="kakao profile"
              />
            </ImgBox>
          </ImgContainer>
          <Info>
            <SubTitle>닉네임</SubTitle>
            <Text>{data.user_name}</Text>
          </Info>
          <Info>
            <SubTitle>이메일</SubTitle>
            <Text>{data.email}</Text>
          </Info>
        </InfoBox>
        <ResignBox>
          <Button
            eventHandler={resign}
            text={"탈출하기"}
            color={"#fff"}
            hoverColor={"none"}
            backgroundColor={"#000"}
            hoverBackgroundColor={"rgb(51, 51, 51)"}
            display={"block"}
          />
        </ResignBox>
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
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2.5rem;
`;
const ImgBox = styled.span`
  overflow: hidden;
  border-radius: 8rem;
  max-width: 6rem;
  max-height: 6rem;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border: 0;
  border-bottom: 1px;
  border-style: solid;
  border-color: #e5e5e8;
  & span {
    line-height: 1rem;
    font-size: 1rem;
  }
`;
const SubTitle = styled.span`
  color: rgb(113, 113, 122);
`;
const Text = styled.span``;
const ButtonBox = styled.div`
  display: flex;
`;
const CloseBox = styled(ButtonBox)`
  justify-content: flex-end;
`;
const ResignBox = styled(ButtonBox)`
  justify-content: center;
  padding: 1rem 0;
`;
