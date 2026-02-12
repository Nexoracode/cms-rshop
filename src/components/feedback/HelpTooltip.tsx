"use client";

import { ReactNode } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { PiQuestion } from "react-icons/pi";
import IconBadge from "../common/IconBadge";

interface HelpTooltipProps {
  children?: ReactNode;
  placement?: "top" | "right" | "bottom" | "left" | "top-start" | "top-end";
  className?: string;
  contentClassName?: string;
  title: string;
  description: string;
}

export function HelpTooltip({
  children,
  placement = "top",
  className,
  contentClassName = "max-w-[320px] text-sm p-4",
  description,
  title,
}: HelpTooltipProps) {
  return (
    <Popover
      placement={placement}
      showArrow={true}
      backdrop="blur"
      offset={8}
      className={className}
    >
      <PopoverTrigger>
        <div className="">
          <IconBadge
            icon={PiQuestion}
            circleClassName="bg-orange-100 !w-6 !h-6"
            iconClassName="text-yellow-600 -top-[44px] -left-1.5 w-6 animate-pulse"
            wrapperClassName="cursor-pointer"
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className={contentClassName}>
        {children}
        <div className="flex flex-col gap-4 p-3">
          <p className="text-lg">{title}</p>
          <p className="text-gray-600 leading-7">{description}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
