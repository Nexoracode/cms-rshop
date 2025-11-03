"use client"

import ImageBoxUploader from "@/components/media/ImageBoxUploader"
import { Button, Input, NumberInput } from "@heroui/react"
import { useState } from "react"

const AboutStore = () => {

    const [imageFile, setImageFile] = useState<File | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-6">
                <ImageBoxUploader
                    textBtn={imageFile ? "تغییر لوگو" : "+ افزودن لوگو"}
                    title="تصویر لوگو"
                    changeStatusFile={imageFile}
                    onFile={(file) => setImageFile(file)}
                />
                <Input labelPlacement="outside" variant="flat" label="نام فارسی فروشگاه" placeholder="نام فارسی فروشگاه را وارد کنید" type="text" />
                <NumberInput maxLength={11} label="تلفن فروشگاه" labelPlacement="outside" placeholder="09" hideStepper style={{ direction: "ltr" }} />
                <div className="w-full">
                    <Button className="w-full" color="secondary" variant="flat">ویرایش اطلاعات</Button>
                </div>
            </div>
        </div>
    )

}

export default AboutStore