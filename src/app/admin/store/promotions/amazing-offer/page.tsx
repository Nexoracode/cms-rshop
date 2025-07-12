"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, DateRangePicker, Divider, Input, NumberInput, Radio, RadioGroup, Select, SelectItem } from "@heroui/react"
import { useEffect, useState } from "react";
import { MdWhatshot } from "react-icons/md";


const AmazingOffer = () => {

    return (
        <>
            <BackToPage title="پیشنهاد شگفت‌انگیز" link="/admin/store/promotions" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="پیشنهاد داغ"
                    color="bg-red-700/10 text-red-700"
                    icon={<MdWhatshot className="text-3xl" />}
                />
                <CardBody className="flex flex-col gap-6 text-right">

                    <DateRangePicker label="زمان آغاز و پایان تخفیف" labelPlacement="outside" />

                    <div className="w-full text-end">
                        <Button color="secondary" variant="flat">فعال سازی</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default AmazingOffer