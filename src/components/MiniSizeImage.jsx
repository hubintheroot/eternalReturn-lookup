import styled from "styled-components";
import { useSelector } from "react-redux";

const Li = styled.li`
    display: flex;
    
    ${props => props.$preview && `
            width: ${props.$preview + 2}px;
            height: ${props.$preview}px;
        `}

    box-sizing: border-box;
    border: .1rem solid rgba(0, 0, 0, .2);
    border-radius: .5rem;
    overflow: hidden;
    &:hover {
        cursor: pointer;
        border: .1rem solid #e460ff;
    }
    & > img{
        ${props => props.$preview && `
            width: ${props.$preview + 2}px;
            height: ${props.$preview}px;
        `}
    }
`;
export const Img = styled.img`
    object-fit: cover;
    object-position: -1px -1px;
    box-sizing: border-box;
    background-image: url(${process.env.REACT_APP_BACKGROUND_IMAGE_PATH});
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
`

export default function MiniSizeImage({src, alt, handler, size}){
    const loading = useSelector(state => state.imageLoaded.detailLoaded);

    return ( 
        <>
            <Skel style={{display: loading ? 'block': 'none'}}></Skel>
            <Li 
                onClick={handler.selectedImg}
                style={{display: loading ? 'none': 'block'}}
                $preview={size}>
                <Img
                    src={src}
                    alt={alt}
                    onLoad={handler.onLoad}
                    // $preview={size}
                />
            </Li>
        </>
    )

}