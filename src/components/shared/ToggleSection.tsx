"use client";

import { FC, useState, useEffect } from "react";
import { Switch } from "@heroui/react";

type Props = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onChange: (val: boolean) => void;
  initialMode?: boolean;
  hideChildrenWhenEnabled?: boolean;
};

const ToggleSection: FC<Props> = ({
  onChange,
  initialMode = false,
  children,
  title,
  subtitle= "",
  hideChildrenWhenEnabled = false,
}) => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    onChange(mode);
  }, [mode]);

  return (
    <div className="w-full flex flex-col justify-between border border-slate-200 p-3 py-2 rounded-2xl">
      <div className="flex items-center justify-between text-gray-700">
        <div className="flex flex-col">
          <p>{title}</p>
          {subtitle ? <small className="text-gray-600 mt-1">{subtitle}</small> : ""}
        </div>
        <Switch
          isSelected={mode}
          onValueChange={() => setMode((prev) => !prev)}
          size="sm"
        />
      </div>

      {hideChildrenWhenEnabled && mode && (
        <div className={`${children ? "mt-4" : ""}`}>{children}</div>
      )}
    </div>
  );
};

export default ToggleSection;
