"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { TbEdit } from "react-icons/tb";
import { TiDeleteOutline } from "react-icons/ti";

type Props = {
  onDelete?: () => void;
  onEdit: () => void;
  imageFile: any;
  title: string;
  description: string;
  disableDelete?: boolean;
};

const CardBox: React.FC<Props> = ({
  onDelete,
  onEdit,
  imageFile,
  title,
  description,
  disableDelete,
}) => {
  return (
    <Card className="shadow-md border">
      <CardBody className="flex flex-col sm:flex-row gap-4 p-2">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
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
            <div className="w-full bg-gray-100 sm:bg-transparent rounded-xl p-3 sm:p-0 sm:w-fit">
              <p>{title}</p>
              <p className="text-gray-600 mt-2 max-w-[450px] truncate">
                {description}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-fit flex flex-row mt-3 sm:mt-0 sm:flex-col gap-2">
            {!disableDelete ? (
              <Button
                size="sm"
                className="w-full text-xl bg-danger-100 text-danger-600"
                radius="md"
                onPress={onDelete}
              >
                <TiDeleteOutline />
              </Button>
            ) : (
              ""
            )}
            <Button
              size="sm"
              className="w-full text-xl bg-green-100 text-green-600"
              radius="md"
              onPress={onEdit}
            >
              <TbEdit />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardBox;
