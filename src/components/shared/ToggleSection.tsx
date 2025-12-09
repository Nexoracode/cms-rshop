"use client";

import { FC, useState, useEffect } from "react";
import { Switch } from "@heroui/react";

type Props = {
  title: string;
  children?: React.ReactNode;
  onChange: (val: "enabled" | "disabled") => void;
  initialMode?: "enabled" | "disabled";
  hideChildrenWhenEnabled?: boolean; // <-- اضافه شد
};

const ToggleSection: FC<Props> = ({
  onChange,
  initialMode,
  children,
  title,
  hideChildrenWhenEnabled = false, // پیش‌فرض false
}) => {
  const [mode, setMode] = useState<"enabled" | "disabled">("disabled");

  useEffect(() => {
    if (initialMode) {
      setMode(initialMode);
    }
  }, [initialMode]);

  const handleSwitch = () => {
    setMode((prev) => (prev === "enabled" ? "disabled" : "enabled"));
  };

  useEffect(() => {
    onChange(mode);
  }, [mode]);

  const showChildren = hideChildrenWhenEnabled ? mode === "disabled" : mode === "enabled";

  return (
    <div className="w-full flex flex-col justify-between border border-slate-200 p-3 rounded-2xl">
      <div className="flex items-center justify-between text-gray-700">
        <p>{title}</p>
        <Switch
          isSelected={mode === "enabled"}
          onValueChange={handleSwitch}
          size="sm"
        />
      </div>

      {showChildren && <div className={`${children ? "mt-4" : ""}`}>{children}</div>}
    </div>
  );
};

export default ToggleSection;
