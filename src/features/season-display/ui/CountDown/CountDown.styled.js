import styled from 'styled-components';
export const Container = styled.div`
  width: 100%;
  max-width: 375px;
  max-height: 350px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  box-sizing: border-box;
  @media screen and (min-width: 480px) {
    max-width: 500px;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }
  @media screen and (min-width: 768px) {
    max-width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    padding: 20px 10px;
  }
`;
export const SubTitle = styled.div`
  & > .tjqmxkdlxmf {
    font-weight: bold;
    font-size: 0.75rem;
    margin: auto.2rem 0 0 0;
    width: auto;
    text-align: center;
    white-space: nowrap;
    @media screen and (min-width: 480px) {
      font-size: 0.8rem;
    }
    @media screen and (min-width: 768px) {
      font-size: 0.9rem;
      margin-top: 0.3rem;
    }
    @media screen and (min-width: 990px) {
      font-size: 1rem;
      margin-top: 0.4rem;
    }
  }
`;
export const ClockBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 2rem;
  gap: 0.5rem;
  @media screen and (min-width: 480px) {
    justify-content: center;
    flex-direction: column;
    padding: 0;
    gap: 0;
  }
  @media screen and (min-width: 990px) {
    margin: 0 5px;
  }
`;
export const Clock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1px;

  @media screen and (min-width: 400px) {
    gap: 3px;
  }
`;