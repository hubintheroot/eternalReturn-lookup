import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { useCharacterStore } from '@/entities/character/model/characterStore';
import { styled } from 'styled-components';
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
          charData.ImagePath = charData.ImagePath.replace(
            'jsdelivr.net',
            'statically.io'
          );
          const tempSkinData = skin.data.filter(
            (skinData) => charData.CharacterID === skinData.character_id
          );

          for (let i = 0; i < tempSkinData.length; i++) {
            const img_info = tempSkinData[i];
            const f_size = img_info.full_size;
            const m_size = img_info.mini_size;
            if (f_size !== null && m_size !== null) {
              tempSkinData[i].full_size = f_size.replace(
                'jsdelivr.net',
                'statically.io'
              );
              tempSkinData[i].mini_size = m_size.replace(
                'jsdelivr.net',
                'statically.io'
              );
            }
          }
          charData.skins = tempSkinData;
          return charData;
        });
        setData(data);
        console.log('getData is worked');
      } catch (err) {
        console.error(err);
      }
    }

    if (!characterData && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [characterData, setData]);

  if (characterData) {
    return (
      <StyledMain>
        <PageTitle>실험체</PageTitle>
        <CharacterList />
        <Outlet />
      </StyledMain>
    );
  }
}

const StyledMain = styled.main`
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }

  max-height: calc(100vh - 64px);
  width: 100%;
  margin: 20px auto 0;
`;
const PageTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
`;
