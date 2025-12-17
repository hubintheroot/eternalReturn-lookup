import * as Styled from './Button.styled';

export const Button = ({
  eventHandler,
  children,
  text,
  color = null,
  hoverColor = null,
  backgroundColor = null,
  hoverBackgroundColor = null,
}) => {
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
      {text && <Styled.Text $isContraction={text && !children}>{text}</Styled.Text>}
    </Styled.Button>
  );
};

export default Button;
