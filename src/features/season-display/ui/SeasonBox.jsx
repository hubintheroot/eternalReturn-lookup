import { useEffect, useRef, useState } from 'react';
import { useSeasonInfoStore } from '@/entities/season/model/seasonInfoStore';
import styled from 'styled-components';
import { supabase } from '@/shared/api/supabase';
import CountDown from './CountDown';
import EmptyState from '@/shared/ui/EmptyState';

export default function SeasonBox() {
  const seasonInfo = useSeasonInfoStore((state) => state.data);
  const setSeasonInfo = useSeasonInfoStore((state) => state.setSeasonInfo);
  const getDataCnt = useRef(0);
  const [previousSeason, setPreviousSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        // 현재 시즌 조회
        const currentRes = await supabase()
          .from('seasonInfo')
          .select('*')
          .eq('isCurrent', true);

        if (currentRes.data && currentRes.data.length > 0) {
          setSeasonInfo(currentRes.data[0]);
        } else {
          // 현재 시즌이 없으면 가장 최근 종료된 시즌 조회
          const previousRes = await supabase()
            .from('seasonInfo')
            .select('*')
            .order('end', { ascending: false })
            .limit(1);

          if (previousRes.data && previousRes.data.length > 0) {
            setPreviousSeason(previousRes.data[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (!seasonInfo && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [seasonInfo, setSeasonInfo]);

  // 렌더링 로직 결정
  const renderContent = () => {
    // 로딩 중
    if (isLoading) {
      return null;
    }

    // 현재 시즌이 있을 때
    if (seasonInfo) {
      return (
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
      );
    }

    // 현재 시즌이 없고 이전 시즌이 있을 때
    if (previousSeason) {
      return (
        <ContentWrapper>
          {/* 이전 시즌 정보 (회색톤) */}
          <PreviousSeasonWrapper>
            <TitleDiv className="season-title-box">
              <SeasonTitle style={{ opacity: 0.6 }}>
                {previousSeason.isPre ? '프리 시즌' : '시즌'}{' '}
                {previousSeason.season}
              </SeasonTitle>
              <SeasonPeriodInfo style={{ opacity: 0.5 }}>
                {removeMinutes(previousSeason.start)} ~{' '}
                {removeMinutes(previousSeason.end)}
              </SeasonPeriodInfo>
            </TitleDiv>
          </PreviousSeasonWrapper>

          {/* Empty State */}
          <EmptyState
            icon=""
            title="현재 진행 중인 시즌 정보가 없습니다"
            description="곧 새로운 시즌이 시작될 예정이니 조금만 기다려 주세요!"
            variant="default"
          />
        </ContentWrapper>
      );
    }

    // 아무 데이터도 없을 때
    return (
      <ContentWrapper>
        <EmptyState
          icon="🍅"
          title="시즌 정보를 불러오는 중입니다"
          description="잠시만 기다려 주세요."
          variant="subtle"
        />
      </ContentWrapper>
    );
  };

  return (
    <Container className="season-info-container">
      <ImgBox>
        <Image
          src={`//cdn.dak.gg/er/images/bg/bg-landing-search-v${
            seasonInfo?.isPre
              ? seasonInfo?.season - 1
              : previousSeason?.isPre
              ? previousSeason?.season - 1
              : seasonInfo?.season || previousSeason?.season || 1
          }.jpg`}
          alt="season background wallpaper"
        />
        <Overlay />
      </ImgBox>
      {renderContent()}
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

const PreviousSeasonWrapper = styled.div`
  opacity: 0.7;
  margin-bottom: 1rem;

  @media screen and (min-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;
