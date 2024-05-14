import { useEffect, useState } from "react";

export default function useImageExists(imgPath){
    const [imgExists, setImgExists] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.src = imgPath;
        image.onerror = () => setImgExists(false);
        image.onload = () => setImgExists(true);

        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [imgPath]);

    return imgExists;
}