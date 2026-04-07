import type { ReactElement } from 'react';
import * as Styled from '../patchNoteDetailView.styled';

interface NewSystem {
  title: string;
  description: string;
}

interface NewSystemSectionProps {
  newSystems: NewSystem[] | undefined;
}

export default function NewSystemSection({ newSystems }: NewSystemSectionProps): ReactElement | null {
  if (!newSystems || newSystems.length === 0) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>신규 시스템</Styled.SectionTitle>
      <Styled.CardList>
        {newSystems.map((system) => (
          <Styled.Card key={system.title}>
            <Styled.CardTitle>{system.title}</Styled.CardTitle>
            <Styled.CardDescription>{system.description}</Styled.CardDescription>
          </Styled.Card>
        ))}
      </Styled.CardList>
    </Styled.SectionBlock>
  );
}
