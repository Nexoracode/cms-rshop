"use client";
import { useEffect, useState } from "react";

type AcceptCheckboxProps = {
    title: string;
    onRememberChange: (isRemembered: boolean) => void;
    htmlForID?: string,
    clearInp?: boolean,
    defaultChecked?: boolean
};

const AcceptCheckbox = ({ onRememberChange, title, htmlForID = "isRemembered", clearInp = false, defaultChecked = false }: AcceptCheckboxProps) => {
    const [isEnableRemember, setIsEnableRemember] = useState<boolean>(defaultChecked);

    useEffect(() => {
        onRememberChange(isEnableRemember)
    }, [isEnableRemember]);

    useEffect(() => {
        setIsEnableRemember(defaultChecked)
    }, [defaultChecked])

    useEffect(() => {
        if (clearInp) setIsEnableRemember(false)
    }, [clearInp])

    return (
        <div className="flex items-center">
            <input
                onChange={() => setIsEnableRemember((prev) => !prev)}
                type="checkbox"
                id={htmlForID}
                checked={isEnableRemember}
                className="w-4 h-4 cursor-pointer !rounded-lg"
            />
            <label htmlFor={htmlForID} className="text-sm text-[var(--primary)] cursor-pointer whitespace-nowrap select-none ps-2">
                {title}
            </label>
        </div>
    );
};

export default AcceptCheckbox;
