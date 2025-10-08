import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeasonInfo } from '@/entities/season/model/seasonInfoSlice';
import styled from 'styled-components';
import { supabase } from '@/shared/api/supabase';
import CountDown from './CountDown';

export default function SeasonBox() {
  const dispatch = useDispatch();
  const getDataCnt = useRef(0);
  const seasonInfo = useSelector((state) => state.seasonInfo.data);

  useEffect(() => {
    async function getData() {
      try {
        const res = await supabase()
          .from('seasonInfo')
          .select('*')
          .eq('isCurrent', true);
        dispatch(setSeasonInfo(res.data[0]));
      } catch (err) {
        console.error(err);
      }
    }
    if (!seasonInfo && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [seasonInfo, dispatch]);

  return (
    <Container className="season-info-container">
      <ImgBox>
        <Image
          src={`//cdn.dak.gg/er/images/bg/bg-landing-search-v${
            seasonInfo?.isPre ? seasonInfo?.season - 1 : seasonInfo?.season
          }.jpg`}
          alt="season background wallpaper"
        />
        <Overlay />
      </ImgBox>
      {seasonInfo && (
        <ContentWrapper>
          <TitleDiv className="season-title-box">
            <SeasonTitle>
              {seasonInfo.isPre ? '프리 시즌' : '시즌'} {seasonInfo.season}
            </SeasonTitle>
            <SeasonPeriodInfo>
              {removeMinutes(seasonInfo.start)} ~{' '}
              {removeMinutes(seasonInfo.end)}
            </SeasonPeriodInfo>
          </TitleDiv>
          <SeasonTimeLeft>
            <div>
              <h2>시즌 종료까지</h2>
            </div>
            <div className="season-time-left-box">
              <CountDown endDate={seasonInfo.end} lang="kr" />
            </div>
          </SeasonTimeLeft>
        </ContentWrapper>
      )}
    </Container>
  );
}

const removeMinutes = (date) => date.replace(/\d{2}:\d{2}/g, '');

const Container = styled.div`
  text-align: center;
  position: relative;
  width: 100vw;
  color: #fff;
  /* background-color: rgba(51, 51, 51, 0.3); */
`;
const ImgBox = styled.div`
  position: absolute;
  z-index: -1;
  display: flex;
  height: 100%;
  max-height: 350px;
  width: 100vw;
  justify-content: center;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;
const Image = styled.img`
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
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 350px;
  padding: 20px 15px;
  box-sizing: border-box;
`;
const TitleDiv = styled.div`
  color: #fff;
  padding: 0.5rem 0;
  @media screen and (min-width: 768px) {
    padding: 1rem 0;
  }
`;
const SeasonTitle = styled.h2`
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
const SeasonPeriodInfo = styled.div`
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
const SeasonTimeLeft = styled.div`
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
