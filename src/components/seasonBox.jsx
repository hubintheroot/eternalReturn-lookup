import { useEffect, useRef } from "react";
import { supabase } from "../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setSeasonInfo } from "../features/seasonInfo/seasonInfoSlice";
import CountDown from "./CountDown";

export default function SeasonBox() {
  const dispatch = useDispatch();
  const getDataCnt = useRef(0);
  const seasonInfo = useSelector((state) => state.seasonInfo.data);
  //   TODO: getData로 가져온거 dispatch로 redux storage에 저장하기
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
    <div className="season-info">
      {seasonInfo && seasonInfo.isPre ? "프리 시즌" : "시즌"}{" "}
      <span className="season-number">{seasonInfo && seasonInfo.season}</span>
      <div className="season-period">
        <div>
          <span className="season-start">{seasonInfo && seasonInfo.start}</span>{" "}
          ~ <span className="season-end">{seasonInfo && seasonInfo.end}</span>
        </div>
        {seasonInfo && (
          <div className="season-time-left-box">
            {/* TODO: 남은 시간 보여주기 포멧은 (00일 00시 00분) */}
            <CountDown endDate={seasonInfo.end} />
          </div>
        )}
      </div>
    </div>
  );
}
