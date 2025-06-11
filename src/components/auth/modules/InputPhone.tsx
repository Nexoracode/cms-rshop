"use client";

import { useEffect, useState } from "react";

type InputPhoneProps = {
    onIsCorrectPassword: (value: string) => any;
    label?: string;
    title?: string;
    defaultValue?: string;
    clearInp?: boolean;
};

const InputPhone = ({ onIsCorrectPassword, label = "password", title = "Password", defaultValue = "", clearInp = false }: InputPhoneProps) => {

    const [phone, setPhone] = useState<string>(defaultValue);

    useEffect(() => {
        setPhone(defaultValue || "");
    }, [defaultValue]);

    useEffect(() => {
        if (phone.length === 11) onIsCorrectPassword(phone);
        else onIsCorrectPassword("");
    }, [phone]);
    
    useEffect(() => {
        if (clearInp) setPhone("");
    }, [clearInp]);

    return (
        <div className="h-full mt-6">
            <label htmlFor={label} className="block tracking-wide text-[var(--black-color)] font-bold mb-2">{title}</label>
            <div className="relative">
                <input
                    type="text"
                    placeholder="09031335938"
                    id={label}
                    value={phone}
                    className={`${phone.length && (phone.length === 11 ? "!shadow !shadow-green-600" : "!shadow !shadow-red-300")} w-full h-12 px-3 rounded-lg`}
                    onChange={e => {
                        const inputValue = e.target.value.replace(/\s|[^0-9]/g, "");
                        inputValue.length <= 11 && setPhone(inputValue);
                    }}
                    onKeyDown={e => e.key === " " && e.preventDefault()}
                />
            </div>

            <div className={`text-red-500 text-[.9rem] mt-2 ml-4 select-none ${phone.length && phone.length !== 11 ? 'block' : 'hidden'}`}>
                ╚ The entered phone number is wrong.
            </div>
        </div>
    );
};

export default InputPhone;