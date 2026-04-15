// Supabase SupportedStorage 구현
//
// Supabase SDK는 두 종류의 키를 스토리지에 저장한다:
//   1. 세션 키  : `sb-<ref>-auth-token`
//      → 전체 세션 JSON (access_token, refresh_token, expires_at, user)
//      → memoryCache(빠른 getItem) + sessionStorage(새로고침 후 복원)
//   2. 비세션 키: `sb-<ref>-auth-token-code-verifier` 등
//      → PKCE verifier처럼 OAuth 리다이렉트 사이에 살아있어야 하는 임시 데이터
//      → sessionStorage 직접 사용 (리다이렉트 후에도 유지)
//
// Web Worker(authWorker)는 access_token을 별도 보관하지 않고
// 토큰 만료 전 자동 갱신 타이머 역할만 담당한다.

const SS_SESSION_PREFIX = 'auth_session:';
const SS_KEY_INDEX = 'auth_keys';

const memoryCache = new Map<string, string>();
let worker: Worker | null = null;

export function setAuthWorker(w: Worker): void {
  worker = w;
}

const isSessionKey = (key: string): boolean => key.endsWith('-auth-token');

function getRegisteredKeys(): string[] {
  try {
    return JSON.parse(sessionStorage.getItem(SS_KEY_INDEX) ?? '[]') as string[];
  } catch {
    return [];
  }
}

function registerKey(key: string): void {
  const keys = getRegisteredKeys();
  if (!keys.includes(key)) {
    sessionStorage.setItem(SS_KEY_INDEX, JSON.stringify([...keys, key]));
  }
}

function unregisterKey(key: string): void {
  const keys = getRegisteredKeys().filter(k => k !== key);
  sessionStorage.setItem(SS_KEY_INDEX, JSON.stringify(keys));
}

interface SupabaseSessionData {
  expires_at?: number;
  [key: string]: unknown;
}

export const hybridTokenStorage = {
  getItem(key: string): string | null {
    if (isSessionKey(key)) {
      return memoryCache.get(key) ?? null;
    }
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(key: string, value: string): void {
    if (isSessionKey(key)) {
      memoryCache.set(key, value);
      registerKey(key);
      try {
        sessionStorage.setItem(SS_SESSION_PREFIX + key, value);
      } catch {
        // sessionStorage 저장 실패 시 메모리 캐시만 사용
      }
      if (worker) {
        try {
          const session = JSON.parse(value) as SupabaseSessionData;
          if (session.expires_at) {
            worker.postMessage({ type: 'REFRESH_TIMER', expiresAt: session.expires_at * 1000 });
          }
        } catch {
          // JSON 파싱 실패 무시
        }
      }
    } else {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // ignore
      }
    }
  },

  removeItem(key: string): void {
    if (isSessionKey(key)) {
      memoryCache.delete(key);
      unregisterKey(key);
      try {
        sessionStorage.removeItem(SS_SESSION_PREFIX + key);
      } catch {
        // ignore
      }
      worker?.postMessage({ type: 'CLEAR_TOKEN' });
    } else {
      try {
        sessionStorage.removeItem(key);
      } catch {
        // ignore
      }
    }
  },
};

// 세션 강제 소멸: SDK의 signOut API 없이 로컬 스토리지를 직접 정리한다.
// 서버에서 유저가 삭제된 경우(탈퇴)처럼 signOut API가 403을 반환하여
// SDK 내부 _removeSession()이 실행되지 않는 상황에서 사용.
export function clearHybridStorage(): void {
  try {
    const keys = getRegisteredKeys();
    keys.forEach(key => {
      memoryCache.delete(key);
      try {
        sessionStorage.removeItem(SS_SESSION_PREFIX + key);
      } catch {
        // ignore
      }
    });
    sessionStorage.removeItem(SS_KEY_INDEX);
  } catch {
    // ignore
  }
  worker?.postMessage({ type: 'CLEAR_TOKEN' });
}

// 페이지 새로고침 후 sessionStorage의 전체 세션 JSON을 메모리 캐시에 복원.
// Supabase 클라이언트 초기화 전에 호출해야 한다.
export function initHybridStorage(): void {
  try {
    getRegisteredKeys().forEach(key => {
      const json = sessionStorage.getItem(SS_SESSION_PREFIX + key);
      if (json) {
        memoryCache.set(key, json);
      }
    });
  } catch {
    // ignore
  }
}
