"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import BackToPage from "@/components/Helper/BackToPage"
import ImageCropper from "@/components/Helper/ImageCropper"
import { Alert, Button, Card, CardBody, CardFooter, Divider } from "@heroui/react"
import { useState } from "react"
import { IoImagesOutline } from "react-icons/io5"

const About = () => {

    const [gallery, setGallery] = useState<Record<string, any>[]>()

    return (
        <>
            <BackToPage title="درباره فروشگاه" link="/admin/settings/about" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="اطلاعات کلی"
                    color="bg-blue-700/10 text-blue-700"
                    icon={<IoImagesOutline className="text-3xl" />}
                />
                <CardBody>
                    <div className="flex flex-col gap-3 mb-6">
                        <ImageCropper onPreviewsChange={datas =>
                            setGallery(datas)
                        } />
                        <div className="w-full flex items-center text-right">
                            <Alert className="h-[40px] flex items-center p-0 bg-transparent" variant="flat" radius="full" color="secondary" dir="rtl" title={<p className="text-[12px]" dir="rtl">حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. 10 تصویر و 2 ویدئو میتوانید بارگذاری کنید.</p>} />
                        </div>
                    </div>
                    <Divider />
                    <div className="mt-6">

                    </div>
                </CardBody>
                <CardFooter className="w-full">
                    <Button variant="flat" color="secondary" className="w-full" isDisabled={!gallery?.length}>
                        ثبت
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default About