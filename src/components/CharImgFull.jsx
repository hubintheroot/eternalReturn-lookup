import styled from "styled-components";
import { Img } from "./ImageListItem";
import { useEffect, useState } from "react";

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
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
    },[data.src])

    const onLoad = () => setLoading(false);
    
    return (
        <>
            <Skel style={{display: loading ? 'block' : 'none'}}/>
            <FullImg style={{display: loading ? 'none' : 'block'}}
                src={data.src}
                alt={data.alt}
                onError={data.handler.onError}
                onLoad={onLoad}
            />
        </>
    )
}