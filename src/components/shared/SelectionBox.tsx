"use client";

import React from "react";
import FieldErrorText from "../forms/FieldErrorText";
import IconBadge from "../common/IconBadge";
import { IconType } from "react-icons";

type Props<T = any> = {
  initial?: T[];
  children?: React.ReactNode;
  modal?: React.ReactNode;
  title: string;
  icon: IconType;
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
      <div className={`${error ? "border border-red-300" : ""}`}>
        <div className="w-full flex flex-col items-center gap-3 pb-6">
          <div className="w-full flex items-center gap-6 justify-between pt-3 border-t border-slate-200">
            <p>{title}</p>
            {modal}
          </div>
        </div>
        {initial.length ? (
          <div className="pb-6">
            {children}
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-4 py-6">
            <IconBadge
              icon={icon}
              circleClassName="bg-sky-100 !w-16 !h-16"
              iconClassName="text-sky-600 -top-[33px] -left-[10px] w-14"
            />
            <p className="text-gray-700 text-sm text-center">
              هنوز موردی اضافه نشده. برای افزودن، از گزینه بالا استفاده کنید.
            </p>
          </div>
        )}
      </div>
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

/* 
error ? "!bg-[var(--error)] rounded-xl" : ""
*/
