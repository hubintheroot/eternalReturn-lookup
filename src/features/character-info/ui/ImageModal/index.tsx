import { useEffect } from 'react';
import type { CSSProperties, MouseEvent, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './ImageModal.styled';

interface ImageModalProps {
  src: string;
  label: string;
  onClose: () => void;
  originX?: number;
  originY?: number;
}

interface ModalCSSProperties extends CSSProperties {
  '--tx': string;
  '--ty': string;
}

export default function ImageModal({ src, label, onClose, originX, originY }: ImageModalProps): ReactElement {
  const tx = (originX ?? window.innerWidth / 2) - window.innerWidth / 2;
  const ty = (originY ?? window.innerHeight / 2) - window.innerHeight / 2;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const modalStyle: ModalCSSProperties = {
    '--tx': `${tx}px`,
    '--ty': `${ty}px`,
  };

  const content = (
    <Styled.Overlay onClick={handleOverlayClick}>
      <Styled.ModalBox style={modalStyle}>
        <Styled.CloseButton onClick={onClose} aria-label="닫기">
          &#x2715;
        </Styled.CloseButton>
        <Styled.Img src={src} alt={label} draggable="false" />
        {label && <Styled.SkinLabel>{label}</Styled.SkinLabel>}
      </Styled.ModalBox>
    </Styled.Overlay>
  );

  const portalEl = document.getElementById('modal');
  return portalEl ? createPortal(content, portalEl) as ReactElement : content;
}
