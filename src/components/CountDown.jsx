import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FlipCountClock from "./FlipCountClock";

export default function CountDown({ endDate, lang = "en" }) {
  // 종료일을 Date 객체로 변환
  const end = new Date(endDate).getTime();
  const [timeLeft, setTimeLeft] = useState(end - new Date().getTime());

  useEffect(() => {
    // 타이머가 0에 도달하면 효과를 중지
    if (timeLeft <= 0) return;

    // 1초마다 남은 시간을 1씩 줄임
    const intervalId = setInterval(() => {
      setTimeLeft(end - new Date().getTime());
    }, 1000);

    // 컴포넌트가 언마운트되거나 업데이트될 때 인터벌을 정리
    return () => clearInterval(intervalId);
  }, [timeLeft, end]);

  // 남은 일, 시간, 분, 초를 계산
  const calculateTimeLeft = () => {
    if (timeLeft <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return [
      { subTitle: date.days, content: days, id: 0 },
      { subTitle: date.hours, content: hours, id: 1 },
      { subTitle: date.minutes, content: minutes, id: 2 },
      { subTitle: date.seconds, content: seconds, id: 3 },
    ];
  };

  const data = calculateTimeLeft();
  const clockBoxs = data.map((data) => (
    <ClockBox key={data.id}>
      <SubTitle>
        <h3>{data.subTitle[lang]}</h3>
      </SubTitle>
      <Clock>
        <FlipCountClock counter={Math.floor(data.content / 10)} />
        <FlipCountClock counter={data.content % 10} />
      </Clock>
    </ClockBox>
  ));

  return <Container>{clockBoxs}</Container>;
}

const date = {
  days: { en: "Days", kr: "일" },
  hours: { en: "Hours", kr: "시간" },
  minutes: { en: "Minutes", kr: "분" },
  seconds: { en: "Seconds", kr: "초" },
};

const Container = styled.div`
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
  & > h3 {
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;
const ClockBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: end;
  width: 60vw;
  margin: 1rem auto;

  @media screen and (min-width: 768px) {
    display: block;
    width: auto;
    margin: 0;
  }
  @media screen and (min-width: 990px) {
    margin-right: 2rem;
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
