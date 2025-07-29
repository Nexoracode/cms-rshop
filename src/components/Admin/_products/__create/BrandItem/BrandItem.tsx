"use client";

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import AddNewBrandModal from "./AddNewBrandModal";
import HeaderAction from "../helpers/HeaderAction";
import CardBox from "../helpers/CardBox";
import { BrandItemProp } from "./type";

type Props = {
  defaultBrand?: BrandItemProp | null;
  onBrand: (datas: BrandItemProp) => void;
};

const BrandItem = ({ onBrand, defaultBrand }: Props) => {
  const [brand, setBrand] = useState<BrandItemProp | null>(
    defaultBrand || null
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div dir="rtl" className="flex flex-col gap-4 text-start">
        <HeaderAction
          title="برند"
          textBtn="+ افزودن برند"
          isDisabled={!!brand}
          onPress={onOpen}
        />
        {brand ? (
          <CardBox
            title={brand.name}
            description={brand.slug}
            imageFile={brand.logo}
            onDelete={() => setBrand(null)}
            onEdit={onOpen}
          />
        ) : (
          ""
        )}
      </div>

      <AddNewBrandModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(datas) => {
          onBrand(datas);
          setBrand(datas);
        }}
        defaultValues={brand}
        brandId={brand?.id}
      />
    </>
  );
};

export default BrandItem;
