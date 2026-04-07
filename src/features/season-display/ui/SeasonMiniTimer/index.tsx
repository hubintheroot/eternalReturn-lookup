import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { useSeasonInfoStore } from '@/entities/season/store';
import * as Styled from './SeasonMiniTimer.styled';

type SeasonMiniTimerVariant = 'topbar' | 'sidebar';

interface SeasonMiniTimerProps {
  variant?: SeasonMiniTimerVariant;
}

export default function SeasonMiniTimer({ variant = 'topbar' }: SeasonMiniTimerProps): ReactElement | null {
  const seasonInfo = useSeasonInfoStore((state) => state.data);
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(() =>
    seasonInfo?.end ? Math.max(0, new Date(seasonInfo.end).getTime() - new Date().getTime()) : 0,
  );

  useEffect(() => {
    if (!seasonInfo?.end) return;
    const tick = () =>
      setTimeLeft(Math.max(0, new Date(seasonInfo.end).getTime() - new Date().getTime()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seasonInfo?.end]);

  if (!seasonInfo || location.pathname === '/' || timeLeft <= 0) return null;

  const d = Math.floor(timeLeft / 86400000);
  const h = Math.floor((timeLeft % 86400000) / 3600000);
  const m = Math.floor((timeLeft % 3600000) / 60000);
  const s = Math.floor((timeLeft % 60000) / 1000);
  const pad = (n: number): string => String(n).padStart(2, '0');

  const timeText = `${d > 0 ? `${d}일 ` : ''}${pad(h)}:${pad(m)}:${pad(s)}`;

  if (variant === 'sidebar') {
    return (
      <Styled.SidebarContainer>
        <Styled.SidebarLabel>시즌 종료</Styled.SidebarLabel>
        <Styled.SidebarTime>{timeText}</Styled.SidebarTime>
      </Styled.SidebarContainer>
    );
  }

  return (
    <Styled.TopbarContainer>
      <Styled.TopbarLabel>시즌 종료</Styled.TopbarLabel>
      <Styled.TopbarTime>{timeText}</Styled.TopbarTime>
    </Styled.TopbarContainer>
  );
}
