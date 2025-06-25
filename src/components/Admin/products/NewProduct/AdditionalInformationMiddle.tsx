"use client"

import { Card, CardBody, cn, NumberInput, Switch } from "@heroui/react"

const AdditionalInformationMiddle = () => {

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
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="flex items-center justify-between text-gray-700">
                            <p>محصول نیاز به زمان آماده‌ سازی دارد</p>
                            <Switch id="time-ready" defaultSelected aria-label="Automatic updates" size="sm" />
                        </div>
                        <div className="flex items-center justify-between text-gray-700">
                            <div className="flex flex-col">
                                <p>می خواهم محصول “ارسال امروز” داشته باشد.</p>
                                <small className="text-gray-500 mt-1">برچسب “ارسال امروز” ، روی کارت این محصول در فروشگاه نمایش داده خواهد شد.</small>
                            </div>
                            <Switch id="time-ready" defaultSelected aria-label="Automatic updates" size="sm" />
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default AdditionalInformationMiddle