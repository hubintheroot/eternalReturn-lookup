import styled from 'styled-components';

interface LangButtonProps {
  $active: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const LangButton = styled.button<LangButtonProps>`
  cursor: pointer;
  background: transparent;
  border: 1px solid ${props => props.$active ? 'rgb(17, 24, 39)' : 'rgb(209, 213, 219)'};
  border-radius: 0.375rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? 'rgb(17, 24, 39)' : 'rgb(107, 114, 128)'};
  transition: border-color 0.2s, color 0.2s;

  &:hover {
    border-color: rgb(17, 24, 39);
    color: rgb(17, 24, 39);
  }
`;
