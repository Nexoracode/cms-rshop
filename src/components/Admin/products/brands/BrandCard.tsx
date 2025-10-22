"use client";

import DeleteButton from "@/components/shared/DeleteButton";
import { Card, CardBody, Image } from "@heroui/react";

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
      className="cursor-auto shadow-md rounded-2xl border w-[235px]"
      shadow="sm"
    >
      <CardBody className="overflow-hidden p-2.5 relative cursor-pointer" onClick={() => onEdit(brand)}>
        <Image
          alt={brand.name}
          className="w-full rounded-2xl object-cover h-[140px]"
          radius="lg"
          src={brand.logo}
          width={"100%"}
        />
        <div className="absolute top-2.5 left-2.5 z-50">
          <DeleteButton onDelete={() => onDelete(brand.id)} />
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col items-center leading-7 w-[200px] pt-2 rounded-2xl">
            <div className="flex flex-col items-center gap-1">
              <p className="text-[15px]">{brand.name}</p>
              <p className="text-default-500">{brand.slug}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default BrandCard;
