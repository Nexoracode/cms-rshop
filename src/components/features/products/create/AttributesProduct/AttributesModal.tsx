"use client";

import BaseModal from "@/components/ui/modals/BaseModal";
import { AttributesContent } from "./AttributesContent";
import { LuPlus } from "react-icons/lu";

const AttributesModal = () => {
  return (
    <BaseModal
      title="مدیریت ویژگی‌ها"
      isActiveFooter={false}
      size="xl"
      triggerProps={{
        title: "افزودن ویژگی",
        icon: <LuPlus className="text-lg" />,
        className: "bg-secondary-light text-secondary flex-1"
      }}
    >
      <AttributesContent />
    </BaseModal>
  );
};

export default AttributesModal;
