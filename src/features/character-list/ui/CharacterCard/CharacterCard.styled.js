import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.2rem;
  margin: 0 1rem;
`;

export const Card = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;

  & .prepare-image {
    width: 48px;
    height: 48px;
    top: 8px;
    left: 8px;
  }
`;

export const ImgBox = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  margin-bottom: 4px;
`;

export const Free = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: 40;
  top: -5px;
  left: -5px;
`;

export const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Figcaption = styled.figcaption`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

export const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
  &:hover > ${Figcaption} {
    color: rgb(153, 153, 153);
  }
`;

const pulseKeyFrame = keyframes`
    0% {
        opacity: .5;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .5;
    }
`;

export const SkelStyledLink = styled(StyledLink)`
  animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
`;

export const SkelFigcaption = styled(Figcaption)`
  background-color: lightgrey;
  height: 12px;
  width: 100%;
`;

export const SkelImgBox = styled(ImgBox)`
  background-color: lightgrey;
`;
