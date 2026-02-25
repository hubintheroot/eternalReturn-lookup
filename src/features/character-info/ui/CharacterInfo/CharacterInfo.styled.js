import styled, { keyframes, css } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

export const shimmerStyle = css`
  background: linear-gradient(90deg, #CBF1F5 25%, #A6E3E9 50%, #CBF1F5 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const slideFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
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

export const Section = styled.section`
  width: 100%;
  box-sizing: border-box;
  position: relative;

  @media screen and (orientation: landscape) {
    flex-grow: 1;
    min-width: 0;
    height: 100%;

    ${(props) =>
      props.$isEntering &&
      css`
        animation: ${slideFromRight} 0.3s ease-out;
      `}
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  background-color: #A6E3E9;
  border-bottom: 2px solid #71C9CE;
  padding: 6px 12px;
  color: #1a1a1a;
  flex-shrink: 0;

  ${(props) =>
    props.$isLoading &&
    css`
      pointer-events: none;
      cursor: default;
      & .content {
        background-color: #CBF1F5;
        border-radius: 8px;
        ${shimmerStyle}
      }
      & .content > * {
        opacity: 0;
      }
    `}
`;

export const CharNameBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 0;
`;

export const CharName = styled.h1`
  margin: 0;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
`;

export const Span = styled.span`
  font-size: clamp(0.8rem, 1.5vw, 0.95rem);
  font-weight: 400;
  color: #444;
  &::before {
    content: '"';
  }
  &::after {
    content: '"';
  }
`;

export const ControlDiffBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: clamp(0.7rem, 1.2vw, 0.8rem);
  gap: 0.5rem;
  margin-left: auto;
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;

  @media screen and (orientation: landscape) {
    flex-direction: row-reverse;
    align-items: stretch;
  }
`;

export const ImgDiv = styled.div`
  width: 100%;

  @media screen and (orientation: landscape) {
    flex: 6;
    min-width: 0;
    max-width: unset;
    margin: 0;
    overflow: hidden;
  }
`;

export const InfoDiv = styled.div`
  min-width: 0;
  word-break: keep-all;
  word-wrap: break-word;
  padding: 0.5rem 1rem;

  ${(props) =>
    props.$isLoading &&
    css`
      pointer-events: none;
      cursor: default;
      & .content {
        max-width: fit-content;
        background-color: #CBF1F5;
        border-radius: 8px;
      }
      & .content > .story-desc {
        width: 18rem;
        height: 25rem;
        ${shimmerStyle}
      }
      & .content > div {
        opacity: 0;
      }
    `}

  & .content:has(> .story-desc) {
    max-height: 40vh;
    overflow-y: auto;
    background-color: #E3FDFD;
    border-radius: 8px;
    ${scrollbarStyle}
  }

  @media screen and (orientation: landscape) {
    flex: 4;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;

    & .content:has(> .story-desc) {
      max-height: none;
      overflow-y: auto;
    }
  }
`;

export const InfoContent = styled.div`
  display: flex;
  line-height: 1;
  margin: 0.5rem 0;
  gap: 1rem;
`;

export const InfoContentTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 8px;
  background-color: #71C9CE;
  color: #fff;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const DescContent = styled.div`
  white-space: pre-wrap;
  background-color: #E3FDFD;
  padding: 10px;
  border-radius: 8px;
  width: 100%;

  > p {
    padding: 0;
    margin: 0;
    line-height: 1.8rem;
  }

  @media screen and (orientation: portrait) {
    background-color: transparent;
    border-radius: 0;
  }

  @media screen and (orientation: landscape) {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    ${scrollbarStyle}

    > p {
      line-height: 1.5rem;
    }
  }
`;
