import * as Styled from '../patchNoteDetailView.styled';

export default function ChangeTable({ data, type, variant }) {
  if (!data || data.length === 0) {
    return null;
  }

  const isCharacter = type === 'character';
  const isBuffs = variant === 'buff';
  const title = isCharacter
    ? isBuffs
      ? '캐릭터 상향'
      : '캐릭터 하향'
    : isBuffs
      ? '아이템 상향'
      : '아이템 하향';

  const flattenedData = data.flatMap((item) =>
    item.changes.map((change, index) => ({
      name: item.name,
      type: item.type,
      subtype: item.subtype,
      skill: change.skill,
      stat: change.stat,
      before: change.before,
      after: change.after,
      isFirstRow: index === 0,
      rowSpan: item.changes.length,
    })),
  );

  return (
    <Styled.TableWrapper>
      <Styled.TableTitle $variant={variant}>{title}</Styled.TableTitle>
      <Styled.Table>
        <thead>
          <tr>
            <Styled.Th>{isCharacter ? '캐릭터' : '아이템'}</Styled.Th>
            {!isCharacter && <Styled.Th>타입</Styled.Th>}
            <Styled.Th>{isCharacter ? '스킬' : '스탯'}</Styled.Th>
            {isCharacter && <Styled.Th>스탯</Styled.Th>}
            <Styled.Th>변경 전</Styled.Th>
            <Styled.Th>변경 후</Styled.Th>
          </tr>
        </thead>
        <tbody>
          {flattenedData.map((row, index) => (
            <tr key={`${row.name}-${row.stat}-${index}`}>
              {row.isFirstRow && (
                <Styled.Td rowSpan={row.rowSpan}>{row.name}</Styled.Td>
              )}
              {!isCharacter && row.isFirstRow && (
                <Styled.Td rowSpan={row.rowSpan}>
                  {row.subtype || row.type}
                </Styled.Td>
              )}
              <Styled.Td>{isCharacter ? row.skill : row.stat}</Styled.Td>
              {isCharacter && <Styled.Td>{row.stat}</Styled.Td>}
              <Styled.Td $variant="before">{row.before}</Styled.Td>
              <Styled.Td $variant="after" $changeType={variant}>
                {row.after}
              </Styled.Td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.TableWrapper>
  );
}
