import { styled } from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 64px);
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

export default function NotFoundView() {
  return (
    <ErrorContainer>
      <h1>Code-404</h1>
      <div>
        <p>페이지를 찾을 수 없습니다.</p>
      </div>
    </ErrorContainer>
  );
}
