"use client";

import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import CardBox from "../helpers/CardBox";
import HeaderAction from "../helpers/HeaderAction";
import { SizeGuideProp } from "./type";
import { useState } from "react";

type Props = {
  sizeGuide?: SizeGuideProp | null;
  onSizeGuide: (datas: SizeGuideProp) => void
};

const SizeGuide = ({ sizeGuide, onSizeGuide }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [guide, setGuide] = useState<SizeGuideProp | null>(sizeGuide || null)

  return (
    <>
      <div dir="rtl" className="flex flex-col gap-4 text-start">
        <HeaderAction
          title="راهنمای سایز"
          textBtn="+ افزودن راهنما"
          isDisabled={!!guide}
          onPress={onOpen}
        />
        {guide ? (
          <CardBox
            title={guide.title}
            description={guide.description}
            imageFile={guide.image}
            onDelete={() => {}}
            onEdit={onOpen}
          />
        ) : (
          ""
        )}
      </div>

      <AddNewSizeGuideModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={(datas) => {
          onSizeGuide(datas)
          setGuide(datas)
        }}
        defaultValues={guide}
      />
    </>
  );
};

export default SizeGuide;
