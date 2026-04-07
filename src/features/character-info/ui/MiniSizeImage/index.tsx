import type { ReactElement } from 'react';
import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './MiniSizeImage.styled';

interface MiniSizeImageProps {
  src: string;
  alt: string;
  isActive: boolean;
  onClick?: () => void;
}

export default function MiniSizeImage({ src, alt, isActive, onClick }: MiniSizeImageProps): ReactElement {
  const loading = useImageLoadedStore((state) => state.detailLoaded);

  return (
    <>
      {loading && <Styled.Skel />}
      <Styled.Li
        $active={isActive}
        onClick={onClick}
        style={{ display: loading ? 'none' : 'block' }}
      >
        <Styled.Img src={src} alt={alt} draggable="false" />
      </Styled.Li>
    </>
  );
}
