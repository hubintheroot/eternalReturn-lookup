import * as Styled from './Root.styled';
import Modal from "../common/components/Modal";
import Button from "../common/ui/Button";
import UserInfo from "./userInfo";
import { useAuth } from "@/shared/lib/AuthProvider";
import { useDispatch } from "react-redux";
import { setUser } from "../features/login/userInfoSlice";
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
      if (import.meta.env.DEV) {
        console.error('Login failed:', error);
      }
    }
  }, [signIn]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Logout failed:', error);
      }
    }
  }, [signOut]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Styled.Page>
      <Styled.Header>
        <Styled.HeaderInner>
          <Styled.StyledNav info={links}></Styled.StyledNav>
          {/* TODO: myProfile, LogOut 모달로 옮겨서 공간확보하기 */}
          {user ? (
            <Styled.UserBox>
              <Button eventHandler={showUserInfo} text="프로필">
                <UserSVG />
              </Button>
              <Button eventHandler={handleLogout} text="로그아웃">
                <LogoutSVG />
              </Button>
            </Styled.UserBox>
          ) : (
            <KakaoLoginButton loginHandler={handleLogin} />
          )}
        </Styled.HeaderInner>
      </Styled.Header>
      <Styled.SurveyContainer>
        <Styled.FeedbackContainer
          href="https://forms.gle/hXXEEMWiiXeicxq2A"
          target="_blank"
          rel="noreferrer"
        >
          <FeedbackSVG />
          <span>피드백 설문하러 가기</span>
        </Styled.FeedbackContainer>
      </Styled.SurveyContainer>
      <Styled.Content />
      {showModal && (
        <Modal>
          <UserInfo
            onClose={hideUserInfo}
            data={user?.user_metadata}
          ></UserInfo>
        </Modal>
      )}
    </Styled.Page>
  );
}
