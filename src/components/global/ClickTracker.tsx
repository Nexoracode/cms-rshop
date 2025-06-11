'use client';
import React, { useEffect } from 'react';

type ClickTrackerProps = {
    onClickDetected: () => void;
    targetRef: React.RefObject<HTMLElement>;
};

const ClickTracker: React.FC<ClickTrackerProps> = ({ onClickDetected, targetRef }) => {

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement;

            const isInvisible = target.closest('invisible');
            const arr = Array.from(target.children)
            arr.map(item => {
                if (item.classList.contains("invisible") || item.classList.contains("opacity-0")) onClickDetected();
            })

            if (targetRef.current && !targetRef.current.contains(target) && !isInvisible) {
                onClickDetected();
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [targetRef, onClickDetected]);

    return null;
};

export default ClickTracker;