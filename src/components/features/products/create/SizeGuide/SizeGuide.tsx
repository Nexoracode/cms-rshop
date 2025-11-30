"use client";

import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import GuideBoxInfo from "./GuideBoxInfo";
import HeaderAction from "../../../../common/Card/HeaderAction";
import { SizeGuideProp } from "./type";
import { useEffect, useState } from "react";
import { PiNoteDuotone } from "react-icons/pi";

type Props = {
  sizeGuide?: SizeGuideProp | null;
  onHelperId: (id: number) => void;
};

const SizeGuide = ({ sizeGuide, onHelperId }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [helper, setHelper] = useState<SizeGuideProp | null>(null);

  useEffect(() => {
    if (sizeGuide) {
      setHelper(sizeGuide);
    }
  }, [sizeGuide]);

  return (
    <div className="flex flex-col gap-4 text-start">
      <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
        <p>راهنمای سایز</p>
        <AddNewSizeGuideModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onSubmit={(datas) => {
            onHelperId(datas.id);
            setHelper(datas);
          }}
          isNew={!helper}
          defaultValues={helper}
        />
      </div>
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
  );
};

export default SizeGuide;
