"use client";
import { Input } from "@heroui/react";
import FieldErrorText from "@/components/Helper/FieldErrorText";

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  isRequired?: boolean;
  isActiveError?: boolean;
};

export default function TextInputWithError({
  label,
  placeholder,
  value,
  onChange,
  isRequired = false,
  isActiveError = false,
}: Props) {
  return (
    <Input
      isRequired={isRequired}
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      value={value}
      onValueChange={onChange}
      errorMessage={
        isRequired &&
        !value.trim() && <FieldErrorText error={`${label} الزامی است.`} />
      }
      description={
        isActiveError &&
        isRequired &&
        !value.trim() && <FieldErrorText error={`${label} الزامی است.`} />
      }
    />
  );
}
