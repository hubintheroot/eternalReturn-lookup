import * as Styled from './comingsoon.styled';

export default function ComingSoonView({ data }) {
  return (
    <Styled.Container>
      <h1>Coming Soon</h1>
      <div>
        <p>{data.text}</p>
      </div>
    </Styled.Container>
  );
}
