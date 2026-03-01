import styled from 'styled-components';
import { scrollbarStyle } from '@/shared/ui/styles';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media screen and (orientation: landscape) {
    flex-direction: row;
    height: 100vh;
    min-height: unset;
    overflow: hidden;
  }
`;

export const TopBar = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  flex-shrink: 0;
  background-color: #71c9ce;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 6px;

  @media screen and (orientation: landscape) {
    display: none;
  }
`;

export const TopBarTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 0.02em;
`;

export const HamburgerBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

export const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 60;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};

  @media screen and (orientation: landscape) {
    display: none;
  }
`;

export const Drawer = styled.aside`
  position: fixed;
  top: 0;
  right: ${(props) => (props.$isOpen ? '0' : '-240px')};
  width: 240px;
  height: 100%;
  background-color: #71c9ce;
  z-index: 70;
  display: flex;
  flex-direction: column;
  transition: right 0.28s ease;
  box-sizing: border-box;
  box-shadow: ${(props) =>
    props.$isOpen ? '-2px 0 12px rgba(0, 0, 0, 0.25)' : 'none'};

  @media screen and (orientation: landscape) {
    display: none;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
  flex-shrink: 0;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  display: flex;
  align-items: center;
`;

export const DrawerUserBox = styled.div`
  margin-top: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export const Sidebar = styled.aside`
  display: none;

  @media screen and (orientation: landscape) {
    display: flex;
    flex-direction: column;
    width: 200px;
    flex-shrink: 0;
    background-color: #71c9ce;
    height: 100%;
    box-sizing: border-box;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.12);
  }
`;

export const SidebarTitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0 12px 0 20px;
`;

export const SidebarTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  flex-shrink: 0;
  letter-spacing: 0.02em;
`;

export const SidebarUserBox = styled.div`
  margin-top: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  position: relative;
`;

export const SurveyContainer = styled.div`
  flex-shrink: 0;
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

export const Content = styled.div`
  flex: 1;
  overflow: auto;
  min-height: 0;
  ${scrollbarStyle}
`;
