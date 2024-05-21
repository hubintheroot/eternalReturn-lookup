import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DifficultyBox from "./DifficultyBox";
import MiniSizeImage from "./MiniSizeImage";
import FullSizeImage from "./FullSizeImage";
import { setCharDetailLoaded } from "../features/imageLoaded/imageLoadedSlice";
import ComingSoonView from "../pages/comingsoon";


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
`;
const ImgDiv = styled(FlexDiv)`
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    width: 40rem;
    margin-bottom: 4rem;
`;
const Container = styled(FlexDiv)`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1rem;
`;
const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
    overflow-x: auto;
    margin: 0;
    padding: 0;
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
        width: ${props => props.$isLoading ? '38rem': null};
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
    margin: 2rem 0;
    padding: 0;
    white-space: pre-wrap;
    line-height: 2rem;
`;
const FullBox = styled.div`
    position: relative;
    width: 512px;
`;

export default function CharacterInfo() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.imageLoaded.detailLoaded);
    const data = useSelector(state => state.characterData.data);
    const [selectedSkin, setSelectedSkin] = useState('default');
    const [windowWidth, setWindowWidth] = useState();
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

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);

    const skins = character.skins
            .filter(skin => skin.mini_size);

    const imageMaxCount = skins.length * 2 - 1;

    const folderName = (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB = skinName && skinName.replaceAll(' ','').replaceAll('&','').toUpperCase();
        return upperA === upperB ? 'default' : skinName.replace(`. ${characterName}`,'')
    };
    
    const handleSelectedImg = (e) => setSelectedSkin(folderName(e.target.alt));
    const handleImgError = (e) => {console.log(e.target.src); e.target.src = process.env.REACT_APP_BACKGROUND_IMAGE_PATH;}
    const handleImgOnload = () => {
        if (imageLoadedCount.current === imageMaxCount){
            dispatch(setCharDetailLoaded(false));
            imageLoadedCount.current = 0;
            return;
        }
        imageLoadedCount.current += 1;
    }

    const miniSizeImgs = () => skins
        .map((skin, index) =>
            <MiniSizeImage
                key={index}
                data={{
                    src: `${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(skin.name_en)}/Mini.webp`,
                    alt: `${skin.name_en}`,
                    handler:{
                        selectedImg: handleSelectedImg,
                        onError: handleImgError,
                        onLoad: handleImgOnload,
                    },
                    size:84
                }}
            ></MiniSizeImage>
        );
    const fullSizeImgs = () => skins
        .map((skin, index) => 
            <FullSizeImage 
                src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(skin.name_en)}/Full.webp`}
                select={selectedSkin}
                loading={loading}
                handler={{onLoad: handleImgOnload}}
                key={index}/>
        );

    const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(selectedSkin)}/Full.webp`;
                
    // const miniSizeImgs = character.skins.map((skin, index) =>
    //             <Li key={index} onClick={handleSelectedImg}>
    //                 <Img
    //                     src={`${process.env.REACT_APP_TEST}/${character.name_en}/${folderName(skin.name_en)}/Mini.png`}
    //                     alt={`${skin.name_en}`}
    //                     onError={handleImgError}
    //                     $preview={84}
    //                 />
    //             </Li>
    //             );


    return windowWidth <= 768 ? <ComingSoonView data={{text: '모바일 페이지를 준비 중입니다.'}}/> : (
        <section>
            <TitleBox $isLoading={loading}>
                { loading ?
                <>
                    <CharName/>
                    <ControlDiffBox/>
                </>
                :
                <>
                    <CharName>{character.Name_KR}
                        <Span>{character.Story_Title}</Span>
                    </CharName>
                    <ControlDiffBox>조작 난이도
                        <DifficultyBox difficulty={character.Difficulty} maxDifficulty={5}/>
                    </ControlDiffBox>
                </>
                }
            </TitleBox>
            <Container>
                <InfoDiv $isLoading={loading}>
                    { loading ?
                    <>
                        <InfoContent></InfoContent>
                        <InfoContent></InfoContent>
                        <InfoContent></InfoContent>
                        <InfoContent></InfoContent>
                        <DescContent></DescContent>
                    </>
                    :
                    <>
                        <InfoContent><InfoContentTitle>이름</InfoContentTitle>{character.Full_Name}</InfoContent>
                        <InfoContent><InfoContentTitle>성별</InfoContentTitle> {character.Gender}</InfoContent>
                        <InfoContent><InfoContentTitle>나이</InfoContentTitle> {character.Age}</InfoContent>
                        <InfoContent><InfoContentTitle>키</InfoContentTitle> {character.Height}</InfoContent>
                        <DescContent>{character.Story_Desc}</DescContent>
                    </>
                    }
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
        </section>
    )
}