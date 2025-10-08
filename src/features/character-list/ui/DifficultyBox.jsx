import styled from "styled-components";

export default function DifficultyBox({ difficulty, maxDifficulty }) {
  const createDiffBox = () => {
    const diffbox = [];
    for (let i = 0; i < maxDifficulty; i++) {
      const diffBox =
        difficulty > i ? (
          <Difficulty key={i} />
        ) : (
          <Difficulty key={i} $empty={true} />
        );
      diffbox.push(diffBox);
    }
    return diffbox;
  };

  return <DiffBox>{createDiffBox()}</DiffBox>;
}

const DiffBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.1rem;
`;
const Difficulty = styled.div`
  margin: 0 0.1rem;
  background-color: ${(props) => (props.$empty ? "lightgray" : "lightblue")};
  box-sizing: border-box;
  border: 0.1rem solid lightskyblue;
  width: 0.8rem;
  height: 1.2rem;
  transform: skew(-20deg);
`;
