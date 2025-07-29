"use client";

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import CardBox from "../helpers/CardBox";
import HeaderAction from "../helpers/HeaderAction";
import { useCreateSizeGuid } from "@/hooks/products/useProduct";
import { SizeGuideProp } from "./type";

type Props = {
  sizeGuide?: SizeGuideProp;
};

const SizeGuide = ({ sizeGuide }: Props) => {
  const [datas, setDatas] = useState<SizeGuideProp>();
  //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: createSizeGuid } = useCreateSizeGuid();

  const createNewSizeGuid = () => {
    createSizeGuid(datas, {
      onSuccess: () => {},
    });
  };

  return (
    <>
      <div dir="rtl" className="flex flex-col gap-4 text-start">
        <HeaderAction
          title="راهنمای سایز"
          textBtn="+ افزودن راهنما"
          //isDisabled={!!sizeGuide}
          onPress={onOpen}
        />
        {sizeGuide ? (
          <CardBox
            title={sizeGuide.title}
            description={sizeGuide.description}
            imageFile={sizeGuide.image}
            onDelete={() => {}}
            onEdit={() => {}}
          />
        ) : (
          ""
        )}
      </div>

      <AddNewSizeGuideModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(datas) => {
          console.log(datas);
          setDatas(datas)
        }}
      />
    </>
  );
};

export default SizeGuide;
