import type { OAuthProviderConfig } from '@/shared/types';

export const OAUTH_PROVIDERS: Record<string, OAuthProviderConfig> = {
  KAKAO: {
    name: 'kakao',
    displayName: '카카오',
    icon: '/icons/kakao.svg',
    scopes: 'profile_nickname profile_image account_email',
    config: {
      redirectTo: `${window.location.origin}/coupons`
    }
  },
  DISCORD: {
    name: 'discord',
    displayName: 'Discord',
    icon: '/icons/discord.svg',
    scopes: 'identify email',
    config: {
      redirectTo: `${window.location.origin}/coupons`
    }
  }
};

export const getProviderByName = (name: string): OAuthProviderConfig | undefined => {
  return OAUTH_PROVIDERS[name.toUpperCase()];
};
