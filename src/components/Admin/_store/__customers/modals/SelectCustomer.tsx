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
  id: number;
  name: string;
  phone: string;
};

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
  initialSelectedProducts,
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const customers: Customer[] = [
    { id: 1, name: "علی اصغر", phone: "09031335939" },
    { id: 2, name: "احمد صهبایی", phone: "09031335939" },
    { id: 3, name: "علی کورمی", phone: "09031335939" },
  ];

  // مقداردهی اولیه انتخاب‌شده
  useEffect(() => {
    if (isOpen && initialSelectedProducts) {
      setSelectedId(initialSelectedProducts.id);
    } else if (isOpen) {
      setSelectedId(null);
    }
  }, [isOpen, initialSelectedProducts]);

  const handleAdd = () => {
    const selected = customers.find((c) => c.id === selectedId);
    if (selected) {
      onAdd(selected);
      onOpenChange();
      setSelectedId(null);
    }
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={onOpenChange} placement="auto">
      <ModalContent className="max-w-[700px] w-full">
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

          <Card className="shadow-md mb-4 max-h-[300px] overflow-y-auto">
            <BoxHeader
              title="کاربران"
              color="bg-purple-700/10 text-purple-700"
              icon={<TbUser className="text-3xl" />}
            />

            <CardBody className="flex flex-col gap-4">
              <RadioGroup
                value={String(selectedId ?? "")}
                onValueChange={(val) => setSelectedId(Number(val))}
                className="w-full"
              >
                {customers.map((customer) => (
                  <Radio
                    key={customer.id}
                    value={String(customer.id)}
                    className=""
                  >
                    <div className="!w-[320px] bg-slate-100 rounded-xl py-3 px-4 flex items-center justify-between">
                      <p>{customer.name}</p>
                      <p className="text-gray-600">{customer.phone}</p>
                    </div>
                  </Radio>
                ))}
              </RadioGroup>
            </CardBody>
          </Card>

          <Button
            variant="flat"
            color="secondary"
            className="mb-4"
            isDisabled={selectedId === null}
            onPress={handleAdd}
          >
            اضافه کردن
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSpecialProductsModal;
