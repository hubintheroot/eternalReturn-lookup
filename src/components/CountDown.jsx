import React, { useState, useEffect } from "react";

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
    <div>
      <h2>남은 시간</h2>
      <p>
        {days} 일 {hours} 시간 {minutes} 분 {seconds} 초
      </p>
    </div>
  );
}
