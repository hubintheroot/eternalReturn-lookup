import styled, { keyframes } from "styled-components"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCharListLoaded } from "../features/imageLoaded/imageLoadedSlice";

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

const pulseKeyFrame = keyframes`
    0% {
        opacity: .5;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .5;
    }
`;
const SkelStyledLink = styled(StyledLink)`
    animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
`;
const SkelFigcaption = styled(Figcaption)`
    background-color: lightgrey;
    height: 12px;
    width: 100%;
`;
const SkelImgBox = styled(ImgBox)`
    background-color: lightgrey;
`;

export default function CharacterCard(props) {
    const loading = useSelector(state => state.imageLoaded.charListLoaded);
    const dispatch = useDispatch();
    const imgSize = '64px';
    const link = '/characters/' + props.data.Name_EN
    const handleImgError = (e) => e.target.src = props.backgroundImagePath;
    const handleImgOnload = () => {
        props.cnt.current = props.cnt.current + 1;
        if (props.maxLength === props.cnt.current) dispatch(setCharListLoaded(false));
    };


    return ( 
                <Card>
                    {/* skeleton ui */}
                    <SkelStyledLink style={{ display: loading ? 'block':'none'}}>
                        <Figure>
                            <SkelImgBox>
                                <Img  height={imgSize} width={imgSize} />
                            </SkelImgBox>
                            <SkelFigcaption></SkelFigcaption>
                        </Figure>
                    </SkelStyledLink>

                    {/* content */}
                    <StyledLink to={link} style={{ display: loading ? 'none':'block'}}>
                        <Figure>
                            <ImgBox>
                                {props.data.Weekly_Free ? <Free src={props.rotationIconPath} alt="free rotation character flag"/> : null}
                                <Img src={props.backgroundImagePath} alt="background image" height={imgSize} width={imgSize} />
                                <Img src={props.data.ImagePath} onError={handleImgError} onLoad={handleImgOnload} alt="character image" height={imgSize} width={imgSize} />
                            </ImgBox>
                            <Figcaption>{props.data.Name_KR}</Figcaption>
                        </Figure>
                    </StyledLink>
                </Card>
            )
}