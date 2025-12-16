import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export default function Modal({ children }) {
  useEffect(() => {
    document.body.style = "overflow: hidden";
    return () => (document.body.style = "overflow: auto");
  }, []);
  const content = <BackGround>{children}</BackGround>;

  const el = document.getElementById("modal");

  return !el ? null : createPortal(content, el);
}

const BackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
