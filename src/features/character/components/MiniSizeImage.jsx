import { useSelector } from "react-redux";
import styled from "styled-components";

export default function MiniSizeImage({ data, handler }) {
  const loading = useSelector((state) => state.imageLoaded.detailLoaded);

  return (
    <>
      {loading && <Skel $size={data.size} />}
      <Li
        onClick={() => handler.setSelect(data.skinID)}
        style={{ display: loading ? "none" : "block" }}
        $size={data.size}
      >
        <Img src={data.src} alt={data.name.en} onLoad={handler.loadEvent} />
      </Li>
    </>
  );
}

const Li = styled.li`
  ${(props) =>
    props.$size &&
    `
            width: ${props.$size + 2}px;
            height: ${props.$size}px;
            & > img{
                width: ${props.$size + 2}px;
                height: ${props.$size}px;
            }
        `}

  box-sizing: border-box;
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    border: 0.1rem solid #e460ff;
  }
`;
export const Img = styled.img`
  object-fit: cover;
  object-position: -1px -1px;
  box-sizing: border-box;
  background-image: url(${import.meta.env.VITE_BACKGROUND_IMAGE_PATH});
  background-repeat: no-repeat;
  background-size: cover;
`;
const Skel = styled(Li)`
  background-color: lightgrey;
  border: none;
  &:hover {
    cursor: default;
    border: none;
  }
`;
