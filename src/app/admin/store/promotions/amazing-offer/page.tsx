"use client"

import ProductItem from "@/components/admin/dashboard/helpers/ProductItem";
import BoxHeader from "@/components/admin/products/create/helpers/BoxHeader";
import BackToPage from "@/components/widgets/BackToPage"
import { Button, Card, CardBody, DateRangePicker, NumberInput, useDisclosure } from "@heroui/react"
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { MdWhatshot } from "react-icons/md";

const AmazingOffer = () => {

    const [specialProducts, setSpecialProducts] = useState<any[]>([]);

    const {
        isOpen,
        onOpen,
        onOpenChange,
    } = useDisclosure();

    return (
        <>
            <BackToPage title="پیشنهاد شگفت‌انگیز" link="/admin/store/promotions" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="پیشنهاد داغ"
                    color="bg-red-700/10 text-red-700"
                    icon={<MdWhatshot className="text-3xl" />}
                />
                <CardBody className="flex flex-col gap-6 text-right">

                    <DateRangePicker label="زمان آغاز و پایان تخفیف" labelPlacement="outside" />

                    <div className={`flex flex-col bg-slate-50 rounded-2xl p-2 py-4 gap-6`}>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <p>پیشنهادات ویژه</p>
                                <p className="text-gray-600 hidden xs:flex">هر نوع محصولی را میتوانید انتخاب کنید.</p>
                            </div>
                            <Button color="secondary" size="sm" variant="flat" onPress={onOpen}>
                                {specialProducts.length ? "ویرایش محصول" : "افزودن محصول"}
                            </Button>
                        </div>
                        <div className="w-full">
                            {
                                !specialProducts.length
                                    ?
                                    <div className="w-full flex items-center justify-center flex-col animate-pulse">
                                        <FiShoppingBag className="text-[70px] animate-blink w-full text-gray-600 mb-2" />
                                        <p>هنوز محصولی را انتخاب نکرده اید</p>
                                    </div>
                                    :
                                    <div className="flex flex-col gap-4">
                                        {
                                            specialProducts.map((pr, index) => (
                                                <div className="bg-red-700/10 rounded-2xl p-2 flex flex-col gap-2">
                                                    <ProductItem
                                                        key={index}
                                                        img={pr.img}
                                                        price={pr.price}
                                                        productName={pr.productName}
                                                        isExist={pr.isExist}
                                                        subProductName={pr.subProductName}
                                                    />
                                                    <div className="flex flex-col xs:flex-row items-center gap-2">
                                                        <NumberInput
                                                            color="default"
                                                            placeholder="تعداد را وارد کنید"
                                                            minValue={1}
                                                            size="sm"
                                                            endContent={<p>عدد</p>}
                                                            onValueChange={(value: any) => { }}
                                                        />
                                                        <NumberInput
                                                            color="danger"
                                                            placeholder="مقدار تخفیف را وارد کنید"
                                                            minValue={1}
                                                            size="sm"
                                                            endContent={<p>%</p>}
                                                            onValueChange={(value: any) => { }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="w-full text-end">
                        <Button color="secondary" variant="flat">فعال سازی</Button>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default AmazingOffer