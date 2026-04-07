import type { ReactElement } from 'react';
import * as Styled from './charactersView.styled';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useCharacterStore } from '@/entities/character/store';
import { supabase } from '@/shared/api/supabase';
import CharacterList from '@/features/character-list/ui/CharacterList';
import type { Character, Skin, CharacterWithSkins } from '@/shared/types';

export default function CharactersView(): ReactElement | undefined {
  const characterData = useCharacterStore((state) => state.data);
  const setData = useCharacterStore((state) => state.setData);
  const getDataCnt = useRef(0);

  useEffect(() => {
    async function getData(): Promise<void> {
      try {
        const character = await supabase()
          .from('Characters')
          .select('*')
          .order('CharacterID', { ascending: true });

        const skin = await supabase()
          .from('Skins')
          .select('*')
          .order('character_id', { ascending: true })
          .order('skin_id', { ascending: true });

        const charData = character.data as Character[] | null;
        const skinData = skin.data as Skin[] | null;

        if (!charData || !skinData) return;

        const data: CharacterWithSkins[] = charData.map((char) => {
          const charWithSkins: CharacterWithSkins = {
            ...char,
            Story_Desc: char.Story_Desc.replace(/\\n/g, '\n'),
            skins: skinData.filter(
              (s) => char.CharacterID === s.character_id,
            ),
          };
          return charWithSkins;
        });

        setData(data);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error(err);
        }
      }
    }

    if (!characterData && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [characterData, setData]);

  if (characterData) {
    return (
      <Styled.StyledMain>
        <Styled.StyledCharacterListBox>
          <CharacterList />
        </Styled.StyledCharacterListBox>
        <Outlet />
      </Styled.StyledMain>
    );
  }
}
