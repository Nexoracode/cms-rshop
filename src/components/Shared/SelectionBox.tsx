"use client";

import React from "react";
import BaseCard from "../ui/BaseCard";

type Props<T = any> = {
  initial?: T[];
  children?: React.ReactNode;
  modal?: React.ReactNode;
  onOpen: () => void;
  title: string;
  icon: React.ReactNode;
};

const SelectionBox = <T,>({
  initial = [],
  children,
  modal,
  onOpen,
  title,
  icon,
}: Props<T>) => {
  return (
    <>
      <BaseCard
        CardHeaderProps={{
          title,
          textBtn: initial.length ? "ویرایش" : "+ افزودن",
          onAdd: onOpen,
          btnIcon: "",
          className: "p-2"
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
      {modal}
    </>
  );
};

export default SelectionBox;
