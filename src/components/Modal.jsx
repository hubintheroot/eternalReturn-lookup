import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Modal({ children }) {
  useEffect(() => {
    document.body.style = "overflow: hidden";
    return () => (document.body.style = "overflow: auto");
  }, []);
  const content = (
    <BackGround>
      <Container>{children}</Container>
    </BackGround>
  );

  const el = document.getElementById("modal");

  return !el ? null : createPortal(content, el);
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  background-color: white;
  padding: 1rem;
  margin: auto;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;
