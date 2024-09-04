import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FlipCountClock from "./FlipCountClock";

export default function CountDown({ endDate }) {
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

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = calculateTimeLeft();

  return (
    <Container>
      <ClockBox>
        <SubTitle>
          <h3>{date.days.en}</h3>
        </SubTitle>
        <Clock>
          <FlipCountClock counter={Math.floor(days / 10)} />
          <FlipCountClock counter={days % 10} />
        </Clock>
      </ClockBox>
      <ClockBox>
        <SubTitle>
          <h3>{date.hours.en}</h3>
        </SubTitle>
        <Clock>
          <FlipCountClock counter={Math.floor(hours / 10)} />
          <FlipCountClock counter={hours % 10} />
        </Clock>
      </ClockBox>
      <ClockBox>
        <SubTitle>
          <h3>{date.minutes.en}</h3>
        </SubTitle>
        <Clock>
          <FlipCountClock counter={Math.floor(minutes / 10)} />
          <FlipCountClock counter={minutes % 10} />
        </Clock>
      </ClockBox>
      <ClockBox>
        <SubTitle>
          <h3>{date.seconds.en}</h3>
        </SubTitle>
        <Clock>
          <FlipCountClock counter={Math.floor(seconds / 10)} />
          <FlipCountClock counter={seconds % 10} />
        </Clock>
      </ClockBox>
    </Container>
  );
}

const date = {
  days: { en: "Days", kr: "일" },
  hours: { en: "Hours", kr: "시간" },
  minutes: { en: "Minutes", kr: "분" },
  seconds: { en: "Seconds", kr: "초" },
};

const Container = styled.div`
  @media screen and (min-width: 768px) {
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
    margin: 0 2.5rem 0 0;
  }
`;
const Clock = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (min-width: 768px) {
    justify-content: center;
    margin-right: 2rem;

    & > ul {
      width: 60px;
      height: 90px;
    }
  }
`;
