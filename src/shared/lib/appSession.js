/**
 * 앱 세션 내 첫 접속 여부를 추적하는 모듈 수준 상태.
 * 페이지 새로고침 시 초기화되므로 매 로드마다 랜딩 페이지를 강제한다.
 */
let _isFirstVisit = true;

/**
 * 블라인드 트리거 없이 통과시켜야 하는 내비게이션 플래그.
 * (첫 접속 리다이렉트처럼 useBlocker를 우회해야 할 때 사용)
 */
let _skipNextBlock = false;

/**
 * 다음 블로커 호출을 한 번 스킵할지 확인하고 소비한다.
 * @returns {boolean} 스킵해야 하면 true
 */
export function shouldSkipBlock() {
  if (_skipNextBlock) {
    _skipNextBlock = false;
    return true;
  }
  return false;
}

/**
 * 첫 접속 시 랜딩 페이지로 리다이렉트한다.
 * 리다이렉트로 인한 내비게이션은 블라인드 트리거 없이 통과된다.
 * @param {Function} navigate - useNavigate 훅에서 반환된 함수
 * @param {string} currentPath - 현재 경로
 */
export function checkAndRedirectOnFirstVisit(navigate, currentPath) {
  if (!_isFirstVisit) return;
  _isFirstVisit = false;
  if (currentPath !== '/') {
    navigate('/', { replace: true });
  }
}
