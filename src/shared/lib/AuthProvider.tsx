import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { authService } from './authService';
import { setAuthWorker, clearHybridStorage } from './hybridTokenStorage';
import { AuthApiError } from '@supabase/supabase-js';
import type { ReactNode } from 'react';
import type { User, Session, AuthContextValue } from '@/shared/types';
import type { AuthChangeEvent } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoSignedOut, setAutoSignedOut] = useState(false);
  const isManualSignOut = useRef(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Auth Worker 초기화: 토큰 만료 전 자동 갱신 타이머 담당
    const worker = new Worker(
      new URL('../workers/authWorker', import.meta.url),
      {
        type: 'module',
      },
    );
    workerRef.current = worker;
    setAuthWorker(worker);

    // Worker → Main: 만료 5분 전 갱신 요청 수신
    worker.onmessage = (e: MessageEvent<{ type: string }>) => {
      if (e.data.type === 'REFRESH_NEEDED') {
        void authService.refreshSession().catch((err) => {
          if (import.meta.env.DEV)
            console.error('Auto token refresh failed:', err);
        });
      }
    };

    // 현재 세션이 있으면 Worker에 갱신 타이머 설정 (새로고침 후 복원 케이스)
    void authService.getSession().then((s) => {
      if (!s) return;
      if (s.expires_at)
        worker.postMessage({
          type: 'REFRESH_TIMER',
          expiresAt: s.expires_at * 1000,
        });
    });

    initializeAuth();

    const {
      data: { subscription },
    } = authService.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === 'SIGNED_OUT') {
          if (!isManualSignOut.current) setAutoSignedOut(true);
          isManualSignOut.current = false;
        }
        handleAuthEvent(event, session);
      },
    );

    return () => {
      subscription.unsubscribe();
      worker.postMessage({ type: 'CLEAR_TOKEN' });
      worker.terminate();
      workerRef.current = null;
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const session = await authService.getSession();
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      if (import.meta.env.DEV)
        console.error('Auth initialization failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    isManualSignOut.current = true;
    try {
      await authService.signOut();
    } catch (e: unknown) {
      // 서버 세션이 이미 만료된 경우(403) → 스토리지 직접 정리
      // SDK signOut({ scope: 'local' })도 서버에 요청을 보내므로 403 루프 발생.
      if (e instanceof AuthApiError && e.status === 403) {
        clearHybridStorage();
        setUser(null);
        setSession(null);
        isManualSignOut.current = false;
        return;
      }
      isManualSignOut.current = false;
      throw e;
    }
  };

  // deleteAccount 래퍼: 서버측 삭제(authService) 후 로컬 상태 초기화 보장
  const handleDeleteAccount = async (): Promise<void> => {
    isManualSignOut.current = true;
    try {
      await authService.deleteAccount();
      // 탈퇴 성공 → 스토리지 직접 정리
      // 유저가 삭제되어 signOut API가 403 반환 → SDK _removeSession() 미실행
      // → clearHybridStorage()로 sessionStorage 세션을 직접 소멸
      clearHybridStorage();
      setUser(null);
      setSession(null);
    } catch (error) {
      isManualSignOut.current = false;
      throw error;
    }
  };

  const handleAuthEvent = (event: AuthChangeEvent, session: Session | null) => {
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

  const value: AuthContextValue = {
    user,
    session,
    loading,
    isAuthenticated: !!user,
    autoSignedOut,
    signIn: authService.signInWithProvider.bind(authService),
    signOut: handleSignOut,
    deleteAccount: handleDeleteAccount,
    getSession: authService.getSession.bind(authService),
    getUser: authService.getUser.bind(authService),
    clearAutoSignedOut: () => setAutoSignedOut(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
