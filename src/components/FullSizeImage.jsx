import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Img } from "./MiniSizeImage";

export default function FullSizeImage({ src, alt, handler, select, name }) {
  const loading = useSelector((state) => state.imageLoaded.detailLoaded);
  const isSelected = select === src.split("/")[8];

  return (
    <>
      <Skel $visible={loading}>
        <SkelTitle $visible={isSelected} />
      </Skel>
      <Container $visible={!loading}>
        <Title $visible={isSelected}>{name.kr}</Title>
        <FullImg
          $visible={isSelected}
          src={src}
          alt={alt}
          onLoad={handler.loadEvent}
        />
      </Container>
    </>
  );
}

const visibleStyle = css`
  ${(props) => (props.$visible ? `display: block` : `display: none;`)}
`;
const skelStyle = css`
  background-color: lightgrey;
  border-radius: 5px;
  background-image: none;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  ${visibleStyle}
`;
const FullImg = styled(Img)`
  object-position: top;
  width: 100%;
  height: 100%;
  ${visibleStyle}
`;
const Title = styled.span`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 700;
  top: -2rem;
  ${visibleStyle}
`;
const Skel = styled(Container)`
  ${skelStyle}
  ${visibleStyle}
`;
const SkelTitle = styled(Title)`
  min-width: 8rem;
  min-height: 1.8rem;
  ${skelStyle}
`;
