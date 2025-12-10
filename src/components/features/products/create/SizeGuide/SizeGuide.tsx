"use client";

import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import GuideBoxInfo from "./GuideBoxInfo";
import { useEffect, useState } from "react";

type Props = {
  sizeGuide?: any;
  onHelperId: (id: number) => void;
};

const SizeGuide = ({ sizeGuide, onHelperId }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [helper, setHelper] = useState<any>(null);

  useEffect(() => {
    if (sizeGuide) {
      setHelper(sizeGuide);
    }
  }, [sizeGuide]);

  return (
    <div className={`flex flex-col gap-4 text-start ${helper ? "border border-slate-200 rounded-2xl p-3" : ""}`}>
      <div className="flex items-center justify-between border border-slate-200 rounded-2xl p-2 text-gray-700">
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
