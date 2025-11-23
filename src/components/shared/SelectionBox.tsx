"use client";

import React from "react";
import BaseCard from "../ui/BaseCard";

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
        className="shadow-none"
        bodyClassName="cursor-auto"
      >
        {initial.length ? (
          children
        ) : (
          <div className={`flex flex-col items-center justify-center py-6 text-gray-500 ${error ? "!bg-[var(--error)] rounded-xl" : ""}`}>
            {icon}
            <p className="mt-2">هنوز موردی انتخاب نشده!</p>
          </div>
        )}
      </BaseCard>
      {error && (
        <p className="text-red-500 text-xs pt-2 pr-2 animate-pulse">
          حداقل یک آیتم الزامی است
        </p>
      )}
    </>
  );
};

export default SelectionBox;
