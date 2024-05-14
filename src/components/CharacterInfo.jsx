import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageListItem from "./ImageListItem";
import { Img } from "./ImageListItem";

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
`
const Container = styled(FlexDiv)`
    flex-direction: row;
    justify-content: space-between;
`
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
    gap: 1rem;
`
const DiffBox = styled(FlexDiv)`
    flex-direction: row;
    gap: .1rem;
`;
const Difficulty = styled.div`
    margin: 0 .1rem;
    background-color: ${props => props.$empty ? 'lightgray': 'lightblue'};
    box-sizing: border-box;
    border: .1rem solid lightskyblue;
    width: .8rem;
    height: 1.2rem;
    transform: skew(-20deg);
`;

export default function CharacterInfo() {
    const data = useSelector(state => state.characterData.data);
    const [selectedSkin, setSelectedSkin] = useState('default');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!data) navigate('/');
        setSelectedSkin('default');
    }, [pathname, data, navigate]);

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
        <ImageListItem
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
            ></ImageListItem>
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

    // TODO: 데이터 표시 필요
    
    console.log(character);

    const Diff = [];
    for (let i = 0; i < 5; i++) {
        Diff.push(character.Difficulty > i ? <Difficulty/>: <Difficulty $empty={true}/>);
    }

    console.log(Diff);

    return (
        <section>
            <TitleBox>
                <CharName>
                    {character.Name_KR}
                    <Span>{character.Story_Title}</Span>
                </CharName>
                <ControlDiffBox>
                    조작 난이도:
                    <DiffBox>
                        {Diff}
                    </DiffBox>
                </ControlDiffBox>
            </TitleBox>
            <Container>
                <InfoDiv>
                    <h3>이름: {character.Full_Name}</h3>
                    {/* fullname 아래에 성별, 나이, 키*/}
                    <p>성별: {character.Gender}</p>
                    <p>나이: {character.Age}</p>
                    <p>키: {character.Height}</p>
                    {/* 캐릭터 스토리 글자 간격 조절 필요 */}
                    <p>{character.Story_Desc}</p>
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