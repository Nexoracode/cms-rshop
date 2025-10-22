"use client";

import React, { useState } from "react";
import { Card, CardBody, Tooltip, Checkbox } from "@heroui/react";
import Link from "next/link";

type BaseCardProps = {
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  bodyClassName?: string;
  onSelectionChange?: (selected: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  redirect?: string;
  children: React.ReactNode;
};

const BaseCard: React.FC<BaseCardProps> = ({
  selectable = false,
  selected = false,
  disabled = false,
  className = "",
  bodyClassName = "",
  redirect = "",
  onSelectionChange,
  onClick,
  children,
}) => {
  const [hovered, setHovered] = useState(false);

  const CardContent = (
    <Card
      isBlurred
      className={`relative border shadow-md transition-all duration-200 hover:shadow-lg
      ${selected ? "border-sky-500 scale-[0.98]" : "border-gray-200"}
      ${disabled ? "opacity-60 cursor-not-allowed" : ""}
      ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBody
        className={`relative p-2 ${
          disabled ? "" : "cursor-pointer"
        } ${bodyClassName}`}
        onClick={(e) => {
          if (disabled) return;
          if (onClick) onClick(e);
        }}
      >
        {selectable && !disabled && (hovered || selected) && (
          <Tooltip
            closeDelay={2000}
            color="primary"
            showArrow
            placement="left"
            content="انتخاب کارت"
            className="text-white"
          >
            <div className="absolute bg-sky-500/30 pr-3 pl-0.5 py-2 rounded-xl z-10">
              <Checkbox
                isSelected={selected}
                onValueChange={(v) => onSelectionChange?.(!!v)}
              />
            </div>
          </Tooltip>
        )}

        {children}
      </CardBody>
    </Card>
  );
  
  return redirect && !disabled ? (
    <Link href={redirect}>{CardContent}</Link>
  ) : (
    CardContent
  );
};

export default BaseCard;
