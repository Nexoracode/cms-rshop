"use client"

import ImageCropper from "@/components/Helper/ImageCropper";
import { Alert, Card, CardBody, CardFooter, CardHeader } from "@heroui/react"
import { FaRegImages } from "react-icons/fa6";

const ImagesProducts = () => {

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="flex gap-3">
                <div className="w-full rounded-md bg-blue-700/10 text-blue-700 p-2 flex items-center justify-between">
                    <FaRegImages className="text-3xl" />
                    <p>تصویر و ویدئو محصول</p>
                </div>
            </CardHeader>
            <CardBody>
                <ImageCropper />
            </CardBody>
            <CardFooter>
                <div className="w-full flex items-center">
                    <Alert className="h-[40px] flex items-center p-0 bg-transparent" variant="flat" radius="full" color="secondary" dir="rtl" title={<p className="text-[12px]" dir="rtl">حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. برای هر محصول 20 تصویر و 5 ویدئو میتوانید بارگذاری کنید.</p>} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default ImagesProducts