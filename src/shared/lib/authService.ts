import { supabase } from '@/shared/api/supabase';
import { getProviderByName } from '@/shared/config/oauthProviders';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthChangeEvent, Subscription } from '@supabase/supabase-js';

class AuthService {
  async signInWithProvider(providerName = 'kakao', options: Record<string, unknown> = {}) {
    const provider = getProviderByName(providerName);
    if (!provider) {
      throw new Error(`Unsupported OAuth provider: ${providerName}`);
    }
    const {
      data,
      error
    } = await supabase().auth.signInWithOAuth({
      provider: provider.name as 'kakao',
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
    const {
      error
    } = await supabase().auth.signOut();
    if (error) throw error;
  }
  async getSession(): Promise<Session | null> {
    const {
      data: {
        session
      },
      error
    } = await supabase().auth.getSession();
    if (error) throw error;
    return session;
  }
  async getUser(): Promise<User | null> {
    const {
      data: {
        user
      },
      error
    } = await supabase().auth.getUser();
    if (error) throw error;
    return user;
  }
  async deleteAccount(): Promise<void> {
    try {
      const user = await this.getUser();
      if (!user) throw new Error('Not authenticated');
      const identities = user.identities || [];
      for (const identity of identities) {
        await this._unlinkProvider(identity.provider, user);
      }
      const {
        error
      } = await supabase().functions.invoke('delete-user', {
        body: {
          id: user.id
        }
      });
      if (error) throw error;
      await this.signOut();
    } catch (error) {
      console.error('Account deletion failed:', error);
      throw error;
    }
  }
  async _unlinkProvider(providerName: string, _user: User): Promise<void> {
    if (providerName === 'kakao') {
      await this._unlinkKakao();
    }
  }
  async _unlinkKakao(): Promise<void> {
    const session = await this.getSession();
    const providerToken = session?.provider_token;
    if (!providerToken) {
      console.warn('No Kakao provider token found');
      return;
    }
    try {
      const response = await fetch('https://kapi.kakao.com/v1/user/unlink', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${providerToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Kakao unlink failed');
      }
    } catch (error) {
      console.error('Kakao unlink error:', error);
    }
  }
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void): { data: { subscription: Subscription } } {
    return supabase().auth.onAuthStateChange(callback);
  }
}
export const authService = new AuthService();
