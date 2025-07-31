"use client";

import { FC, useState, useEffect } from "react";
import { Switch } from "@heroui/react";

type Props = {
  title: string;
  children: React.ReactNode;
  onChange: (val: number | null) => void;
  initialMode?: "enabled" | "disabled";
};

const OrderLimitSwitcher: FC<Props> = ({ onChange, initialMode, children, title }) => {
  const [mode, setMode] = useState<"enabled" | "disabled">(initialMode ?? "disabled");

  const handleSwitch = () => {
    setMode((prev) => (prev === "enabled" ? "disabled" : "enabled"));
  };

  useEffect(() => {
    if (mode === "enabled") onChange(1);
    if (mode === "disabled") onChange(0);
  }, [mode]);

  return (
    <div
      className={`flex flex-col justify-between ${
        mode === "enabled" ? "bg-stone-50 rounded-xl p-2" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4 text-gray-700">
        <p>{title}</p>
        <Switch
          isSelected={mode === "enabled"}
          onValueChange={handleSwitch}
          size="sm"
        />
      </div>

      {mode === "enabled" && children}
    </div>
  );
};

export default OrderLimitSwitcher;
