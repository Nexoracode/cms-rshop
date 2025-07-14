"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Card,
  CardBody,
  Button,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { useEffect, useState } from "react";
import { TbUser } from "react-icons/tb";

type Customer = {
  id: number,
  name: string,
  phone: string
}

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onAdd: (customer: Customer) => void;
  initialSelectedProducts?: Customer;
};

const AddSpecialProductsModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onAdd,
  initialSelectedProducts = [],
}) => {

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const customer: Customer[] = [
    {
      id: 1,
      name: "علی اصغر",
      phone: "09031335939"
    },
    {
      id: 2,
      name: "احمد صهبایی",
      phone: "09031335939"
    },
    {
      id: 3,
      name: "علی کورمی",
      phone: "09031335939"
    },
  ];

  // مقداردهی اولیه چک‌باکس‌ها بر اساس initialSelectedProducts
  useEffect(() => {
    if (isOpen) {
      const initialIds = initialSelectedProducts.map((p) => p.id);
      setSelectedIds(initialIds);
    }
  }, [isOpen, initialSelectedProducts]);

  // تغییر انتخاب چک‌باکس
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    const allSelected = customer.filter((p) => selectedIds.includes(p.id));
    onAdd(allSelected);
    onOpenChange();
    setSelectedIds([]);
  };

  return (
    <>
      <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
        <ModalContent className="max-w-[700px] w-full">
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="font-normal text-[16px]">افزودن مشتری</p>
              </ModalHeader>

              <ModalBody>
                <Input
                  isClearable
                  size="lg"
                  variant="bordered"
                  className="bg-white rounded-xl"
                  color="secondary"
                  placeholder="جستجو نام یا شماره موبایل مشتری"
                  startContent={<FiSearch className="text-xl" />}
                />

                <Card className="shadow-md mb-4">
                  <BoxHeader
                    title="کاربران"
                    color="bg-purple-700/10 text-purple-700"
                    icon={<TbUser className="text-3xl" />}
                  />

                  <CardBody className="flex flex-col gap-4">
                    <RadioGroup
                      value={selectedIds.includes(product.id)}
                      onValueChange={() => toggleSelect(customer.id)}
                    >
                      {customer.map((customer, index) => (
                        <div
                          key={customer.id}
                          className="flex items-center gap-4"
                        >
                          <Radio value={`$-${index}`}></Radio>
                          <div className="w-full bg-slate-100 rounded-xl py-3 px-4 flex items-center justify-between">
                            <p>{customer.name}</p>
                            <p>{customer.phone}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardBody>
                </Card>

                <Button
                  variant="flat"
                  color="secondary"
                  className="mb-4"
                  isDisabled={!selectedIds.length}
                  onPress={handleAdd}
                >
                  اضافه کردن
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSpecialProductsModal;
