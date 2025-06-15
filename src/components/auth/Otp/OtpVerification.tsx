"use client";

import { useEffect, useState } from "react";
import OtpBox from "./OtpBox";

type Props = {
  onIsCompleteCode: (value: string) => unknown;
  lengthCode: number;
};

const OtpVerification = ({
  onIsCompleteCode,
  lengthCode,
}: Props) => {
  const [code, setCode] = useState<string[]>(Array(lengthCode).fill(""));
  const [inpFocus, setInpFocus] = useState<number>(1);
  const arrayFill = Array(lengthCode).fill("*");

  useEffect(() => {
    if (code.length && code.length === lengthCode) {
      const newCode = code.join("").trim();

      if (newCode.length === lengthCode) {
        onIsCompleteCode(newCode);
      } else {
        onIsCompleteCode("");
      }
    }
  }, [code]);

  const changeHandler = (
    value: string,
    col: number,
    back: number | undefined,
  ) => {
    if (back) {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[col - 1] = "";
        return newCode;
      });

      setInpFocus(back);
    } else {
      setCode((prev) => {
        const newCode = [...prev];
        newCode[col - 1] = value;
        return newCode;
      });

      setInpFocus(col + 1);
    }
  };

  return (
    <section className="flex flex-wrap items-center justify-center gap-3 sm:justify-between sm:gap-0">
      {arrayFill.map((item, index) => (
        <div key={index + 1}>
          <OtpBox
            onValue={changeHandler}
            colNumber={index + 1}
            isFocus={inpFocus === index + 1 ? true : false}
          />
        </div>
      ))}
    </section>
  );
};

export default OtpVerification;
