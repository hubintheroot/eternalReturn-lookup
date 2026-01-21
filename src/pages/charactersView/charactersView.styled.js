import styled from 'styled-components';

export const StyledMain = styled.main`
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }

  max-height: calc(100vh - 64px);
  width: 100%;
  margin: 20px auto 0;
`;

export const PageTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;
