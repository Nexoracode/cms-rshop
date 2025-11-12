"use client";

import React from "react";
import BaseCard from "../ui/BaseCard";

type Props<T = any> = {
  initial?: T[];
  children?: React.ReactNode;
  modal?: React.ReactNode;
  title: string;
  icon: React.ReactNode;
};

const SelectionBox = <T,>({
  initial = [],
  children,
  modal,
  title,
  icon,
}: Props<T>) => {
  return (
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
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          {icon}
          <p className="mt-2 animate-pulse">هنوز موردی انتخاب نشده!</p>
        </div>
      )}
    </BaseCard>
  );
};

export default SelectionBox;
