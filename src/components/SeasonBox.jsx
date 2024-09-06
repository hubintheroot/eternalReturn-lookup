import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonInfo } from "../features/seasonInfo/seasonInfoSlice";
import styled from "styled-components";
import { supabase } from "../supabase/supabase";
import CountDown from "./CountDown";

export default function SeasonBox() {
  const dispatch = useDispatch();
  const getDataCnt = useRef(0);
  const seasonInfo = useSelector((state) => state.seasonInfo.data);

  useEffect(() => {
    async function getData() {
      try {
        const res = await supabase()
          .from("seasonInfo")
          .select("*")
          .eq("isCurrent", true);
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
      {seasonInfo && (
        <div>
          <TitleDiv className="season-title-box">
            <Image
              src={`//cdn.dak.gg/er/images/bg/bg-landing-search-v${seasonInfo.season}.jpg`}
              alt="season background wallpaper"
            />
            <SeasonTitle>
              {seasonInfo.isPre ? "프리 시즌" : "시즌"} {seasonInfo.season}
            </SeasonTitle>
            <SeasonPeriodInfo>
              {removeMinutes(seasonInfo.start)} ~{" "}
              {removeMinutes(seasonInfo.end)}
            </SeasonPeriodInfo>
          </TitleDiv>
          <SeasonTimeLeft>
            <div>
              <h2>시즌 종료까지</h2>
            </div>
            <div className="season-time-left-box">
              <CountDown endDate={seasonInfo.end} />
            </div>
          </SeasonTimeLeft>
        </div>
      )}
    </Container>
  );
}

const removeMinutes = (date) => date.replace(/\d{2}:\d{2}/g, "");

const Container = styled.div`
  text-align: center;
  position: relative;
  width: 100vw;
  color: #fff;
  background-color: rgba(51, 51, 51, 0.3);
`;
const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: auto;
  max-width: 100vw;
  height: 100%;
  object-fit: cover;
  object-position: -2048px 0;
  @media screen and (min-width: 769px) {
    object-position: unset;
  }
`;
const TitleDiv = styled.div`
  color: white;
  padding: 2rem 0;
`;
const SeasonTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;
const SeasonPeriodInfo = styled.div`
  font-weight: bold;
  font-size: 2rem;
`;
const SeasonTimeLeft = styled.div`
  & > div > h2 {
    margin-top: 0.5rem;
    margin-bottom: 0;
    font-weight: 700;
    font-size: 2rem;
  }
`;
