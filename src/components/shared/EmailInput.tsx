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
    if (!email) {
      setError("");
      onChange("", true);
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
    <div className="flex flex-col gap-1">
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(val) => validateEmail(val)}
        isRequired={isRequired}
        type="email"
        inputAlign="left"
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default EmailInput;
