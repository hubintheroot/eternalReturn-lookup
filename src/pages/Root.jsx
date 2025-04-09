import Navigate from "../components/Navigate";
import Modal from "../components/Modal";
import Button from "../components/ui/Button";
import UserInfo from "./userInfo";
import { supabase } from "../supabase/supabase";
import { styled } from "styled-components";
import { isLogin, loginHandler, logOut, logoutHandler } from "../util/login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/loginInfo/userInfoSlice";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { KakaoLoginButton } from "../components/ui/kakao";
import { FeedbackSVG, LogoutSVG, UserSVG } from "../components/ui/SVG";

const links = [
  { link: "/news", text: "새소식" },
  { link: "/coupons", text: "쿠폰" },
  { link: "/characters", text: "실험체" },
  { link: "/rank", text: "랭크" },
];

function useAuth() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkExistingUser = async () => {
      if (!isLogin) return;
      try {
        const { data: sessionData, error: sessionError } =
          await supabase().auth.getSession();

        if (sessionError) {
          throw sessionError;
        }
        if (sessionData?.session) {
          const { data, error } = await supabase().auth.getUser();
          if (error) throw error;
          if (data?.user) dispatch(setUser(data.user));
        }
      } catch (err) {
        console.error("Auth Error Message:", err.message);
        logOut();
      }
    };

    checkExistingUser();

    const { data: listener } = supabase().auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          dispatch(setUser(session.user));
        } else if (event === "SIGNED_OUT") {
          dispatch(setUser(null));
        }
      }
    );

    return () => {
      if (listener?.subscription?.unsubscribe) {
        listener.subscription.unsubscribe();
      }
    };
  }, [dispatch]);
}

export default function Root() {
  const user = useSelector((state) => state.userInfo.user);
  const [showModal, setModal] = useState(false);

  useAuth();

  const showUserInfo = useCallback(() => {
    setModal(true);
  }, []);
  const hideUserInfo = useCallback(() => {
    setModal(false);
  }, []);

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
              <Button eventHandler={logoutHandler} text="로그아웃">
                <LogoutSVG />
              </Button>
            </UserBox>
          ) : (
            <KakaoLoginButton loginHandler={loginHandler} />
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
