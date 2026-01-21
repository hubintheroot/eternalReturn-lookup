import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';

export default function EquipmentSection({ equipmentChanges }) {
  const hasBuffs = equipmentChanges?.buffs?.length > 0;
  const hasNerfs = equipmentChanges?.nerfs?.length > 0;

  if (!hasBuffs && !hasNerfs) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>아이템</Styled.SectionTitle>

      {hasBuffs && (
        <ChangeTable
          data={equipmentChanges.buffs}
          type="equipment"
          variant="buff"
        />
      )}

      {hasNerfs && (
        <ChangeTable
          data={equipmentChanges.nerfs}
          type="equipment"
          variant="nerf"
        />
      )}
    </Styled.SectionBlock>
  );
}
