"use client"

import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input, NumberInput } from "@heroui/react"

const AboutStore = () => {

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="اطلاعات فروشگاه" link="/admin/store" />

            <div className="bg-slate-100 rounded-2xl p-4 flex flex-col items-center gap-4">
                <Input labelPlacement="outside" variant="flat" label="نام فارسی فروشگاه" placeholder="نام فارسی فروشگاه را وارد کنید" type="text" />
                <NumberInput label="تلفن فروشگاه" labelPlacement="outside" placeholder="09" hideStepper style={{ direction: "ltr" }} />
                <div className="w-full">
                    <Button className="w-full" color="secondary" variant="flat">ویرایش اطلاعات</Button>
                </div>
            </div>
        </div>
    )

}

export default AboutStore