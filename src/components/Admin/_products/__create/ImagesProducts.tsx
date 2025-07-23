"use client"

import { Alert, Card, CardBody, CardFooter } from "@heroui/react"
import { FaRegImages } from "react-icons/fa6";
import BoxHeader from "./helpers/BoxHeader";
import React from "react";

type Props = {
    children: React.ReactNode
}

const ImagesProducts = ({ children }: Props) => {

    return (
        <Card className="w-full shadow-md">
            <BoxHeader
                title="تصویر و ویدیو محصول"
                color="bg-green-700/10 text-green-700"
                icon={<FaRegImages className="text-3xl" />}
            />
            <CardBody>
                {children}
            </CardBody>
            <CardFooter>
                <div className="w-full flex items-center">
                    <Alert className="h-[40px] flex items-center p-0 bg-transparent" variant="flat" radius="full" color="secondary" dir="rtl" title={<p className="text-[10px] xs:text-[12px]" dir="rtl">حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. برای هر محصول 20 تصویر و 5 ویدئو میتوانید بارگذاری کنید.</p>} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default ImagesProducts