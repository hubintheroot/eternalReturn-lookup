import styled from "styled-components"
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    margin: 0 1rem;
`
const Card = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const ImgBox = styled.div`
    position: relative;
    width: 64px;
    height: 64px;
    margin-bottom: 4px;
`;
const Free = styled.img`
    position: absolute;
    width: 16px;
    height: 16px;
    z-index: 999;
    top: -5px;
    left: -5px;
`;
const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;
`;
const Figcaption = styled.figcaption`
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
`;
const Figure = styled.figure`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;

    &:hover {
        cursor: pointer;
    }
    &:hover > ${Figcaption} {
        color: rgb(153,153,153)
    }
`;

export default function CharacterCard(props) {
    const imgSize = '64px';
    const link = '/characters/' + props.data.Name_EN
    return ( 
        <Card>
            <StyledLink to={link}>
                <Figure>
                    <ImgBox>
                        {props.data.Weekly_Free ? <Free src={props.rotationIconPath}/>:<></>}
                        <Img src={props.backgroundImagePath} alt="background image" height={imgSize} width={imgSize} />
                        <Img src={props.data.ImagePath} alt="character image" height={imgSize} width={imgSize} />
                    </ImgBox>
                    <Figcaption>{props.data.Name_KR}</Figcaption>
                </Figure>
            </StyledLink>
        </Card>
    )
}