/// <reference lib="webworker" />

export type {};

// 토큰 만료 5분 전 메인 스레드에 갱신 요청을 보내는 타이머만 담당.
// access_token 보관은 하지 않는다.

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimer(): void {
  if (refreshTimer !== null) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

self.addEventListener(
  'message',
  (e: MessageEvent<{ type: string; expiresAt?: number }>) => {
    const { type, expiresAt } = e.data;

    switch (type) {
      case 'REFRESH_TIMER': {
        clearTimer();
        if (expiresAt === undefined) break;
        const msUntilRefresh = expiresAt - Date.now() - 5 * 60 * 1000;
        if (msUntilRefresh > 0) {
          refreshTimer = setTimeout(() => {
            self.postMessage({ type: 'REFRESH_NEEDED' });
          }, msUntilRefresh);
        } else {
          self.postMessage({ type: 'REFRESH_NEEDED' });
        }
        break;
      }

      case 'CLEAR_TOKEN':
        clearTimer();
        break;

      default:
        break;
    }
  }
);
