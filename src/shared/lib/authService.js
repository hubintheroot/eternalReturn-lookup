import { supabase } from '@/shared/api/supabase';
import { getProviderByName } from '@/shared/config/oauthProviders';

/**
 * 인증 관련 비즈니스 로직을 처리하는 서비스 클래스
 * Supabase의 Auth 기능을 래핑하여 사용
 */
class AuthService {
  /**
   * OAuth Provider로 로그인
   * @param {string} providerName - Provider 이름 (kakao, google, github, discord)
   * @param {object} options - 추가 옵션
   * @returns {Promise<{data, error}>}
   */
  async signInWithProvider(providerName = 'kakao', options = {}) {
    const provider = getProviderByName(providerName);
    if (!provider) {
      throw new Error(`Unsupported OAuth provider: ${providerName}`);
    }

    const { data, error } = await supabase().auth.signInWithOAuth({
      provider: provider.name,
      options: {
        ...provider.config,
        scopes: provider.scopes,
        ...options,
      },
    });

    if (error) throw error;
    return data;
  }

  /**
   * 로그아웃 (Supabase가 자동으로 토큰 삭제)
   * @returns {Promise<void>}
   */
  async signOut() {
    const { error } = await supabase().auth.signOut();
    if (error) throw error;
  }

  /**
   * 현재 세션 조회 (Supabase가 자동 관리)
   * @returns {Promise<Session|null>}
   */
  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase().auth.getSession();
    if (error) throw error;
    return session;
  }

  /**
   * 현재 사용자 조회
   * @returns {Promise<User|null>}
   */
  async getUser() {
    const {
      data: { user },
      error,
    } = await supabase().auth.getUser();
    if (error) throw error;
    return user;
  }

  /**
   * 세션 갱신 (Supabase가 자동 처리하지만 수동 호출 가능)
   * @returns {Promise<Session>}
   */
  async refreshSession() {
    const {
      data: { session },
      error,
    } = await supabase().auth.refreshSession();
    if (error) throw error;
    return session;
  }

  /**
   * 로그인 상태 확인
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    const session = await this.getSession();
    return !!session;
  }

  /**
   * 회원 탈퇴 (Provider별 처리 포함)
   * @returns {Promise<void>}
   */
  async deleteAccount() {
    try {
      const user = await this.getUser();
      if (!user) throw new Error('Not authenticated');

      // Provider별 연동 해제 처리
      const identities = user.identities || [];
      for (const identity of identities) {
        await this._unlinkProvider(identity.provider, user);
      }

      // Supabase Edge Function으로 사용자 삭제
      const { error } = await supabase().functions.invoke('delete-user', {
        body: { id: user.id },
      });

      if (error) throw error;

      // 로그아웃
      await this.signOut();
    } catch (error) {
      console.error('Account deletion failed:', error);
      throw error;
    }
  }

  /**
   * Provider별 연동 해제 (확장 가능)
   * @private
   */
  async _unlinkProvider(providerName, user) {
    const unlinkHandlers = {
      kakao: () => this._unlinkKakao(user),
      google: () => this._unlinkGoogle(user),
      github: () => this._unlinkGithub(user),
      discord: () => this._unlinkDiscord(user),
    };

    const handler = unlinkHandlers[providerName];
    if (handler) {
      await handler();
    }
  }

  /**
   * Kakao 연동 해제
   * @private
   */
  async _unlinkKakao(user) {
    // Supabase가 provider_token을 세션에 포함시킴
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
          Authorization: `Bearer ${providerToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Kakao unlink failed');
      }
    } catch (error) {
      console.error('Kakao unlink error:', error);
      // 에러 발생해도 계속 진행 (Supabase 계정은 삭제)
    }
  }

  /**
   * Google 연동 해제 (확장 예시)
   * @private
   */
  async _unlinkGoogle(user) {
    // Google OAuth 연동 해제 로직
    // 필요 시 구현
    console.log('Google unlink not implemented yet');
  }

  /**
   * GitHub 연동 해제 (확장 예시)
   * @private
   */
  async _unlinkGithub(user) {
    // GitHub OAuth 연동 해제 로직
    // 필요 시 구현
    console.log('GitHub unlink not implemented yet');
  }

  /**
   * Discord 연동 해제 (확장 예시)
   * @private
   */
  async _unlinkDiscord(user) {
    // Discord OAuth 연동 해제 로직
    // 필요 시 구현
    console.log('Discord unlink not implemented yet');
  }

  /**
   * Auth 상태 변경 구독
   * @param {Function} callback - 콜백 함수
   * @returns {Object} subscription - 구독 객체
   */
  onAuthStateChange(callback) {
    return supabase().auth.onAuthStateChange(callback);
  }
}

// Singleton 인스턴스 export
export const authService = new AuthService();
