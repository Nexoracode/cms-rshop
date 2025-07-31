"use client";

import React, { FC, useEffect, useState } from "react";
import { Switch } from "@heroui/react";

type ShippingMode = "mood1" | "mood2";

type Props = {
  title: string;
  textMood2: string;
  textMood1: string;
  childrenMood1: React.ReactNode;
  childrenMood2: React.ReactNode;
  onChangeType: (type: ShippingMode) => void;
};

const ShippingModeSwitcher: FC<Props> = ({
  title,
  textMood2,
  textMood1,
  childrenMood1,
  childrenMood2,
  onChangeType,
}) => {
  const [selectedMode, setSelectedMode] = useState<ShippingMode>("mood2");

  useEffect(() => {
    onChangeType(selectedMode);
  }, [selectedMode]);

  const toggleMode = () => {
    setSelectedMode((prev) => (prev === "mood2" ? "mood1" : "mood2"));
  };

  return (
    <div>
      <p>{title}</p>

      <div className="flex flex-col gap-6 mt-3">
        <div
          className={
            `flex flex-col justify-between ` +
            (selectedMode === "mood2" ? "bg-stone-50 rounded-xl p-2" : "")
          }
        >
          <div className="flex items-center justify-between mb-4 text-gray-700">
            <p>{textMood1}</p>
            <Switch
              isSelected={selectedMode === "mood2"}
              onValueChange={toggleMode}
              size="sm"
            />
          </div>

          {selectedMode === "mood2" ? childrenMood1 : null}
        </div>

        <div className="flex items-center justify-between text-gray-700">
          <div className="flex flex-col">
            <p>{textMood2}</p>
            {selectedMode === "mood1" ? childrenMood2 : null}
          </div>
          <Switch
            isSelected={selectedMode === "mood1"}
            onValueChange={toggleMode}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingModeSwitcher;
