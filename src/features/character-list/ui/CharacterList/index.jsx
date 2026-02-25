import { useCallback, useMemo, useRef } from 'react';
import { useCharacterStore } from '@/entities/character/store';
import { useSortOptionStore } from '@/entities/sort-option/store';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './CharacterList.styled';
import CharacterCard from '../CharacterCard';

const selectList = {
  release: { value: 'release', text: '출시 순' },
  ord: { value: 'order', text: '가나다 순' },
};

export default function CharacterList() {
  const charData = useCharacterStore((state) => state.data);
  const carouselHeight = useImageLoadedStore((state) => state.carouselHeight);
  const isRotation = useSortOptionStore((state) => state.isRotation);
  const sortState = useSortOptionStore((state) => state.state);
  const setState = useSortOptionStore((state) => state.setState);
  const setIsRotation = useSortOptionStore((state) => state.setIsRotation);
  const cnt = useRef(0);

  const handleSetOrd = useCallback((e) => setState(e.target.value), [setState]);
  const handleSetRotation = useCallback(
    () => setIsRotation(!isRotation),
    [setIsRotation, isRotation],
  );

  const sortData = useCallback(
    (data) => {
      if (!data) return [];
      const tempData = [...data];
      switch (sortState) {
        case selectList.ord.value:
          return tempData.sort((a, b) =>
            a.Name_KR.localeCompare(b.Name_KR, 'ko'),
          );
        case selectList.release.value:
          return tempData.sort((a, b) => a.CharacterID - b.CharacterID);
        default:
          return tempData;
      }
    },
    [sortState],
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
    const maxLength = processedData.length;
    return processedData.map((data) => (
      <CharacterCard
        data={data}
        maxLength={maxLength}
        cnt={cnt}
        link={`/characters/${data.Name_EN}`}
        key={data.CharacterID}
      />
    ));
  }, [processedData]);

  return (
    <Styled.Section>
      <Styled.Header>
        <Styled.SubTitle>실험체 목록</Styled.SubTitle>
        <Styled.ConfigBox>
          <Styled.CheckBox htmlFor="rotation-checkbox">
            <input
              type="checkbox"
              id="rotation-checkbox"
              onChange={handleSetRotation}
              checked={isRotation}
            />
            로테이션부터 보기
          </Styled.CheckBox>
          <Styled.Select onChange={handleSetOrd} value={sortState}>
            <option value={selectList.release.value}>
              {selectList.release.text}
            </option>
            <option value={selectList.ord.value}>
              {selectList.ord.text}
            </option>
          </Styled.Select>
        </Styled.ConfigBox>
      </Styled.Header>
      <Styled.Container $landscapeHeight={carouselHeight}>
        <Styled.Ul>{characterCards}</Styled.Ul>
      </Styled.Container>
    </Styled.Section>
  );
}
