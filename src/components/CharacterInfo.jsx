import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImageListItem from "./ImageListItem";


const Div = styled.div`
    width: 18rem;
    word-break: keep-all;
    word-wrap: break-word;
`;
const ImgDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
    width: 40rem;
    margin-bottom: 4rem;
`
const Container = styled.div`
    display: flex;
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
const TitleBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const CharName = styled.h1`
    margin: 1rem 0 0;
`;

const Img = styled.img`
    object-fit: cover;
    object-position: ${props => props.$imgFull ? 'top': '-1px -1px'};
    width: ${props => props.$preview ? `${props.$preview + 2}px` : '512px'};
    height: ${props => props.$preview ? `${props.$preview}px` : '768px'};
    box-sizing: border-box;
    background-image: url(${process.env.REACT_APP_BACKGROUND_IMAGE_PATH});
    background-repeat: no-repeat;
    background-size: cover;
`;
// TODO: preview 이미지를 클릭하면 full 이미지가 보여져야함, 기본적으로 보여지는 full 이미지는 default 이미지.
// TODO: preview 이미지 왼쪽에 캐릭터 설명을 추가할 수 있다면 추가 
export default function CharacterInfo() {
    const navigate = useNavigate();
    const [selectedSkin, setSelectedSkin] = useState('default');
    const { pathname } = useLocation();
    const data = useSelector(state => state.characterData.data);
    useEffect(() => {
        if (!data) navigate('/')
        },[data, navigate])

    useEffect(() => {
        setSelectedSkin('default');
    }, [pathname]);

    if (!data) {
        return null;
    }

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);
    

    const folderName = (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB = skinName && skinName.replaceAll(' ','').replaceAll('&','').toUpperCase();
        return upperA === upperB ? 'default' : skinName.replace(`. ${characterName}`,'')
    };
    
    const handleImgError = (e) => e.target.src = process.env.REACT_APP_BACKGROUND_IMAGE_PATH;
    const handleSelectedImg = (e) => setSelectedSkin(folderName(e.target.alt));

    const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(selectedSkin)}/Full.webp`;
    
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
    return (
        <section>
            <TitleBox>
                <CharName>{character.Name_KR}</CharName>
                <p>“{character.Story_Title}”</p>
            </TitleBox>
            {/* 난이도를 Name_KR 옆에 */}
            {/* <p>난이도: {character.Difficulty}</p> */}
            <Container>
                <Div>
                    <h3>이름: {character.Full_Name}</h3>
                    {/* fullname 아래에 성별, 나이, 키*/}
                    <p>성별: {character.Gender}</p>
                    <p>나이: {character.Age}</p>
                    <p>키: {character.Height}</p>
                    {/* 캐릭터 스토리 글자 간격 조절 필요 */}
                    <p>{character.Story_Desc}</p>
                </Div>
                <ImgDiv>
                    <Ul>
                        {miniImgs}
                    </Ul>
                    <Img
                        src={imgSrc}
                        alt={`${character.Name_KR} 전신 이미지`}
                        onError={handleImgError}
                        $imgFull={true}
                    />
                </ImgDiv>
            </Container>
        </section>
    )
}