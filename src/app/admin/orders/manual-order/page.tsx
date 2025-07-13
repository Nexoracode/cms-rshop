"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, CardFooter, Divider, NumberInput, Select, SelectItem, Switch } from "@heroui/react"
import { useState } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";

const pay = [
    { key: "payed", label: "مبلغ سفارش قبلا پرداخت شده" },
    { key: "sendLink", label: "ارسال لینک پرداخت برای مشتری" },
];

const status = [
    { key: "prepration", label: "درحال آماده سازی" },
    { key: "sendding", label: "درحال ارسال" },
    { key: "geted", label: "تحویل گرفته" },
];

const ManualOrder = () => {

    const [isSelected, setIsSelected] = useState(false);

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/orders" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="ثبت جدید"
                    color="text-blue-700 bg-blue-700/10"
                    icon={<TbShoppingCartPlus className="text-3xl" />}
                />
                <CardBody className="text-right flex flex-col gap-6">
                    <p className="text-gray-600">با تکمیل فرم زیر، سفارش‌های مورد نظر را مدیریت کنید و امکان پرداخت آسان و پیگیری سریع سفارش را برای مشتری خود فراهم کنید.</p>
                    <Card className="shadow-md p-2">
                        <HeaderAction
                            title={"مشتری"}
                            textBtn={"+ انتخاب مشتری"}
                            onPress={() => { }}
                        />
                        <CardBody>
                            <p className="text-center text-gray-600 py-6 animate-bounce">مشتری مورد نظر خود را انتخاب کنید</p>
                        </CardBody>
                    </Card>
                    <Card className="shadow-md p-2">
                        <HeaderAction
                            title={"محصولات"}
                            textBtn={"+ انتخاب محصولات"}
                            onPress={() => { }}
                        />
                        <CardBody>
                            <p className="text-center text-gray-600 py-6 animate-bounce">محصولات مورد نظر را انتخاب کنید</p>
                        </CardBody>
                    </Card>
                    <Card className="shadow-md p-2">
                        <CardBody className="text-right">
                            <Select labelPlacement="outside" label="وضعیت پرداخت" placeholder="وضعیت پرداخت را انتخاب کنید">
                                {pay.map((pay) => (
                                    <SelectItem key={pay.key}>{pay.label}</SelectItem>
                                ))}
                            </Select>
                            <div className="flex flex-col my-6">
                                <Select labelPlacement="outside" label="وضعیت سفارش" placeholder="وضعیت سفارش را انتخاب کنید">
                                    {status.map((status) => (
                                        <SelectItem key={status.key}>{status.label}</SelectItem>
                                    ))}
                                </Select>
                                <p className="text-gray-600 pr-2 text-[13px] mt-2">وضعیت انتخاب شده به مشتری نمایش داده می‌شود.</p>
                            </div>
                            <Divider />
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between mt-6">
                                    <div className="float-start flex-col gap-2">
                                        <p>تخفیف فاکتور</p>
                                        <p className="text-gray-600 pr-2 text-[13px] mt-2">این مبلغ به عنوان تخفیف از مجموع فاکتور کسر می‌شود.</p>
                                    </div>
                                    <Switch size="sm" aria-label="Automatic updates" isSelected={isSelected} onValueChange={setIsSelected} />
                                </div>
                                {
                                    isSelected
                                        ?
                                        <div>
                                            <NumberInput
                                                label="تخفیف"
                                                labelPlacement="outside"
                                                placeholder="10"
                                                minValue={1}
                                                endContent={
                                                    <select
                                                        aria-label="Select discount type"
                                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                    >
                                                        <option value="percent">درصد</option>
                                                        <option value="money">مبلغ ثابت (تومان)</option>
                                                    </select>
                                                }
                                            />
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardFooter className="w-full">
                    <Button variant="flat" color="secondary" className="w-full">
                        ثبت
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default ManualOrder