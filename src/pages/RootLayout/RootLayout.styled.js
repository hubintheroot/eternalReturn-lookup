import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navigate from '@/shared/ui/Navigate';

export const Page = styled.div`
  min-height: 100vh;
  position: relative;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 64px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const HeaderInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    max-width: 80rem;
    margin: 0 auto;
  }
`;

export const StyledNav = styled(Navigate)`
  margin-right: 45px;
`;

export const SurveyContainer = styled.div`
  position: sticky;
  top: 64px;
  z-index: 41;
  width: 100%;
  background-color: #73d3b2;
`;

export const FeedbackContainer = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem;
  gap: 0.5rem;

  @media screen and (min-width: 768px) {
    padding: 0.5rem 1rem;
    transition: color 0.3s ease-in-out;
    &:hover {
      color: rgba(158, 3, 179, 0.8);
    }
  }
`;

export const Content = styled(Outlet)`
  height: calc(100vh - 64px);
`;

export const UserBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
  @media screen and (min-width: 768px) {
    gap: 1rem;
    margin-right: 1rem;
  }
`;
