import styled from 'styled-components';
export const DiffBox = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 3px 5px;
  border: 2px solid #71C9CE;
  border-radius: 8px;
  background-color: #E3FDFD;

  &::after {
    content: '';
    position: absolute;
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    width: 5px;
    height: 10px;
    background-color: #71C9CE;
    border-radius: 0 8px 8px 0;
  }
`;
export const Difficulty = styled.div`
  width: 8px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.$empty ? 'rgba(113, 201, 206, 0.2)' : '#71C9CE'};
  box-sizing: border-box;
`;