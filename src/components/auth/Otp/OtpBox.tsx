"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onValue: (value: string, col: number, back?: number | undefined) => void;
  colNumber: number;
  isFocus: boolean;
};

const OtpBox = ({ onValue, colNumber, isFocus }: Props) => {
  const [val, setVal] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    isFocus && inputRef.current && inputRef.current.focus();
  }, [isFocus]);

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setVal("");
      if (colNumber === 1) onValue("", colNumber, colNumber);
      else onValue("", colNumber, colNumber - 1);
    } else if (!isNaN(+e.key) && e.code !== "Space") {
      onValue(e.key, colNumber);
      setVal(e.key);
      e.currentTarget.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      data-col={colNumber}
      type="text"
      value={val}
      minLength={1}
      maxLength={1}
      onChange={() => {}}
      onKeyDown={(e) => keyDownHandler(e)}
      style={{ padding: "0 !important" }}
      className={`mx-2 h-[56px] w-[52px] rounded-xl !p-0 text-center text-2xl font-bold dark:focus:shadow-[0_0_10px_lightgray] focus:shadow-[0_0_10px_gray] dark:shadow-[0_0_10px_gray] sm:h-[68px] sm:w-[64px] ${val.length ? "shadow-green-500" : ""}`}
    />
  );
};

export default OtpBox;
