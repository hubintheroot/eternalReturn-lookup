import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function RedirectHome() {
    const navigate = useNavigate();
    
    // characters 페이지로 넘겨주기
    useEffect(() => {
        navigate('/characters');
    },[navigate]);

    return (
        <></>
    )
}