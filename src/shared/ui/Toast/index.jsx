import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './Toast.styled';

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
    <Styled.Toast $show={isEnd} $type={data.status}>
      {data.message}
    </Styled.Toast>
  );

  const el = document.getElementById('toast');
  return !el ? null : createPortal(content, el);
}
