import type { ReactElement } from 'react';
import * as Styled from './comingsoon.styled';

interface ComingSoonViewProps {
  data: {
    text: string;
  };
}

export default function ComingSoonView({ data }: ComingSoonViewProps): ReactElement {
  return (
    <Styled.Container>
      <h1>Coming Soon</h1>
      <div>
        <p>{data.text}</p>
      </div>
    </Styled.Container>
  );
}
