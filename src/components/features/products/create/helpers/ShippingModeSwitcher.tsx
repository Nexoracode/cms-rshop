"use client";

import React, { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";

type ShippingMode = "mood1" | "mood2";

type Props = {
  textMood2: string;
  textMood1: string;
  children: React.ReactNode;
  childrenMood1: React.ReactNode;
  onChangeType: (type: ShippingMode) => void;
  defaultMood?: "mood1" | "mood2";
};

const ShippingModeSwitcher: FC<Props> = ({
  textMood2,
  textMood1,
  childrenMood1,
  onChangeType,
  defaultMood,
  children,
}) => {
  const [selectedMode, setSelectedMode] = useState<ShippingMode>("mood2");

  useEffect(() => {
    if (defaultMood) {
      setSelectedMode(defaultMood);
    }
  }, [defaultMood]);

  const toggleMode = () => {
    setSelectedMode((prev) => {
      const status = prev === "mood2" ? "mood1" : "mood2";
      onChangeType(status);
      return status;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between bg-white text-gray-700 border border-slate-200 p-3 rounded-2xl">
        <div className="flex flex-col">
          <p>{textMood2}</p>
        </div>
        <Switch
          isSelected={selectedMode === "mood1"}
          onValueChange={toggleMode}
          size="sm"
        />
      </div>

      <div className="flex flex-col justify-between bg-white border border-slate-200 p-3 rounded-2xl">
        <div className="flex items-center justify-between text-gray-700">
          <p>{textMood1}</p>
          <Switch
            isSelected={selectedMode === "mood2"}
            onValueChange={toggleMode}
            size="sm"
          />
        </div>

        {selectedMode === "mood2" ? (
          <div className="mt-4">{childrenMood1}</div>
        ) : null}
      </div>

      {children}
    </div>
  );
};

export default ShippingModeSwitcher;
