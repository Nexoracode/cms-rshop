"use client";

import React from "react";
import { Button, Card, CardBody } from "@heroui/react";

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
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <Button color="secondary" variant="flat" size="sm" onPress={onOpen}>
            {initial.length ? "ویرایش" : "افزودن"}
          </Button>
        </div>

        <Card className="shadow-sm border border-gray-100">
          <CardBody className="flex flex-col gap-4">
            {initial.length ? (
              children
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                {icon}
                <p className="mt-2">هنوز موردی انتخاب نشده!</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {modal}
    </>
  );
};

export default SelectionBox;
