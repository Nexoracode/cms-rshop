"use client"

import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC = () => {
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
        <div style={{zIndex: "1000"}} className={`fixed inset-0 flex items-center justify-center bg-[var(--background)] transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center">
                <img
                    src="/icons/icon-192x192.png"
                    alt="Logo"
                    className="w-24 h-24 mx-auto mb-4 rounded-lg"
                />
                <h1 className="text-2xl font-bold select-none">OPAhelp</h1>
            </div>
        </div>
    );
};

export default SplashScreen;