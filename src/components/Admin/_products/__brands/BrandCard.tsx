"use client";

import { Card, CardBody, Button, Image } from "@heroui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

type BrandCardProps = {
  brand: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
  onEdit: (brand: any) => void;
  onDelete: (id: number) => void;
};

const BrandCard: React.FC<BrandCardProps> = ({ brand, onEdit, onDelete }) => {
  return (
    <Card
      key={brand.id}
      className="cursor-auto shadow-lg border w-[235px]"
      shadow="sm"
    >
      <CardBody className="overflow-hidden p-0">
        <Image
          alt={brand.name}
          className="w-full object-cover h-[140px]"
          radius="lg"
          src={brand.logo}
          width={"100%"}
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col items-center leading-7 mt-2 w-[200px] py-2 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-1">
              <p className="text-[15px]">{brand.name}</p>
            </div>
            <p className="text-default-500">{brand.slug}</p>
          </div>
          <div className="w-[200px] flex">
            <Button
              size="sm"
              className="rounded-tr-lg w-full"
              radius="none"
              color="danger"
              variant="flat"
              onPress={() => onDelete(brand.id)}
            >
              <RiDeleteBin5Line className="text-xl" />
            </Button>
            <Button
              size="sm"
              className="rounded-tl-xl w-full"
              radius="none"
              color="success"
              variant="flat"
              onPress={() => onEdit(brand)}
            >
              <TbEdit className="text-xl" />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BrandCard;
