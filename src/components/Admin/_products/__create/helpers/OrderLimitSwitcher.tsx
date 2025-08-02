"use client";

import { FC, useState, useEffect } from "react";
import { Switch } from "@heroui/react";

type Props = {
  title: string;
  children: React.ReactNode;
  onChange: (val: "enabled" | "disabled") => void;
  initialMode?: "enabled" | "disabled";
};

const OrderLimitSwitcher: FC<Props> = ({ onChange, initialMode, children, title }) => {
  const [mode, setMode] = useState<"enabled" | "disabled">("disabled");

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode)
    }
  }, [initialMode])

  const handleSwitch = () => {
    setMode((prev) => (prev === "enabled" ? "disabled" : "enabled"));
  };

  useEffect(() => {
    if (mode === "enabled") onChange("enabled");
    if (mode === "disabled") onChange("disabled");
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
