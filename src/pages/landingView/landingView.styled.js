import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  opacity: ${(props) => (props.$isReady ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

export const BottomSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 16px;
  background-color: #f0fafc;
  overflow: hidden;
  min-height: 0;
`;

export const PatchNotesArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 640px;
  margin-top: 24px;
`;

export const PatchNotesLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  align-self: flex-start;

  @media screen and (min-width: 768px) {
    font-size: 0.82rem;
  }
`;

export const SectionDivider = styled.div`
  width: 100%;
  max-width: 640px;
  height: 1px;
  background-color: rgba(113, 201, 206, 0.25);
  margin: 18px 0;
`;

export const NavRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 640px;
`;

export const PatchNotesRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  max-width: 640px;
`;

export const PatchNoteCard = styled(Link)`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px 16px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  text-decoration: none;
  color: inherit;
  border: 1px solid #d8f0f3;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding: 16px 20px;
  }
`;

export const PatchNoteTitle = styled.p`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const PatchNoteMeta = styled.span`
  margin-top: 8px;
  font-size: 0.75rem;
  color: #999;

  @media screen and (min-width: 768px) {
    font-size: 0.85rem;
  }
`;

/* BtnCharImg을 NavLinkBtn보다 먼저 선언해야 ${BtnCharImg} 참조가 동작함 */
export const BtnCharImg = styled.img`
  height: 60px;
  width: auto;
  object-fit: contain;
  object-position: top center;
  display: block;
  flex-shrink: 0;
  transform-origin: center top;
  transform: scale(3);
  transition: transform 0.3s ease 0.3s;

  @media (hover: hover) {
    transform: scale(1);
  }

  @media screen and (min-width: 768px) {
    height: 72px;
  }
`;

export const NavLinkBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 0 20px;
  background-color: #71c9ce;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none;
  letter-spacing: 0.02em;
  box-shadow: 0 2px 8px rgba(113, 201, 206, 0.4);
  overflow: hidden;
  box-sizing: border-box;

  @media screen and (min-width: 768px) {
    font-size: 1rem;
    padding-left: 24px;
  }

  @media (hover: hover) {
    &:hover ${BtnCharImg} {
      transform: scale(3);
      transition: transform 0.3s ease;
    }
  }
`;
