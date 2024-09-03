import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setData } from "../features/characterInfo/characterInfoSlice";
import { styled } from "styled-components";
import { supabase } from "../supabase/supabase";
import CharacterList from "../components/CharacterList";

export default function CharactersView() {
  const dispatch = useDispatch();
  const characterData = useSelector((state) => state.characterData.data);
  const getDataCnt = useRef(0);

  useEffect(() => {
    async function getData() {
      try {
        const character = await supabase()
          .from("Characters")
          .select("*")
          .order("CharacterID", { ascending: true });

        const skin = await supabase()
          .from("Skins")
          .select("*")
          .order("character_id", { ascending: true })
          .order("skin_id", { ascending: true });

        const data = character.data.map((charData) => {
          charData.Story_Desc = charData.Story_Desc.replace(/\\n/g, "\n");
          const tempSkinData = skin.data.filter(
            (skinData) => charData.CharacterID === skinData.character_id
          );
          charData.skins = tempSkinData;
          return charData;
        });
        dispatch(setData(data));
        console.log("getData is worked");
      } catch (err) {
        console.error(err);
      }
    }

    if (!characterData && getDataCnt.current === 0) {
      getDataCnt.current = 1;
      getData();
    }
  }, [characterData, dispatch]);

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
