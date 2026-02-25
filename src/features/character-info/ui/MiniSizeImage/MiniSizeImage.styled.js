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

export const Li = styled.li`
  list-style: none;
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  border: 2px solid ${({ $active }) => ($active ? '#71C9CE' : 'rgba(0,0,0,0.1)')};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.15s ease, border-color 0.15s ease;
  transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};

  &:hover {
    border-color: #A6E3E9;
  }
`;

export const Skel = styled.li`
  list-style: none;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  flex-shrink: 0;
  pointer-events: none;
  ${shimmerStyle}
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  -webkit-user-drag: none;
  user-select: none;
`;
