import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
const Container = styled.section`
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
const Li = styled.li`
    &:hover {
        cursor: pointer;
    }
`;
const Img = styled.img`
    object-fit: cover;
    object-position: top;
    width: ${props => props.$preview ? props.$preview : '512px'};
    height: ${props => props.$preview ? props.$preview : '768px'};
    box-sizing: border-box;
    border: 0.1rem solid rgba(0,0,0,.5);
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

    if (!data) {
        return null;
    }

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);
    

    const folderName = (skinName) => {
        const upperA = characterName.toUpperCase();
        const upperB = skinName.replaceAll(' ','').toUpperCase();
        return upperA === upperB ? 'default' : skinName.replace(`. ${characterName}`,'')
    };
    
    const handleImgError = (e) => e.target.src = process.env.REACT_APP_BACKGROUND_IMAGE_PATH;
    const handleSelectedImg = (e) => {
        setSelectedSkin(folderName(e.target.alt));
    }
    // TODO: 이미지의 다양한 크기와 비율을 일관되게 바꾸는 방법 찾아 적용할 것.
    // 이미지가 너무 중구난방한 크기와 비율을 가지고 있음.
    // 1. 이미지 파일을 직접 정리하기
    // 2. 이미지 파일을 일관된 크기와 비율로 변환시키는 라이브러리 찾아 적용하기 << 찾는 중..
    

    // TODO: 스킨명을 담은 object로 스킨 full 이미지를 처리할 것
    // const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/default/Full.png`;
    const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(selectedSkin)}/Full.png`;

    const miniImgs = character.skins.map((skin, index) =>
            <Li key={index} onClick={handleSelectedImg}>
                <Img
                    src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/${folderName(skin.Name_EN)}/Mini.png`}
                    alt={`${skin.Name_EN}`}
                    onError={handleImgError}
                    $preview="84px"
                />
            </Li>
        );
    // TODO: 데이터 표시 필요
    return (
        <div>
            <h1>{character.Name_KR}</h1>
            {/* 난이도를 Name_KR 옆에 */}
            {/* <p>난이도: {character.Difficulty}</p> */}
            <Container>
                <Div>
                    <p>“{character.Story_Title}”</p>
                    <h3>{character.Full_Name}</h3>
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
                    <Img src={imgSrc} alt={`${character.Name_EN} image`}/>
                </ImgDiv>
            </Container>
        </div>
    )
}