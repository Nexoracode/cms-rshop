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
  const shouldShowChildren = hideChildrenWhenEnabled
    ? !initialMode // وقتی پراپ هست: وقتی سوییچ خاموشه نشون بده (مثل موجودی نامحدود)
    : initialMode; // وقتی پراپ نیست: وقتی سوییچ روشنه نشون بده (مثل محدودیت سفارش)

  return (
    <div
      className={`w-full flex flex-col justify-between border border-slate-200 p-2.5 ${
        subtitle ? "py-2" : ""
      } rounded-xl`}
    >
      <div className="flex items-center justify-between text-gray-700">
        <div className="flex flex-col">
          <p className="text-gray-700">{title}</p>
          {subtitle ? (
            <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
          ) : null}
        </div>
        <Switch
          isSelected={initialMode}
          onValueChange={() => onChange(!initialMode)}
          size="sm"
        />
      </div>

      {shouldShowChildren && (
        <div className={`${children ? "mt-4" : ""}`}>{children}</div>
      )}
    </div>
  );
};

export default ToggleSection;