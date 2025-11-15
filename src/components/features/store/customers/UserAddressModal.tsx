"use client";

import TextInput from "@/components/ui/inputs/TextInput";
import { useState } from "react";

const AddressReceiverSelector = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="mt-8 flex items-center gap-4">
      <TextInput
        label="نام تحویل‌گیرنده"
        value={name}
        onChange={(val) => setName(val)}
        placeholder="مثلاً: علی رضایی"
        isRequired
        allowEnglishOnly={false}
        inputAlign="right"
      />

      <TextInput
        label="شماره تماس تحویل‌گیرنده"
        value={phone}
        onChange={(val) => setPhone(val)}
        type="tel"
        placeholder="09xxxxxxxxx"
        isRequired
        allowNumbers={true}
      />
    </div>
  );
};

export default AddressReceiverSelector;
