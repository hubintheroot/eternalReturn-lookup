import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as Styled from '../patchNoteDetailView.styled';
import ChangeTable from './ChangeTable';
function CharacterIcon({
  name,
  imageMap
}) {
  const [imgError, setImgError] = useState(false);
  const imgUrl = imageMap?.[name] ?? null;
  const showFallback = !imgUrl || imgError;
  return <Styled.CharacterIconImageWrapper>
      {!showFallback ? <Styled.CharacterIconImage src={imgUrl} alt={name} onError={() => setImgError(true)} /> : <Styled.CharacterIconFallback>{name.charAt(0)}</Styled.CharacterIconFallback>}
    </Styled.CharacterIconImageWrapper>;
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
  onMouseLeave
}) {
  const activeItem = activeDetail?.variant === variant ? items.find(c => c.name === activeDetail.name) : null;
  return <div ref={containerRef} style={{
    position: 'relative'
  }}>
      <Styled.CharacterIconGrid>
        {items.map(item => {
        const isSelected = activeDetail?.name === item.name && activeDetail?.variant === variant;
        return <Styled.CharacterIconItem key={item.name} $selected={isSelected} onClick={e => onSelect(variant, item.name, e, containerRef)} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
              <CharacterIcon name={item.name} imageMap={imageMap} />
              <Styled.CharacterIconLabel>{item.name}</Styled.CharacterIconLabel>
            </Styled.CharacterIconItem>;
      })}
      </Styled.CharacterIconGrid>

      {activeItem && <Styled.CharacterDetailPanel ref={panelRef} $top={activeDetail.top} $left={activeDetail.left} $width={activeDetail.width} $placeAbove={activeDetail.placeAbove} onClick={e => e.stopPropagation()}>
          <ChangeTable data={[activeItem]} type="character" variant={variant} hideEntity />
        </Styled.CharacterDetailPanel>}
    </div>;
}
export default function CharacterSection({
  newCharacters,
  characterChanges,
  imageMap
}) {
  const hasNewCharacters = newCharacters && newCharacters.length > 0;
  const hasBuffs = characterChanges?.buffs?.length > 0;
  const hasNerfs = characterChanges?.nerfs?.length > 0;
  const [activeDetail, setActiveDetail] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const tooltipRafRef = useRef(null);
  const buffContainerRef = useRef(null);
  const nerfContainerRef = useRef(null);
  const detailPanelRef = useRef(null);
  useEffect(() => {
    if (!activeDetail) return;
    const handleOutsideClick = () => setActiveDetail(null);
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [activeDetail]);
  useLayoutEffect(() => {
    if (!activeDetail || !detailPanelRef.current || activeDetail.placeAbove) return;
    const panelRect = detailPanelRef.current.getBoundingClientRect();
    if (panelRect.bottom > window.innerHeight - 8) {
      setActiveDetail(prev => ({
        ...prev,
        placeAbove: true,
        top: prev.iconRelativeTop - 6
      }));
    }
  }, [activeDetail]);
  const handleSelect = (variant, name, e, containerRef) => {
    e.stopPropagation();
    if (activeDetail?.name === name && activeDetail?.variant === variant) {
      setActiveDetail(null);
      return;
    }
    const icon = e.currentTarget;
    const container = containerRef.current;
    let top = 0,
      left = 0,
      width = 300,
      iconRelativeTop = 0;
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
      iconRelativeTop
    });
  };
  const handleMouseMove = e => {
    if (tooltipRafRef.current) return;
    const x = e.clientX;
    const y = e.clientY;
    tooltipRafRef.current = requestAnimationFrame(() => {
      setTooltip({
        x,
        y
      });
      tooltipRafRef.current = null;
    });
  };
  const handleMouseLeave = () => {
    if (tooltipRafRef.current) {
      cancelAnimationFrame(tooltipRafRef.current);
      tooltipRafRef.current = null;
    }
    setTooltip(null);
  };
  if (!hasNewCharacters && !hasBuffs && !hasNerfs) {
    return null;
  }
  return <Styled.SectionBlock>
      <Styled.SectionTitle>캐릭터</Styled.SectionTitle>

      {hasNewCharacters && <Styled.SubSection>
          <Styled.SubSectionTitle>신규 캐릭터</Styled.SubSectionTitle>
          <Styled.CardList>
            {newCharacters.map(character => <Styled.NewCharacterCard key={character.name}>
                <Styled.CardTitle>{character.name}</Styled.CardTitle>
                <Styled.CardDescription>{character.description}</Styled.CardDescription>
                {character.weapon_types && character.weapon_types.length > 0 && <Styled.CardMeta>
                    {character.weapon_types.map(w => <Styled.WeaponTypePill key={w}>{w}</Styled.WeaponTypePill>)}
                  </Styled.CardMeta>}
              </Styled.NewCharacterCard>)}
          </Styled.CardList>
        </Styled.SubSection>}

      {(hasBuffs || hasNerfs) && <Styled.TwoColumnGrid>
          {hasBuffs && <Styled.SubSection>
              <Styled.SectionHeader $variant="buff">▲ 상향</Styled.SectionHeader>
              <IconGrid items={characterChanges.buffs} imageMap={imageMap} activeDetail={activeDetail} variant="buff" containerRef={buffContainerRef} panelRef={detailPanelRef} onSelect={handleSelect} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
            </Styled.SubSection>}
          {hasNerfs && <Styled.SubSection>
              <Styled.SectionHeader $variant="nerf">▼ 하향</Styled.SectionHeader>
              <IconGrid items={characterChanges.nerfs} imageMap={imageMap} activeDetail={activeDetail} variant="nerf" containerRef={nerfContainerRef} panelRef={detailPanelRef} onSelect={handleSelect} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} />
            </Styled.SubSection>}
        </Styled.TwoColumnGrid>}

      {tooltip && <Styled.CharacterTooltip style={{
      left: tooltip.x + 14,
      top: tooltip.y + 14
    }}>
          클릭하여 변경사항 보기
        </Styled.CharacterTooltip>}
    </Styled.SectionBlock>;
}