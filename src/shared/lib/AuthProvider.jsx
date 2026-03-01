import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from './authService';
const AuthContext = createContext(null);
export const AuthProvider = ({
  children
}) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeAuth();
    const {
      data: {
        subscription
      }
    } = authService.onAuthStateChange(async (event, session) => {
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
    signIn: authService.signInWithProvider.bind(authService),
    signOut: authService.signOut.bind(authService),
    deleteAccount: authService.deleteAccount.bind(authService),
    getSession: authService.getSession.bind(authService),
    getUser: authService.getUser.bind(authService)
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};