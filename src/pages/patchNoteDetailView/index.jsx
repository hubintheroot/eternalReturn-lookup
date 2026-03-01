import * as Styled from './patchNoteDetailView.styled';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getPatchNoteById,
  incrementViewCount,
  getCharacterImageMap,
} from '@/shared/api/supabase';
import { useCharacterStore } from '@/entities/character/store';
import CharacterSection from './components/CharacterSection';
import EquipmentSection from './components/EquipmentSection';
import NewSystemSection from './components/NewSystemSection';
export default function PatchNoteDetailView() {
  const { id } = useParams();
  const characterData = useCharacterStore((state) => state.data);
  const [imageMap, setImageMap] = useState(null);
  const [patchNote, setPatchNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const topRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowScrollTop(!entry.isIntersecting),
      {
        threshold: 0,
      },
    );
    const el = topRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const scrollToTop = () =>
    topRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  useEffect(() => {
    if (characterData) {
      const map = {};
      characterData.forEach((c) => {
        const skin = c.skins?.find((s) => s.mini_size);
        if (skin) map[c.Name_KR] = skin.mini_size;
      });
      setImageMap(map);
      return;
    }
    getCharacterImageMap()
      .then(setImageMap)
      .catch((err) => {
        if (import.meta.env.DEV) console.error(err);
      });
  }, [characterData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPatchNoteById(id);
        if (result.data) {
          setPatchNote(result.data);
          incrementViewCount(id);
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  if (loading) {
    return (
      <Styled.Section>
        <Styled.LoadingContainer>
          <div>패치노트를 불러오는 중...</div>
        </Styled.LoadingContainer>
      </Styled.Section>
    );
  }
  if (!patchNote) {
    return (
      <Styled.Section>
        <Styled.EmptyContainer>
          <Styled.EmptyTitle>패치노트를 찾을 수 없습니다</Styled.EmptyTitle>
          <Styled.EmptyDescription>
            요청하신 패치노트가 존재하지 않습니다.
          </Styled.EmptyDescription>
          <Styled.BackButton to="/patchNotes">목록으로</Styled.BackButton>
        </Styled.EmptyContainer>
      </Styled.Section>
    );
  }
  return (
    <Styled.Section>
      <div ref={topRef} />
      <Styled.Container>
        <Styled.TopNav>
          <Styled.BackButton to="/patchNotes">목록으로</Styled.BackButton>
        </Styled.TopNav>
        <Styled.Header>
          <Styled.Title>{patchNote.title}</Styled.Title>
          <Styled.Meta>
            <span>{formatDate(patchNote.summarized_at)}</span>
            <span>조회수 {patchNote.view_count}</span>
          </Styled.Meta>
        </Styled.Header>
        {patchNote.summary && (
          <Styled.SummaryContent>
            <CharacterSection
              newCharacters={patchNote.summary.new_characters}
              characterChanges={patchNote.summary.character_changes}
              imageMap={imageMap}
            />
            <EquipmentSection
              equipmentChanges={patchNote.summary.equipment_changes}
            />
            <NewSystemSection newSystems={patchNote.summary.new_systems} />
          </Styled.SummaryContent>
        )}
        <Styled.Footer>
          <Styled.BackButton to="/patchNotes">목록으로</Styled.BackButton>
        </Styled.Footer>
      </Styled.Container>
      {showScrollTop && (
        <Styled.ScrollTopButton onClick={scrollToTop} aria-label="맨 위로">
          ↑
        </Styled.ScrollTopButton>
      )}
    </Styled.Section>
  );
}
