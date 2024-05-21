import { useEffect, useState } from "react";

export default function useCheckImageExists(imgPath){
    const [imgExists, setImgExists] = useState(false);
    useEffect(() => {
        const image = new Image();
        image.src = imgPath;
        image.onerror = () => setImgExists(false);
        image.onload = () => setImgExists(true);

        // unmount 실행 함수
        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [imgPath]);

    return imgExists;
}