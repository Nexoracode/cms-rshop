"use client"

import { Card, CardBody, Checkbox, Input, NumberInput, Select, SelectItem, useDisclosure } from "@heroui/react"
import { LuTextCursorInput } from "react-icons/lu"
import { FiSearch } from "react-icons/fi";
import { TiPlusOutline } from "react-icons/ti";
import AddNewCategoryModal from "./modals/AddNewCategoryModal";
import { useEffect, useState } from "react";
import { Stock } from "@/types";
import BoxHeader from "./helpers/BoxHeader";

type Props = {
}

const InitInfos: React.FC<Props> = ({ }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [infos, setInfos] = useState({
        price: ""
    })
    //
    const [selectStock, setSelectStock] = useState<Stock>("percent")
    //
    const [discount, setDiscount] = useState({ value: 0, type: "percent" as Stock })
    const [isPriceExist, setIsPriceExist] = useState(false)

    useEffect(() => {
        setIsPriceExist(infos.price ? true : false)
    }, [infos.price])

    return (
        <>
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="اطلاعات اولیه محصول"
                    color="bg-orange-700/10 text-orange-700"
                    icon={<LuTextCursorInput className="text-3xl" />}
                />
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
                            min={1}
                            isRequired
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">تومان</span>
                                </div>
                            }
                            onValueChange={(value: any) => setInfos(prev => ({ ...prev, price: value }))}
                        />
                        {
                            discount?.value && (discount.type === "percent" && discount.value < 100) || (discount?.type === "money" && discount.value < +infos.price) && infos.price
                                ?
                                <p className="text-green-600 text-sm mt-2 mr-3">قیمت با تخفیف:
                                    {
                                        discount.type === "percent"
                                            ? ((+infos.price * (1 - (+discount.value / 100)))).toLocaleString()
                                            : ((+infos.price - discount.value)).toLocaleString()
                                    }
                                    تومان
                                </p>
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
                                <TiPlusOutline className="text-lg" />
                                <span>افزودن دسته بندی جدید</span>
                            </div>
                        </SelectItem>
                        <SelectItem>اپل</SelectItem>
                        <SelectItem>آیفون</SelectItem>
                    </Select>
                    <div className="flex flex-col gap-2 text-start">
                        <NumberInput
                            isDisabled={!isPriceExist}
                            label="تخفیف"
                            labelPlacement={"outside"}
                            placeholder="10"
                            minValue={1}
                            endContent={
                                <div className="flex items-center">
                                    <label className="sr-only" htmlFor="stock">
                                        stock
                                    </label>
                                    <select
                                        aria-label="Select stock"
                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                        defaultValue="percent"
                                        id="stock"
                                        name="stock"
                                        onChange={(e: any) => setSelectStock(e.target.value)}
                                    >
                                        <option aria-label="percent" value="percent">
                                            درصد
                                        </option>
                                        <option aria-label="money" value="money">
                                            مبلغ ثابت (تومان)
                                        </option>
                                    </select>
                                </div>
                            }
                            onValueChange={(value: any) => {
                                console.log(value, selectStock);
                                setDiscount({ value, type: selectStock })
                            }}
                        />
                        {
                            !isPriceExist
                                ? <p className="text-gray-500 text-[13px]">برای تعریف تخفیف ابتدا قیمت را وارد کنید.</p>
                                : ""
                        }
                    </div>
                    <Checkbox>
                        <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
                    </Checkbox>
                </CardBody>
            </Card>

            <AddNewCategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={() => { }}
            />
        </>
    )
}

export default InitInfos