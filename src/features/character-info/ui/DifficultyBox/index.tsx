import type { ReactElement } from 'react';
import * as Styled from './DifficultyBox.styled';

interface DifficultyBoxProps {
  difficulty: number;
  maxDifficulty: number;
}

export default function DifficultyBox({ difficulty, maxDifficulty }: DifficultyBoxProps): ReactElement {
  const createDiffBox = (): ReactElement[] => {
    const diffbox: ReactElement[] = [];
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
