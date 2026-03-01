import styled, { css } from 'styled-components';

const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #E3FDFD;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #A6E3E9;
    border-radius: 8px;
    &:hover {
      background-color: #71C9CE;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;

  @media (orientation: landscape) {
    height: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #71C9CE;
  color: #fff;
  height: 46px;
  padding: 0 12px;
  font-size: clamp(12px, 1.5vw, 14px);
  flex-shrink: 0;
`;

export const SubTitle = styled.h3`
  margin: 0;
  font-size: clamp(13px, 1.6vw, 15px);
  color: #fff;
`;

export const ConfigBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

export const CheckBox = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: clamp(11px, 1.3vw, 13px);
  user-select: none;

  & input[type='checkbox'] {
    accent-color: #fff;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export const Select = styled.select`
  font-size: clamp(11px, 1.3vw, 13px);
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 2px 6px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  outline: none;

  option {
    background-color: #71C9CE;
    color: #1a1a1a;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #A6E3E9;
  padding: 6px 12px;
  flex-shrink: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 4px 10px;
  font-size: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #1a1a1a;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(26, 26, 26, 0.5);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.55);
    border-color: #fff;
  }

  @media (orientation: landscape) {
    font-size: clamp(12px, 1.4vw, 14px);
  }
`;

export const Container = styled.div`
  overflow-y: auto;
  box-sizing: border-box;
  background-color: #E3FDFD;
  height: clamp(200px, 38vh, 360px);
  ${scrollbarStyle}

  @media (orientation: landscape) {
    height: auto;
    flex: 1;
    min-height: 0;
  }
`;

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(60px, 10vw, 80px), 1fr));
  column-gap: 8px;
  row-gap: 8px;
  list-style: none;
  margin: 0;
  padding: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    column-gap: 10px;
    padding: 14px;
  }
`;
