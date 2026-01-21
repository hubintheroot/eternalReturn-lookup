import styled, { css } from 'styled-components';
import { Img } from '../MiniSizeImage/MiniSizeImage.styled';

const visibleStyle = css`
  ${(props) => (props.$visible ? `display: block` : `display: none;`)}
`;

const skelStyle = css`
  background-color: lightgrey;
  border-radius: 5px;
  background-image: none;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  ${visibleStyle}
`;

export const FullImg = styled(Img)`
  object-position: top;
  width: 100%;
  height: 100%;
  ${visibleStyle}
`;

export const Title = styled.span`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 700;
  top: -2rem;
  ${visibleStyle}
`;

export const Skel = styled(Container)`
  ${skelStyle}
  ${visibleStyle}
`;

export const SkelTitle = styled(Title)`
  min-width: 8rem;
  min-height: 1.8rem;
  ${skelStyle}
`;
