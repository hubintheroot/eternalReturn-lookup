import { useImageLoadedStore } from '@/entities/image-loaded/store';
import * as Styled from './FullSizeImage.styled';

export default function FullSizeImage({ data, handler }) {
  const loading = useImageLoadedStore((state) => state.detailLoaded);
  const isSelected = data.select === data.skinID;

  return (
    <>
      {loading && (
        <Styled.Skel $visible={loading}>
          <Styled.SkelTitle $visible={isSelected} />
        </Styled.Skel>
      )}
      <Styled.Container $visible={!loading}>
        <Styled.Title $visible={isSelected}>{data.name.kr}</Styled.Title>
        <Styled.FullImg
          $visible={isSelected}
          src={data.src}
          alt={data.name.en}
          onLoad={handler.loadEvent}
        />
      </Styled.Container>
    </>
  );
}
