import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Ul = styled.ul`
  padding: 0;
  margin: 0;
  width: 60rem;
`;

export const Li = styled.li`
  display: flex;

  > div {
    flex-grow: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > div:nth-of-type(2) {
    flex-grow: 5;
  }
  > div:nth-of-type(3) {
    flex-grow: 2;
  }
`;
