"use client";

import React from "react";
import { CardHeader as HerouiCardHeader } from "@heroui/react";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { OptionButtonProps } from "@/components/ui/buttons/OptionButton";
import { LuPlus } from "react-icons/lu";

export type CardHeaderProps = {
  icon?: React.ReactNode;
  btnIcon?: React.ReactNode;
  title: string;
  textBtn?: string;
  onAdd?: () => void;
  redirect?: string;
  buttonVariant?: OptionButtonProps["variant"];
  buttonSize?: OptionButtonProps["size"];
  children?: React.ReactNode;
  showIconInActionSlot?: boolean;
  hideAction?: boolean;
  className?: string;
  btnClassName?: string;
};

const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  btnIcon = <LuPlus />,
  title,
  textBtn = "افزودن",
  onAdd,
  redirect,
  buttonVariant = "flat",
  buttonSize = "sm",
  children,
  showIconInActionSlot = false,
  hideAction = false,
  className = "",
  btnClassName = "bg-secondary-light text-secondary flex-1",
}) => {
  const hasButtonProps = !!(onAdd || redirect);

  const actionNode = (() => {
    if (children) return <div>{children}</div>;

    if (!hideAction && hasButtonProps) {
      return (
        <OptionButton
          title={textBtn}
          href={redirect}
          onClick={onAdd}
          size={buttonSize}
          variant={buttonVariant}
          icon={btnIcon}
          className={btnClassName}
        />
      );
    }

    if (showIconInActionSlot && icon) {
      return <span className="text-2xl">{icon}</span>;
    }

    return null;
  })();

  const showIconBesideTitle = !(
    showIconInActionSlot &&
    !children &&
    !hasButtonProps
  );

  return (
    <HerouiCardHeader className={`flex gap-3 ${className}`}>
      <div className="w-full rounded-xl p-2 flex items-center justify-between bg-slate-50">
        <p className="text-[14px] leading-7 flex items-center gap-2">
          {showIconBesideTitle && icon && (
            <span className="text-2xl">{icon}</span>
          )}
          {title}
        </p>

        <div>{actionNode}</div>
      </div>
    </HerouiCardHeader>
  );
};

export default CardHeader;
