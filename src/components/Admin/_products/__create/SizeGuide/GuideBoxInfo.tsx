"use client";

import { Button, Card, CardBody } from "@heroui/react";
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
      <Card className="w-[270px] sm:w-full shadow-md border">
        <CardBody className="flex flex-col sm:flex-row gap-4 p-2">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="w-full sm:w-fit flex flex-col sm:flex-row sm:items-center gap-3 text-start">
              {imageFile && (
                <img
                  src={
                    typeof imageFile === "object"
                      ? URL.createObjectURL(imageFile)
                      : imageFile
                  }
                  alt="preview"
                  className="rounded-xl mx-auto w-24 h-24 object-cover border"
                />
              )}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <p>{title}</p>
                  <button
                    onClick={onEdit}
                    className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
                  >
                    <TbEdit size={18} />
                  </button>
                </div>
                <div className="w-full bg-gray-100 rounded-xl p-3 sm:py-0">
                  <p className="text-gray-600 mt-2 text-justify leading-7 text-xs sm:whitespace-normal">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuideBoxInfo;
