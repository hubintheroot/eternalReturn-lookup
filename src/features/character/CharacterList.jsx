import { useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsRotation,
  setState,
} from "../../features/sortOption/sortOptionSlice";
import styled from "styled-components";
import CharacterCard from "./components/CharacterCard";

const selectList = {
  release: { value: "release", text: "출시 순" },
  ord: { value: "order", text: "가나다 순" },
};

export default function CharacterList() {
  const dispatch = useDispatch();
  const charData = useSelector((state) => state.characterData.data);
  const isRotation = useSelector((state) => state.sortOption.isRotation);
  const sortState = useSelector((state) => state.sortOption.state);
  const cnt = useRef(0);

  const handleSetOrd = useCallback(
    (e) => dispatch(setState(e.target.value)),
    [dispatch]
  );
  const handleSetRotation = useCallback(
    () => dispatch(setIsRotation(!isRotation)),
    [dispatch, isRotation]
  );

  const sortData = useCallback(
    (data) => {
      if (!data) return [];
      const tempData = [...data];
      switch (sortState) {
        case selectList.ord.value:
          return tempData.sort((a, b) =>
            a.Name_KR.localeCompare(b.Name_KR, "ko")
          );
        case selectList.release.value:
          return tempData.sort((a, b) => a.CharacterID - b.CharacterID);
        default:
          console.log("func:: sortBy is something wrong.");
          return tempData;
      }
    },
    [sortState]
  );

  const filterRotation = useCallback((data) => {
    if (!data) return [];
    const rotation = [];
    const other = [];

    data.forEach((character) => {
      if (character.Weekly_Free) rotation.push(character);
      else other.push(character);
    });

    return rotation.concat(other);
  }, []);

  const processedData = useMemo(() => {
    if (!charData) return [];
    let nextData = sortData(charData);
    if (isRotation) nextData = filterRotation(nextData);
    return nextData;
  }, [charData, sortData, filterRotation, isRotation]);

  const characterCards = useMemo(() => {
    const size = {
      height: 64,
      width: 64,
    };
    const maxLength = processedData.length;
    return processedData.map((data) => (
      <CharacterCard
        data={data}
        maxLength={maxLength}
        size={size}
        cnt={cnt}
        link={`/characters/${data.Name_EN}`}
        bgPath={import.meta.env.VITE_BACKGROUND_IMAGE_PATH}
        freeIconPath={import.meta.env.VITE_UNLOCK_ICON_PATH}
        key={data.CharacterID}
      />
    ));
  }, [processedData, cnt]);

  return (
    <Section>
      <SubTitleDiv>
        <div>
          <SubTitle>실험체 목록</SubTitle>
        </div>
        <ConfigBox>
          <CheckBox>
            <input
              type="checkbox"
              id="checkbox"
              onChange={handleSetRotation}
              checked={isRotation}
            />
            <label htmlFor="checkbox">로테이션부터 보기</label>
          </CheckBox>
          <div>
            <select onChange={handleSetOrd} value={sortState}>
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
        <Ul>{characterCards}</Ul>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
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
const ConfigBox = styled.div`
  display: flex;
  flex-direction: row;
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
