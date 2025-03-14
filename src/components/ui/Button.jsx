import styled from "styled-components";

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
    <StyledButton
      onClick={eventHandler}
      $textColor={color}
      $hoverColor={hoverColor}
      $bgc={backgroundColor}
      $hbgc={hoverBackgroundColor}
      $hasText={text}
    >
      {children}
      {text && <P $isContraction={text && !children}>{text}</P>}
    </StyledButton>
  );
};
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$hasText ? "0.5rem" : "0")};
  line-height: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  word-break: break-all;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1rem;
  background-color: ${(props) => props.$bgc || "#fff"};
  color: ${(props) => props.$textColor || "#000"};
  transition: color 0.2s;
  &:hover {
    color: ${(props) => props.$hoverColor || "rgb(107, 114, 128)"};
    background-color: ${(props) => props.$hbgc || null};
  }
`;
const P = styled.p`
  display: ${(props) => props.$isContraction || "none"};
  padding: 0;
  margin: 0;
  @media screen and (min-width: 768px) {
    display: block;
  }
`;
export default Button;
