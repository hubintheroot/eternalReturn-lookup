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

export const Header = styled.header`
  border-bottom: 2px solid #000000;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;
`;

export const Meta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #666666;
`;

export const Content = styled.article`
  padding: 1rem 0;
  line-height: 1.8;
  color: #000000;
  white-space: pre-wrap;
  min-height: 200px;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #000000;
  color: #ffffff;
  text-decoration: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333333;
  }
`;

export const Footer = styled.footer`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
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
`;

export const EmptyTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;
`;

export const EmptyDescription = styled.p`
  margin-bottom: 1.5rem;
`;

// 섹션 스타일
export const SectionBlock = styled.div`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #000000;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #000000;
  margin-bottom: 1.5rem;
`;

export const SubSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const SubSectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 1rem;
`;

// 카드 스타일
export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  padding: 1rem;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
`;

export const CardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #333333;
  line-height: 1.6;
`;

export const CardMeta = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #666666;
`;

// 테이블 스타일
export const TableWrapper = styled.div`
  margin-bottom: 1.5rem;
  overflow-x: auto;
`;

export const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.$variant === 'buff' ? '#1a73e8' : '#d93025')};
  margin-bottom: 0.75rem;
  padding-left: 0.25rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
`;

export const Th = styled.th`
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-weight: 600;
  color: #000000;
  background-color: #f0f0f0;
  border-bottom: 2px solid #000000;
  white-space: nowrap;

  &:first-child {
    border-radius: 0.25rem 0 0 0;
  }

  &:last-child {
    border-radius: 0 0.25rem 0 0;
  }
`;

export const Td = styled.td`
  padding: 0.75rem 0.5rem;
  color: #000000;
  border-bottom: 1px solid #e0e0e0;
  vertical-align: center;
  text-align: center;
  background-color: ${(props) =>
    props.$variant === 'after'
      ? props.$changeType === 'buff'
        ? '#e8f4fd'
        : '#fce8e6'
      : 'transparent'};
  font-weight: ${(props) => (props.$variant === 'after' ? '500' : 'normal')};

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.25rem;
  }
`;

// Summary 컨텐츠 영역
export const SummaryContent = styled.div`
  margin-top: 1.5rem;
`;
