import * as Styled from './NotFoundView.styled';

export default function NotFoundView({ message = '페이지' }) {
  return (
    <Styled.ErrorContainer>
      <h1>Code-404</h1>
      <div>
        <p>{message}를 찾을 수 없습니다.</p>
      </div>
    </Styled.ErrorContainer>
  );
}
