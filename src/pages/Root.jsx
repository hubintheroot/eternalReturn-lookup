import { Outlet } from "react-router-dom";
import { styled } from 'styled-components';
import Navigate from '../components/Navigate';

const Page = styled.div`
    min-height: 100vh;
`;
const Header = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
const StyledNav = styled(Navigate)`
    margin-right: 45px;
`;
const Content = styled(Outlet)`
    height: calc(100vh - Header);
`


export default function Root(){

    const links = [
        {link: '/characters', text: '실험체'},
        {link: '/users', text: '랭크'}
    ];

    return (
        <Page>
            <Header>
                <StyledNav info={ links }></StyledNav>
            </Header>
            <Content />
        </Page>
    )
}