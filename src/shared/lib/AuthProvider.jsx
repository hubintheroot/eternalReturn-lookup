import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './authService';

const AuthContext = createContext(null);

/**
 * 인증 상태를 관리하는 Provider 컴포넌트
 * Supabase의 onAuthStateChange를 활용한 실시간 인증 상태 관리
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 초기 세션 확인
    initializeAuth();

    // Supabase Auth 상태 변화 감지 (자동 토큰 갱신 포함)
    const {
      data: { subscription },
    } = authService.onAuthStateChange(async (event, session) => {
      // console.log('Auth event:', event, session);

      // Supabase가 자동으로 관리하므로 상태만 업데이트
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // 이벤트별 추가 처리
      handleAuthEvent(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const session = await authService.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Auth initialization failed:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthEvent = (event, session) => {
    if (import.meta.env.DEV) {
      switch (event) {
        case 'SIGNED_IN':
          console.log('User signed in:', session?.user?.email);
          break;
        case 'SIGNED_OUT':
          console.log('User signed out');
          break;
        case 'TOKEN_REFRESHED':
          console.log('Token refreshed automatically');
          break;
        case 'USER_UPDATED':
          console.log('User data updated');
          break;
        default:
          break;
      }
    }
  };

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    // AuthService 메서드 노출
    signIn: authService.signInWithProvider.bind(authService),
    signOut: authService.signOut.bind(authService),
    deleteAccount: authService.deleteAccount.bind(authService),
    getSession: authService.getSession.bind(authService),
    getUser: authService.getUser.bind(authService),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Auth 컨텍스트를 사용하는 커스텀 Hook
 * @returns {Object} Auth 컨텍스트 값
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
