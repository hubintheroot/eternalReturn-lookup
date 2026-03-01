import * as Styled from './FullSizeImage.styled';

export default function FullSizeImage({ data, handler, onClick }) {
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
