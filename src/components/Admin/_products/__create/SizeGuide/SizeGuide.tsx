"use client";

import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import GuideBoxInfo from "./GuideBoxInfo";
import HeaderAction from "../helpers/HeaderAction";
import { SizeGuideProp } from "./type";
import { useEffect, useState } from "react";

type Props = {
  sizeGuide?: SizeGuideProp | null;
  onHelperId: (id: number) => void
};

const SizeGuide = ({ sizeGuide, onHelperId }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [helper, setHelper] = useState<SizeGuideProp | null>(null)

  useEffect(() => {
    if (sizeGuide) {
      setHelper(sizeGuide)
    }
  }, [sizeGuide])

  return (
    <>
      <div dir="rtl" className="flex flex-col gap-4 text-start">
        <HeaderAction
          title="راهنمای سایز"
          textBtn="+ افزودن راهنما"
          isDisabled={!!helper}
          onPress={onOpen}
        />
        {helper ? (
          <GuideBoxInfo
            title={helper.title}
            description={helper.description}
            imageFile={helper.image}
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
          onHelperId(datas.id)
          setHelper(datas)
        }}
        isNew={!helper}
        defaultValues={helper}
      />
    </>
  );
};

export default SizeGuide;
