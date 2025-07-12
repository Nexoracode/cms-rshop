"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  useDisclosure,
  Card,
  CardBody,
  Checkbox,
  Button,
} from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import FilterModal from "../../_products/modals/FilterModal";
import SortingModal from "../../_products/modals/SortingModal";
import ProductItem from "../../_home/helpers/ProductItem";
import BoxHeader from "../../_products/__create/helpers/BoxHeader";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  price: number;
  img: string;
  productName: string;
  isExist: string;
  subProductName: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onAdd: (products: Product[]) => void;
  initialSelectedProducts?: Product[]; // محصولات انتخاب شده از قبل
};

const AddSpecialProductsModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onAdd,
  initialSelectedProducts = [],
}) => {
  const {
    isOpen: isSortOpen,
    onOpen: onOpenSort,
    onOpenChange: onSortOpenChange,
  } = useDisclosure();

  const {
    isOpen: isFilterOpen,
    onOpen: onOpenFilter,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      price: 385000,
      img: "https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg",
      productName: "ویندوز 10",
      isExist: "موجود",
      subProductName: "کمترین قیمت",
    },
    {
      id: 2,
      price: 385000,
      img: "https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg",
      productName: "ویندوز 10 نسخه دوم",
      isExist: "موجود",
      subProductName: "پرفروش‌ترین",
    },
    {
      id: 3,
      price: 590000,
      img: "https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg",
      productName: "ویندوز 11",
      isExist: "موجود",
      subProductName: "نسخه جدید",
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
    const allSelected = products.filter((p) => selectedIds.includes(p.id));
    onAdd(allSelected); // همه محصولات انتخاب شده رو ارسال کن
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
                <p className="font-normal text-[16px]">افزودن محصول</p>
              </ModalHeader>

              <ModalBody>
                <p className="text-gray-600">محصولات مورد نظر را انتخاب کنید.</p>

                <Input
                  isClearable
                  size="lg"
                  variant="bordered"
                  className="bg-white rounded-xl"
                  color="secondary"
                  placeholder="جستجو در محصول ها..."
                  startContent={<FiSearch className="text-xl" />}
                />

                <section className="flex items-center justify-start">
                  <OptionBox
                    title="فیلتر"
                    icon={<IoFilter className="text-[16px]" />}
                    onClick={onOpenFilter}
                  />
                  <OptionBox
                    title="مرتب سازی"
                    icon={<BiSortAlt2 className="text-[16px]" />}
                    onClick={onOpenSort}
                  />
                </section>

                <Card className="shadow-md mb-4">
                  <BoxHeader
                    title="محصولات"
                    color="bg-green-700/10 text-green-700"
                    icon={<TfiShoppingCartFull className="text-3xl" />}
                  />

                  <CardBody className="flex flex-col gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-4"
                      >
                        <Checkbox
                          isSelected={selectedIds.includes(product.id)}
                          onValueChange={() => toggleSelect(product.id)}
                        />
                        <div className="w-full">
                          <ProductItem
                            price={product.price}
                            img={product.img}
                            productName={product.productName}
                            isExist={product.isExist}
                            subProductName={product.subProductName}
                          />
                        </div>
                      </div>
                    ))}
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

      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
    </>
  );
};

export default AddSpecialProductsModal;
