import type { ReactElement } from 'react';
import * as Styled from './RootLayout.styled';
import Modal from '@/shared/ui/Modal';
import Button from '@/shared/ui/Button';
import Toast from '@/shared/ui/Toast';
import UserInfo from '../userInfo';
import { useAuth } from '@/shared/lib/AuthProvider';
import { useUserInfoStore } from '@/entities/user/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KakaoLoginButton } from '@/shared/ui/kakaoLoginButton';
import { FeedbackSVG, LogoutSVG, UserSVG } from '@/shared/ui/SVG';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigate from '@/shared/ui/Navigate';
import BlindTransition from '@/shared/ui/BlindTransition';
import SeasonMiniTimer from '@/features/season-display/ui/SeasonMiniTimer';
import { checkAndRedirectOnFirstVisit } from '@/shared/lib/appSession';
import type {
  User,
  ToastData,
  ToastHandler,
  ToastStatus,
} from '@/shared/types';

interface NavLink {
  link: string;
  text: string;
}

const links: NavLink[] = [
  {
    link: '/',
    text: '홈',
  },
  {
    link: '/patchNotes',
    text: '패치노트',
  },
  {
    link: '/coupons',
    text: '쿠폰',
  },
  {
    link: '/characters',
    text: '실험체',
  },
];

function useSyncAuthToStore(): void {
  const setUser = useUserInfoStore((state) => state.setUser);
  const { user } = useAuth();
  useEffect(() => {
    setUser(user);
  }, [user, setUser]);
}

export default function Root(): ReactElement {
  const { user, signIn, signOut, loading, autoSignedOut, clearAutoSignedOut } =
    useAuth();
  const [showModal, setModal] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toast, setToast] = useState<{
    isShow: boolean;
    message: string | null;
    status: ToastStatus | null;
  }>({
    isShow: false,
    message: null,
    status: null,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useSyncAuthToStore();
  useEffect(() => {
    checkAndRedirectOnFirstVisit(navigate, location.pathname);
  }, []);
  useEffect(() => {
    if (!user) setModal(false);
  }, [user]);
  useEffect(() => {
    if (autoSignedOut) {
      setToast({
        isShow: true,
        message: '로그아웃되었습니다',
        status: 'alert',
      });
      clearAutoSignedOut();
    }
  }, [autoSignedOut, clearAutoSignedOut]);
  const toastHandler: ToastHandler = {
    show: (data: { message: string; status: ToastStatus }) =>
      setToast({ isShow: true, ...data }),
    hide: () => setToast({ isShow: false, message: '', status: 'failed' }),
    alert: function (message: string) {
      this.show({ message, status: 'alert' });
    },
    success: function (message: string) {
      this.show({ message, status: 'successed' });
    },
    failed: function (message: string) {
      this.show({ message, status: 'failed' });
    },
  };
  const toastData: ToastData = { ...toast, timer: timerRef };
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

  const typedUser = user as User | null;

  const userButtons = typedUser ? (
    <>
      <Button eventHandler={showUserInfo} text="프로필">
        <UserSVG />
      </Button>
      <Button eventHandler={handleLogout} text="로그아웃">
        <LogoutSVG />
      </Button>
    </>
  ) : (
    <KakaoLoginButton loginHandler={handleLogin} />
  );
  return (
    <Styled.Page>
      <Styled.TopBar>
        <Styled.TopBarTitle as={Link} to="/">
          ELK
        </Styled.TopBarTitle>
        <SeasonMiniTimer variant="topbar" />
        <Styled.HamburgerBtn onClick={() => setIsDrawerOpen(true)}>
          &#9776;
        </Styled.HamburgerBtn>
      </Styled.TopBar>

      <Styled.DrawerOverlay $isOpen={isDrawerOpen} onClick={closeDrawer} />
      <Styled.Drawer $isOpen={isDrawerOpen}>
        <Styled.DrawerHeader>
          <span>ELK</span>
          <Styled.CloseBtn onClick={closeDrawer}>&#10005;</Styled.CloseBtn>
        </Styled.DrawerHeader>
        <Navigate info={links} direction="column" onLinkClick={closeDrawer} />
        <Styled.DrawerUserBox>{userButtons}</Styled.DrawerUserBox>
      </Styled.Drawer>

      <Styled.Sidebar>
        <Styled.SidebarTitleRow>
          <Styled.SidebarTitle as={Link} to="/">
            ELK
          </Styled.SidebarTitle>
          <SeasonMiniTimer variant="sidebar" />
        </Styled.SidebarTitleRow>
        <Navigate info={links} direction="column" />
        <Styled.SidebarUserBox>{userButtons}</Styled.SidebarUserBox>
      </Styled.Sidebar>

      <Styled.ContentWrapper>
        <BlindTransition />
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
        <Styled.Content>
          <Outlet />
        </Styled.Content>
      </Styled.ContentWrapper>

      {showModal && typedUser && (
        <Modal>
          <UserInfo
            onClose={hideUserInfo}
            data={
              typedUser.user_metadata as {
                avatar_url: string;
                user_name: string;
                email: string;
              }
            }
          />
        </Modal>
      )}
      {toast.isShow && <Toast data={toastData} handler={toastHandler} />}
    </Styled.Page>
  );
}
