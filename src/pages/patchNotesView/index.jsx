import * as Styled from './patchNotesView.styled';
import { useEffect, useState } from 'react';
import { getPatchNotes } from '@/shared/api/supabase';

export default function PatchNotesView() {
  const [patchNotes, setPatchNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPatchNotes();
        if (result.data) {
          setPatchNotes(result.data);
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
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <Styled.Section>
      <Styled.TitleContainer>
        <Styled.Title>패치노트</Styled.Title>
      </Styled.TitleContainer>
      {loading ? (
        <Styled.LoadingContainer>
          <div>패치노트를 불러오는 중...</div>
        </Styled.LoadingContainer>
      ) : (
        <Styled.Container>
          {patchNotes.length > 0 ? (
            <Styled.ListContainer>
              {patchNotes.map((note) => (
                <Styled.ListItem key={note.id}>
                  <Styled.ListLink to={`/patchNotes/${note.id}`}>
                    <Styled.ItemTitle>{note.title}</Styled.ItemTitle>
                    <Styled.ItemMeta>
                      <span>{formatDate(note.patch_date)}</span>
                      <span>조회수 {note.view_count}</span>
                    </Styled.ItemMeta>
                  </Styled.ListLink>
                </Styled.ListItem>
              ))}
            </Styled.ListContainer>
          ) : (
            <Styled.EmptyContainer>
              <p>등록된 패치노트가 없습니다.</p>
            </Styled.EmptyContainer>
          )}
        </Styled.Container>
      )}
    </Styled.Section>
  );
}
