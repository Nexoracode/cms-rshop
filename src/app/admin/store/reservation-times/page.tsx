"use client"

import BoxHeader from "@/components/admin/_products/__create/helpers/BoxHeader"
import BackToPage from "@/components/widgets/BackToPage"
import { Card, CardBody, Select, SelectItem } from "@heroui/react"
import { MdOutlineTimer } from "react-icons/md";

const ReservationTimes = () => {
    return (
        <div>
            <BackToPage title="زمان رزرو" link="/admin/store" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="زمان رزرو"
                    color="bg-orange-700/10 text-orange-700"
                    icon={<MdOutlineTimer className="text-3xl" />}
                />

                <CardBody className="text-right">
                    <Select
                        dir="rtl"
                        className="mt-4"
                        label="زمان"
                        labelPlacement="outside"
                        defaultSelectedKeys={["70"]}
                        onSelectionChange={(value: any) => { }}
                    >
                        <SelectItem key="20">20 دقیقه (حداقل)</SelectItem>
                        <SelectItem key="30">30 دقیقه</SelectItem>
                        <SelectItem key="60">60 دقیقه</SelectItem>
                        <SelectItem key="70">70 دقیقه (زمان پیش فرض)</SelectItem>
                        <SelectItem key="120">120 دقیقه (حداکثر)</SelectItem>
                    </Select>

                    <div className="flex flex-col gap-4 mt-6">
                        <p>زمان رزرو سفارش چیست؟</p>
                        <p className="text-gray-600">
                            هنگامی که مشتریان اطلاعات خود را وارد کرده و به صفحه پرداخت هدایت می‌شوند،
                            در صورت ناموفق بودن پرداخت، مدت‌زمان مشخصی فرصت دارند تا به حساب کاربری خود بازگشته
                            و پرداخت را تکمیل کنند. در این مدت، که به آن "زمان رزرو سفارش" گفته می‌شود،
                            محصولات انتخاب‌شده موقتاً از موجودی کسر شده و برای مشتری نگه‌داشته می‌شود.
                        </p>
                    </div>
                </CardBody>
            </Card>
        </div >
    )
}

export default ReservationTimes
