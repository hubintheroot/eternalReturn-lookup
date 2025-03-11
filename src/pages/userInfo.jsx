import styled from "styled-components";
import { resignHandler } from "../util/login";
import { useDispatch } from "react-redux";
import { setUser } from "../features/loginInfo/userInfoSlice";

export default function UserInfo({ onClose, data }) {
  const dispatch = useDispatch();
  const resign = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
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
        <Close onClick={onClose}>닫기</Close>
        <h2>회원 정보</h2>
      </Header>
      <Section>
        <Infos>
          <Info>
            <Title>E-Mail</Title>
            <span>{data.email}</span>
          </Info>
          <Info>
            <Title>Name</Title>
            <span>{data.user_name}</span>
          </Info>
        </Infos>
        <Resign onClick={resign}>탈퇴하기</Resign>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  width: 300px;
  @media screen and (min-width: 768px) {
    width: 40vw;
  }
`;
const Header = styled.div`
  text-align: center;
`;
const Button = styled.div`
  width: fit-content;
  padding: 8px 16px;
  border: 1px solid #000;
  border-radius: 4px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
`;
const Close = styled(Button)`
  margin-left: auto;
`;
const Resign = styled(Button)`
  margin: 0 auto;
`;
const Section = styled.section`
  padding: 0 2em;
`;
const Infos = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Info = styled.li`
  display: flex;
  flex-direction: row;
  column-gap: 1em;
  margin-bottom: 1em;
`;
const Title = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;
