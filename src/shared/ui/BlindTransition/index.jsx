import { useCallback, useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';
import { shouldSkipBlock } from '@/shared/lib/appSession';
import * as Styled from './BlindTransition.styled';
const MIN_BLOCK_PX = 50;
const MAX_COLS = 16;
const MIN_COLS = 4;
const MAX_DELAY = 300;
const BLOCK_ANIM_DURATION = 120;
const COVER_TOTAL = MAX_DELAY + BLOCK_ANIM_DURATION + 30;
const COVERED_HOLD = 200;
const UNCOVER_TOTAL = MAX_DELAY + BLOCK_ANIM_DURATION + 30;
const SIDEBAR_SECTIONS = new Set(['home', 'patchNotes', 'coupons', 'characters']);
const getSection = pathname => pathname.split('/')[1] || 'home';
function shuffleDelays(count) {
  if (count < 2) return [0];
  const delays = Array.from({
    length: count
  }, (_, i) => Math.round(i / (count - 1) * MAX_DELAY));
  for (let i = delays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [delays[i], delays[j]] = [delays[j], delays[i]];
  }
  return delays;
}
export default function BlindTransition() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const initialCols = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.floor(window.innerWidth / MIN_BLOCK_PX)));
  const colsRef = useRef(initialCols);
  const blockSizeRef = useRef(window.innerWidth / initialCols);
  const numRowsRef = useRef(9);
  const canvasRafRef = useRef(null);
  const animStartRef = useRef(0);
  const delaysRef = useRef([]);
  const timerRef = useRef(null);
  const phaseRef = useRef(null);
  const proceedRef = useRef(null);
  const rafRef = useRef(null);
  const isProceedingRef = useRef(false);
  const drawFrame = useCallback(timestamp => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const phase = phaseRef.current;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    if (phase === 'covered') {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#71c9ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      canvasRafRef.current = null;
      return;
    }
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#71c9ce';
      for (let i = 0; i < BLOCK_COUNT; i++) {
        const t = elapsed - (delays[i] ?? 0);
        const alpha = t <= 0 ? 0 : Math.min(t / BLOCK_ANIM_DURATION, 1);
        if (alpha <= 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillRect(i % cols * blockSize, Math.floor(i / cols) * blockSize, blockSize, blockSize);
      }
    } else {
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#71c9ce';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      for (let i = 0; i < BLOCK_COUNT; i++) {
        const t = elapsed - (delays[i] ?? 0);
        const faded = t <= 0 ? 0 : Math.min(t / BLOCK_ANIM_DURATION, 1);
        if (faded <= 0) continue;
        ctx.globalAlpha = faded;
        ctx.fillRect(i % cols * blockSize, Math.floor(i / cols) * blockSize, blockSize, blockSize);
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
    canvasRafRef.current = requestAnimationFrame(drawFrame);
  }, []);
  useEffect(() => {
    const el = containerRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
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
        const {
          width,
          height
        } = entry.contentRect;
        if (width === 0) return;
        const c = Math.min(MAX_COLS, Math.max(MIN_COLS, Math.floor(width / MIN_BLOCK_PX)));
        const bs = width / c;
        colsRef.current = c;
        blockSizeRef.current = bs;
        numRowsRef.current = Math.ceil(height / bs) + 1;
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);
        const phase = phaseRef.current;
        if (phase === 'covered') {
          const ctx = canvas.getContext('2d');
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1;
          ctx.fillStyle = '#71c9ce';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else if (phase === 'covering' || phase === 'uncovering') {
          cancelAnimationFrame(canvasRafRef.current);
          canvasRafRef.current = null;
          drawFrame(performance.now());
        }
      });
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [drawFrame]);
  const startCoveringRaf = useCallback(() => {
    cancelAnimationFrame(canvasRafRef.current);
    delaysRef.current = shuffleDelays(colsRef.current * numRowsRef.current);
    animStartRef.current = performance.now();
    canvasRafRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);
  const drawCoveredImmediate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#71c9ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  const startUncovering = useCallback(() => {
    clearTimeout(timerRef.current);
    delaysRef.current = shuffleDelays(colsRef.current * numRowsRef.current);
    animStartRef.current = performance.now();
    phaseRef.current = 'uncovering';
    cancelAnimationFrame(canvasRafRef.current);
    canvasRafRef.current = requestAnimationFrame(drawFrame);
    timerRef.current = setTimeout(() => {
      phaseRef.current = null;
    }, UNCOVER_TOTAL);
  }, [drawFrame]);
  const proceedThenUncover = useCallback(() => {
    const proceed = proceedRef.current;
    proceedRef.current = null;
    isProceedingRef.current = true;
    try {
      proceed?.();
    } catch {}
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = requestAnimationFrame(() => {
        isProceedingRef.current = false;
        startUncovering();
      });
    });
  }, [startUncovering]);
  const shouldBlockFn = useCallback(({
    currentLocation,
    nextLocation,
    historyAction
  }) => {
    if (historyAction === 'POP' || historyAction === 'REPLACE') return false;
    if (shouldSkipBlock()) return false;
    if (currentLocation.pathname === nextLocation.pathname) return false;
    if (!SIDEBAR_SECTIONS.has(getSection(nextLocation.pathname))) return false;
    if (getSection(currentLocation.pathname) === getSection(nextLocation.pathname)) return false;
    return true;
  }, []);
  const blocker = useBlocker(shouldBlockFn);
  useEffect(() => {
    if (blocker.state === 'blocked') {
      proceedRef.current = blocker.proceed;
    }
  }, [blocker.state, blocker.proceed]);
  useEffect(() => {
    if (blocker.state !== 'blocked') return;
    const currentPhase = phaseRef.current;
    if (currentPhase === null) {
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
    } else if (currentPhase === 'covering') {} else if (currentPhase === 'covered') {
      if (!isProceedingRef.current) {
        clearTimeout(timerRef.current);
        cancelAnimationFrame(rafRef.current);
        timerRef.current = setTimeout(() => {
          if (phaseRef.current !== 'covered') return;
          proceedThenUncover();
        }, COVERED_HOLD);
      }
    } else {
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
  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(canvasRafRef.current);
    };
  }, []);
  return <Styled.Container ref={containerRef}>
      <canvas ref={canvasRef} style={{
      display: 'block',
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    }} />
    </Styled.Container>;
}