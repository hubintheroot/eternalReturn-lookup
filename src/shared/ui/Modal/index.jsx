import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './Modal.styled';

export default function Modal({ children }) {
  useEffect(() => {
    document.body.style = 'overflow: hidden';
    return () => (document.body.style = 'overflow: auto');
  }, []);
  const content = <Styled.Background>{children}</Styled.Background>;

  const el = document.getElementById('modal');

  return !el ? null : createPortal(content, el);
}
