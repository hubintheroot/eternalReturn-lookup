let _isFirstVisit = true;
let _skipNextBlock = false;
export function shouldSkipBlock() {
  if (_skipNextBlock) {
    _skipNextBlock = false;
    return true;
  }
  return false;
}
export function checkAndRedirectOnFirstVisit(navigate, currentPath) {
  if (!_isFirstVisit) return;
  _isFirstVisit = false;
  if (currentPath !== '/') {
    navigate('/', {
      replace: true
    });
  }
}