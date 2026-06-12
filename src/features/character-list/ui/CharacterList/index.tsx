import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactElement } from 'react';
import { useCharacterStore } from '@/entities/character/store';
import { useSortOptionStore } from '@/entities/sort-option/store';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import type { CharacterWithSkins, SortState } from '@/shared/types';
import * as Styled from './CharacterList.styled';
import CharacterCard from '../CharacterCard';

interface SelectOption {
  value: string;
  text: string;
}

interface SelectList {
  release: SelectOption;
  ord: SelectOption;
}

interface hasImgPathCharData extends CharacterWithSkins {
  ImagePath: string;
}

const selectList: SelectList = {
  release: {
    value: 'release',
    text: '출시 순',
  },
  ord: {
    value: 'order',
    text: '가나다 순',
  },
};

const CHOSEONG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
const HANGUL_START = 0xac00;
const CHOSEONG_UNIT = 21 * 28;

function getChoseong(str: string): string {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      if (code >= HANGUL_START && code <= 0xd7a3) {
        return CHOSEONG[Math.floor((code - HANGUL_START) / CHOSEONG_UNIT)];
      }
      return char;
    })
    .join('');
}

const CHOSEONG_ONLY_RE = /^[ㄱ-ㅎ]+$/;

function matchesSearch(name: string, query: string): boolean {
  if (name.toLowerCase().includes(query)) return true;
  if (CHOSEONG_ONLY_RE.test(query)) {
    return getChoseong(name).includes(query);
  }
  return false;
}

export default function CharacterList(): ReactElement {
  const charData = useCharacterStore((state) => state.data);
  const carouselHeight = useImageLoadedStore((state) => state.carouselHeight);
  const isRotation = useSortOptionStore((state) => state.isRotation);
  const sortState = useSortOptionStore((state) => state.state);
  const searchQuery = useSortOptionStore((state) => state.searchQuery);
  const setState = useSortOptionStore((state) => state.setState);
  const setIsRotation = useSortOptionStore((state) => state.setIsRotation);
  const setSearchQuery = useSortOptionStore((state) => state.setSearchQuery);
  const cnt = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  const handleSetOrd = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) =>
      setState(e.target.value as SortState),
    [setState],
  );
  const handleSetRotation = useCallback(
    () => setIsRotation(!isRotation),
    [setIsRotation, isRotation],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSearchQuery(value);
      }, 200);
    },
    [setSearchQuery],
  );

  const sortData = useCallback(
    (data: CharacterWithSkins[]): CharacterWithSkins[] => {
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

  const filterRotation = useCallback(
    (data: CharacterWithSkins[]): CharacterWithSkins[] => {
      if (!data) return [];
      const rotation: CharacterWithSkins[] = [];
      const other: CharacterWithSkins[] = [];
      data.forEach((character) => {
        if (character.Weekly_Free) rotation.push(character);
        else other.push(character);
      });
      return rotation.concat(other);
    },
    [],
  );

  const filterSearch = useCallback(
    (data: CharacterWithSkins[]): CharacterWithSkins[] => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return data;
      return data.filter(
        (character) =>
          matchesSearch(character.Name_KR, query) ||
          matchesSearch(character.Name_EN, query),
      );
    },
    [searchQuery],
  );

  const processedData = useMemo(() => {
    if (!charData) return [];
    let nextData = sortData(charData);

    if (isRotation) nextData = filterRotation(nextData);
    nextData = filterSearch(nextData);
    return nextData;
  }, [charData, sortData, filterRotation, filterSearch, isRotation]);

  const characterCards = useMemo(() => {
    cnt.current = 0;
    const filteredData = processedData.filter(
      (v) => (v.skins[0]?.mini_size ?? '').length > 0,
    );
    const maxLength = filteredData.length;

    return filteredData.map((data) => (
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
            <option value={selectList.ord.value}>{selectList.ord.text}</option>
          </Styled.Select>
        </Styled.ConfigBox>
      </Styled.Header>
      <Styled.SearchBar>
        <Styled.SearchInput
          type="text"
          placeholder="실험체 이름 검색 (초성 가능)"
          value={inputValue}
          onChange={handleSearch}
        />
      </Styled.SearchBar>
      <Styled.Container>
        <Styled.Ul>{characterCards}</Styled.Ul>
      </Styled.Container>
    </Styled.Section>
  );
}
