import * as Styled from './charactersView.styled';
import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useCharacterStore } from '@/entities/character/store';
import { supabase } from '@/shared/api/supabase';
import CharacterList from '@/features/character-list/ui/CharacterList';

export default function CharactersView() {
  const characterData = useCharacterStore((state) => state.data);
  const setData = useCharacterStore((state) => state.setData);
  const getDataCnt = useRef(0);

  useEffect(() => {
    async function getData() {
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

        const data = character.data.map((charData) => {
          charData.Story_Desc = charData.Story_Desc.replace(/\\n/g, '\n');
          charData.skins = skin.data.filter(
            (skinData) => charData.CharacterID === skinData.character_id,
          );

          return charData;
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
