"use client"

import {
  Button,
  DateRangePicker,
  ModalFooter,
} from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import GenericMultiSelect from "@/components/Helper/GenericMultiSelect";
import { SelectOption } from "@/types";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const animals: SelectOption[] = [
  { key: "cat", title: "جدید" },
  { key: "dog", title: "قدیمی" },
  { key: "elephant", title: "تازه" },
];

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader>
              <p className="font-normal text-[16px]">فیلتر</p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <GenericMultiSelect label="وضعیت" items={animals} />
              <GenericMultiSelect label="روش پرداخت" items={animals} />
              <GenericMultiSelect label="روش ارسال" items={animals} />
              <GenericMultiSelect label="شهر" items={animals} />
              <DateRangePicker label="تاریخ ثبت" labelPlacement="outside" />
            </ModalBody>
            <ModalFooter>
              <Button color="danger">حذف فیلتر</Button>
              <Button>اعمال</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
