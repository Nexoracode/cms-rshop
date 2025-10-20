"use client"

import React, { useState } from "react"
import BackToPage from "@/components/widgets/BackToPage"
import { Button, Input, CardBody, Card, Switch } from "@heroui/react"
import BoxHeader from "@/components/admin/_products/__create/helpers/BoxHeader"
import { GrMapLocation } from "react-icons/gr";
import { FaTreeCity } from "react-icons/fa6";
import SendTypeCard from "@/components/admin/_store/__shippings/SendTypeCard"
import { TbTruckDelivery } from "react-icons/tb";

export default function Shippings() {
    // اطلاعات کلی
    const [title, setTitle] = useState("پیک فروشگاه")
    const [isActiveShipping, setIsActiveShipping] = useState(false)

    const handleSubmit = () => {
        console.log("Submitted:")
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

            <SendTypeCard>
                <BoxHeader
                    title="ارسال درون شهری"
                    color="bg-green-700/10 text-green-700"
                    icon={<FaTreeCity className="text-3xl" />}
                />
            </SendTypeCard>

            <SendTypeCard
                childrenBody={
                    <Switch
                        size="sm"
                        isSelected={isActiveShipping}
                        onValueChange={setIsActiveShipping}
                        className="mb-6"
                    >
                        ارسال برون شهری
                    </Switch>
                }
                isActiveCard={isActiveShipping}
            >
                <BoxHeader
                    title="ارسال برون شهری"
                    color="bg-purple-700/10 text-purple-700"
                    icon={<TbTruckDelivery className="text-3xl" />}
                />
            </SendTypeCard>


            <Button
                className="w-full mt-4"
                color="secondary"
                variant="flat"
                onPress={handleSubmit}
            >
                ثبت اطلاعات
            </Button>
        </div>
    )
}