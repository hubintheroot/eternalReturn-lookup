import Navigate from "../common/components/Navigate";
import Modal from "../common/components/Modal";
import Button from "../common/ui/Button";
import UserInfo from "./userInfo";
import { styled } from "styled-components";
import { useAuth } from "@/shared/lib/AuthProvider";
import { useDispatch } from "react-redux";
import { setUser } from "../features/login/userInfoSlice";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { KakaoLoginButton } from "../common/ui/kakao";
import { FeedbackSVG, LogoutSVG, UserSVG } from "../common/ui/SVG";

const links = [
  { link: "/news", text: "새소식" },
  { link: "/coupons", text: "쿠폰" },
  { link: "/characters", text: "실험체" },
  { link: "/rank", text: "랭크" },
];

/**
 * AuthProvider의 상태를 Redux와 동기화하는 Hook
 */
function useSyncAuthToRedux() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    // AuthProvider의 user 상태를 Redux와 동기화
    dispatch(setUser(user));
  }, [user, dispatch]);
}

export default function Root() {
  const { user, signIn, signOut, loading } = useAuth();
  const [showModal, setModal] = useState(false);

  // AuthProvider와 Redux 동기화
  useSyncAuthToRedux();

  const showUserInfo = useCallback(() => {
    setModal(true);
  }, []);
  const hideUserInfo = useCallback(() => {
    setModal(false);
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      await signIn('kakao');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, [signIn]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [signOut]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Page>
      <Header>
        <HeaderInner>
          <StyledNav info={links}></StyledNav>
          {/* TODO: myProfile, LogOut 모달로 옮겨서 공간확보하기 */}
          {user ? (
            <UserBox>
              <Button eventHandler={showUserInfo} text="프로필">
                <UserSVG />
              </Button>
              <Button eventHandler={handleLogout} text="로그아웃">
                <LogoutSVG />
              </Button>
            </UserBox>
          ) : (
            <KakaoLoginButton loginHandler={handleLogin} />
          )}
        </HeaderInner>
      </Header>
      <SurveyContainer>
        <FeedbackContainer
          href="https://forms.gle/hXXEEMWiiXeicxq2A"
          target="_blank"
          rel="noreferrer"
        >
          <FeedbackSVG />
          <span>피드백 설문하러 가기</span>
        </FeedbackContainer>
      </SurveyContainer>
      <Content />
      {showModal && (
        <Modal>
          <UserInfo
            onClose={hideUserInfo}
            data={user?.user_metadata}
          ></UserInfo>
        </Modal>
      )}
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  position: relative;
`;
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    max-width: 80rem;
    margin: 0 auto;
  }
`;
const StyledNav = styled(Navigate)`
  margin-right: 45px;
`;
const SurveyContainer = styled.div`
  position: sticky;
  top: 64px;
  z-index: 41;
  width: 100%;
  background-color: #73d3b2;
`;
const FeedbackContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  gap: 0.5rem;

  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: rgba(158, 3, 179, 0.8);
    }
  }
`;
const Content = styled(Outlet)`
  height: calc(100vh - 64px);
`;
const UserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
  @media screen and (min-width: 768px) {
    gap: 1rem;
    margin-right: 1rem;
  }
`;
