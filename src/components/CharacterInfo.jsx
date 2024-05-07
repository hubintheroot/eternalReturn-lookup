import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
    width: 18rem;
    word-break: keep-all;
    word-wrap: break-word;
`;
const ImgDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
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
    const { pathname } = useLocation();
    const data = useSelector(state => state.characterData.data)

    const characterName = pathname.replace('/characters/', '');
    const character = data.find(character => characterName === character.Name_EN);

    const imgSrc = `${process.env.REACT_APP_TEST}/${character.Name_EN}/default/Full.png`;
    // TODO: 스킨명을 담은 object로 스킨 full 이미지를 처리할 것
    const miniList = ['Mini','Mini','Mini'];
    const miniImgs = miniList.map((data, index) =>
            <Li key={index}>
                <Img
                    src={`${process.env.REACT_APP_TEST}/${character.Name_EN}/default/${data}.png`}
                    alt={`${character.Name_EN} image`}
                    $preview="84px"
                />
            </Li>
        );

    return (
        <div>
            <h1>{character.Name_KR}</h1>
                <Container>
                    <Div>
                        <p>introduct</p>
                        <p>설명이 들어갈 자리입니다.</p>
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