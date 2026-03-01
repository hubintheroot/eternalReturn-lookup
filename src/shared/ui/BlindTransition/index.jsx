import { useCallback, useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';
import { shouldSkipBlock } from '@/shared/lib/appSession';
import * as Styled from './BlindTransition.styled';

// 동적 COLS: 컨테이너 너비 / MIN_BLOCK_PX, MAX_COLS 상한 적용
const MIN_BLOCK_PX = 50;
const MAX_COLS = 16;
const MIN_COLS = 4;

const MAX_DELAY = 300; // ms — 전체 블록이 퍼지는 시간
const BLOCK_ANIM_DURATION = 120; // ms — 블록 하나의 페이드 duration
// 커버: 마지막 블록 페이드 완료(MAX_DELAY + BLOCK_ANIM_DURATION) + 여유
const COVER_TOTAL = MAX_DELAY + BLOCK_ANIM_DURATION + 30;
// covered 상태 유지 시간
const COVERED_HOLD = 200;
// 언커버: 마지막 블록 페이드 완료 + 여유
const UNCOVER_TOTAL = MAX_DELAY + BLOCK_ANIM_DURATION + 30;

// 사이드바 버튼 목적지 경로
const SIDEBAR_PATHS = new Set(['/', '/patchNotes', '/coupons', '/characters']);

// 경로의 첫 번째 세그먼트를 섹션으로 반환
const getSection = (pathname) => pathname.split('/')[1] || 'home';

// 0~MAX_DELAY 균등 분할 후 Fisher-Yates 셔플
function shuffleDelays(count) {
  if (count < 2) return [0];
  const delays = Array.from({ length: count }, (_, i) =>
    Math.round((i / (count - 1)) * MAX_DELAY),
  );
  for (let i = delays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [delays[i], delays[j]] = [delays[j], delays[i]];
  }
  return delays;
}

export default function BlindTransition() {
  // ── Layout refs (state 없이 ref만 사용: React 리렌더 불필요) ──────────
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const initialCols = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.floor(window.innerWidth / MIN_BLOCK_PX)));
  const colsRef = useRef(initialCols);
  const blockSizeRef = useRef(window.innerWidth / initialCols);
  const numRowsRef = useRef(9);

  // ── Animation refs ────────────────────────────────────────────────────
  const canvasRafRef = useRef(null); // animation rAF loop
  const animStartRef = useRef(0);    // performance.now() 기준 시각
  const delaysRef = useRef([]);      // 셔플 딜레이 배열

  // ── State machine refs (useBlocker/timeout 제어용) ────────────────────
  const timerRef = useRef(null);
  const phaseRef = useRef(null);
  const proceedRef = useRef(null);
  const rafRef = useRef(null);       // proceedThenUncover의 2-rAF 체인
  const isProceedingRef = useRef(false);

  // ── Canvas draw loop (모든 값 ref에서 읽음 → empty deps) ─────────────
  const drawFrame = useCallback((timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const phase = phaseRef.current;
    const ctx = canvas.getContext('2d');

    // 항상 source-over로 리셋 (언커버 destination-out 잔여 방지)
    ctx.globalCompositeOperation = 'source-over';

    // covered: solid fill 그린 후 루프 종료
    if (phase === 'covered') {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#71c9ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvasRafRef.current = null;
      return;
    }

    // null 또는 예외: canvas 클리어 후 루프 종료
    if (phase !== 'covering' && phase !== 'uncovering') {
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasRafRef.current = null;
      return;
    }

    const elapsed = timestamp - animStartRef.current;
    const cols = colsRef.current;
    const blockSize = blockSizeRef.current;
    const BLOCK_COUNT = cols * numRowsRef.current;
    const delays = delaysRef.current;

    if (phase === 'covering') {
      // 커버: 투명 배경에 블록 페이드인
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#71c9ce';
      for (let i = 0; i < BLOCK_COUNT; i++) {
        const t = elapsed - (delays[i] ?? 0);
        const alpha = t <= 0 ? 0 : Math.min(t / BLOCK_ANIM_DURATION, 1);
        if (alpha <= 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillRect(
          (i % cols) * blockSize,
          Math.floor(i / cols) * blockSize,
          blockSize,
          blockSize,
        );
      }
    } else {
      // 언커버: solid fill 후 destination-out으로 블록별 구멍 뚫기
      // → 서브픽셀 간격 없이 커버색 유지, 블록 영역만 투명하게 소거
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#71c9ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000'; // destination-out에서 색상 무관
      for (let i = 0; i < BLOCK_COUNT; i++) {
        const t = elapsed - (delays[i] ?? 0);
        const faded = t <= 0 ? 0 : Math.min(t / BLOCK_ANIM_DURATION, 1);
        if (faded <= 0) continue; // 아직 페이드 미시작 → 커버색 유지
        ctx.globalAlpha = faded;
        ctx.fillRect(
          (i % cols) * blockSize,
          Math.floor(i / cols) * blockSize,
          blockSize,
          blockSize,
        );
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

    canvasRafRef.current = requestAnimationFrame(drawFrame);
  }, []); // empty deps — 모든 값 ref에서 읽음

  // ── ResizeObserver: ref + canvas attribute 직접 갱신 ─────────────────
  // canvas.width 설정 시 캔버스가 클리어되므로 현재 phase 즉시 재드로우
  useEffect(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;

    // 마운트 시 즉시 초기화 (canvas 기본값 300×150 방지)
    const initRect = el.getBoundingClientRect();
    if (initRect.width > 0) {
      const c = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.floor(initRect.width / MIN_BLOCK_PX)));
      const bs = initRect.width / c;
      colsRef.current = c;
      blockSizeRef.current = bs;
      numRowsRef.current = Math.ceil(initRect.height / bs) + 1;
      canvas.width = Math.round(initRect.width);
      canvas.height = Math.round(initRect.height);
    }

    let rafId = null;
    const ro = new ResizeObserver(([entry]) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { width, height } = entry.contentRect;
        if (width === 0) return;
        const c = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.floor(width / MIN_BLOCK_PX)));
        const bs = width / c;
        colsRef.current = c;
        blockSizeRef.current = bs;
        numRowsRef.current = Math.ceil(height / bs) + 1;
        canvas.width = Math.round(width);   // 캔버스 내용 클리어 발생!
        canvas.height = Math.round(height);

        // 리사이즈로 캔버스 클리어됨 → 현재 phase 즉시 재드로우
        const phase = phaseRef.current;
        if (phase === 'covered') {
          const ctx = canvas.getContext('2d');
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#71c9ce';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (phase === 'covering' || phase === 'uncovering') {
          // 애니메이션 중: 루프 재시작으로 즉시 재드로우
          cancelAnimationFrame(canvasRafRef.current);
          canvasRafRef.current = null;
          drawFrame(performance.now());
        }
        // null: 캔버스 투명 상태가 올바름, 별도 처리 불필요
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [drawFrame]); // drawFrame은 empty deps useCallback → 안정적 참조, 재실행 없음

  // ── 커버링 rAF 시작 헬퍼 ──────────────────────────────────────────────
  const startCoveringRaf = useCallback(() => {
    cancelAnimationFrame(canvasRafRef.current);
    delaysRef.current = shuffleDelays(colsRef.current * numRowsRef.current);
    animStartRef.current = performance.now();
    canvasRafRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  // ── covered 상태: solid fill 즉시 그리기 (rAF 대기 없이) ─────────────
  const drawCoveredImmediate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over'; // destination-out 잔여 방지
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#71c9ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // ── covered 상태에서 언커버 시작 ──────────────────────────────────────
  const startUncovering = useCallback(() => {
    clearTimeout(timerRef.current);
    delaysRef.current = shuffleDelays(colsRef.current * numRowsRef.current);
    animStartRef.current = performance.now();
    phaseRef.current = 'uncovering';
    cancelAnimationFrame(canvasRafRef.current);
    canvasRafRef.current = requestAnimationFrame(drawFrame);
    timerRef.current = setTimeout(() => {
      phaseRef.current = null;
      // rAF 루프가 null 감지 후 canvas 클리어
    }, UNCOVER_TOTAL);
  }, [drawFrame]);

  // ── proceed() 후 2-rAF 체인 → 언커버 ─────────────────────────────────
  const proceedThenUncover = useCallback(() => {
    const proceed = proceedRef.current;
    proceedRef.current = null;
    isProceedingRef.current = true;
    try {
      proceed?.();
    } catch {
      // 경쟁 조건: 타이머 실행 전 blocker가 이미 unblocked 상태로 전환됨.
      // (브라우저 뒤로가기, REPLACE 내비게이션 등으로 blocker가 리셋된 경우)
      // 언커버 애니메이션은 정상 실행해 현재 페이지를 드러냄.
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        isProceedingRef.current = false;
        startUncovering();
      });
    });
  }, [startUncovering]);

  // ── shouldBlock 함수 메모이즈 ─────────────────────────────────────────
  const shouldBlockFn = useCallback(
    ({ currentLocation, nextLocation, historyAction }) => {
      if (historyAction === 'POP' || historyAction === 'REPLACE') return false;
      if (shouldSkipBlock()) return false;
      if (currentLocation.pathname === nextLocation.pathname) return false;
      if (!SIDEBAR_PATHS.has(nextLocation.pathname)) return false;
      if (getSection(currentLocation.pathname) === getSection(nextLocation.pathname)) return false;
      return true;
    },
    [],
  );
  const blocker = useBlocker(shouldBlockFn);

  // ── blocker.proceed를 proceedRef에 동기화 ────────────────────────────
  // state machine effect와 분리해 blocker.proceed 참조 변경 시에도
  // state machine이 불필요하게 재실행(타이머 재시작)되지 않도록 함.
  // 이 effect는 state machine effect보다 먼저 선언되므로 항상 먼저 실행됨.
  useEffect(() => {
    if (blocker.state === 'blocked') {
      proceedRef.current = blocker.proceed;
    }
  }, [blocker.state, blocker.proceed]);

  // ── Phase state machine ───────────────────────────────────────────────
  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    const currentPhase = phaseRef.current;

    if (currentPhase === null) {
      // 새 전환: covering 시작
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      phaseRef.current = 'covering';
      startCoveringRaf();
      timerRef.current = setTimeout(() => {
        if (phaseRef.current !== 'covering') return;
        phaseRef.current = 'covered';
        cancelAnimationFrame(canvasRafRef.current);
        canvasRafRef.current = null;
        drawCoveredImmediate();
        timerRef.current = setTimeout(() => {
          if (phaseRef.current !== 'covered') return;
          proceedThenUncover();
        }, COVERED_HOLD);
      }, COVER_TOTAL);
    } else if (currentPhase === 'covering') {
      // covering 중: proceed 갱신은 sync effect가 처리함. 기존 타이머 계속 진행.
    } else if (currentPhase === 'covered') {
      // covered 중 새 내비게이션 차단 시 타이머 재시작
      // (blocker.state 변경으로만 진입하므로 blocker.proceed 단순 참조 변경은 무시됨)
      if (!isProceedingRef.current) {
        clearTimeout(timerRef.current);
        cancelAnimationFrame(rafRef.current);
        timerRef.current = setTimeout(() => {
          if (phaseRef.current !== 'covered') return;
          proceedThenUncover();
        }, COVERED_HOLD);
      }
    } else {
      // uncovering 중 → 즉시 covered 점프
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(canvasRafRef.current);
      phaseRef.current = 'covered';
      drawCoveredImmediate();
      timerRef.current = setTimeout(() => {
        if (phaseRef.current !== 'covered') return;
        proceedThenUncover();
      }, COVERED_HOLD);
    }
  }, [blocker.state, proceedThenUncover, startCoveringRaf, drawCoveredImmediate]);

  // ── 언마운트 cleanup ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(canvasRafRef.current);
    };
  }, []);

  return (
    <Styled.Container ref={containerRef}>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </Styled.Container>
  );
}
