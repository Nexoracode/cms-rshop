"use client"

import { Card, CardBody, CardHeader, NumberInput, Checkbox } from "@heroui/react"
import { TbRosetteDiscount } from "react-icons/tb"

type Props = {
    isDisabled: boolean,
    onDiscount: (value: string) => void
}

const AdditionalInformation: React.FC<Props> = ({ isDisabled, onDiscount }) => {

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="flex gap-3">
                <div className="w-full rounded-md bg-yellow-700/10 text-yellow-700 p-2 flex items-center justify-between">
                    <TbRosetteDiscount className="text-3xl" />
                    <p>اطلاعات تکمیلی محصول</p>
                </div>
            </CardHeader>
            <CardBody dir="rtl" className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 text-start">
                    <NumberInput
                        isDisabled={isDisabled}
                        label="تخفیف"
                        labelPlacement={"outside"}
                        placeholder="10"
                        minValue={3}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">%</span>
                            </div>
                        }
                        onChange={(e) => onDiscount(e.toString())}
                    />
                    {
                        isDisabled
                            ?
                            <p className="text-gray-500 text-[13px]">برای تعریف تخفیف ابتدا قیمت را وارد کنید.</p>
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

export default AdditionalInformation