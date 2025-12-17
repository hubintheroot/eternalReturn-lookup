import styled from 'styled-components';

// Main container with responsive padding
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media screen and (min-width: 768px) {
    padding: 0 2rem;
  }
`;

// Section wrapper
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
`;

// Card/Box component
export const Box = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

// Flex container
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$direction || 'row'};
  align-items: ${(props) => props.$align || 'stretch'};
  justify-content: ${(props) => props.$justify || 'flex-start'};
  gap: ${(props) => props.$gap || '0'};
  flex-wrap: ${(props) => props.$wrap || 'nowrap'};
`;

// Grid container
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns || 'repeat(auto-fill, minmax(250px, 1fr))'};
  gap: ${(props) => props.$gap || '1rem'};
`;
