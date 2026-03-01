import styled, { css } from 'styled-components';
export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #E3FDFD;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #A6E3E9;
    border-radius: 8px;
    &:hover {
      background-color: #71C9CE;
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`;
export const Box = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.$direction || 'row'};
  align-items: ${props => props.$align || 'stretch'};
  justify-content: ${props => props.$justify || 'flex-start'};
  gap: ${props => props.$gap || '0'};
  flex-wrap: ${props => props.$wrap || 'nowrap'};
`;
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${props => props.$columns || 'repeat(auto-fill, minmax(250px, 1fr))'};
  gap: ${props => props.$gap || '1rem'};
`;