"use client"

import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input } from "@heroui/react"

const UserInfos = () => {

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="اطلاعات کاربری" link="/admin/store" />

            <div className="bg-slate-200 rounded-2xl p-4 flex flex-col items-center gap-4">
                <Input variant="flat" label="نام" placeholder="نام خود را وارد نمایید" type="text" />
                <Input variant="flat" label="نام خوانوادگی" placeholder="نام خود را وارد نمایید" type="text" />
                <Input variant="flat" label="ایمیل" placeholder="ایمیل خود را وارد نمایید" type="email" />
                <div className="w-full text-end">
                    <Button color="secondary" variant="flat">ویرایش</Button>
                </div>
            </div>
        </div>
    )

}

export default UserInfos