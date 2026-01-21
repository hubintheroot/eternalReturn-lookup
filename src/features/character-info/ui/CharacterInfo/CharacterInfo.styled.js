import styled, { keyframes, css } from 'styled-components';

const skelAnimation = keyframes`
    0% {
        opacity: .6;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .6;
    }
`;

const animation = css`
  animation: ${skelAnimation} 1.5s ease-in-out infinite;
`;

export const Section = styled.section`
  box-sizing: border-box;
  ${(props) => (props.$isLoading ? animation : null)};

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const InfoDiv = styled.div`
  width: 18rem;
  word-break: keep-all;
  word-wrap: break-word;
  ${(props) =>
    props.$isLoading
      ? `
        pointer-events: none;
        cursor: default;
        & .content {
          max-width: fit-content;
          background-color: lightgrey;
          border-radius: 5px;
        }

        & .content > .story-desc {
          width: 18rem;
          height: 25rem;
        }

        & .content > div {
            opacity: 0;
        }
    `
      : null}
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const ImgDiv = styled(FlexDiv)`
  flex-direction: row;
  gap: 2rem;
  width: 40rem;
  margin-bottom: 4rem;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    max-width: 382px;
    margin: 0 auto 4rem;
    margin-top: 1rem;
    gap: 1rem;
    height: 653px;
    justify-content: flex-start;
  }
  @media screen and (max-width: 429px) {
    width: 100%;
  }
`;

export const Container = styled(FlexDiv)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 1rem;
  min-height: 856px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    gap: 2rem;
    justify-content: flex-start;
  }
`;

export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    width: 100%;
    gap: 0.2rem;
  }
`;

export const TitleBox = styled(FlexDiv)`
  margin-top: 1.5rem;
  flex-direction: column;
  gap: 0.5rem;

  ${(props) =>
    props.$isLoading
      ? `
        pointer-events: none;
        cursor: default;
        & .content {
          max-width: fit-content;
          background-color: lightgrey;
          border-radius: 5px;
        }
        & .content > * {
        opacity: 0;
        }
    `
      : null}
`;

export const CharNameBox = styled.div`
  display: flex;
  margin: 1rem 0 0;
`;

export const CharName = styled.h1`
  margin: 0;
`;

export const Span = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1rem;
  display: flex;
  align-items: end;
  &::before {
    content: '"';
  }
  &::after {
    content: '"';
  }
`;

export const ControlDiffBox = styled(FlexDiv)`
  flex-direction: row;
  font-size: 0.8rem;
  line-height: 1.2rem;
  gap: 1rem;
`;

export const InfoContent = styled(FlexDiv)`
  line-height: 2rem;
  margin: 0.5rem 0;
  gap: 1rem;
`;

export const InfoContentTitle = styled(FlexDiv)`
  justify-content: center;
  padding: 0 0.5rem;
  border: 0.1rem solid #000;
  border-radius: 0.8rem;
  width: 2rem;
  font-weight: 800;
`;

export const DescContent = styled.div`
  margin: 1rem 0 0;
  white-space: pre-wrap;
  & > p {
    padding: 0;
    line-height: 2rem;
  }
`;

export const FullBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  @media screen and (min-width: 767px) {
    margin-bottom: 2rem;
  }
`;
