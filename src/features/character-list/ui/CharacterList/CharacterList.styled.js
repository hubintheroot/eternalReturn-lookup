import styled from 'styled-components';

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

export const SubTitleDiv = styled.div`
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

export const SubTitle = styled.h3`
  margin: 0;
`;

export const ConfigBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CheckBox = styled.div`
  margin-right: 16px;
`;

export const Container = styled.div`
  padding: 16px;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  height: 320px;
`;

export const Ul = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  column-gap: 14px;
  row-gap: 8px;
  margin: 0;
  padding: 0;
`;
