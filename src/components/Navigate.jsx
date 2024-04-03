import { styled } from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    margin: 0 1rem;
    &:hover {
        color: grey;
    }
`

export default function Navigate(props) {

    const menus = props.info.map((info, index) => <StyledLink to={ info.link } key={ index }><p>{info.text}</p></StyledLink>);

    return (
        <Nav>
            { menus }
        </Nav>
    )
}