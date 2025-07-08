"use client"

import React, { useState } from "react"
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input, Switch, Select, SelectItem, CardBody, Card } from "@heroui/react"
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import { GrMapLocation } from "react-icons/gr";
import { FaTreeCity } from "react-icons/fa6";

export default function Shippings() {
    // اطلاعات کلی
    const [title, setTitle] = useState("پیک فروشگاه")
    const [localPaymentType, setLocalPaymentType] = useState("پیش کرایه")
    const [localTimeValue, setLocalTimeValue] = useState("2")
    const localTimeUnit = "روز" // ثابت
    const [localCost, setLocalCost] = useState("")
    const [freeLocal, setFreeLocal] = useState(false)
    const [useWeightRange, setUseWeightRange] = useState(false)
    const [weightFrom, setWeightFrom] = useState("")
    const [weightTo, setWeightTo] = useState("")
    const [weightCost, setWeightCost] = useState("")
    const [cashOnDelivery, setCashOnDelivery] = useState(false)

    const handleSubmit = () => {
        const payload = {
            title,
            province: "خراسان رضوی",
            city: "مشهد",
            local: {
                paymentType: localPaymentType,
                time: `${localTimeValue} ${localTimeUnit}`,
                cost: freeLocal ? 0 : localCost,
            },
            weightRange: useWeightRange
                ? { from: weightFrom, to: weightTo, cost: weightCost }
                : null,
            cashOnDelivery,
        }
        console.log("Submitted:", payload)
    }

    return (
        <div className="flex flex-col gap-6">
            <BackToPage title="پیک فروشگاه" link="/admin/store" />

            {/* باکس اطلاعات کلی */}
            <Card className="shadow-md">
                <BoxHeader
                    title="اطلاعات کلی"
                    color="bg-blue-700/10 text-blue-700"
                    icon={<GrMapLocation className="text-3xl" />}
                />
                <CardBody className="flex flex-col gap-6">
                    <Input
                        label="عنوان روش ارسال"
                        labelPlacement="outside"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                        label="استان مبداء"
                        labelPlacement="outside"
                        value="خراسان رضوی"
                        isDisabled
                    />
                    <Input
                        label="شهر مبداء"
                        labelPlacement="outside"
                        value="مشهد"
                        isDisabled
                    />
                </CardBody>
            </Card>

            {/* باکس ارسال درون‌شهری */}
            <Card className="shadow-md">
                <BoxHeader
                    title="ارسال درون شهری"
                    color="bg-green-700/10 text-green-700"
                    icon={<FaTreeCity className="text-3xl" />}
                />
                <CardBody className="flex flex-col gap-6">
                    <Select
                        label="نوع پرداخت"
                        placeholder="شیوه پرداخت را انتخاب نمایید"
                        labelPlacement="outside"
                        value={localPaymentType}
                        onValueChange={setLocalPaymentType}
                    >
                        <SelectItem key="before">پیش کرایه</SelectItem>
                        <SelectItem key="after">پس کرایه</SelectItem>
                    </Select>

                    <div className="flex flex-col gap-2">
                        <Input
                            label="زمان ارسال"
                            labelPlacement="outside"
                            type="number"
                            value={localTimeValue}
                            onChange={e => setLocalTimeValue(e.target.value)}
                        />
                        <Input
                            label="واحد"
                            labelPlacement="outside"
                            value={localTimeUnit}
                            disabled
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Input
                            label="هزینه ارسال (تومان)"
                            labelPlacement="outside"
                            type="number"
                            value={localCost}
                            onChange={e => setLocalCost(e.target.value)}
                            disabled={freeLocal}
                        />
                        <Switch
                            label="می‌خواهم هزینه ارسال رایگان باشد"
                            checked={freeLocal}
                            onCheckedChange={setFreeLocal}
                        />
                    </div>

                    <Switch
                        label="تعیین بازه وزنی (اختیاری)"
                        checked={useWeightRange}
                        onCheckedChange={setUseWeightRange}
                    />
                    {useWeightRange && (
                        <div className="flex flex-col gap-2">
                            <Input
                                label="از وزن (کیلوگرم)"
                                labelPlacement="outside"
                                type="number"
                                value={weightFrom}
                                onChange={e => setWeightFrom(e.target.value)}
                            />
                            <Input
                                label="تا وزن (کیلوگرم)"
                                labelPlacement="outside"
                                type="number"
                                value={weightTo}
                                onChange={e => setWeightTo(e.target.value)}
                            />
                            <Input
                                label="هزینه وزنی (تومان)"
                                labelPlacement="outside"
                                type="number"
                                value={weightCost}
                                onChange={e => setWeightCost(e.target.value)}
                            />
                        </div>
                    )}

                    <Switch
                        label="پرداخت در محل (اختیاری)"
                        checked={cashOnDelivery}
                        onCheckedChange={setCashOnDelivery}
                    />

                    <Button
                        className="w-full mt-4"
                        color="secondary"
                        variant="flat"
                        onClick={handleSubmit}
                    >
                        ثبت اطلاعات
                    </Button>
                </CardBody>
            </Card>
        </div>
    )
}