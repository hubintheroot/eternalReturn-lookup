import styled from 'styled-components';

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  -webkit-user-drag: none;
  user-select: none;
`;

export const Title = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(113, 201, 206, 0.75);
  color: #fff;
  padding: 4px 14px 6px 10px;
  border-top-right-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  pointer-events: none;
`;
