"use client"

import { Card, CardBody, NumberInput, Switch } from "@heroui/react"
import { useState } from "react"

const AdditionalInformationMiddle = () => {

    const [selectItem, setSelectItem] = useState<"today" | "time-ready">("time-ready")

    return (
        <Card className="w-full shadow-md">
            <CardBody dir="rtl" className="flex flex-col gap-6 text-start">
                <NumberInput
                    hideStepper
                    label="وزن"
                    placeholder="1"
                    minValue={1}
                    labelPlacement={"outside"}
                    endContent={
                        <div className="flex items-center">
                            <label className="sr-only" htmlFor="currency">
                                Currency
                            </label>
                            <select
                                aria-label="Select currency"
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                defaultValue="USD"
                                id="currency"
                                name="currency"
                            >
                                <option aria-label="Argentine Peso" value="ARS">
                                    گرم
                                </option>
                                <option aria-label="US Dollar" value="USD">
                                    کیلوگرم
                                </option>
                            </select>
                        </div>
                    }
                    className="justify-center"
                />
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
            </CardBody>
        </Card>
    )
}

export default AdditionalInformationMiddle