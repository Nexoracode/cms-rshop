"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import AddSpecialProductsModal from "@/components/Admin/_store/__pre-order/AddSpecialProductsModal";
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, DateRangePicker, useDisclosure } from "@heroui/react"
import { useState } from "react";
import { MdWhatshot } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";


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
                        <div className="flex flex-col gap-2">
                            <p>پیشنهادات ویژه</p>
                            <p className="text-gray-600">هر نوع محصولی را میتوانید انتخاب کنید.</p>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex items-center justify-center flex-col animate-pulse">
                                <TfiShoppingCartFull className="text-[70px] text-gray-600 mb-2" />
                                <p>محصولاتی که می‌خواهید را انتخاب کنید.</p>
                            </div>
                            <Button color="secondary" variant="flat" className="mt-4 w-full" onPress={onOpen}>
                                افزودن محصول
                            </Button>
                        </div>
                    </div>


                    <div className="w-full text-end">
                        <Button color="secondary" variant="flat">فعال سازی</Button>
                    </div>
                </CardBody>
            </Card>

            <AddSpecialProductsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onAdd={(newProducts) =>
                    setSpecialProducts(prev => [...prev, ...newProducts])
                }
                initialSelectedProducts={specialProducts}
            />
        </>
    )
}

export default AmazingOffer