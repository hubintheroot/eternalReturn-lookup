import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './authService';
import type { ReactNode } from 'react';
import type { User, Session, AuthContextValue } from '@/shared/types';
import type { AuthChangeEvent } from '@supabase/supabase-js';

const AuthContext = createContext<AuthContextValue | null>(null);
export const AuthProvider = ({
  children
}: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeAuth();
    const {
      data: {
        subscription
      }
    } = authService.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
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
    signIn: authService.signInWithProvider.bind(authService),
    signOut: authService.signOut.bind(authService),
    deleteAccount: authService.deleteAccount.bind(authService),
    getSession: authService.getSession.bind(authService),
    getUser: authService.getUser.bind(authService)
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
