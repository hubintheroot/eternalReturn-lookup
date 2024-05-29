import { useEffect, useState } from "react";
import styled from "styled-components";

const DiffBox = styled.div`
    display: flex;
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

export default function DifficultyBox({difficulty, maxDifficulty}){
    const [diff, setDiff] = useState();
    useEffect(() => {
        setDiff(difficulty);
    },[difficulty]);

    const createDiffBox = () => {
        let diffbox = [];
        for (let i =0; i < maxDifficulty; i++) {
            const diffBox = diff > i
                    ?
                    <Difficulty key={i}/>
                    :
                    <Difficulty key={i} $empty={true}/>;
            diffbox.push(diffBox);
        }
        return diffbox;
    };

    return (
        <DiffBox>
            {createDiffBox()}
        </DiffBox>
    )
}