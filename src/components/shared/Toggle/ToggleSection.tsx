"use client";

import { FC } from "react";
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
  subtitle = "",
  hideChildrenWhenEnabled = false,
}) => {
  return (
    <div
      className={`w-full flex flex-col justify-between border border-slate-200 p-3 ${
        subtitle ? "py-2" : ""
      } rounded-2xl`}
    >
      <div className="flex items-center justify-between text-gray-700">
        <div className="flex flex-col">
          <p>{title}</p>
          {subtitle ? (
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          ) : (
            ""
          )}
        </div>
        <Switch
          isSelected={initialMode}
          onValueChange={() => onChange(!initialMode)}
          size="sm"
        />
      </div>

      {initialMode && !hideChildrenWhenEnabled && (
        <div className={`${children ? "mt-4" : ""}`}>{children}</div>
      )}
    </div>
  );
};

export default ToggleSection;
