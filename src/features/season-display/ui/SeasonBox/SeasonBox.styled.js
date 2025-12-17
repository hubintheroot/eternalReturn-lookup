import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  position: relative;
  width: 100vw;
  color: #fff;
  /* background-color: rgba(51, 51, 51, 0.3); */
`;

export const ImgBox = styled.div`
  position: absolute;
  z-index: -1;
  display: flex;
  height: 100%;
  max-height: 350px;
  width: 100vw;
  justify-content: center;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Image = styled.img`
  /* position: absolute;
  top: 0;
  left: 0;
  z-index: -1; */
  width: auto;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: -360px 0px;
  @media screen and (min-width: 769px) {
    object-position: center;
  }
  /* object-position: -360px 0px; */
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 350px;
  padding: 20px 15px;
  box-sizing: border-box;
`;

export const TitleDiv = styled.div`
  color: #fff;
  padding: 0.5rem 0;
  @media screen and (min-width: 768px) {
    padding: 1rem 0;
  }
`;

export const SeasonTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  @media screen and (min-width: 480px) {
    font-size: 1.8rem;
  }
  @media screen and (min-width: 768px) {
    font-size: 2.2rem;
  }
  /* margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2.5rem; */
`;

export const SeasonPeriodInfo = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  margin-top: 0.3rem;

  @media screen and (min-width: 480px) {
    font-size: 1rem;
    margin-top: 0.5px;
  }
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
  }
  /* font-size: 2.5rem; */
`;

export const SeasonTimeLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  .season-time-left-box {
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 20px;
  }
  & > div > h2 {
    margin: 0 0 0.5rem 0;
    font-weight: 700;
    font-size: 1.2rem;
    @media screen and (min-width: 480px) {
      font-size: 1.4rem;
    }
    @media screen and (min-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
  }
`;

export const PreviousSeasonWrapper = styled.div`
  opacity: 0.7;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;
