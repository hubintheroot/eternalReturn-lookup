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
}

export const Button = ({
  eventHandler,
  children,
  text,
  color = null,
  hoverColor = null,
  backgroundColor = null,
  hoverBackgroundColor = null,
}: ButtonProps) => {
  return (
    <Styled.Button
      onClick={eventHandler}
      $textColor={color}
      $hoverColor={hoverColor}
      $bgc={backgroundColor}
      $hbgc={hoverBackgroundColor}
      $hasText={text}
    >
      {children}
      {text && <Styled.Text $isContraction={!!(text && !children)}>{text}</Styled.Text>}
    </Styled.Button>
  );
};

export default Button;
