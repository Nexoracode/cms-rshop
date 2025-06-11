"use client";

import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

type InputProps = {
    htmlFor: string;
    placeholder: string;
    onInpValue: (value: string, isValid: boolean) => void;
    lablel?: string;
    clearInp?: boolean;
    min?: number;
    max?: number;
    allowSpaces?: boolean;
    allowDecimalOnly?: boolean; // اضافه شده
    defaultValue?: string;
    search?: boolean;
    onSearch?: (value: boolean) => void;
};

const Input = ({
    htmlFor,
    placeholder,
    lablel = "",
    onInpValue,
    onSearch,
    clearInp = false,
    min = 3,
    max = 60,
    allowSpaces = true,
    allowDecimalOnly = false, // مقدار پیش‌فرض
    defaultValue = "",
    search = false
}: InputProps) => {
    const [value, setValue] = useState<string>(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (clearInp) setValue("");
    }, [clearInp]);

    const searchHandler = () => {
        if (onSearch) {
            if (value.length >= min && value.length <= max)
                onSearch(true);
            else
                onSearch(false);
        }
    };

    const handleInputChange = (input: string) => {
        let filteredValue = input;

        if (allowDecimalOnly) {
            // فقط اعداد و ممیز
            filteredValue = input.replace(/[^0-9.]/g, "");
            // فقط یک ممیز مجاز است
            const decimalParts = filteredValue.split(".");
            if (decimalParts.length > 2) {
                filteredValue = decimalParts[0] + "." + decimalParts.slice(1).join("");
            }
        } else if (allowSpaces) {
            filteredValue = input.replace(/\s+/g, " ").replace(/^\s+/, "");
        } else {
            filteredValue = input.replace(/\s+/g, "");
        }

        setValue(filteredValue);
        if (filteredValue.length >= min && filteredValue.length <= max)
            onInpValue(filteredValue, true);
        else
            onInpValue(filteredValue, false);
    };

    return (
        <div className={`${lablel ? "mt-6" : "mt-0"} w-full min-w-[210px]`}>
            {
                lablel
                    ?
                    <label className="block tracking-wide font-bold mb-2" htmlFor={htmlFor}>
                        {lablel}
                    </label>
                    : ""
            }

            <div className="relative">
                <input
                    type="text"
                    id={htmlFor}
                    autoComplete="off"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className={`w-full h-12 px-3 rounded-lg ${value.length && (value.length >= min && value.length <= max
                        ? "!shadow !shadow-green-600"
                        : "!shadow !shadow-red-300"
                    )}`}
                />
                {
                    search &&
                    <div onClick={searchHandler} className={`text-[var(--primary)] absolute right-0 top-0 bg-[var(--background)] hover:bg-[var(--light-primary)] rounded-r-lg w-10 h-full flex items-center justify-center cursor-pointer duration-300 transition-all`}>
                        <BsSearch className="text-xl" />
                    </div>
                }
            </div>
        </div>
    );
};

export default Input;