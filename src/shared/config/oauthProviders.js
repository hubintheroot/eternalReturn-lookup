/**
 * OAuth Provider 설정
 * 새로운 Provider를 추가하려면 여기에 설정을 추가하고
 * 환경 변수 VITE_OAUTH_PROVIDERS에 추가하면 됩니다.
 */
export const OAUTH_PROVIDERS = {
  KAKAO: {
    name: 'kakao',
    displayName: '카카오',
    icon: '/icons/kakao.svg',
    scopes: 'profile_nickname profile_image account_email',
    config: {
      redirectTo: `${window.location.origin}/coupons`,
    },
  },
  // GOOGLE: {
  //   name: 'google',
  //   displayName: '구글',
  //   icon: '/icons/google.svg',
  //   scopes: 'email profile',
  //   config: {
  //     redirectTo: `${window.location.origin}/coupons`,
  //   },
  // },
  // GITHUB: {
  //   name: 'github',
  //   displayName: 'GitHub',
  //   icon: '/icons/github.svg',
  //   scopes: 'user:email',
  //   config: {
  //     redirectTo: `${window.location.origin}/coupons`,
  //   },
  // },
  // DISCORD: {
  //   name: 'discord',
  //   displayName: 'Discord',
  //   icon: '/icons/discord.svg',
  //   scopes: 'identify email',
  //   config: {
  //     redirectTo: `${window.location.origin}/coupons`,
  //   },
  // },
};

/**
 * 활성화된 Provider 목록 반환
 * 환경 변수 VITE_OAUTH_PROVIDERS에서 읽어옴
 * 기본값: kakao
 */
export const getEnabledProviders = () => {
  const enabled = import.meta.env.VITE_OAUTH_PROVIDERS?.split(',') || ['kakao'];
  return enabled
    .map((key) => OAUTH_PROVIDERS[key.toUpperCase()])
    .filter(Boolean);
};

/**
 * Provider 이름으로 설정 가져오기
 */
export const getProviderByName = (name) => {
  return OAUTH_PROVIDERS[name.toUpperCase()];
};
