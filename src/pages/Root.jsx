import Navigate from "../components/Navigate";
import { Outlet } from "react-router-dom";
import { isLogin, loginHandler, logOut, logoutHandler } from "../util/login";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/loginInfo/userInfoSlice";
import { supabase } from "../supabase/supabase";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Modal from "../components/Modal";
import Userinfo from "../pages/userInfo";

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

    // const isLogin = localStorage.getItem("sb-acvvjofyppuyavonqhvd-auth-token");
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
        <Ol>
          {user ? (
            <>
              <li onClick={userInfoHandler.show}>
                <strong>
                  <span>{user.user_metadata.user_name}</span>
                </strong>
              </li>
              <li onClick={logoutHandler}>
                <strong>
                  <span>LogOut</span>
                </strong>
              </li>
            </>
          ) : (
            <li onClick={loginHandler}>
              <strong>
                <span>LogIn</span>
              </strong>
            </li>
          )}
        </Ol>
      </Header>
      <Content />
      {showModal && (
        <Modal>
          <Userinfo
            onClose={userInfoHandler.hide}
            data={user?.user_metadata}
          ></Userinfo>
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const StyledNav = styled(Navigate)`
  margin-right: 45px;
`;
const Content = styled(Outlet)`
  height: calc(100vh - Header);
`;
const Ol = styled.ol`
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 0.4em;
  padding: 0;
  margin: 0 2rem 0 0;

  & > li {
    word-break: keep-all;
    &:hover {
      cursor: pointer;
    }
  }
`;
