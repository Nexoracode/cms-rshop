"use client";

import { useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";

type EmailInputProps = {
  value: string;
  onChange: (email: string, isValid: boolean) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
};

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChange,
  label = "ایمیل",
  placeholder = "example@mail.com",
  isRequired = false,
}) => {
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    if (!email.trim()) {
      setError("");
      onChange(email, true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("ایمیل معتبر نیست");
      onChange(email, false);
    } else {
      setError("");
      onChange(email, true);
    }
  };

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={(val) => {
        onChange(val, true);
        setError("");
      }}
      onBlur={() => validateEmail(value)}
      isRequired={isRequired}
      type="email"
      inputAlign="left"
      errorMessage={error}
      allowEnglishOnly={true}
      allowNumbers={true}
      allowSpaces={false}
      allowSpecialChars={true}
      allowedSpecialChars={["@", ".", "-", "_", "+"]}
      allowChars={true}
    />
  );
};

export default EmailInput;
