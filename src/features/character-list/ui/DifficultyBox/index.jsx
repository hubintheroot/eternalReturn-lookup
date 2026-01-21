import * as Styled from './DifficultyBox.styled';

export default function DifficultyBox({ difficulty, maxDifficulty }) {
  const createDiffBox = () => {
    const diffbox = [];
    for (let i = 0; i < maxDifficulty; i++) {
      const diffBox =
        difficulty > i ? (
          <Styled.Difficulty key={i} />
        ) : (
          <Styled.Difficulty key={i} $empty={true} />
        );
      diffbox.push(diffBox);
    }
    return diffbox;
  };

  return <Styled.DiffBox>{createDiffBox()}</Styled.DiffBox>;
}
