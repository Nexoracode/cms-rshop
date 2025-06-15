"use client"
import { useEffect, useState } from "react";
import { refreshAccessToken } from "@/utils/auth";

const AuthProvider = () => {

    const [reFetch, setReFetch] = useState<Boolean>(false)

    useEffect(() => {

        const updataRefreshToken = setTimeout(() => {
            refreshAccessToken()
            setReFetch(prev => !prev)
        }, (24 * 24 * 60));
        
        return () => clearInterval(updataRefreshToken);
    }, [reFetch]);

    return null;
};

export default AuthProvider;