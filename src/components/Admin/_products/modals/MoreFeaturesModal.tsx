"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { TbBrandArc, TbCategory2 } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import Link from "next/link";
import { LuScreenShare } from "react-icons/lu";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

const MoreFeaturesModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  return (
    <Modal
      dir="rtl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="auto"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="w-full flex items-center border-b p-3 bg-gray-50 rounded-xl mt-4 justify-between -mb-3">
                <p className="font-normal text-[15px] text-gray-600">
                  امکانات بیشتر
                </p>
                <LuScreenShare className="text-2xl" />
              </div>
            </ModalHeader>

            <ModalBody>
              <Listbox
                aria-label="Listbox menu with descriptions"
                variant="faded"
              >
                <ListboxItem
                  key="manage"
                  startContent={<MdOutlineCategory className="text-2xl" />}
                  as={Link}
                  href={"/admin/products/variants"}
                >
                  مدیریت ویژگی های محصولات
                </ListboxItem>
                <ListboxItem
                  key="category"
                  startContent={<TbCategory2 className="text-2xl" />}
                  as={Link}
                  href={"/admin/products/categories"}
                >
                  مدیریت دسته بندی ها
                </ListboxItem>
                <ListboxItem
                  key="brands"
                  startContent={<TbBrandArc className="text-2xl" />}
                  as={Link}
                  href={"/admin/products/brands"}
                >
                  مدیریت برندها
                </ListboxItem>
              </Listbox>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MoreFeaturesModal;
