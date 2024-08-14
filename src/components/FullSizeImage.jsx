import styled, { css } from "styled-components";
import { Img } from "./MiniSizeImage";
import { useSelector } from "react-redux";

const visibleStyle = css`
  ${(props) => (props.$visible ? `display: block` : `display: none;`)}
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
const Skel = styled(Container)`
  background-color: lightgrey;
  border-radius: 5px;
  background-image: none;
`;
const Title = styled.span`
  position: absolute;
  font-size: 1.5rem;
  font-weight: 700;
  top: -2rem;
  ${visibleStyle}
`;
export default function FullSizeImage({ src, alt, handler, select, name }) {
  const loading = useSelector((state) => state.imageLoaded.detailLoaded);
  const isLoaded = !loading;
  const isSelected = select === src.split("/")[4];

  return (
    <>
      <Skel />
      <Container $visible={isLoaded}>
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
