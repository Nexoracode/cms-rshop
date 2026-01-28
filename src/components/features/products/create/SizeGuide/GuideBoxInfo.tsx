"use client";

import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { Card, CardBody } from "@heroui/react";
import { TbEdit } from "react-icons/tb";

type Props = {
  onEdit: () => void;
  imageFile: any;
  title: string;
  description: string;
};

const GuideBoxInfo: React.FC<Props> = ({
  onEdit,
  imageFile,
  title,
  description,
}) => {
  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-[270px] sm:w-full shadow-none">
        <CardBody className="flex flex-col w-full sm:flex-row p-0 sm:items-center gap-3 text-start">
          <div>
            {imageFile && (
              <img
                src={
                  typeof imageFile === "object"
                    ? URL.createObjectURL(imageFile)
                    : imageFile
                }
                alt="preview"
                className="rounded-xl mx-auto w-24 object-cover border"
              />
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between gap-2">
              <p><span className="text-xs text-green-700">راهنمای سایز</span> {title}</p>
              <ActionButton onClick={onEdit} icon={<TbEdit size={18} />} />
            </div>
            <p className="text-gray-600 mt-2 text-justify leading-7 text-xs sm:whitespace-normal">
              {description}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuideBoxInfo;
