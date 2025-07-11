"use client"

import { Card, CardBody, NumberInput, Checkbox } from "@heroui/react"
import { useState } from "react"
import { Stock } from "@/types"
import { FiShoppingBag } from "react-icons/fi"
import BoxHeader from "./helpers/BoxHeader"

type Props = {
    isDisabled: boolean,
    onDiscount: (value: string, type: Stock) => void,
}

const FirstAdditionalInfos: React.FC<Props> = ({ isDisabled, onDiscount }) => {

    const [selectStock, setSelectStock] = useState<Stock>("percent")

    return (
        <Card className="w-full shadow-md">
            <BoxHeader
                title="اطلاعات تکمیلی محصول"
                color="bg-green-700/10 text-green-700"
                icon={<FiShoppingBag className="text-3xl" />}
            />
            <CardBody dir="rtl" className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 text-start">
                    <NumberInput
                        isDisabled={isDisabled}
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
                            onDiscount(value, selectStock)
                        }}
                    />
                    {
                        isDisabled
                            ? <p className="text-gray-500 text-[13px]">برای تعریف تخفیف ابتدا قیمت را وارد کنید.</p>
                            : ""
                    }
                </div>
                <Checkbox>
                    <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
                </Checkbox>
            </CardBody>
        </Card>
    )
}

export default FirstAdditionalInfos