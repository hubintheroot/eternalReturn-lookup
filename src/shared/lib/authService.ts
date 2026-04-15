import { supabase } from '@/shared/api/supabase';
import { getProviderByName } from '@/shared/config/oauthProviders';
import { AuthApiError } from '@supabase/supabase-js';
import type { Provider } from '@supabase/supabase-js';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthChangeEvent, Subscription } from '@supabase/supabase-js';

class AuthService {
  async signInWithProvider(providerName = 'kakao', options: Record<string, unknown> = {}) {
    const provider = getProviderByName(providerName);
    if (!provider) {
      throw new Error(`Unsupported OAuth provider: ${providerName}`);
    }
    const { data, error } = await supabase().auth.signInWithOAuth({
      provider: provider.name as Provider,
      options: {
        ...provider.config,
        scopes: provider.scopes,
        ...options
      }
    });
    if (error) throw error;
    return data;
  }

  async signOut(): Promise<void> {
    const { error } = await supabase().auth.signOut();
    if (error) throw error;
  }

  async refreshSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase().auth.refreshSession();
    if (error) throw error;
    return session;
  }

  async getSession(): Promise<Session | null> {
    const { data: { session }, error } = await supabase().auth.getSession();
    if (error) throw error;
    return session;
  }

  async getUser(): Promise<User | null> {
    const { data: { user }, error } = await supabase().auth.getUser();
    if (error) throw error;
    return user;
  }

  // AuthProvider의 handleDeleteAccount가 로컬 상태 정리를 담당하므로
  // 여기서는 서버측 처리(provider unlink + user 삭제)만 수행
  async deleteAccount(): Promise<void> {
    const user = await this.getUser();
    if (!user) throw new Error('Not authenticated');

    const identities = user.identities ?? [];
    for (const identity of identities) {
      await this._unlinkProvider(identity.provider, user);
    }

    const { error } = await supabase().functions.invoke('delete-user', {
      body: { id: user.id }
    });
    if (error) throw error;
  }

  async _unlinkProvider(providerName: string, user: User): Promise<void> {
    if (providerName === 'kakao') {
      await this._unlinkKakao();
    } else if (providerName === 'discord') {
      await this._unlinkDiscord(user);
    }
  }

  async _unlinkKakao(): Promise<void> {
    const session = await this.getSession();
    const providerToken = session?.provider_token;
    if (!providerToken) {
      if (import.meta.env.DEV) console.warn('No Kakao provider token found');
      return;
    }
    try {
      const response = await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'POST',
        headers: { Authorization: `Bearer ${providerToken}` }
      });
      if (!response.ok) throw new Error('Kakao unlink failed');
    } catch (error) {
      if (import.meta.env.DEV) console.error('Kakao unlink error:', error);
    }
  }

  // Discord 토큰 회수는 client_secret이 필요하므로 서버사이드(Edge Function)에서 처리 권장.
  // 현재는 Supabase 유저 삭제로 Discord 연동이 자동 해제됨.
  async _unlinkDiscord(_user: User): Promise<void> {
    if (import.meta.env.DEV) console.log('Discord unlink: handled via user deletion');
  }

  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): { data: { subscription: Subscription } } {
    return supabase().auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();

// AuthApiError를 외부에서 사용할 수 있도록 재내보내기
export { AuthApiError };
