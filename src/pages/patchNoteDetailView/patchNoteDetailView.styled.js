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

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const TableTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.$variant === 'buff' ? '#3A9FA5' : '#E07060')};
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
  text-align: center;
  font-weight: 600;
  color: #000000;
  background-color: #f0f0f0;
  border: 1px solid #cccccc;
  border-bottom: 2px solid #666666;
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 0.75rem 0.5rem;
  color: #000000;
  border: 1px solid #e0e0e0;
  vertical-align: middle;
  text-align: center;
  background-color: ${(props) =>
    props.$variant === 'after'
      ? props.$changeType === 'buff'
        ? '#CBF1F5'
        : '#FFF0EE'
      : 'transparent'};
  font-weight: ${(props) => (props.$variant === 'after' ? '500' : 'normal')};

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.25rem;
  }
`;

export const SummaryContent = styled.div`
  margin-top: 1.5rem;
`;

export const TopNav = styled.div`
  margin-bottom: 1.5rem;
`;

export const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0.75;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

// ─── 캐릭터 섹션 ───────────────────────────────────────────────────────────────

export const TwoColumnGrid = styled.div`
  display: flex;
  gap: 1.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  & > * {
    flex: 1;
    min-width: 0;
  }
`;

export const SectionHeader = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${(props) => (props.$variant === 'buff' ? '#3A9FA5' : '#E07060')};
  border-left: 3px solid
    ${(props) => (props.$variant === 'buff' ? '#71C9CE' : '#E07060')};
  padding-left: 0.625rem;
  margin-bottom: 0.75rem;
`;

export const CharacterIconGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

export const CharacterIconItem = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  background: none;
  border: 2px solid
    ${(props) => (props.$selected ? '#71C9CE' : 'rgba(0,0,0,0.1)')};
  border-radius: 0.5rem;
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  transition:
    transform 0.15s,
    border-color 0.15s,
    background-color 0.15s;
  background-color: ${(props) =>
    props.$selected ? '#E3FDFD' : 'transparent'};

  &:hover {
    transform: scale(1.08);
    border-color: #a6e3e9;
    background-color: #f0fbfc;
  }
`;

export const CharacterIconImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(26, 35, 47, 1) 0%,
    rgba(39, 59, 80, 1) 50%,
    rgba(50, 79, 107, 1) 100%
  );
  overflow: hidden;
  flex-shrink: 0;
`;

export const CharacterIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const CharacterIconFallback = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(26, 35, 47, 1) 0%,
    rgba(39, 59, 80, 1) 50%,
    rgba(50, 79, 107, 1) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #a6e3e9;
`;

export const CharacterIconLabel = styled.span`
  font-size: 0.6875rem;
  color: #374151;
  white-space: nowrap;
  max-width: 4.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// ─── 아코디언 공통 ──────────────────────────────────────────────────────────────

export const AccordionBody = styled.div`
  max-height: ${(props) => (props.$isOpen ? '2000px' : '0')};
  overflow: hidden;
  transition: max-height 0.35s ease;
`;

export const AccordionItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

export const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f8f8f8;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 500;
  color: #1a1a1a;
  transition: background-color 0.15s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const AccordionChevron = styled.span`
  margin-left: auto;
  display: inline-block;
  transition: transform 0.25s ease;
  transform: ${(props) => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: 0.75rem;
  color: #666666;
`;

export const AccordionContent = styled.div`
  padding: 0.75rem 1rem;
  background-color: #ffffff;
`;

// ─── 뱃지 ──────────────────────────────────────────────────────────────────────

export const VariantBadge = styled.span`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.$variant === 'buff' ? '#CBF1F5' : '#FFF0EE'};
  color: ${(props) => (props.$variant === 'buff' ? '#3A9FA5' : '#C0504A')};
`;

export const ItemName = styled.span`
  font-weight: 500;
`;

export const ItemType = styled.span`
  font-size: 0.8125rem;
  color: #666666;
`;

// ─── 신규 캐릭터 ───────────────────────────────────────────────────────────────

export const NewCharacterCard = styled.div`
  padding: 1rem;
  background-color: #e3fdfd;
  border: 1px solid #a6e3e9;
  border-left: 4px solid #71c9ce;
  border-radius: 0.5rem;
`;

export const WeaponTypePill = styled.span`
  display: inline-block;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 500;
  background-color: #cbf1f5;
  color: #3a9fa5;
  margin-right: 0.25rem;
  margin-top: 0.25rem;
`;

// ─── 캐릭터 상세 패널 / 툴팁 ──────────────────────────────────────────────────

export const CharacterDetailPanel = styled.div`
  position: fixed;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => props.$width}px;
  z-index: 200;
  background: #ffffff;
  border: 1px solid #d0d0d0;
  border-radius: 0.5rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  overflow-x: auto;
  max-height: 60vh;
  overflow-y: auto;
`;

export const CharacterTooltip = styled.div`
  position: fixed;
  z-index: 9999;
  background: rgba(26, 35, 47, 0.9);
  color: #a6e3e9;
  font-size: 0.6875rem;
  font-weight: 500;
  padding: 0.25rem 0.625rem;
  border-radius: 4px;
  pointer-events: none;
  white-space: nowrap;

  /* 터치 기기(모바일)에서는 표시하지 않음 */
  @media (pointer: coarse) {
    display: none;
  }
`;
