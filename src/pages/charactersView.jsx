import { styled } from "styled-components";
import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import { supabase } from "../supabase/supabase";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../features/characterInfo/characterInfoSlice";
import {
  setIsRotation,
  setState,
} from "../features/sortOption/sortOptionSlice";

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
const MainSection = styled.section`
  display: flex;
  flex-direction: column;
`;
const ConfigBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const SubTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #363944;
  color: white;
  height: 50px;
  padding: 0 16px;
  font-size: 14px;
`;
const SubTitle = styled.h3`
  margin: 0;
`;
const CheckBox = styled.div`
  margin-right: 16px;
`;
const Container = styled.div`
  padding: 16px;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  height: 320px;
`;
const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  column-gap: 14px;
  row-gap: 8px;
  margin: 0;
  padding: 0;
`;

export default function CharactersView() {
  const dispatch = useDispatch();
  const characterData = useSelector((state) => state.characterData.data);
  const isRotation = useSelector((state) => state.sortOption.isRotation);
  const sortState = useSelector((state) => state.sortOption.state);
  const cnt = useRef(0);
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
          //   charData.Story_Desc = charData.Story_Desc.replaceAll("\\n", "\n");
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
    const rotationFilter = (data) => {
      const rotation = [];
      const other = [];

      data.forEach((character) => {
        if (character.Weekly_Free) rotation.push(character);
        else other.push(character);
      });

      return rotation.concat(other);
    };

    const sortBy = (data) => {
      const tempData = [].concat(data);
      switch (sortState) {
        case selectList.ord.value:
          tempData.sort((a, b) => a.Name_KR.localeCompare(b.Name_KR, "ko"));
          break;

        case selectList.release.value:
          tempData.sort((a, b) => a.CharacterID - b.CharacterID);
          break;

        default:
          console.log("func:: sortBy is something wrong.");
      }
      return tempData;
    };

    const selectList = {
      release: { value: "release", text: "출시 순" },
      ord: { value: "order", text: "가나다 순" },
    };

    const setCharacterCard = () => {
      let newData = sortBy(characterData);
      if (isRotation) newData = rotationFilter(newData);

      const size = {
        height: 64,
        width: 64,
      };
      const maxLength = newData.length;
      const result = newData.map((data) => (
        <CharacterCard
          data={data}
          maxLength={maxLength}
          size={size}
          cnt={cnt}
          link={`/characters/${data.Name_EN}`}
          bgPath={process.env.REACT_APP_BACKGROUND_IMAGE_PATH}
          freeIconPath={process.env.REACT_APP_UNLOCK_ICON_PATH}
          key={data.CharacterID}
        />
      ));
      return result;
    };

    const handler = {
      setOrd: (e) => dispatch(setState(e.target.value)),
      getRotation: () => dispatch(setIsRotation(!isRotation)),
    };

    // const data = !loading && setCharacterCard();
    const data = setCharacterCard();

    return (
      <StyledMain>
        <PageTitle>실험체</PageTitle>
        <MainSection>
          <SubTitleDiv>
            <div>
              <SubTitle>실험체 목록</SubTitle>
            </div>
            <ConfigBox>
              <CheckBox>
                <input
                  type="checkbox"
                  id="checkbox"
                  onChange={handler.getRotation}
                  checked={isRotation}
                />
                <label htmlFor="checkbox">로테이션부터 보기</label>
              </CheckBox>
              <div>
                <select onChange={handler.setOrd} value={sortState}>
                  <option value={selectList.release.value}>
                    {selectList.release.text}
                  </option>
                  <option value={selectList.ord.value}>
                    {selectList.ord.text}
                  </option>
                </select>
              </div>
            </ConfigBox>
          </SubTitleDiv>
          <Container>
            <Ul>{data}</Ul>
          </Container>
        </MainSection>
        <Outlet />
      </StyledMain>
    );
  }
}
