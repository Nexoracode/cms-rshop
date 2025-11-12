"use client"

//import MediasUploader from "@/components/Helper/MediasUploader"
import { Alert, Button, Card, CardBody, CardFooter, Divider, Textarea } from "@heroui/react"
import { useState } from "react"
import { BsInfoCircle } from "react-icons/bs"

const About = () => {

    const [gallery, setGallery] = useState<Record<string, any>[]>()

    return (
        <>
            <Card className="shadow-md mt-6"> 
               {/*  <BoxHeader
                    title="درباره ما"
                    color="text-yellow-700 bg-yellow-700/10"
                    icon={<BsInfoCircle className="text-3xl" />}
                /> */}
                <CardBody>
                    <div className="flex flex-col gap-3 mb-6">
                       {/*  <MediasUploader onPreviewsChange={datas =>
                            setGallery(datas)
                        } /> */}
                        <div className="w-full flex items-center text-right">
                            <Alert className="h-[40px] flex items-center p-0 bg-transparent" variant="flat" radius="full" color="secondary" dir="rtl" title={<p className="text-[12px]" dir="rtl">حداکثر حجم فایل تصویر 5.5 و ویدئو 50MB است. 10 تصویر و 2 ویدئو میتوانید بارگذاری کنید.</p>} />
                        </div>
                    </div>
                    <Divider />
                    <div className="mt-6 text-right">
                        <p className="text-gray-600 mb-4">میتوانید توضیحات شرایط پرداخت و ارسال سفارشات را در اینجا بنویسید تا برای مشتریانتان نمایش داده شود.</p>
                        <Textarea
                            labelPlacement="outside"
                            isClearable
                            label="درباره ما"
                            placeholder="وارد کنید"
                            variant="flat"
                            onClear={() => console.log("textarea cleared")}
                        />
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