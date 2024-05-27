import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import DifficultyBox from "./DifficultyBox";
import MiniSizeImage from "./MiniSizeImage";
import FullSizeImage from "./FullSizeImage";
import { setCharDetailLoaded } from "../features/imageLoaded/imageLoadedSlice";

const Section = styled.section`

    @media screen and (max-width: 767px){
        width: calc(100vw - 2rem);
        padding: 0 1rem;
    }

    ${props => props.$isLoading ? css`animation: ${skelAnimation} 1.5s ease-in-out infinite`:null};
`;
const skelAnimation = keyframes`
    0% {
        opacity: .6;
    }
    50% {
        opacity: .3;
    }
    100% {
        opacity: .6;
    }
`;
const FlexDiv = styled.div`
    display: flex;
`;
const InfoDiv = styled.div`
    width: 18rem;
    word-break: keep-all;
    word-wrap: break-word;
    

    & > div, p{
        background-color: ${props => props.$isLoading ? 'lightgrey': null};
        border-radius: ${props => props.$isLoading ? '5px': null};
    }

    & > div {
        width: ${props => props.$isLoading ? '14rem': null};
        height: ${props => props.$isLoading ? '2rem': null};
    }

    & > p {
        width: ${props => props.$isLoading ? '18rem': null};
        height: ${props => props.$isLoading ? '25rem': null};
    }

    @media screen and (max-width: 767px){
        width: calc(100vw - 2rem);
    }
`;
const ImgDiv = styled(FlexDiv)`
    flex-direction: row;
    /* justify-content: space-between; */
    gap: 2rem;
    width: 40rem;
    margin-bottom: 4rem;
    
    @media screen and (max-width: 767px){
        flex-direction: column-reverse;
        max-width: 382px;
        margin: 0 auto 4rem;
        margin-top: 1rem;
        gap: 1rem;
        height: 653px;
        justify-content: flex-start;
    }
    @media screen and (max-width: 429px){
        width: 100%;
    }
`;
const Container = styled(FlexDiv)`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
    min-height: 856px;
    
    @media screen and (max-width: 767px){
        flex-direction: column;
        gap: 2rem;
        justify-content: flex-start;
    }
`;
const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;

    @media screen and (max-width: 767px){
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
        width: 100%;
        gap: .2rem;
        
    }
`;
const TitleBox = styled(FlexDiv)`
    margin-top: 1.5rem;
    flex-direction: column;
    gap: .5rem;

    & > h1, div {
        background-color: ${props => props.$isLoading ? 'lightgrey': null};
        border-radius: ${props => props.$isLoading ? '5px': null};
    }
    & > h1 {
        width: ${props => props.$isLoading ? '20rem': null};
        height: ${props => props.$isLoading ? '2rem': null};
    }
    & > div {
        width: ${props => props.$isLoading ? '11rem': null};
        height: ${props => props.$isLoading ? '1.2rem': null};
    }
    `;
const CharName = styled.h1`
    margin: 1rem 0 0;
`;
const Span = styled.span`
    font-size: 1rem;
    font-weight: 400;
    margin-left: 1rem;
    &::before{
        content: '“';
    };
    &::after{
        content: '”';
    };
`;
const ControlDiffBox = styled(FlexDiv)`
    flex-direction: row;
    font-size: .8rem;
    line-height: 1.2rem;
    gap: 1rem;
`;
const InfoContent = styled(FlexDiv)`
    line-height: 2rem;
    margin: .5rem 0;
    gap: 1rem;
`;
const InfoContentTitle = styled(FlexDiv)`
    justify-content: center;
    padding: 0 .5rem;
    border: .1rem solid #000;
    border-radius: .8rem;
    width: 2rem;
    font-weight: 800;
`;
const DescContent = styled.p`
    margin: 1rem 0 0;
    padding: 0;
    white-space: pre-wrap;
    line-height: 2rem;
`;
const FullBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    @media screen and (min-width: 767px) {
        margin-bottom: 2rem;
    }
`;

export default function CharacterInfo() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.imageLoaded.detailLoaded);
    const data = useSelector(state => state.characterData.data);
    const [selectedSkin, setSelectedSkin] = useState('default');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const imageLoadedCount = useRef(0);

    useEffect(() => {
        if (!data) navigate('/');
        setSelectedSkin('default');
        imageLoadedCount.current = 0;
        dispatch(setCharDetailLoaded(true));

    }, [pathname, dispatch, data, navigate]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    },[])
    
    if (!data) return;

    const handleSelectedImg = (e) => {
        const skin_name = e.target.src.split('/')[6].replaceAll('%20',' ');
        setSelectedSkin(setFolderName(skin_name));
    };
    const handleImgOnload = () => {
        if (imageLoadedCount.current === skins.length * 2 - 1){
            dispatch(setCharDetailLoaded(false));
            imageLoadedCount.current = 0;
            return;
        }
        imageLoadedCount.current += 1;
    }

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);
    const skins = character.skins.filter(skin => skin.mini_size && skin.full_size);
    

    const setFolderName = (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB = skinName && skinName.replaceAll(' ','').replaceAll('&','').toUpperCase();
        return upperA === upperB ? 'default' : skinName.replace(`. ${characterName}`,'')
    };
    const miniSizeImgs = () => skins
        .map((skin, index) =>
            <MiniSizeImage
                src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/${setFolderName(skin.name_en)}/Mini.webp`}
                alt={`${skin.name_en} mini size image`}
                handler={{ selectedImg: handleSelectedImg, onLoad: handleImgOnload,}}
                size={windowWidth <= 768 ? 64:84}
                key={index}
            />
        );
    const fullSizeImgs = () => skins
        .map((skin, index) => 
            <FullSizeImage 
                src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/${setFolderName(skin.name_en)}/Full.webp`}
                alt={`${skin.name_en} full size image`}
                select={selectedSkin}
                handler={{onLoad: handleImgOnload}}
                key={index}
            />
        );


    return (
        <Section $isLoading={loading}>
            { loading ? 
                // skeleton ui
                <>
                    <TitleBox $isLoading={loading}>
                        <CharName/>
                        <ControlDiffBox/>
                    </TitleBox>
                    <Container>
                        <InfoDiv $isLoading={loading}>
                            <InfoContent></InfoContent>
                            <InfoContent></InfoContent>
                            <InfoContent></InfoContent>
                            <InfoContent></InfoContent>
                            <DescContent></DescContent>
                        </InfoDiv>
                        <ImgDiv>
                            <Ul>
                                {data && miniSizeImgs()}
                            </Ul>
                            <FullBox>
                                {data && fullSizeImgs()}
                            </FullBox>
                        </ImgDiv>
                    </Container>
                </>
                :
                // Content
                <>
                    <TitleBox>
                        <CharName>{character.Name_KR}
                            <Span>{character.Story_Title}</Span>
                        </CharName>
                        <ControlDiffBox>조작 난이도
                            <DifficultyBox difficulty={character.Difficulty} maxDifficulty={5}/>
                        </ControlDiffBox>
                    </TitleBox>
                    <Container>
                        <InfoDiv>
                            <InfoContent><InfoContentTitle>이름</InfoContentTitle>{character.Full_Name}</InfoContent>
                            <InfoContent><InfoContentTitle>성별</InfoContentTitle> {character.Gender}</InfoContent>
                            <InfoContent><InfoContentTitle>나이</InfoContentTitle> {character.Age}</InfoContent>
                            <InfoContent><InfoContentTitle>키</InfoContentTitle> {character.Height}</InfoContent>
                            <DescContent>{character.Story_Desc}</DescContent>
                        </InfoDiv>
                        <ImgDiv>
                            <Ul>
                                {data && miniSizeImgs()}
                            </Ul>
                            <FullBox>
                                {data && fullSizeImgs()}
                            </FullBox>
                        </ImgDiv>
                    </Container>
                </>
            }
        </Section>
    )
}