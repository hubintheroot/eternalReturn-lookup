import { styled } from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
  background-color: #fff;
  color: #000;
`;

export default function NotFoundView({ message = "페이지" }) {
  return (
    <ErrorContainer>
      <h1>Code-404</h1>
      <div>
        <p>{message}를 찾을 수 없습니다.</p>
      </div>
    </ErrorContainer>
  );
}
