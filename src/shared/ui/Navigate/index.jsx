import { Link } from "react-router-dom";
import { css, styled } from "styled-components";

export default function Navigate({ info, direction = 'row', onLinkClick }) {
  return (
    <Nav $direction={direction}>
      {info.map((item, index) => (
        <StyledLink to={item.link} key={index} $direction={direction} onClick={onLinkClick}>
          <span>{item.text}</span>
        </StyledLink>
      ))}
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 0.5rem;
  margin-left: 0.5rem;
  @media screen and (min-width: 768px) {
    gap: 1rem;
    margin-left: 1rem;
  }

  ${(props) =>
    props.$direction === 'column' &&
    css`
      flex-direction: column;
      align-items: stretch;
      height: auto;
      gap: 0;
      margin-left: 0;
    `}
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 1.2em;
  margin: 0;
  width: 100%;
  height: 100%;
  &:hover {
    color: grey;
  }

  & > span {
    word-break: keep-all;
  }

  ${(props) =>
    props.$direction === 'column' &&
    css`
      color: #fff;
      font-size: clamp(0.9rem, 1.4vw, 1rem);
      font-weight: 600;
      height: auto;
      padding: 14px 20px;
      align-items: flex-start;
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
        color: #fff;
      }
    `}
`;
