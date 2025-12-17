import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './MiniSizeImage.styled';

export default function MiniSizeImage({ data, handler }) {
  const loading = useImageLoadedStore((state) => state.detailLoaded);

  return (
    <>
      {loading && <Styled.Skel $size={data.size} />}
      <Styled.Li
        onClick={() => handler.setSelect(data.skinID)}
        style={{ display: loading ? 'none' : 'block' }}
        $size={data.size}
      >
        <Styled.Img src={data.src} alt={data.name.en} onLoad={handler.loadEvent} />
      </Styled.Li>
    </>
  );
}
