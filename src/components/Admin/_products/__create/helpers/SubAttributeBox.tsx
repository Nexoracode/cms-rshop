"use client"

import { Stock } from "@/types"
import { Accordion, AccordionItem, Button, Card, CardBody, Checkbox, NumberInput, Switch } from "@heroui/react"
import { useState } from "react"
import BoxHeader from "./BoxHeader"
import { MdOutlineCategory } from "react-icons/md"
import { TbCategory } from "react-icons/tb"

type Props = {
    titleCard: string,
    onHandleSubmit: () => void,
    isVariable: boolean
}

const SubAttributeBox: React.FC<Props> = ({ titleCard, onHandleSubmit, isVariable }) => {

    const [selectItem, setSelectItem] = useState<"today" | "time-ready">("time-ready")
    const [formData, setFormData] = useState({
        price: 10000,
        unlimitedStock: false,
        discountValue: 0,
        discountType: "percent" as Stock,
        stock: 5
    })

    return (
        <>
            <Card className={`shadow-md ${isVariable ? "shadow-purple-300" : "" }`}>
                <BoxHeader
                    title={titleCard}
                    color={`${isVariable ? "bg-purple-700/10 text-purple-700" : "bg-gray-700/10 text-gray-700" }`}
                    icon={
                        !isVariable
                            ? <TbCategory className="text-3xl" />
                            : <MdOutlineCategory className="text-3xl" />
                    }
                />
                <CardBody className="shadow-md flex flex-col gap-6">
                    <Accordion>
                        <AccordionItem key={crypto.randomUUID()} aria-label="Accordion 1" title={`ویرایش تنوع محصول (${titleCard})`}>

                            <div className="flex flex-col gap-6 text-right">
                                <div className="flex flex-col items-start">
                                    <NumberInput
                                        label="قیمت"
                                        labelPlacement="outside"
                                        placeholder="10,000"
                                        min={1}
                                        isRequired
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">تومان</span>
                                            </div>
                                        }
                                        value={+formData.price}
                                        onValueChange={price => setFormData(prev => ({ ...prev, price }))}
                                    />
                                    {formData.price && formData.discountValue !== 0 && (
                                        <p className="text-green-600 text-sm mt-2 mr-3">
                                            قیمت با تخفیف:{' '}
                                            {formData.discountType === "percent"
                                                ? (+formData.price * (1 - formData.discountValue / 100)).toLocaleString()
                                                : (+formData.price - formData.discountValue).toLocaleString()}{' '}
                                            تومان
                                        </p>
                                    )}
                                </div>

                                <NumberInput
                                    label="موجودی"
                                    labelPlacement="outside"
                                    placeholder="1"
                                    minValue={1}
                                    isRequired
                                    isDisabled={formData.unlimitedStock}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small truncate">عدد موجود</span>
                                        </div>
                                    }
                                    value={+formData.stock}
                                    onValueChange={stock => setFormData(prev => ({ ...prev, stock }))}
                                />
                                <Checkbox
                                    isSelected={formData.unlimitedStock}
                                    onValueChange={unlimitedStock => setFormData(prev => ({ ...prev, unlimitedStock }))}
                                >
                                    <p className="text-sm">موجودی نامحدود</p>
                                </Checkbox>

                                <div className="flex flex-col gap-2">
                                    <NumberInput
                                        label="تخفیف"
                                        labelPlacement="outside"
                                        placeholder="10"
                                        minValue={1}
                                        endContent={
                                            <select
                                                aria-label="Select discount type"
                                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                value={formData.discountType}
                                                onChange={e => setFormData(prev => ({ ...prev, discountType: e.target.value as Stock }))}
                                            >
                                                <option value="percent">درصد</option>
                                                <option value="money">مبلغ ثابت (تومان)</option>
                                            </select>
                                        }
                                        onValueChange={value => setFormData(prev => ({ ...prev, discountValue: value }))}
                                        isDisabled={!formData.price}
                                    />
                                    {!formData.price && (
                                        <p className="text-gray-500 text-[13px]">برای تعریف تخفیف ابتدا قیمت را وارد کنید.</p>
                                    )}
                                </div>

                                <div>
                                    <p>شرایط ارسال</p>
                                    <div className="flex flex-col gap-6 mt-3">
                                        <div className={`flex flex-col justify-between ${selectItem === "time-ready" ? "bg-stone-50 rounded-xl p-2" : ""}`}>
                                            <div className="flex items-center justify-between mb-4 text-gray-700">
                                                <p>محصول نیاز به زمان آماده‌ سازی دارد</p>
                                                <Switch isSelected={selectItem === "time-ready" ? true : false} onValueChange={() => setSelectItem(prev => prev === "time-ready" ? "today" : "time-ready")} aria-label="Automatic updates" size="sm" />
                                            </div>
                                            {
                                                selectItem === "time-ready"
                                                    ?
                                                    <NumberInput
                                                        label="زمان آماده سازی"
                                                        placeholder="3"
                                                        minValue={1}
                                                        endContent={
                                                            <div className="pointer-events-none flex items-center">
                                                                <span className="text-default-400 text-small">روز</span>
                                                            </div>
                                                        }
                                                        labelPlacement={"outside"}
                                                    />
                                                    : ""
                                            }
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col text-gray-700">
                                                <p>می خواهم محصول “ارسال امروز” داشته باشد.</p>
                                                <small className="text-gray-500 mt-1">برچسب “ارسال امروز” ، روی کارت این محصول در فروشگاه نمایش داده خواهد شد.</small>
                                            </div>
                                            <Switch isSelected={selectItem === "today" ? true : false} onValueChange={() => setSelectItem(prev => prev === "time-ready" ? "today" : "time-ready")} aria-label="Automatic updates" size="sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                color="success"
                                variant="flat"
                                className="w-full mt-4"
                                onPress={onHandleSubmit}
                            >
                                ثبت تغیرات
                            </Button>
                        </AccordionItem>
                    </Accordion>
                </CardBody>
            </Card >
        </>
    )
}

export default SubAttributeBox