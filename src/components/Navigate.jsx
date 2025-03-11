import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function Navigate({ info }) {
  const menus = info.map((info, index) => (
    <StyledLink to={info.link} key={index}>
      <span>{info.text}</span>
    </StyledLink>
  ));

  return <Nav>{menus}</Nav>;
}

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  gap: 1em;
  margin-left: 1em;
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
`;
