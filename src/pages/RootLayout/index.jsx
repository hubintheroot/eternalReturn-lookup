import * as Styled from './RootLayout.styled';
import Modal from '@/shared/ui/Modal';
import Button from '@/shared/ui/Button';
import UserInfo from '../userInfo';
import { useAuth } from '@/shared/lib/AuthProvider';
import { useUserInfoStore } from '@/entities/user/store';
import { useCallback, useEffect, useState } from 'react';
import { KakaoLoginButton } from '@/shared/ui/kakaoLoginButton';
import { FeedbackSVG, LogoutSVG, UserSVG } from '@/shared/ui/SVG';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigate from '@/shared/ui/Navigate';
import BlindTransition from '@/shared/ui/BlindTransition';
import SeasonMiniTimer from '@/features/season-display/ui/SeasonMiniTimer';
import { checkAndRedirectOnFirstVisit } from '@/shared/lib/appSession';
const links = [{
  link: '/',
  text: '홈'
}, {
  link: '/patchNotes',
  text: '패치노트'
}, {
  link: '/coupons',
  text: '쿠폰'
}, {
  link: '/characters',
  text: '실험체'
}];
function useSyncAuthToStore() {
  const setUser = useUserInfoStore(state => state.setUser);
  const {
    user
  } = useAuth();
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
}
export default function Root() {
  const {
    user,
    signIn,
    signOut,
    loading
  } = useAuth();
  const [showModal, setModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useSyncAuthToStore();
  useEffect(() => {
    checkAndRedirectOnFirstVisit(navigate, location.pathname);
  }, []);
  const showUserInfo = useCallback(() => setModal(true), []);
  const hideUserInfo = useCallback(() => setModal(false), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
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
  const userButtons = user ? <>
      <Button eventHandler={showUserInfo} text="프로필">
        <UserSVG />
      </Button>
      <Button eventHandler={handleLogout} text="로그아웃">
        <LogoutSVG />
      </Button>
    </> : <KakaoLoginButton loginHandler={handleLogin} />;
  return <Styled.Page>
      <Styled.TopBar>
        <Styled.TopBarTitle as={Link} to="/">ELK</Styled.TopBarTitle>
        <SeasonMiniTimer variant="topbar" />
        <Styled.HamburgerBtn onClick={() => setIsDrawerOpen(true)}>☰</Styled.HamburgerBtn>
      </Styled.TopBar>

      <Styled.DrawerOverlay $isOpen={isDrawerOpen} onClick={closeDrawer} />
      <Styled.Drawer $isOpen={isDrawerOpen}>
        <Styled.DrawerHeader>
          <span>ELK</span>
          <Styled.CloseBtn onClick={closeDrawer}>✕</Styled.CloseBtn>
        </Styled.DrawerHeader>
        <Navigate info={links} direction="column" onLinkClick={closeDrawer} />
        <Styled.DrawerUserBox>{userButtons}</Styled.DrawerUserBox>
      </Styled.Drawer>

      <Styled.Sidebar>
        <Styled.SidebarTitleRow>
          <Styled.SidebarTitle as={Link} to="/">ELK</Styled.SidebarTitle>
          <SeasonMiniTimer variant="sidebar" />
        </Styled.SidebarTitleRow>
        <Navigate info={links} direction="column" />
        <Styled.SidebarUserBox>{userButtons}</Styled.SidebarUserBox>
      </Styled.Sidebar>

      <Styled.ContentWrapper>
        <BlindTransition />
        <Styled.SurveyContainer>
          <Styled.FeedbackContainer href="https://forms.gle/hXXEEMWiiXeicxq2A" target="_blank" rel="noreferrer">
            <FeedbackSVG />
            <span>피드백 설문하러 가기</span>
          </Styled.FeedbackContainer>
        </Styled.SurveyContainer>
        <Styled.Content>
          <Outlet />
        </Styled.Content>
      </Styled.ContentWrapper>

      {showModal && <Modal>
          <UserInfo onClose={hideUserInfo} data={user?.user_metadata} />
        </Modal>}
    </Styled.Page>;
}