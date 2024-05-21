import styled from "styled-components";
import { Img } from "./MiniSizeImage";
import { useSelector } from "react-redux";

const FullImg = styled(Img)`
    object-position: top;
    width: 512px;
    height: 768px;
    position: absolute;
    top: 0;
`;
const Skel = styled(FullImg)`
    background-color: lightgrey;
    border-radius: 5px;
    background-image: none;
`

export default function FullSizeImage({src, select, handler, }){
    const loading = useSelector(state => state.imageLoaded.detailLoaded);
    
    return (
        <>
            <Skel style={{display: loading ? 'block' : 'none'}}/>
            <div style={{display: loading ? 'none' : 'block'}}>
                <FullImg style={{display: select === src.split('/')[4] ? 'block' : 'none'}}
                    src={src}
                    onLoad={handler.onLoad}
                />
            </div>
        </>
    )
}