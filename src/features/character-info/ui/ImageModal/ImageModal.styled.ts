import styled, { keyframes } from 'styled-components';

const fadeInOverlay = keyframes`
  from { background-color: rgba(0, 0, 0, 0); }
  to   { background-color: rgba(0, 0, 0, 0.78); }
`;

const expandFromOrigin = keyframes`
  from {
    transform: translate(var(--tx), var(--ty)) scale(0.12);
    opacity: 0;
  }
  to {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeInOverlay} 0.35s ease forwards;
`;

export const ModalBox = styled.div`
  position: relative;
  height: calc(100vh - 80px);
  width: calc(100vh - 80px);
  max-width: 90vw;
  max-height: 90vw;
  background-color: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  animation: ${expandFromOrigin} 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  -webkit-user-drag: none;
  user-select: none;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-color: #71c9ce;
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  line-height: 1;

  &:hover {
    background-color: #a6e3e9;
  }
`;

export const SkinLabel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(113, 201, 206, 0.85);
  color: #fff;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  font-weight: 500;
`;
