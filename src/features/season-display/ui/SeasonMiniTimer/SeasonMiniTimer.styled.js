import styled from 'styled-components';

export const SidebarContainer = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
  color: rgba(255, 255, 255, 0.85);
`;

export const SidebarTime = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  font-variant-numeric: tabular-nums;
  line-height: 1.2;
`;

export const SidebarLabel = styled.span`
  font-size: 0.6rem;
  opacity: 0.65;
  line-height: 1;
`;

export const TopbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  color: #fff;
`;

export const TopbarLabel = styled.span`
  font-size: 0.6rem;
  opacity: 0.75;
  letter-spacing: 0.03em;
`;

export const TopbarTime = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
`;
