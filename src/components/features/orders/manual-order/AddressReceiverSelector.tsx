"use client";

import { useState } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import { Radio, RadioGroup } from "@heroui/react";
import BaseCard from "@/components/ui/BaseCard";

type Props = {
  onChange: (data: {
    is_self: boolean;
    recipient_name: string | null;
    recipient_phone: string | null;
  }) => void;
};

export default function AddressReceiverSelector({ onChange }: Props) {
  const [mode, setMode] = useState<"self" | "other">("self");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const update = (next: {
    is_self: boolean;
    recipient_name: string | null;
    recipient_phone: string | null;
  }) => onChange(next);

  const handleModeChange = (val: string) => {
    if (val === "self") {
      setMode("self");
      update({
        is_self: true,
        recipient_name: null,
        recipient_phone: null,
      });
    } else {
      setMode("other");
      update({
        is_self: false,
        recipient_name: name || null,
        recipient_phone: phone || null,
      });
    }
  };

  const handleName = (val: string) => {
    setName(val);
    if (mode === "other") {
      update({
        is_self: false,
        recipient_name: val || null,
        recipient_phone: phone || null,
      });
    }
  };

  const handlePhone = (val: string) => {
    setPhone(val);
    if (mode === "other") {
      update({
        is_self: false,
        recipient_name: name || null,
        recipient_phone: val || null,
      });
    }
  };

  return (
    <BaseCard className="mt-8 p-3">
      <h3 className="text-gray-700 mb-5">
        سفارش‌های این آدرس توسط چه کسی تحویل گرفته شود؟
      </h3>

      <RadioGroup
        value={mode}
        onValueChange={handleModeChange}
        className="space-y-3 flex flex-row"
      >
        <Radio value="self" className="text-gray-700">
          تحویل به مشتری
        </Radio>

        <Radio value="other" className="text-gray-700">
          تحویل به شخص دیگر
        </Radio>
      </RadioGroup>

      {mode === "other" && (
        <div className="space-y-4 mt-3">
          <TextInput
            label="نام تحویل‌گیرنده"
            value={name}
            onChange={handleName}
            placeholder="مثلاً: علی رضایی"
            isRequired
            allowEnglishOnly={false}
          />

          <TextInput
            label="شماره تماس تحویل‌گیرنده"
            value={phone}
            onChange={handlePhone}
            type="tel"
            placeholder="09xxxxxxxxx"
            isRequired
            allowEnglishOnly={true}
            allowNumbers={true}
            allowSpaces={false}
            allowSpecialChars={false}
          />
        </div>
      )}
    </BaseCard>
  );
}
