"use client"

import { Button, Input } from "@heroui/react"

const UserInfos = () => {

    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-4">
                <Input labelPlacement="outside" variant="flat" label="نام" placeholder="نام خود را وارد نمایید" type="text" />
                <Input labelPlacement="outside" variant="flat" label="نام خوانوادگی" placeholder="نام خود را وارد نمایید" type="text" />
                <Input labelPlacement="outside" variant="flat" label="ایمیل" placeholder="ایمیل خود را وارد نمایید" type="email" />
                <div className="w-full text-end">
                    <Button color="secondary" variant="flat">ویرایش</Button>
                </div>
            </div>
        </div>
    )

}

export default UserInfos