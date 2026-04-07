import styled from 'styled-components';

interface ButtonStyleProps {
  $textColor: string | null;
  $hoverColor: string | null;
  $bgc: string | null;
  $hbgc: string | null;
  $hasText: string | undefined;
}

interface TextStyleProps {
  $isContraction: boolean;
}

export const Button = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$hasText ? '0.5rem' : '0')};
  line-height: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  word-break: break-all;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  background-color: ${(props) => props.$bgc || '#fff'};
  color: ${(props) => props.$textColor || '#000'};
  transition: color 0.2s;
  &:hover {
    color: ${(props) => props.$hoverColor || 'rgb(107, 114, 128)'};
    background-color: ${(props) => props.$hbgc || null};
  }
`;

export const Text = styled.p<TextStyleProps>`
  display: ${(props) => (props.$isContraction ? 'block' : 'none')};
  padding: 0;
  margin: 0;
  word-break: keep-all;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
