import { supabase } from '@/shared/api/supabase';

export const loginHandler = async () => {
  const { error } = await supabase().auth.signInWithOAuth({
    provider: 'kakao',
  });
  if (error) console.error('login error message:', error.message);
};

export const logoutHandler = async () => {
  try {
    const { error } = await supabase().auth.signOut();
    if (error) console.error('logout error message:', error.message);
  } catch (err) {
    console.log(err);
  }
};

export const isLogin = () => {
  if (getLoginData()) return true;
  return false;
};

export const resignHandler = async () => {
  // const userData = JSON.parse(getLoginData());
  const { user, provider_refresh_token } = JSON.parse(getLoginData());

  const { error } = await supabase().functions.invoke('delete-user', {
    body: {
      id: user.id,
    },
  });

  if (error) console.error('resign error message:', error.message);
  else {
    await setRefreshToken(provider_refresh_token);
    unlinkOAuth();
    logOut();
  }
};

const unlinkOAuth = async () => {
  const UNLINK_URI = {
    KAKAO: 'https://kapi.kakao.com/v1/user/unlink',
  };
  const { provider_token } = JSON.parse(getLoginData());

  const res = await fetch(UNLINK_URI.KAKAO, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider_token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error('failed!', res);
  }
};

const setRefreshToken = async (refresh_token) => {
  const TOKEN_URI = {
    KAKAO: 'https://kauth.kakao.com/oauth/token',
  };
  const data = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: import.meta.env.VITE_KAKAO_REST_KEY,
    refresh_token: refresh_token,
  });

  const res = await fetch(TOKEN_URI.KAKAO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: data,
  });

  if (!res.ok) {
    console.error('failed message:', res, res.body);
    return null;
  } else {
    const json = await res.json();
    setLoginData('provider_token', json.access_token);
    return json.access_token;
  }
};

export const getLoginData = () => {
  return localStorage.getItem('sb-acvvjofyppuyavonqhvd-auth-token');
};
const setLoginData = (key, value) => {
  const data = JSON.parse(getLoginData());
  data[key] = value;
  localStorage.setItem(
    'sb-acvvjofyppuyavonqhvd-auth-token',
    JSON.stringify(data)
  );
};
export const logOut = () => {
  localStorage.removeItem('sb-acvvjofyppuyavonqhvd-auth-token');
};
