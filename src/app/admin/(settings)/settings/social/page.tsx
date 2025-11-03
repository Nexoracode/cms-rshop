"use client"

import { Button, Input } from "@heroui/react"
import { FaTelegram } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";

const Social = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 flex flex-col gap-6">

                <div className="text-gray-700 text-sm leading-relaxed">
                    لینک شبکه‌های اجتماعی
                    <br />
                    <span className="text-gray-500">
                        فقط نام کاربری یا ID خود را وارد کنید. پیشوند لینک به‌صورت خودکار نمایش داده شده است.
                    </span>
                </div>

                <Input
                    label={
                        <div className="flex items-center gap-2">
                            <LuInstagram className="text-xl text-pink-500" />
                            <span>اینستاگرام</span>
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="username"
                    type="text"
                    style={{ direction: "ltr" }}
                    endContent={
                        <div className="pointer-events-none flex items-center pr-4">
                            <span className="text-default-400 text-sm">https://instagram.com</span>
                        </div>
                    }
                />

                <Input
                    label={
                        <div className="flex items-center gap-2">
                            <FaTelegram className="text-xl text-sky-500" />
                            <span>تلگرام</span>
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="username"
                    type="text"
                    style={{ direction: "ltr" }}
                    endContent={
                        <div className="pointer-events-none flex items-center pr-4">
                            <span className="text-default-400 text-sm">https://t.me</span>
                        </div>
                    }
                />

                <Input
                    label={
                        <div className="flex items-center gap-2">
                            <img src="/images/eitaa.png" className="w-5" alt="eitaa" />
                            <span>ایتا</span>
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="username"
                    type="text"
                    style={{ direction: "ltr" }}
                    endContent={
                        <div className="pointer-events-none flex items-center pr-4">
                            <span className="text-default-400 text-sm">https://eitaa.com</span>
                        </div>
                    }
                />

                <Input
                    label={
                        <div className="flex items-center gap-2">
                            <img src="/images/rubika.png" className="w-5" alt="rubika" />
                            <span>روبیکا</span>
                        </div>
                    }
                    labelPlacement="outside"
                    placeholder="username"
                    type="text"
                    style={{ direction: "ltr" }}
                    endContent={
                        <div className="pointer-events-none flex items-center pr-4">
                            <span className="text-default-400 text-sm">https://rubika.ir</span>
                        </div>
                    }
                />

                <div className="w-full pt-2">
                    <Button className="w-full" color="secondary" variant="flat">ثبت اطلاعات</Button>
                </div>
            </div>
        </div>
    )
}

export default Social
