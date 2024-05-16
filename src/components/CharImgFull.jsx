import styled from "styled-components";
import { Img } from "./ImageListItem";

const FullImg = styled(Img)`
    object-position: top;
    width: 512px;
    height: 768px;
`;
const Skel = styled(FullImg)`
    background-color: lightgrey;
    border-radius: 5px;
    background-image: none;
`

export default function CharImgFull({data}){
    return ( data.loading ?
        <Skel style={{display: data.loading ? 'block' : 'none'}}/>
        :
        <FullImg style={{display: data.loading ? 'none' : 'block'}}
            src={data.src}
            alt={data.alt}
            onError={data.handler.onError}
            onLoad={data.handler.onLoad}
        />
    )
}