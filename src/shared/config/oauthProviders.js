export const OAUTH_PROVIDERS = {
  KAKAO: {
    name: 'kakao',
    displayName: '카카오',
    icon: '/icons/kakao.svg',
    scopes: 'profile_nickname profile_image account_email',
    config: {
      redirectTo: `${window.location.origin}/coupons`
    }
  }
};
export const getProviderByName = name => {
  return OAUTH_PROVIDERS[name.toUpperCase()];
};