import { useEffect, useState } from 'react';
import SeasonBox from '@/features/season-display/ui/SeasonBox';
import { useSeasonInfoStore } from '@/entities/season/store';
import { getPatchNotes } from '@/shared/api/supabase';
import * as Styled from './landingView.styled';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

export default function LandingView() {
  const seasonInfo = useSeasonInfoStore((state) => state.data);
  const [isReady, setIsReady] = useState(() => !!seasonInfo);
  const [patchNotes, setPatchNotes] = useState([]);

  useEffect(() => {
    getPatchNotes().then((result) => {
      if (result.data) {
        setPatchNotes(result.data.slice(0, 2));
      }
    });
  }, []);

  return (
    <Styled.Wrapper>
      {!isReady && <Styled.ShimmerOverlay />}
      <Styled.ContentArea $isReady={isReady}>
        <SeasonBox onReady={() => setIsReady(true)} />
        <Styled.BottomSection>
          {patchNotes.length > 0 && (
            <Styled.PatchNotesArea>
              <Styled.PatchNotesLabel>최신 패치노트</Styled.PatchNotesLabel>
              <Styled.PatchNotesRow>
                {patchNotes.map((note) => (
                  <Styled.PatchNoteCard key={note.id} to={`/patchNotes/${note.id}`}>
                    <Styled.PatchNoteTitle>{note.title}</Styled.PatchNoteTitle>
                    <Styled.PatchNoteMeta>{formatDate(note.patch_date)}</Styled.PatchNoteMeta>
                  </Styled.PatchNoteCard>
                ))}
              </Styled.PatchNotesRow>
            </Styled.PatchNotesArea>
          )}
          <Styled.SectionDivider />
          <Styled.NavRow>
            <Styled.NavLinkBtn to="/characters">
              <span>실험체 보러가기</span>
              <Styled.BtnCharImg
                src="https://cdn.statically.io/gh/hubintheroot/eternalreturn_contents@main/character_images/Jackie/Cadet_Jackie/Full.webp"
                alt="Jackie"
              />
            </Styled.NavLinkBtn>
            <Styled.NavLinkBtn to="/coupons">
              <span>쿠폰 보러가기</span>
              <Styled.BtnCharImg
                src="https://cdn.statically.io/gh/hubintheroot/eternalreturn_contents@main/character_images/Barbara/Researcher_Barbara/Full.webp"
                alt="Barbara"
              />
            </Styled.NavLinkBtn>
          </Styled.NavRow>
        </Styled.BottomSection>
      </Styled.ContentArea>
    </Styled.Wrapper>
  );
}
