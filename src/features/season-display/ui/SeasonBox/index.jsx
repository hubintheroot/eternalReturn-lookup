import { useEffect, useRef, useState } from 'react';
import { useSeasonInfoStore } from '@/entities/season/store';
import * as Styled from './SeasonBox.styled';
import { supabase } from '@/shared/api/supabase';
import CountDown from '../CountDown';
import EmptyState from '@/shared/ui/EmptyState';
export default function SeasonBox({
  onReady
}) {
  const seasonInfo = useSeasonInfoStore(state => state.data);
  const setSeasonInfo = useSeasonInfoStore(state => state.setSeasonInfo);
  const getDataCnt = useRef(0);
  const [previousSeason, setPreviousSeason] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const currentRes = await supabase().from('seasonInfo').select('*').eq('isCurrent', true);
        if (currentRes.data && currentRes.data.length > 0) {
          setSeasonInfo(currentRes.data[0]);
        } else {
          const previousRes = await supabase().from('seasonInfo').select('*').order('end', {
            ascending: false
          }).limit(1);
          if (previousRes.data && previousRes.data.length > 0) {
            setPreviousSeason(previousRes.data[0]);
          }
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error(err);
        }
      } finally {
        setIsLoading(false);
        onReady?.();
      }
    }
    if (!seasonInfo && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [seasonInfo, setSeasonInfo]);
  const renderContent = () => {
    if (isLoading) {
      return null;
    }
    if (seasonInfo) {
      return <Styled.ContentWrapper>
          <Styled.TitleDiv className="season-title-box">
            <Styled.SeasonTitle>
              {seasonInfo.isPre ? '프리 시즌' : '시즌'} {seasonInfo.season}
            </Styled.SeasonTitle>
            <Styled.SeasonPeriodInfo>
              {removeMinutes(seasonInfo.start)} ~{' '}
              {removeMinutes(seasonInfo.end)}
            </Styled.SeasonPeriodInfo>
          </Styled.TitleDiv>
          <Styled.SeasonTimeLeft>
            <div>
              <h2>시즌 종료까지</h2>
            </div>
            <div className="season-time-left-box">
              <CountDown endDate={seasonInfo.end} lang="kr" />
            </div>
          </Styled.SeasonTimeLeft>
        </Styled.ContentWrapper>;
    }
    if (previousSeason) {
      return <Styled.ContentWrapper>
          <Styled.PreviousSeasonWrapper>
            <Styled.TitleDiv className="season-title-box">
              <Styled.SeasonTitle style={{
              opacity: 0.6
            }}>
                {previousSeason.isPre ? '프리 시즌' : '시즌'}{' '}
                {previousSeason.season}
              </Styled.SeasonTitle>
              <Styled.SeasonPeriodInfo style={{
              opacity: 0.5
            }}>
                {removeMinutes(previousSeason.start)} ~{' '}
                {removeMinutes(previousSeason.end)}
              </Styled.SeasonPeriodInfo>
            </Styled.TitleDiv>
          </Styled.PreviousSeasonWrapper>
          <EmptyState icon="" title="현재 진행 중인 시즌 정보가 없습니다" description="곧 새로운 시즌이 시작될 예정이니 조금만 기다려 주세요!" variant="default" />
        </Styled.ContentWrapper>;
    }
    return <Styled.ContentWrapper>
        <EmptyState icon="🍅" title="시즌 정보를 불러오는 중입니다" description="잠시만 기다려 주세요." variant="subtle" />
      </Styled.ContentWrapper>;
  };
  return <Styled.Container className="season-info-container">
      <Styled.ImgBox>
        <Styled.Image src={`//cdn.dak.gg/er/images/bg/bg-landing-search-v${seasonInfo?.isPre ? seasonInfo?.season - 1 : previousSeason?.isPre ? previousSeason?.season - 1 : seasonInfo?.season || previousSeason?.season || 1}.jpg`} alt="season background wallpaper" />
        <Styled.Overlay />
      </Styled.ImgBox>
      {renderContent()}
    </Styled.Container>;
}
const removeMinutes = date => date.replace(/\d{2}:\d{2}/g, '');