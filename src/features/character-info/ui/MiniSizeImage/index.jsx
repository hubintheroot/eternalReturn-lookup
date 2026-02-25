import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './MiniSizeImage.styled';

export default function MiniSizeImage({ src, alt, isActive, onClick }) {
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
