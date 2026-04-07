import type { MouseEvent, ReactElement } from 'react';
import * as Styled from './FullSizeImage.styled';

interface FullSizeImageData {
  src: string;
  name: {
    kr: string;
    en: string;
  };
}

interface FullSizeImageHandler {
  loadEvent: () => void;
}

interface FullSizeImageProps {
  data: FullSizeImageData;
  handler: FullSizeImageHandler;
  onClick?: (e: MouseEvent<HTMLImageElement>) => void;
}

export default function FullSizeImage({ data, handler, onClick }: FullSizeImageProps): ReactElement {
  return (
    <>
      <Styled.Img
        src={data.src}
        alt={data.name.en}
        draggable="false"
        onLoad={handler.loadEvent}
        onClick={onClick}
        style={{ cursor: onClick ? 'zoom-in' : 'default' }}
      />
      <Styled.Title>{data.name.kr}</Styled.Title>
    </>
  );
}
