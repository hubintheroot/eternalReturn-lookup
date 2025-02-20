import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FlipCountClock from "./FlipCountClock";

export default function CountDown({ endDate, lang = "en" }) {
  const [timeLeft, setTimeLeft] = useState(getLeftTime(endDate));

  useEffect(() => {
    // 타이머가 0에 도달하면 효과를 중지
    if (timeLeft <= 0) return;

    // 1초마다 남은 시간을 1씩 줄임
    const intervalId = setInterval(() => {
      const left = getLeftTime(endDate);
      setTimeLeft(left);
    }, 1000);

    // 컴포넌트가 언마운트되거나 업데이트될 때 인터벌을 정리
    return () => clearInterval(intervalId);
  }, []);

  // 남은 일, 시간, 분, 초를 계산
  const calculateTimeLeft = () => {
    const data = [
      { subTitle: { en: "Days", kr: "일" }, content: 0, id: 0 },
      { subTitle: { en: "Hours", kr: "시간" }, content: 0, id: 1 },
      { subTitle: { en: "Minutes", kr: "분" }, content: 0, id: 2 },
      { subTitle: { en: "Seconds", kr: "초" }, content: 0, id: 3 },
    ];
    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      const time = [days, hours, minutes, seconds];
      data.forEach((_, i) => (data[i].content = time[i]));
    }

    return data;
  };

  const data = calculateTimeLeft();
  const clockBoxs = data.map((data) => (
    <ClockBox key={data.id}>
      <SubTitle>
        <h3 className="tjqmxkdlxmf">{data.subTitle[lang]}</h3>
      </SubTitle>
      <Clock>
        <FlipCountClock counter={Math.floor(data.content / 10)} />
        <FlipCountClock counter={data.content % 10} />
      </Clock>
    </ClockBox>
  ));

  return <Container>{clockBoxs}</Container>;
}

function getLeftTime(end) {
  return new Date(end).getTime() - new Date().getTime();
}

const Container = styled.div`
  width: max-content;
  margin: 0 auto;

  @media screen and (min-width: 990px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
    & :last-child {
      margin-right: 0;
    }
  }
`;
const SubTitle = styled.div`
  & > .tjqmxkdlxmf {
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    width: 0;

    @media screen and (min-width: 768px) {
      width: auto;
    }
  }
`;
const ClockBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: start;
  align-items: end;
  column-gap: 1rem;
  margin: 1rem auto;
  width: max-content;

  @media screen and (min-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    margin-top: 1rem;
  }
  @media screen and (min-width: 990px) {
    display: block;
    width: auto;
    margin: 1rem 2rem 1rem 0;
  }
`;
const Clock = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (min-width: 768px) {
    justify-content: center;
    margin-right: 0;

    & > ul {
      width: 60px;
      height: 90px;
    }
  }

  @media screen and (min-width: 990px) {
    margin-right: 2rem;
  }
`;
