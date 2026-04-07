import type { ReactElement } from 'react';
import { useState } from 'react';
import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';

interface Change {
  skill?: string;
  stat: string;
  before: string;
  after: string;
  change_type?: 'buff' | 'nerf';
}

interface EquipmentItem {
  name: string;
  type?: string;
  subtype?: string;
  changes: Change[];
}

interface EquipmentChanges {
  buffs?: EquipmentItem[];
  nerfs?: EquipmentItem[];
}

interface EquipmentAccordionListProps {
  items: EquipmentItem[];
  variant: 'buff' | 'nerf';
  openItem: string | null;
  onToggle: (key: string | null) => void;
}

function EquipmentAccordionList({ items, variant, openItem, onToggle }: EquipmentAccordionListProps): ReactElement {
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
              <Styled.AccordionChevron $isOpen={isOpen}>&#9660;</Styled.AccordionChevron>
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

interface EquipmentSectionProps {
  equipmentChanges: EquipmentChanges | undefined;
}

export default function EquipmentSection({ equipmentChanges }: EquipmentSectionProps): ReactElement | null {
  const hasBuffs = (equipmentChanges?.buffs?.length ?? 0) > 0;
  const hasNerfs = (equipmentChanges?.nerfs?.length ?? 0) > 0;

  const [openBuffItem, setOpenBuffItem] = useState<string | null>(null);
  const [openNerfItem, setOpenNerfItem] = useState<string | null>(null);

  if (!hasBuffs && !hasNerfs) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>아이템</Styled.SectionTitle>

      {hasBuffs && equipmentChanges?.buffs && (
        <Styled.SubSection>
          <Styled.SectionHeader $variant="buff">&#9650; 상향</Styled.SectionHeader>
          <EquipmentAccordionList
            items={equipmentChanges.buffs}
            variant="buff"
            openItem={openBuffItem}
            onToggle={setOpenBuffItem}
          />
        </Styled.SubSection>
      )}

      {hasNerfs && equipmentChanges?.nerfs && (
        <Styled.SubSection>
          <Styled.SectionHeader $variant="nerf">&#9660; 하향</Styled.SectionHeader>
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
