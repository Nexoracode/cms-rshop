"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, Input, useDisclosure, Card, CardBody, Checkbox } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import FilterModal from "../../_products/modals/FilterModal";
import SortingModal from "../../_products/modals/SortingModal";
import ProductItem from "../../_home/helpers/ProductItem";
import BoxHeader from "../../_products/__create/helpers/BoxHeader";
import { TfiShoppingCartFull } from "react-icons/tfi";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
};

const AddSpecialProductsModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
}) => {

    const router = useRouter();
    const style = "text-3xl w-12 h-12 rounded-lg p-2";

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

    return (
        <>
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
                                <p className="font-normal text-[16px]">
                                    افزودن محصول
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-gray-600">محصولات پیش سفارش را انتخاب کنید.</p>
                                <Input
                                    isClearable
                                    size="lg"
                                    variant="bordered"
                                    className="bg-white rounded-xl"
                                    color="secondary"
                                    placeholder="جستجو در محصول ها..."
                                    startContent={
                                        <FiSearch className="text-xl" />
                                    }
                                >
                                </Input>
                                <section className="flex items-center justify-start my-3">
                                    <OptionBox title="فیلتر" icon={<IoFilter className="text-[16px]" />} onClick={onOpenFilter} />
                                    <OptionBox title="مرتب سازی" icon={<BiSortAlt2 className="text-[16px]" />} onClick={onOpenSort} />
                                </section>

                                <Card className="shadow-md mb-4">
                                    <BoxHeader
                                        title="محصولات"
                                        color="bg-green-700/10 text-green-700"
                                        icon={<TfiShoppingCartFull className="text-3xl" />}
                                    />
                                    <CardBody className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <Checkbox />
                                            <div className="w-full">
                                                <ProductItem
                                                    price={385000}
                                                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                                                    productName="ویندوز 10"
                                                    isExist="موجود"
                                                    subProductName="کمترین قیمت"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Checkbox />
                                            <div className="w-full">
                                                <ProductItem
                                                    price={385000}
                                                    img="https://digifycdn.com/media/item_images/img0_1024x768_f0nxaeX.jpg"
                                                    productName="ویندوز 10"
                                                    isExist="موجود"
                                                    subProductName="کمترین قیمت"
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <SortingModal
                isOpen={isSortOpen}
                onOpenChange={onSortOpenChange}
            />

            <FilterModal
                isOpen={isFilterOpen}
                onOpenChange={onFilterOpenChange}
            />
        </>
    );
};

export default AddSpecialProductsModal;
