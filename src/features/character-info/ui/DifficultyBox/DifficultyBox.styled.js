import styled from 'styled-components';

export const DiffBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
`;

export const Difficulty = styled.div`
  margin: 0 0.1rem;
  background-color: ${(props) => (props.$empty ? 'lightgray' : 'lightblue')};
  box-sizing: border-box;
  border: 0.1rem solid lightskyblue;
  width: 0.8rem;
  height: 1.2rem;
  transform: skew(-20deg);
`;
