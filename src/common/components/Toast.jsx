import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

export default function Toast({ data, handler }) {
  const [isEnd, setEnd] = useState(false);

  useEffect(() => {
    if (data.timer.current) clearTimeout(data.timer.current);
    data.timer.current = setTimeout(() => {
      setEnd(true);
    }, 2000);

    return () => {
      clearTimeout(data.timer.current);
    };
  }, [data]);

  useEffect(() => {
    if (isEnd) {
      if (data.timer.current) clearTimeout(data.timer.current);
      data.timer.current = setTimeout(() => {
        handler.hide();
      }, 500);
    }
  }, [data.timer, handler, isEnd]);

  const content = (
    <StyledToast $show={isEnd} $type={data.status}>
      {data.message}
    </StyledToast>
  );

  const el = document.getElementById("toast");
  return !el ? null : createPortal(content, el);
}

const slideUpPC = keyframes`
  from {
    transform: translateY(1em);
    opacity: 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideDownPC = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to{
    transform: translateY(1em);
    opacity: 0;
  }
`;
const slideUpMB = keyframes`
  from {
    transform: translate(-50%, 1em);
    opacity: 1;
  }
  to{
    transform: translate(-50%, 0);
    opacity: 0;
  }
`;
const slideDownMB = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 0;
  }
  to{
    transform: translate(-50%, 1em);
    opacity: 1;
  }
`;

const StyledToast = styled.div`
  background-color: ${(props) =>
    props.$type === "alert"
      ? "#424874"
      : props.$type === "failed"
      ? "#FF9494"
      : "#EAFFD0"};
  color: ${(props) => (props.$type === "successed" ? "#000" : "#fff")};
  position: fixed;
  word-break: keep-all;
  padding: 1rem;
  width: 300px;
  text-align: center;
  font-size: large;
  font-weight: bold;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

  @media screen and (max-width: 767px) {
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    animation-name: ${(props) => (!props.$show ? slideDownMB : slideUpMB)};
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }

  @media screen and (min-width: 768px) {
    bottom: 4rem;
    right: 5rem;
    animation-name: ${(props) => (props.$show ? slideDownPC : slideUpPC)};
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
`;
