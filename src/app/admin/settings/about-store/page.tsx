"use client"

import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input } from "@heroui/react"

const AboutStore = () => {

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="اطلاعات فروشگاه" link="/admin/store" />

            <div className="bg-slate-200 rounded-2xl p-4 flex flex-col items-center gap-4">
                <Input variant="flat" label="نام فارسی فروشگاه" placeholder="نام فارسی فروشگاه را وارد کنید" type="text" />
                <Input variant="flat" label="تلفن فروشگاه" placeholder="تلفن فروشگاه را وارد نمایید" type="number" />
                <div className="w-full">
                    <Button className="w-full" color="secondary" variant="flat">ویرایش اطلاعات</Button>
                </div>
            </div>
        </div>
    )

}

export default AboutStore