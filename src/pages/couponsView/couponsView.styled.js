import styled from 'styled-components';

export const GiftIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: rgb(79, 70, 229);
  color: #fff;
  border-radius: 0.5rem;
`;

export const Section = styled.section`
  position: relative;
  padding: 1rem 1.5rem;
  background-color: rgb(248, 249, 250);
  min-height: calc(100vh - 64px - 64px);
`;

export const Container = styled.div`
  @media screen and (min-width: 768px) {
    margin: 0 auto;
    max-width: 80rem;
  }
`;

export const EmptyContainer = styled(Container)`
  & > p {
    text-align: center;
    padding: 1rem;
    color: rgb(100, 116, 139);
    border: 1px solid rgb(226, 232, 240);
    border-radius: 0.375rem;
  }

  @media screen and (min-width: 768px) {
    margin: 0 auto;
    max-width: 960px;
  }
`;

export const TitleContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  & svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: rgb(51, 51, 51);
  }
`;

export const CouponContainer = styled.div`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

export const Title = styled.h2`
  text-align: center;
`;
