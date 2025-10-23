"use client";

import { ReactNode } from "react";
import { CardHeader } from "@heroui/react";
import OptionButton from "@/components/ui/buttons/OptionButton";

type UnifiedHeaderProps = {
  icon: ReactNode;
  title: string;
  textSize?: string;
  actionText?: string;
  onAdd?: () => void;
  redirect?: string;
};

const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({
  icon,
  title,
  textSize,
  actionText,
  onAdd,
  redirect,
}) => {
  return (
    <CardHeader className="flex gap-3">
      <div
        className={`w-full rounded-xl py-2 px-4 flex items-center justify-between bg-slate-50`}
      >
        <p className={`${textSize ? textSize : "text-[14px]"} leading-7 flex items-center gap-2`}>
          <span className="text-3xl">{icon}</span>
          {title}
        </p>

        {actionText && (
          <OptionButton
            title={actionText}
            icon={null}
            href={redirect}
            onClick={onAdd}
            size="sm"
            variant="flat"
          />
        )}
      </div>
    </CardHeader>
  );
};

export default UnifiedHeader;
