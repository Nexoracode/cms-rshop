"use client";

import React from "react";
import { DatePicker } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { calToISO, isoToCal } from "@/utils/dateHelpers";

type IsoDatePickerProps = {
  label?: React.ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  description?: React.ReactNode;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  variant?: "flat" | "bordered" | "faded" | "underlined";
  showMonthAndYearPickers?: boolean;
  placeholderValue?: string | null;
  valueIso?: string | null;
  onChangeIso?: (iso?: string | undefined) => void;
  className?: string;
};

const IsoDatePicker: React.FC<IsoDatePickerProps> = ({
  label,
  description,
  isRequired,
  isInvalid,
  errorMessage,
  variant= "flat",
  showMonthAndYearPickers= true,
  placeholderValue,
  valueIso,
  onChangeIso,
  labelPlacement = "outside",
  className,
}) => {
  const calValue = isoToCal(valueIso);

  return (
    <DatePicker
      label={label}
      labelPlacement={labelPlacement}
      description={description}
      isRequired={isRequired}
      isInvalid={isInvalid}
      errorMessage={errorMessage as any}
      variant={variant as any}
      showMonthAndYearPickers={showMonthAndYearPickers}
      value={calValue}
      placeholderValue={
        placeholderValue ? isoToCal(placeholderValue) : undefined
      }
      onChange={(c: CalendarDate | null | undefined) => {
        const iso = calToISO(c ?? undefined);
        onChangeIso?.(iso);
      }}
      className={className}
    />
  );
};

export default IsoDatePicker;
