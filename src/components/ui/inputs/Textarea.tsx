"use client";

import FieldErrorText from "@/components/forms/FieldErrorText";
import { Textarea as TextareaHero } from "@heroui/react";

type TextareaProps = {
  value: string;
  onChange: (val: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  minRows?: number;
  maxRows?: number;
  errorMessage?: string;
};

const Textarea: React.FC<TextareaProps> = ({
  value = "",
  onChange,
  label = "آدرس کامل",
  placeholder = "آدرس کامل را وارد کنید",
  isRequired = false,
  minRows = 4,
  maxRows = 10,
  errorMessage = "",
}) => {
  const validate = (txt: string) => {
    console.log("=>", txt);
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
      isInvalid={!!errorMessage?.length}
      errorMessage={
        errorMessage?.length ? (
          <FieldErrorText error={errorMessage} />
        ) : undefined
      }
      labelPlacement="outside"
    />
  );
};

export default Textarea;
