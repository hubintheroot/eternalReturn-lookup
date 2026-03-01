import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
`;

const shimmerStyle = css`
  background: linear-gradient(90deg, #CBF1F5 25%, #A6E3E9 50%, #CBF1F5 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const noDrag = css`
  -webkit-user-drag: none;
  user-select: none;
`;

export const Li = styled.li`
  list-style: none;
`;

export const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: #1a1a1a;
  border-radius: 8px;
  border: 2px solid ${({ $active }) => ($active ? '#71C9CE' : 'transparent')};
  overflow: hidden;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ $active }) => ($active ? '#71C9CE' : '#A6E3E9')};
  }
`;

export const Figure = styled.figure`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 23 / 31;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(26, 35, 47, 1) 0%,
    rgba(39, 59, 80, 1) 50%,
    rgba(50, 79, 107, 1) 100%
  );
`;

export const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  ${noDrag}

  &.prepare-image {
    object-fit: contain;
    background-color: #E3FDFD;
  }
`;

export const UnlockIcon = styled.img`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  z-index: 2;
  pointer-events: none;
  ${noDrag}
`;

export const Figcaption = styled.figcaption`
  font-size: 11px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
  padding: 4px 4px;
  background-color: ${({ $active }) => ($active ? '#A6E3E9' : '#E3FDFD')};
`;

export const SkelCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
`;

export const SkelImg = styled.div`
  aspect-ratio: 23 / 31;
  width: 100%;
  ${shimmerStyle}
`;

export const SkelCaption = styled.div`
  height: 20px;
  ${shimmerStyle}
`;
