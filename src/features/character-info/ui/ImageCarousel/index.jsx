import { useState, useEffect, useRef, useCallback } from 'react';
import * as Styled from './ImageCarousel.styled';
import FullSizeImage from '../FullSizeImage';
import MiniSizeImage from '../MiniSizeImage';
import ImageModal from '../ImageModal';

const AUTO_PLAY_INTERVAL = 3000;

export default function ImageCarousel({ skins, isLoading, onImageLoad }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalSkin, setModalSkin] = useState(null);
  const autoPlayRef = useRef(null);
  const currentIndexRef = useRef(1);
  const isLoadingRef = useRef(isLoading);
  // isTransitioning state는 useCallback 내에서 stale해지므로 ref로 별도 관리
  const isTransitioningRef = useRef(false);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  // 썸네일 가로 스크롤 — 마우스 휠을 가로 스크롤로 변환 (passive: false 필요)
  useEffect(() => {
    const el = thumbnailRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const totalSlides = skins.length + 2;
  const displayIndex =
    ((currentIndex - 1) % skins.length + skins.length) % skins.length;
  const slides = [skins[skins.length - 1], ...skins, skins[0]];

  useEffect(() => {
    isTransitioningRef.current = false;
    setCurrentIndex(1);
    setIsTransitioning(false);
  }, [skins]);

  // 활성 썸네일이 보이도록 수동 스크롤 (페이지 스크롤 없이)
  // getBoundingClientRect를 사용해 offsetParent 차이로 인한 좌표 불일치 방지
  useEffect(() => {
    const container = thumbnailRef.current;
    if (!container) return;
    const items = container.querySelectorAll('li');
    const activeItem = items[displayIndex];
    if (!activeItem) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const itemLeft = itemRect.left - containerRect.left + container.scrollLeft;
    const itemRight = itemRect.right - containerRect.left + container.scrollLeft;

    const paddingInline = 12;
    const viewStart = container.scrollLeft;
    const viewEnd = container.scrollLeft + container.clientWidth;
    const itemStart = itemLeft - paddingInline;
    const itemEnd = itemRight + paddingInline;

    if (itemStart < viewStart) {
      container.scrollTo({ left: itemStart, behavior: 'smooth' });
    } else if (itemEnd > viewEnd) {
      container.scrollTo({ left: itemEnd - container.clientWidth, behavior: 'smooth' });
    }
  }, [displayIndex]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      if (isLoadingRef.current || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setCurrentIndex((i) => i + 1);
    }, AUTO_PLAY_INTERVAL);
  }, []);

  useEffect(() => {
    if (skins.length <= 1 || isLoading) return;
    resetAutoPlay();
    return () => clearInterval(autoPlayRef.current);
  }, [isLoading, skins.length, resetAutoPlay]);

  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== 'transform') return;

      isTransitioningRef.current = false;
      const idx = currentIndexRef.current;
      const normalized = ((idx - 1 + skins.length) % skins.length) + 1;
      setIsTransitioning(false);
      if (normalized !== idx) {
        setCurrentIndex(normalized);
      }
    },
    [skins.length],
  );

  const goPrev = useCallback(() => {
    if (isLoadingRef.current || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((i) => i - 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goNext = useCallback(() => {
    if (isLoadingRef.current || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setCurrentIndex((i) => i + 1);
    resetAutoPlay();
  }, [resetAutoPlay]);

  const goToSlide = useCallback(
    (realIdx) => {
      if (isLoadingRef.current || isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setCurrentIndex(realIdx + 1);
      resetAutoPlay();
    },
    [resetAutoPlay],
  );

  const pauseAutoPlay = useCallback(() => clearInterval(autoPlayRef.current), []);
  const resumeAutoPlay = useCallback(() => {
    if (!isLoadingRef.current) resetAutoPlay();
  }, [resetAutoPlay]);

  const handleImageClick = useCallback((skin, e) => {
    if (window.matchMedia('(orientation: landscape)').matches) {
      const rect = e.currentTarget.getBoundingClientRect();
      setModalSkin({
        skin,
        originX: rect.left + rect.width / 2,
        originY: rect.top + rect.height / 2,
      });
    }
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.ViewPort>
        <Styled.Track
          $currentIndex={currentIndex}
          $totalSlides={totalSlides}
          $isTransitioning={isTransitioning}
          $isLoading={isLoading}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((skin, idx) => {
            const isClone = idx === 0 || idx === slides.length - 1;
            return (
              <Styled.SlideWrapper
                $totalSlides={totalSlides}
                key={`${skin.skin_id}-${idx}`}
              >
                <FullSizeImage
                  data={{
                    src: skin.full_size,
                    name: { kr: skin.name_kr, en: skin.name_en },
                  }}
                  handler={{ loadEvent: isClone ? () => {} : onImageLoad }}
                  onClick={isClone ? undefined : (e) => handleImageClick(skin, e)}
                />
              </Styled.SlideWrapper>
            );
          })}
        </Styled.Track>
        {isLoading && <Styled.Skeleton />}
        {!isLoading && skins.length > 1 && (
          <>
            <Styled.PrevButton
              onClick={goPrev}
              aria-label="이전 이미지"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              ‹
            </Styled.PrevButton>
            <Styled.NextButton
              onClick={goNext}
              aria-label="다음 이미지"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              ›
            </Styled.NextButton>
          </>
        )}
      </Styled.ViewPort>

      <Styled.ThumbnailList ref={thumbnailRef}>
        {skins.map((skin, idx) => (
          <MiniSizeImage
            key={skin.skin_id}
            src={skin.mini_size}
            alt={skin.name_en}
            isActive={!isLoading && idx === displayIndex}
            onClick={isLoading ? undefined : () => goToSlide(idx)}
          />
        ))}
      </Styled.ThumbnailList>

      {modalSkin && (
        <ImageModal
          src={modalSkin.skin.full_size}
          label={modalSkin.skin.name_kr}
          originX={modalSkin.originX}
          originY={modalSkin.originY}
          onClose={() => setModalSkin(null)}
        />
      )}
    </Styled.Wrapper>
  );
}
