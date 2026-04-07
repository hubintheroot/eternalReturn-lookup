import type { ReactElement, RefObject, MouseEvent } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';

type ChangeVariant = 'buff' | 'nerf' | 'mixed';

interface Change {
  skill?: string;
  stat: string;
  before: string;
  after: string;
  change_type?: 'buff' | 'nerf';
}

interface CharacterChangeItem {
  name: string;
  type?: string;
  subtype?: string;
  changes: Change[];
}

interface MixedCharacterItem {
  name: string;
  buffs?: Change[];
  nerfs?: Change[];
}

interface CharacterChanges {
  buffs?: CharacterChangeItem[];
  nerfs?: CharacterChangeItem[];
  mixed?: MixedCharacterItem[];
}

interface NewCharacter {
  name: string;
  description: string;
  weapon_types?: string[];
}

interface ActiveDetail {
  variant: ChangeVariant;
  name: string;
  top: number;
  left: number;
  width: number;
  placeAbove: boolean;
  iconRelativeTop: number;
}

interface TooltipPosition {
  x: number;
  y: number;
}

interface CharacterIconProps {
  name: string;
  imageMap: Record<string, string> | null;
}

function CharacterIcon({ name, imageMap }: CharacterIconProps): ReactElement {
  const [imgError, setImgError] = useState(false);
  const imgUrl = imageMap?.[name] ?? null;
  const showFallback = !imgUrl || imgError;
  return (
    <Styled.CharacterIconImageWrapper>
      {!showFallback ? (
        <Styled.CharacterIconImage src={imgUrl} alt={name} onError={() => setImgError(true)} />
      ) : (
        <Styled.CharacterIconFallback>{name.charAt(0)}</Styled.CharacterIconFallback>
      )}
    </Styled.CharacterIconImageWrapper>
  );
}

interface IconGridProps {
  items: CharacterChangeItem[];
  imageMap: Record<string, string> | null;
  activeDetail: ActiveDetail | null;
  variant: ChangeVariant;
  containerRef: RefObject<HTMLDivElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
  onSelect: (variant: ChangeVariant, name: string, e: MouseEvent<HTMLButtonElement>, containerRef: RefObject<HTMLDivElement | null>) => void;
  onMouseMove: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: () => void;
}

function IconGrid({
  items,
  imageMap,
  activeDetail,
  variant,
  containerRef,
  panelRef,
  onSelect,
  onMouseMove,
  onMouseLeave,
}: IconGridProps): ReactElement {
  const activeItem = activeDetail?.variant === variant ? items.find((c) => c.name === activeDetail.name) : null;
  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <Styled.CharacterIconGrid>
        {items.map((item) => {
          const isSelected = activeDetail?.name === item.name && activeDetail?.variant === variant;
          return (
            <Styled.CharacterIconItem
              key={item.name}
              $selected={isSelected}
              onClick={(e) => onSelect(variant, item.name, e, containerRef)}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
            >
              <CharacterIcon name={item.name} imageMap={imageMap} />
              <Styled.CharacterIconLabel>{item.name}</Styled.CharacterIconLabel>
            </Styled.CharacterIconItem>
          );
        })}
      </Styled.CharacterIconGrid>

      {activeItem && (
        <Styled.CharacterDetailPanel
          ref={panelRef}
          $top={activeDetail!.top}
          $left={activeDetail!.left}
          $width={activeDetail!.width}
          $placeAbove={activeDetail!.placeAbove}
          onClick={(e) => e.stopPropagation()}
        >
          <ChangeTable data={[activeItem]} type="character" variant={variant} hideEntity />
        </Styled.CharacterDetailPanel>
      )}
    </div>
  );
}

interface CharacterSectionProps {
  newCharacters: NewCharacter[] | undefined;
  characterChanges: CharacterChanges | undefined;
  imageMap: Record<string, string> | null;
}

export default function CharacterSection({
  newCharacters,
  characterChanges,
  imageMap,
}: CharacterSectionProps): ReactElement | null {
  const hasNewCharacters = newCharacters && newCharacters.length > 0;
  const hasBuffs = (characterChanges?.buffs?.length ?? 0) > 0;
  const hasNerfs = (characterChanges?.nerfs?.length ?? 0) > 0;
  const hasMixed = (characterChanges?.mixed?.length ?? 0) > 0;
  const [activeDetail, setActiveDetail] = useState<ActiveDetail | null>(null);
  const [tooltip, setTooltip] = useState<TooltipPosition | null>(null);
  const tooltipRafRef = useRef<number | null>(null);
  const buffContainerRef = useRef<HTMLDivElement | null>(null);
  const nerfContainerRef = useRef<HTMLDivElement | null>(null);
  const mixedContainerRef = useRef<HTMLDivElement | null>(null);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeDetail) return;
    const handleOutsideClick = (): void => setActiveDetail(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [activeDetail]);

  useLayoutEffect(() => {
    if (!activeDetail || !detailPanelRef.current || activeDetail.placeAbove) return;
    const panelRect = detailPanelRef.current.getBoundingClientRect();
    if (panelRect.bottom > window.innerHeight - 8) {
      setActiveDetail((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          placeAbove: true,
          top: prev.iconRelativeTop - 6,
        };
      });
    }
  }, [activeDetail]);

  const handleSelect = (
    variant: ChangeVariant,
    name: string,
    e: MouseEvent<HTMLButtonElement>,
    containerRef: RefObject<HTMLDivElement | null>,
  ): void => {
    e.stopPropagation();
    if (activeDetail?.name === name && activeDetail?.variant === variant) {
      setActiveDetail(null);
      return;
    }
    const icon = e.currentTarget;
    const container = containerRef.current;
    let top = 0;
    let left = 0;
    let width = 300;
    let iconRelativeTop = 0;
    if (icon && container) {
      const iconRect = icon.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      iconRelativeTop = iconRect.top - containerRect.top;
      top = iconRect.bottom - containerRect.top + 6;
      left = 0;
      width = containerRect.width;
    }
    setActiveDetail({
      variant,
      name,
      top,
      left,
      width,
      placeAbove: false,
      iconRelativeTop,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>): void => {
    if (tooltipRafRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    tooltipRafRef.current = requestAnimationFrame(() => {
      setTooltip({ x, y });
      tooltipRafRef.current = null;
    });
  };

  const handleMouseLeave = (): void => {
    if (tooltipRafRef.current) {
      cancelAnimationFrame(tooltipRafRef.current);
      tooltipRafRef.current = null;
    }
    setTooltip(null);
  };

  if (!hasNewCharacters && !hasBuffs && !hasNerfs && !hasMixed) {
    return null;
  }

  return (
    <Styled.SectionBlock>
      <Styled.SectionTitle>캐릭터</Styled.SectionTitle>

      {hasNewCharacters && newCharacters && (
        <Styled.SubSection>
          <Styled.SubSectionTitle>신규 캐릭터</Styled.SubSectionTitle>
          <Styled.CardList>
            {newCharacters.map((character) => (
              <Styled.NewCharacterCard key={character.name}>
                <Styled.CardTitle>{character.name}</Styled.CardTitle>
                <Styled.CardDescription>{character.description}</Styled.CardDescription>
                {character.weapon_types && character.weapon_types.length > 0 && (
                  <Styled.CardMeta>
                    {character.weapon_types.map((w) => (
                      <Styled.WeaponTypePill key={w}>{w}</Styled.WeaponTypePill>
                    ))}
                  </Styled.CardMeta>
                )}
              </Styled.NewCharacterCard>
            ))}
          </Styled.CardList>
        </Styled.SubSection>
      )}

      {(hasBuffs || hasNerfs) && (
        <Styled.TwoColumnGrid>
          {hasBuffs && characterChanges?.buffs && (
            <Styled.SubSection>
              <Styled.SectionHeader $variant="buff">&#9650; 상향</Styled.SectionHeader>
              <IconGrid
                items={characterChanges.buffs}
                imageMap={imageMap}
                activeDetail={activeDetail}
                variant="buff"
                containerRef={buffContainerRef}
                panelRef={detailPanelRef}
                onSelect={handleSelect}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </Styled.SubSection>
          )}
          {hasNerfs && characterChanges?.nerfs && (
            <Styled.SubSection>
              <Styled.SectionHeader $variant="nerf">&#9660; 하향</Styled.SectionHeader>
              <IconGrid
                items={characterChanges.nerfs}
                imageMap={imageMap}
                activeDetail={activeDetail}
                variant="nerf"
                containerRef={nerfContainerRef}
                panelRef={detailPanelRef}
                onSelect={handleSelect}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
            </Styled.SubSection>
          )}
        </Styled.TwoColumnGrid>
      )}

      {hasMixed && characterChanges?.mixed && (
        <Styled.SubSection>
          <Styled.SectionHeader $variant="mixed">&#9670; 복합적</Styled.SectionHeader>
          <IconGrid
            items={characterChanges.mixed.map((item) => ({
              name: item.name,
              changes: [
                ...(item.buffs ?? []).map((c) => ({ ...c, change_type: 'buff' as const })),
                ...(item.nerfs ?? []).map((c) => ({ ...c, change_type: 'nerf' as const })),
              ],
            }))}
            imageMap={imageMap}
            activeDetail={activeDetail}
            variant="mixed"
            containerRef={mixedContainerRef}
            panelRef={detailPanelRef}
            onSelect={handleSelect}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </Styled.SubSection>
      )}

      {tooltip && (
        <Styled.CharacterTooltip
          style={{
            left: tooltip.x + 14,
            top: tooltip.y + 14,
          }}
        >
          클릭하여 변경사항 보기
        </Styled.CharacterTooltip>
      )}
    </Styled.SectionBlock>
  );
}
