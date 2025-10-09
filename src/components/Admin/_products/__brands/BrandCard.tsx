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
      className="cursor-auto shadow-md border w-[235px]"
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
          </div>
          <div className="flex justify-between items-center w-full mb-2 px-5">
            <p className="text-default-500">{brand.slug}</p>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(brand)}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <TbEdit size={18} />
              </button>
              <button
                onClick={() => onDelete(brand.id)}
                className="bg-gray-100 rounded-md p-1.5 hover:opacity-70 transition-all"
              >
                <RiDeleteBin5Line size={18} />
              </button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BrandCard;
