import { useState, useEffect } from 'react';
import * as Styled from './CountDown.styled';
import FlipCountClock from '../FlipCountClock';
const TIME_UNITS = [{
  subTitle: {
    en: 'Days',
    kr: '일'
  },
  content: 0,
  id: 0
}, {
  subTitle: {
    en: 'Hours',
    kr: '시간'
  },
  content: 0,
  id: 1
}, {
  subTitle: {
    en: 'Minutes',
    kr: '분'
  },
  content: 0,
  id: 2
}, {
  subTitle: {
    en: 'Seconds',
    kr: '초'
  },
  content: 0,
  id: 3
}];
export default function CountDown({
  endDate,
  lang = 'en'
}) {
  const [timeLeft, setTimeLeft] = useState(getLeftTime(endDate));
  useEffect(() => {
    if (getLeftTime(endDate) <= 0) return;
    const intervalId = setInterval(() => {
      const left = getLeftTime(endDate);
      setTimeLeft(left);
      if (left <= 0) clearInterval(intervalId);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [endDate]);
  const calculateTimeLeft = () => {
    if (timeLeft <= 0) {
      return TIME_UNITS.map(unit => ({
        ...unit,
        content: 0
      }));
    }
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(timeLeft % (1000 * 60) / 1000);
    const time = [days, hours, minutes, seconds];
    return TIME_UNITS.map((unit, i) => ({
      ...unit,
      content: time[i]
    }));
  };
  const data = calculateTimeLeft();
  const clockBoxs = data.map(data => <Styled.ClockBox key={data.id}>
      <Styled.Clock>
        <FlipCountClock counter={Math.floor(data.content / 10)} />
        <FlipCountClock counter={data.content % 10} />
      </Styled.Clock>
      <Styled.SubTitle>
        <h3 className="tjqmxkdlxmf">{data.subTitle[lang]}</h3>
      </Styled.SubTitle>
    </Styled.ClockBox>);
  return <Styled.Container>{clockBoxs}</Styled.Container>;
}
function getLeftTime(end) {
  return new Date(end).getTime() - new Date().getTime();
}