"use client"

import { Button, Input, Select, SelectItem, Switch } from "@heroui/react";
import { useState } from "react";
import { TbTruckLoading } from "react-icons/tb";
import { StepKey } from "./type";
import DoubleClickBtn from "@/components/Helper/DoubleClickBtn";

type Props = {
    step: StepKey,
    onNextStep: () => void
}

const StepContent = ({ step, onNextStep }: Props) => {
    const [isSelected, setIsSelected] = useState(false);

    switch (step) {
        case "1":
            return (
                <>
                    <p className="text-default-600 leading-7">
                        پس از تایید درخواست سفارش ، مشتری میتواند مبلغ سفارش را به صورت کارت به کارت پرداخت کند.
                    </p>
                    <div className="w-full flex items-center gap-2">
                        <DoubleClickBtn
                            onPress={() => console.log("Test")}
                            textBtn="عدم تایید"
                            color="danger"
                            size="sm"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                        <DoubleClickBtn
                            onPress={onNextStep}
                            textBtn="تایید درخواست"
                            startContent={<TbTruckLoading className="text-lg" />}
                            color="success"
                            size="sm"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                    </div>
                </>
            )
        case "2":
            return (
                <p className="text-default-600 leading-7">
                    سفارش در انتظار پرداخت مشتری است. محصولات آن تا 4 ساعت برای مشتری رزرو می شود.
                </p>
            )
        case "3":
            return (
                <>
                    <p className="text-default-600 leading-7">
                        سفارش کارت به کارت توسط مشتری پرداخت شده و تصویر رسید ارسال شده است.
                    </p>
                    <div className="w-full flex items-center gap-2">
                        <DoubleClickBtn
                            onPress={() => console.log("Test")}
                            textBtn="عدم تایید"
                            color="danger"
                            size="sm"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                        <DoubleClickBtn
                            onPress={onNextStep}
                            textBtn="تایید"
                            color="success"
                            size="sm"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                    </div>
                </>
            )
        case "4":
            return (
                <>
                    <p className="text-default-600 mb-4 leading-7">
                        لطفا پس از آماده سازی محصولات، سفارش را ارسال کنید.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-3">
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p>کد پیگیری مرسوله</p>
                                <Switch isSelected={isSelected} size="sm" onValueChange={setIsSelected} />
                            </div>
                            <p className="text-gray-600 mb-2 text-[13px] leading-7">اگر از خدمات پست ویا تیپاکس جهت ارسال مرسوله استفاده می‌کنید، میتوانید کد پیگیری مرسوله را در این بخش وارد کنید تا برای مشتری ارسال شود.</p>
                        </div>
                        {
                            isSelected
                                ?
                                <div className="flex flex-col gap-4 mt-4">
                                    <Input labelPlacement="outside" label="کد رهگیری" placeholder="کد را وارد کنید" />
                                    <Select
                                        dir="rtl"
                                        label={"نوع فرستنده"}
                                        labelPlacement={"outside"}
                                        placeholder="نوع فرستنده را انتخاب کنید"
                                    //selectedKeys={selectedCategoryType}
                                    //onSelectionChange={setSelectedCategoryType}
                                    >
                                        <SelectItem key="all">پست</SelectItem>
                                        <SelectItem key="selected">تیپاکس</SelectItem>
                                    </Select>
                                </div>
                                :
                                ""
                        }
                    </div>

                    <div className="w-full flex items-center gap-2">
                        <DoubleClickBtn
                            onPress={onNextStep}
                            textBtn="تایید"
                            color="success"
                            size="sm"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                    </div>
                </>
            )
        case "5":
            return (
                <>
                    <p className="text-default-600 leading-7">
                        لطفا در صورت اطمینان از تحویل مرسوله به مشتری، وضعیت سفارش را "تحویل شده" تعیین کنید.
                    </p>
                    <div className="w-full flex items-center gap-2">
                        <DoubleClickBtn
                            onPress={onNextStep}
                            textBtn="تحویل شده"
                            color="secondary"
                            size="sm"
                            variant="solid"
                            className="mt-4 w-full"
                            isActiveDoubleClick
                        />
                    </div>
                </>
            )
        case "6":
            return <p>مرسوله به مشتری تحویل داده شده است.</p>
        default:
            return null
    }
}

export default StepContent