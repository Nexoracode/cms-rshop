"use client";

import { useEffect, useState } from "react";

type TextAreaProps = {
  htmlFor: string;
  placeholder: string;
  onInpValue: (value: string, isValid: boolean) => void;
  lablel: string;
  value?: string;
  clearInp?: boolean;
};

const TextArea = ({ htmlFor, placeholder, onInpValue, lablel, value = "", clearInp, }: TextAreaProps) => {

  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (clearInp) setInputValue("");
  }, [clearInp]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => e.key === "Enter" && e.preventDefault();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const filteredValue = e.target.value.replace(/\s+/g, " ").replace(/^\s+/, "");

    setInputValue(filteredValue);

    if (filteredValue.length >= 10 && filteredValue.length <= 150)
      onInpValue(filteredValue, true);
    else
      onInpValue(filteredValue, false);
  };

  return (
    <div className="mt-6">
      <label className="block tracking-wide font-bold mb-2" htmlFor={htmlFor}>
        {lablel}
      </label>
      <textarea
        id={htmlFor}
        autoComplete="off"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={`${inputValue.length ? (inputValue.length >= 10 && inputValue.length <= 150 ? "!shadow !shadow-green-600" : "!shadow !shadow-red-300") : "box-inp"} w-full h-24`}
      />
    </div>
  );
};

export default TextArea;