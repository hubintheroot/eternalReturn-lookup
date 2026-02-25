import styled from 'styled-components';

export const StyledCharacterListBox = styled.div`
  @media (orientation: landscape) {
    flex: 0 0 40vw;
  }
`;

export const StyledMain = styled.main`
  height: calc(100vh - 124px);
  overflow-y: auto;
  width: 100%;
  margin: 20px auto 0;
  padding: 0 clamp(6px, 2vw, 16px) 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (orientation: landscape) {
    flex-direction: row;
    gap: clamp(12px, 2vw, 20px);
    height: calc(100vh - 124px);
    overflow: hidden;
    max-width: min(1600px, 100%);
    margin-top: 0;
    padding: 20px clamp(10px, 2vw, 20px);
  }
`;

export const PageTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;
