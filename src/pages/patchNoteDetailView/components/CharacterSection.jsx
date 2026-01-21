import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';

export default function CharacterSection({ newCharacters, characterChanges }) {
  const hasNewCharacters = newCharacters && newCharacters.length > 0;
  const hasBuffs = characterChanges?.buffs?.length > 0;
  const hasNerfs = characterChanges?.nerfs?.length > 0;

  if (!hasNewCharacters && !hasBuffs && !hasNerfs) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>캐릭터</Styled.SectionTitle>

      {hasNewCharacters && (
        <Styled.SubSection>
          <Styled.SubSectionTitle>신규 캐릭터</Styled.SubSectionTitle>
          <Styled.CardList>
            {newCharacters.map((character) => (
              <Styled.Card key={character.name}>
                <Styled.CardTitle>{character.name}</Styled.CardTitle>
                <Styled.CardDescription>
                  {character.description}
                </Styled.CardDescription>
                {character.weapon_types && (
                  <Styled.CardMeta>
                    무기: {character.weapon_types.join(', ')}
                  </Styled.CardMeta>
                )}
              </Styled.Card>
            ))}
          </Styled.CardList>
        </Styled.SubSection>
      )}

      {hasBuffs && (
        <ChangeTable
          data={characterChanges.buffs}
          type="character"
          variant="buff"
        />
      )}

      {hasNerfs && (
        <ChangeTable
          data={characterChanges.nerfs}
          type="character"
          variant="nerf"
        />
      )}
    </Styled.SectionBlock>
  );
}
