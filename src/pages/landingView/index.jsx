import { useState } from 'react';
import SeasonBox from '@/features/season-display/ui/SeasonBox';
import { useSeasonInfoStore } from '@/entities/season/store';
import * as Styled from './landingView.styled';

export default function LandingView() {
  const seasonInfo = useSeasonInfoStore((state) => state.data);
  const [isReady, setIsReady] = useState(() => !!seasonInfo);

  return (
    <Styled.Wrapper>
      {!isReady && <Styled.ShimmerOverlay />}
      <Styled.ContentArea $isReady={isReady}>
        <SeasonBox onReady={() => setIsReady(true)} />
      </Styled.ContentArea>
    </Styled.Wrapper>
  );
}
