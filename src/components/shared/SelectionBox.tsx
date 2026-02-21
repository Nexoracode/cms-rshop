"use client";

import React from "react";
import BaseCard from "../ui/BaseCard";
import FieldErrorText from "../forms/FieldErrorText";

type Props<T = any> = {
  initial?: T[];
  children?: React.ReactNode;
  modal?: React.ReactNode;
  title: string;
  icon: React.ReactNode;
  error?: boolean;
};

const SelectionBox = <T,>({
  initial = [],
  children,
  modal,
  title,
  icon,
  error,
}: Props<T>) => {
  return (
    <>
      <BaseCard
        CardHeaderProps={{
          title,
          className: "p-2",
          children: modal,
        }}
        className={`shadow-none ${error ? "border border-red-300" : ""}`}
        bodyClassName="cursor-auto"
      >
        {initial.length ? (
          children
        ) : (
          <div
            className={`flex flex-col items-center justify-center py-6 text-gray-500 ${
              error ? "!bg-[var(--error)] rounded-xl" : ""
            }`}
          >
            {icon}
            <p className="mt-2">هنوز موردی اضافه نشده. برای افزودن، از گزینه بالا استفاده کنید.</p>
          </div>
        )}
      </BaseCard>
      {error ? (
        <div className="-mt-4">
          <FieldErrorText error="انتخاب حداقل یک آیتم الزامی است" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SelectionBox;
