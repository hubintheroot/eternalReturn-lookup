import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as Styled from './ImageModal.styled';

export default function ImageModal({ src, label, onClose, originX, originY }) {
  const tx = (originX ?? window.innerWidth / 2) - window.innerWidth / 2;
  const ty = (originY ?? window.innerHeight / 2) - window.innerHeight / 2;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const content = (
    <Styled.Overlay onClick={handleOverlayClick}>
      <Styled.ModalBox style={{ '--tx': `${tx}px`, '--ty': `${ty}px` }}>
        <Styled.CloseButton onClick={onClose} aria-label="닫기">
          ✕
        </Styled.CloseButton>
        <Styled.Img src={src} alt={label} draggable="false" />
        {label && <Styled.SkinLabel>{label}</Styled.SkinLabel>}
      </Styled.ModalBox>
    </Styled.Overlay>
  );

  const portalEl = document.getElementById('modal');
  return portalEl ? createPortal(content, portalEl) : content;
}
