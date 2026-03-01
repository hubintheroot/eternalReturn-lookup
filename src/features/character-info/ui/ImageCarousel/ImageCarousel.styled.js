import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerStyle = css`
  background: linear-gradient(90deg, #CBF1F5 25%, #A6E3E9 50%, #CBF1F5 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #E3FDFD;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #A6E3E9;
    border-radius: 8px;
    &:hover {
      background-color: #71C9CE;
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media screen and (orientation: landscape) {
    height: 100%;
  }
`;

export const ViewPort = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 5/6;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(26, 35, 47, 1) 0%,
    rgba(39, 59, 80, 1) 50%,
    rgba(50, 79, 107, 1) 100%
  );

  @media screen and (orientation: landscape) {
    flex: 1;
    aspect-ratio: unset;
    width: 100%;
  }
`;

export const Track = styled.div`
  display: flex;
  height: 100%;
  width: calc(${(props) => props.$totalSlides} * 100%);
  transform: translateX(
    calc(-${(props) => props.$currentIndex} / ${(props) => props.$totalSlides} * 100%)
  );
  transition: ${(props) =>
    props.$isTransitioning ? 'transform 0.3s ease' : 'none'};
  visibility: ${(props) => (props.$isLoading ? 'hidden' : 'visible')};
`;

export const SlideWrapper = styled.div`
  flex: 0 0 calc(100% / ${(props) => props.$totalSlides});
  width: calc(100% / ${(props) => props.$totalSlides});
  height: 100%;
  position: relative;
`;

export const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  ${shimmerStyle}
`;

export const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 32px;
  background: rgba(113, 201, 206, 0.7);
  color: #fff;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background: #71C9CE;
  }
`;

export const NextButton = styled(PrevButton)`
  left: unset;
  right: 8px;
`;

export const ThumbnailList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 8px 12px;
  gap: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  background-color: #CBF1F5;
  flex-shrink: 0;
  scroll-padding-inline: 12px;
  ${scrollbarStyle}
`;
