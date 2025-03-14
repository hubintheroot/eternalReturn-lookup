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
import { useEffect, useState } from "react";
import { KakaoLoginButton } from "../components/ui/kakao";
import { LogoutSVG, UserSVG } from "../components/ui/SVG";

export default function Root() {
  const user = useSelector((state) => state.userInfo.user);
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase().auth.getUser();

        if (error) throw error;
        if (data?.user) dispatch(setUser(data.user));
      } catch (err) {
        console.error("Error ferching user", err);
        logOut();
      }
    };

    if (isLogin()) fetchUser();

    const { data: listener } = supabase().auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          dispatch(setUser(session.user));
        } else if (event === "SIGNED_OUT") {
          dispatch(setUser(null));
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [dispatch]);

  const userInfoHandler = {
    show: () => {
      setModal(true);
    },
    hide: () => {
      setModal(false);
    },
  };

  return (
    <Page>
      <Header>
        <StyledNav info={links}></StyledNav>
        {/* TODO: myProfile, LogOut 모달로 옮겨서 공간확보하기 */}
        {user ? (
          <UserBox>
            <Button eventHandler={userInfoHandler.show} text="프로필">
              <UserSVG />
            </Button>
            <Button eventHandler={logoutHandler} text="로그아웃">
              <LogoutSVG />
            </Button>
          </UserBox>
        ) : (
          <KakaoLoginButton loginHandler={loginHandler} />
        )}
      </Header>
      <Content />
      {showModal && (
        <Modal>
          <UserInfo
            onClose={userInfoHandler.hide}
            data={user?.user_metadata}
          ></UserInfo>
        </Modal>
      )}
    </Page>
  );
}

const links = [
  { link: "/news", text: "새소식" },
  { link: "/coupons", text: "쿠폰" },
  { link: "/characters", text: "실험체" },
  { link: "/rank", text: "랭크" },
];

const Page = styled.div`
  min-height: 100vh;
  position: relative;
`;
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const StyledNav = styled(Navigate)`
  margin-right: 45px;
`;
const Content = styled(Outlet)`
  height: calc(100vh - Header);
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
