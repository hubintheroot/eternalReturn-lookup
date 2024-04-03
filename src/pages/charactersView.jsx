import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useOutletContext, Outlet } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';
import supabase from '../supabase/supabase';

const StyledMain = styled.main`
    @media (min-width: 576px) {
        max-width: 540px;
    }
    @media (min-width: 768px) {
        max-width: 720px;
    }
    @media (min-width: 992px) {
        max-width: 960px;
    }

    max-height: calc(100vh - 64px);
    width: 100%;
    margin: 20px auto 0;
    
`;
const PageTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
`;
const MainSection = styled.section`
    display: flex;
    flex-direction: column;
`;
const ConfigBox = styled.div`
    display: flex;
    flex-direction: row;
`;
const SubTitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #363944;
    color: white;
    height: 50px;
    padding: 0 16px;
    font-size: 14px;
`;
const SubTitle = styled.h3`
    margin: 0;
`;
const CheckBox = styled.div`
    margin-right: 16px;
`;
const Container = styled.div`
    padding: 16px;
    overflow-y: auto;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    height: 320px;
`;
const Ul = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
    column-gap: 14px;
    row-gap: 8px;
    margin: 0;
    padding: 0;
`;

export default function CharactersView(){
    const { charactersData, isRotation } = useOutletContext();
    const [sortByState, setSortByState] = useState('release');
    
    useEffect(() => {

        const getData = async() => {
            try {
                const { data } = await supabase()
                .from('Characters')
                .select('*')
                .order('CharacterID', {ascending: true});

                charactersData.setData(data);
                
            } catch(err) {
                console.log(err);
            }
        }

        if(charactersData.data.length === 0) getData();

    },[charactersData]);

    const rotationFilter = (data) => {

        const rotation = [];
        const other = [];

        data.forEach((character) => {
            if(character.Weekly_Free) rotation.push(character);
            else other.push(character);
        });

        return rotation.concat(other);
    };

    const sortBy = (data) => {
        const tempData = [].concat(data);
        switch (sortByState) {
            case selectList.ord.value:
                tempData.sort((a,b) => a.Name_KR.localeCompare(b.Name_KR, 'ko'));
                break;

            case selectList.release.value:
                tempData.sort((a,b) => a.CharacterID - b.CharacterID);
                break;

            default:
                console.log("func:: sortBy is something wrong.");
        }
        return tempData;
    }
    
    const setCharacterCard = () => {
        let newData = sortBy(charactersData.data);       
        if(isRotation.state) newData = rotationFilter(newData);

        return newData.map(
            (data, index) => 
            <CharacterCard  data={data}
                            backgroundImagePath={process.env.REACT_APP_BACKGROUND_IMAGE_PATH}
                            rotationIconPath={process.env.REACT_APP_UNLOCK_ICON_PATH}
                            key={index}/>
            );
    };
    
    const handleOrdRule = (e) => setSortByState(e.target.value);
    const handleRotation = () => isRotation.setState(!isRotation.state);
    
    const selectList = {
        release: {value: 'release', text: '출시 순'},
        ord: {value: 'order', text: '가나다 순'},
    };

    const data = setCharacterCard();

    return (
        <StyledMain>
            <PageTitle>실험체</PageTitle>
            <MainSection>
                <SubTitleDiv>
                    <div>
                        <SubTitle>실험체 목록</SubTitle>
                    </div>
                    <ConfigBox>
                        <CheckBox>
                            <input type="checkbox" id='checkbox' onChange={handleRotation} checked={isRotation.state}/>
                            <label htmlFor="checkbox">로테이션부터 보기</label>
                        </CheckBox>
                        <div>
                            <select onChange={handleOrdRule}>
                                <option value={selectList.release.value} >{selectList.release.text}</option>
                                <option value={selectList.ord.value}>{selectList.ord.text}</option>
                            </select>
                        </div>
                    </ConfigBox>
                </SubTitleDiv>
                <Container>
                    <Ul>
                        {data}
                    </Ul>
                </Container>
            </MainSection>
            <Outlet />
        </StyledMain>
    )
}