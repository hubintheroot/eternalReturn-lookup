import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  position: relative;
  padding: 1rem 1.5rem;
  background-color: #ffffff;
  min-height: calc(100vh - 64px - 64px);
`;

export const Container = styled.div`
  @media screen and (min-width: 768px) {
    margin: 0 auto;
    max-width: 80rem;
  }
`;

export const TitleContainer = styled(Container)`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-top: 2px solid #000000;
`;

export const ListItem = styled.li`
  border-bottom: 1px solid #e0e0e0;
`;

export const ListLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ItemTitle = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
`;

export const ItemMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666666;
`;

export const LoadingContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #666666;
`;

export const EmptyContainer = styled(Container)`
  text-align: center;
  padding: 3rem;
  color: #666666;
  border: 1px solid #e0e0e0;
  border-radius: 0.375rem;
`;
