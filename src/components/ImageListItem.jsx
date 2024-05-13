import styled from "styled-components";
import useImageExists from "../hooks/useImageExists";

const Li = styled.li`
    width: 84px;
    height: 84px;
    border: .1rem solid rgba(0, 0, 0, .2);
    border-radius: .5rem;
    overflow: hidden;
    &:hover {
        cursor: pointer;
        border: .1rem solid #e460ff;
    }
`;

const Img = styled.img`
    object-fit: cover;
    object-position: ${props => props.$imgFull ? 'top': '-1px -1px'};
    width: ${props => props.$preview ? `${props.$preview + 2}px` : '512px'};
    height: ${props => props.$preview ? `${props.$preview}px` : '768px'};
    box-sizing: border-box;
    background-image: url(${process.env.REACT_APP_BACKGROUND_IMAGE_PATH});
    background-repeat: no-repeat;
    background-size: cover;
`;

export default function ImageListItem({data}){
    const imgExists = useImageExists(data.src);

    if (!imgExists) return null;

    return (
        <Li onClick={data.handler.selectedImg}>
            <Img
                src={data.src}
                alt={data.alt}
                onError={data.handler.onError}
                $preview={data.size}
            />
        </Li>
    )

}