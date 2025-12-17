import styled from 'styled-components';
import { slideUpPC, slideDownPC, slideUpMB, slideDownMB } from '@/shared/ui/styles';

export const Toast = styled.div`
  background-color: ${(props) =>
    props.$type === 'alert'
      ? '#424874'
      : props.$type === 'failed'
      ? '#FF9494'
      : '#EAFFD0'};
  color: ${(props) => (props.$type === 'successed' ? '#000' : '#fff')};
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
