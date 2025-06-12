"use client"

import React, { useEffect, useState } from 'react';

const SplashScreen = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 500);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{ zIndex: "1000" }} className={`fixed inset-0 flex items-center justify-center bg-splash-screen transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
            {children}
        </div>
    );
};

export default SplashScreen;