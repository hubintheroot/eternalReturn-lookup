import type { ReactElement } from 'react';
import * as Styled from '../patchNoteDetailView.styled';

interface Change {
  skill?: string;
  stat: string;
  before: string;
  after: string;
  change_type?: 'buff' | 'nerf';
}

interface ChangeItem {
  name: string;
  type?: string;
  subtype?: string;
  changes: Change[];
}

interface FlattenedRow {
  name: string;
  type?: string;
  subtype?: string;
  skill?: string;
  stat: string;
  before: string;
  after: string;
  changeType: 'buff' | 'nerf';
  isFirstRow: boolean;
  rowSpan: number;
}

interface ChangeTableProps {
  data: ChangeItem[] | null;
  type: 'character' | 'equipment';
  variant: 'buff' | 'nerf' | 'mixed';
  hideEntity?: boolean;
}

export default function ChangeTable({ data, type, variant, hideEntity = false }: ChangeTableProps): ReactElement | null {
  if (!data || data.length === 0) {
    return null;
  }

  const isCharacter = type === 'character';

  const flattenedData: FlattenedRow[] = data.flatMap((item) =>
    item.changes.map((change, index) => ({
      name: item.name,
      type: item.type,
      subtype: item.subtype,
      skill: change.skill,
      stat: change.stat,
      before: change.before,
      after: change.after,
      changeType: (change.change_type ?? variant) as 'buff' | 'nerf',
      isFirstRow: index === 0,
      rowSpan: item.changes.length,
    })),
  );

  const hasSkill = isCharacter && flattenedData.some((row) => row.skill);

  return (
    <Styled.TableWrapper>
      <Styled.Table>
        <thead>
          <tr>
            {!hideEntity && (
              <Styled.Th>{isCharacter ? '캐릭터' : '아이템'}</Styled.Th>
            )}
            {!isCharacter && !hideEntity && <Styled.Th>타입</Styled.Th>}
            {hasSkill && <Styled.Th>스킬</Styled.Th>}
            <Styled.Th>스탯</Styled.Th>
            <Styled.Th>변경 전</Styled.Th>
            <Styled.Th>변경 후</Styled.Th>
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((row, index) => (
            <tr key={`${row.name}-${row.stat}-${index}`}>
              {!hideEntity && row.isFirstRow && (
                <Styled.Td rowSpan={row.rowSpan}>{row.name}</Styled.Td>
              )}
              {!isCharacter && !hideEntity && row.isFirstRow && (
                <Styled.Td rowSpan={row.rowSpan}>
                  {row.subtype || row.type}
                </Styled.Td>
              )}
              {hasSkill && <Styled.Td>{row.skill}</Styled.Td>}
              <Styled.Td>{row.stat}</Styled.Td>
              <Styled.Td $variant="before">{row.before}</Styled.Td>
              <Styled.Td $variant="after" $changeType={row.changeType}>
                {row.after}
              </Styled.Td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.TableWrapper>
  );
}
