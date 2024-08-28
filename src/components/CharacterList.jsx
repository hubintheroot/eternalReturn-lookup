import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CharacterCard from "./CharacterCard";
import {
  setIsRotation,
  setState,
} from "../features/sortOption/sortOptionSlice";
import { useRef } from "react";

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

export default function CharacterList() {
  const dispatch = useDispatch();
  const charData = useSelector((state) => state.characterData.data);
  const isRotation = useSelector((state) => state.sortOption.isRotation);
  const sortState = useSelector((state) => state.sortOption.state);
  const cnt = useRef(0);

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
    let newData = sortBy(charData);
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
  const data = setCharacterCard();
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
    </Section>
  );
}
