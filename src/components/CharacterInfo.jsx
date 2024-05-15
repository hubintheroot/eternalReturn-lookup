import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageListItem from "./ImageListItem";
import { Img } from "./ImageListItem";
import DifficultyBox from "./DifficultyBox";
import ComingSoonView from "../pages/comingsoon";


const FlexDiv = styled.div`
    display: flex;
`;
const InfoDiv = styled.div`
    width: 18rem;
    word-break: keep-all;
    word-wrap: break-word;
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
`;
const CharName = styled.h1`
    margin: 1rem 0 0;
`;
const FullImg = styled(Img)`
    object-position: top;
    width: 512px;
    height: 768px;
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

export default function CharacterInfo() {
    const data = useSelector(state => state.characterData.data);
    // eslint-disable-next-line
    const [windowWidth, setWindowWidth] = useState();
    const [selectedSkin, setSelectedSkin] = useState('default');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) navigate('/');
        setSelectedSkin('default');
    }, [pathname, data, navigate]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    },[])


    if (!data) return null;

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);

    const folderName = (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB = skinName && skinName.replaceAll(' ','').replaceAll('&','').toUpperCase();
        return upperA === upperB ? 'default' : skinName.replace(`. ${characterName}`,'')
    };
    
    const handleImgError = (e) => e.target.src = process.env.REACT_APP_BACKGROUND_IMAGE_PATH;
    const handleSelectedImg = (e) => setSelectedSkin(folderName(e.target.alt));

    const miniImgs = character.skins
    .map((skin, index) => 
        {
            console.log(character.Name_EN, skin.Name_EN, folderName(skin.Name_EN));

        return (<ImageListItem
            key={index}
            data={{
                src:`${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(skin.Name_EN)}/Mini.png`,
                alt: `${skin.Name_EN}`,
                handler:{
                    selectedImg: handleSelectedImg,
                    onError: handleImgError
                },
                size:84
            }}
            ></ImageListItem>)
        }
        );
    const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(selectedSkin)}/Full.webp`;
                
    // const miniImgs = character.skins.map((skin, index) =>
    //             <Li key={index} onClick={handleSelectedImg}>
    //                 <Img
    //                     src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(skin.Name_EN)}/Mini.png`}
    //                     alt={`${skin.Name_EN}`}
    //                     onError={handleImgError}
    //                     $preview={84}
    //                 />
    //             </Li>
    //             );
    
    return window.innerWidth <= 768 ? <ComingSoonView data={{text: '모바일 페이지를 준비 중입니다.'}}/> : (
        <section>
            <TitleBox>
                <CharName>
                    {character.Name_KR}
                    <Span>{character.Story_Title}</Span>
                </CharName>
                <ControlDiffBox>
                    조작 난이도
                    <DifficultyBox difficulty={character.Difficulty} maxDifficulty={5}/>
                </ControlDiffBox>
            </TitleBox>
            <Container>
                <InfoDiv>
                    <InfoContent><InfoContentTitle>이름</InfoContentTitle> {character.Full_Name}</InfoContent>
                    <InfoContent><InfoContentTitle>성별</InfoContentTitle> {character.Gender}</InfoContent>
                    <InfoContent><InfoContentTitle>나이</InfoContentTitle> {character.Age}</InfoContent>
                    <InfoContent><InfoContentTitle>키</InfoContentTitle> {character.Height}</InfoContent>
                    <DescContent>{character.Story_Desc}</DescContent>
                </InfoDiv>
                <ImgDiv>
                    <Ul>
                        {miniImgs}
                    </Ul>
                    <FullImg
                        src={imgSrc}
                        alt={`${character.Name_KR} 전신 이미지`}
                        onError={handleImgError}
                    />
                </ImgDiv>
            </Container>
        </section>
    )
}