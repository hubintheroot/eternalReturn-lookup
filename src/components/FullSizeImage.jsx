import styled from "styled-components";
import { Img } from "./MiniSizeImage";
import { useSelector } from "react-redux";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
`;
const FullImg = styled(Img)`
    object-position: top;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
`;
const Skel = styled(FullImg)`
    background-color: lightgrey;
    border-radius: 5px;
    background-image: none;
`;

export default function FullSizeImage({src, alt, handler, select}){
    const loading = useSelector(state => state.imageLoaded.detailLoaded);
    
    return (
        <>
            <Skel style={{display: loading ? 'block' : 'none'}}/>
            <Container style={{display: loading ? 'none' : 'block'}}>
                <FullImg
                    style={{display: select === src.split('/')[4] ? 'block' : 'none'}}
                    src={src}
                    alt={alt}
                    onLoad={handler.onLoad}
                />
            </Container>
        </>
    )
}