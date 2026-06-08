import type { ReactNode } from 'react';
import * as Styled from './Button.styled';

interface ButtonProps {
  eventHandler?: () => void;
  children?: ReactNode;
  text?: string;
  color?: string | null;
  hoverColor?: string | null;
  backgroundColor?: string | null;
  hoverBackgroundColor?: string | null;
  disabled?: boolean;
}

export const Button = ({
  eventHandler,
  children,
  text,
  color = null,
  hoverColor = null,
  backgroundColor = null,
  hoverBackgroundColor = null,
  disabled = false,
}: ButtonProps) => {
  return (
    <Styled.Button
      onClick={eventHandler}
      $textColor={color}
      $hoverColor={hoverColor}
      $bgc={backgroundColor}
      $hbgc={hoverBackgroundColor}
      $hasText={text}
      disabled={disabled}
    >
      {children}
      {text && (
        <Styled.Text $isContraction={!!(text && !children)}>{text}</Styled.Text>
      )}
    </Styled.Button>
  );
};

export default Button;
