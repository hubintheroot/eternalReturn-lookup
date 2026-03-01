import { useState } from 'react';
import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';

function EquipmentAccordionList({ items, variant, openItem, onToggle }) {
  return (
    <>
      {items.map((item) => {
        const key = item.name;
        const isOpen = openItem === key;
        return (
          <Styled.AccordionItem key={key}>
            <Styled.AccordionHeader onClick={() => onToggle(isOpen ? null : key)}>
              <Styled.VariantBadge $variant={variant}>
                {variant === 'buff' ? '상향' : '하향'}
              </Styled.VariantBadge>
              <Styled.ItemName>{item.name}</Styled.ItemName>
              {(item.subtype || item.type) && (
                <Styled.ItemType>· {item.subtype || item.type}</Styled.ItemType>
              )}
              <Styled.AccordionChevron $isOpen={isOpen}>▼</Styled.AccordionChevron>
            </Styled.AccordionHeader>
            <Styled.AccordionBody $isOpen={isOpen}>
              <Styled.AccordionContent>
                <ChangeTable data={[item]} type="equipment" variant={variant} hideEntity />
              </Styled.AccordionContent>
            </Styled.AccordionBody>
          </Styled.AccordionItem>
        );
      })}
    </>
  );
}

export default function EquipmentSection({ equipmentChanges }) {
  const hasBuffs = equipmentChanges?.buffs?.length > 0;
  const hasNerfs = equipmentChanges?.nerfs?.length > 0;

  const [openBuffItem, setOpenBuffItem] = useState(null);
  const [openNerfItem, setOpenNerfItem] = useState(null);

  if (!hasBuffs && !hasNerfs) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>아이템</Styled.SectionTitle>

      {hasBuffs && (
        <Styled.SubSection>
          <Styled.SectionHeader $variant="buff">▲ 상향</Styled.SectionHeader>
          <EquipmentAccordionList
            items={equipmentChanges.buffs}
            variant="buff"
            openItem={openBuffItem}
            onToggle={setOpenBuffItem}
          />
        </Styled.SubSection>
      )}

      {hasNerfs && (
        <Styled.SubSection>
          <Styled.SectionHeader $variant="nerf">▼ 하향</Styled.SectionHeader>
          <EquipmentAccordionList
            items={equipmentChanges.nerfs}
            variant="nerf"
            openItem={openNerfItem}
            onToggle={setOpenNerfItem}
          />
        </Styled.SubSection>
      )}
    </Styled.SectionBlock>
  );
}
