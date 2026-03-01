import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
`;

export const ShimmerOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  background: linear-gradient(90deg, #cbf1f5 25%, #a6e3e9 50%, #cbf1f5 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

export const ContentArea = styled.div`
  height: 100%;
  opacity: ${(props) => (props.$isReady ? 1 : 0)};
  transition: opacity 0.4s ease;
`;
