"use client"

import { Card, CardBody, CardHeader, Checkbox, Input, NumberInput, Select, SelectItem, useDisclosure } from "@heroui/react"
import { LuTextCursorInput } from "react-icons/lu"
import { FiSearch } from "react-icons/fi";
import { TiPlusOutline } from "react-icons/ti";
import AddNewCategoryModal from "./Modal/AddNewCategoryModal";

type Props = {
    price?: number | string
}

const InitInformation: React.FC<Props> = ({ price }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card className="w-full shadow-md">
                <CardHeader className="flex gap-3">
                    <div className="w-full rounded-md bg-orange-700/10 text-orange-700 p-2 flex items-center justify-between">
                        <LuTextCursorInput className="text-3xl" />
                        <p>اطلاعات اولیه محصول</p>
                    </div>
                </CardHeader>
                <CardBody dir="rtl" className="flex flex-col gap-6">
                    <Input
                        isRequired
                        label="نام"
                        labelPlacement="outside"
                        name="title"
                        placeholder="نام محصول را وارد کنید"
                    />
                    <div className="flex flex-col items-start">
                        <NumberInput
                            label="قیمت"
                            labelPlacement={"outside"}
                            placeholder="0.00"
                            minValue={10000}
                            isRequired
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">تومان</span>
                                </div>
                            }
                        />
                        {
                            price
                                ? <p className="text-green-600 text-sm mt-2 mr-3">قیمت با تخفیف: {price.toLocaleString()}</p>
                                : ""
                        }
                    </div>
                    <NumberInput
                        label="موجودی"
                        labelPlacement={"outside"}
                        placeholder="1"
                        minValue={1}
                        isRequired
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small truncate">عدد موجود</span>
                            </div>
                        }
                    />
                    <Checkbox><p className="text-sm">موجودی نامحدود</p></Checkbox>
                    <Select
                        isRequired
                        dir="rtl"
                        labelPlacement={"outside"}
                        label="دسته بندی"
                        name="category"
                        placeholder="دسته بندی مورد نظر را جستجو یا اضافه کنید"
                        startContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small truncate"><FiSearch className="text-lg" /></span>
                            </div>
                        }
                        onSelectionChange={(value: any) => {
                            value.anchorKey === "$.0" && onOpen()
                        }}
                    >
                        <SelectItem>
                            <div className="flex items-center gap-2">
                                <span>افزودن دسته بندی جدید</span>
                                <TiPlusOutline className="text-lg" />
                            </div>
                        </SelectItem>
                        <SelectItem>اپل</SelectItem>
                        <SelectItem>آیفون</SelectItem>
                    </Select>
                </CardBody>
            </Card>

            <AddNewCategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    )
}

export default InitInformation