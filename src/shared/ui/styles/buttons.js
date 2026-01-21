import styled from 'styled-components';

// Base button with common properties
export const BaseButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// Primary action button
export const PrimaryButton = styled(BaseButton)`
  background-color: #4f46e5;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }
`;

// Secondary/outline button
export const SecondaryButton = styled(BaseButton)`
  background-color: transparent;
  color: rgb(107, 114, 128);
  padding: 0.5rem 1rem;
  border: 1px solid rgb(209, 213, 219);
  border-radius: 0.375rem;

  &:hover:not(:disabled) {
    background-color: rgb(240, 240, 240);
  }
`;

// Icon button (circular or minimal)
export const IconButton = styled(BaseButton)`
  background-color: transparent;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: rgb(107, 114, 128);

  &:hover:not(:disabled) {
    background-color: rgb(243, 244, 246);
    color: rgb(31, 41, 55);
  }
`;
