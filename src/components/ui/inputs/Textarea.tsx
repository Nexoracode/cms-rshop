"use client";

import { useState } from "react";
import { Textarea as TextareaHero } from "@heroui/react";

type TextareaProps = {
  value: string;
  onChange: (val: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  minRows?: number;
  maxRows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  label = "آدرس کامل",
  placeholder = "آدرس کامل را وارد کنید",
  isRequired = false,
  minRows = 2,
  maxRows = 5,
}) => {
  const [error, setError] = useState("");

  const validate = (txt: string) => {
    // خالی بودن => ایراد ندارد
    if (!txt.trim()) {
      setError("");
      onChange("", true);
      return;
    }

    // حداقل طول (اختیاری – هرطور خواستی تنظیم کن)
    if (txt.trim().length < 10) {
      setError("آدرس باید حداقل ۱۰ کاراکتر باشد");
      onChange(txt, false);
      return;
    }

    setError("");
    onChange(txt, true);
  };

  return (
    <TextareaHero
      label={label}
      placeholder={placeholder}
      value={value}
      onValueChange={validate}
      isRequired={isRequired}
      minRows={minRows}
      maxRows={maxRows}
      isInvalid={!!error.length}
      errorMessage={error}
      labelPlacement="outside"
    />
  );
};

export default Textarea;
