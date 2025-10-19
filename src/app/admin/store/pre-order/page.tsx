"use client"

import ProductItem from "@/components/Admin/_home/helpers/ProductItem";
import BackToPage from "@/components/Helper/BackToPage"
import { Button, NumberInput, Select, SelectItem, Switch, useDisclosure } from "@heroui/react"
import { useState } from "react"
import { FiShoppingBag } from "react-icons/fi";

const PreOrder = () => {

    const [isActiveCard, setIsActiveCard] = useState(false)
    const [selectItem, setSelectItem] = useState<"limit" | "unlimit">("unlimit")
    const [selectedCategoryType, setSelectedCategoryType] = useState<any>()
    const [specialProducts, setSpecialProducts] = useState<any[]>([]);

    return (
        <>
            <div>
                <BackToPage title="پیش سفارش" link="/admin/store" />
                <div className="bg-white rounded-2xl p-4 mt-6">
                    <div className="flex flex-col gap-4 mb-6">
                        <Switch
                            size="sm"
                            isSelected={isActiveCard}
                            onValueChange={setIsActiveCard}
                        >
                            امکان پیش سفارش
                        </Switch>
                        <p className="text-gray-600 text-right">می توانید امکان پیش سفارش را در فروشگاه خود برای محصولات ناموجود داشته باشید.</p>
                    </div>

                    <div className={`${!isActiveCard ? "select-none opacity-55 pointer-events-none" : ""} flex flex-col gap-6`}>
                        <div className="bg-slate-50 rounded-2xl p-2 py-4 flex flex-col gap-6">
                            <NumberInput
                                label="حداکثر زمان آماده سازی محصول"
                                placeholder="3"
                                labelPlacement={"outside"}
                                minValue={1}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">روز</span>
                                    </div>
                                }
                                onValueChange={() => { }}
                            />

                            <div className={`flex flex-col justify-between ${selectItem === "limit" ? "bg-white rounded-xl p-2" : ""}`}>
                                <div className="flex items-center justify-between mb-4 text-gray-700">
                                    <p>محدودیت تعداد برای هر سفارش</p>
                                    <Switch isSelected={selectItem === "limit" ? true : false} onValueChange={() => setSelectItem(prev => prev === "limit" ? "unlimit" : "limit")} aria-label="Automatic updates" size="sm" />
                                </div>
                                {
                                    selectItem === "limit"
                                        ?
                                        <NumberInput
                                            label="حداکثر تعداد پیش سفارش"
                                            placeholder="3"
                                            minValue={1}
                                            endContent={
                                                <div className="pointer-events-none flex items-center">
                                                    <span className="text-default-400 text-small">عدد</span>
                                                </div>
                                            }
                                            labelPlacement={"outside"}
                                        />
                                        : ""
                                }
                            </div>
                        </div>

                        <div className={`flex flex-col bg-slate-50 rounded-2xl p-2 py-4 gap-6`}>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-2">
                                    <p>محصولات پیش سفارش</p>
                                    <p className="text-gray-600 hidden sm:flex">پیش سفارش برای محصولات ناموجود است و برای محصولات دارای موجودی، در صورت ناموجود شدن فعال می شود.</p>
                                </div>
                                {
                                    selectedCategoryType?.anchorKey === "selected" ?
                                        <Button color="secondary" size="sm" variant="flat" onPress={() => {}}>
                                            {specialProducts.length ? "ویرایش" : "افزودن"}
                                        </Button>
                                        :
                                        ""
                                }
                            </div>
                            <Select
                                dir="rtl"
                                labelPlacement={"outside"}
                                placeholder="دسته بندی مورد نظر را جستجو یا اضافه کنید"
                                selectedKeys={selectedCategoryType}
                                onSelectionChange={setSelectedCategoryType}
                            >
                                <SelectItem key="all">همه محصولات</SelectItem>
                                <SelectItem key="selected">محصولات منتخب</SelectItem>
                            </Select>
                            {
                                selectedCategoryType?.anchorKey === "selected" ?
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
                                                            <ProductItem
                                                                key={index}
                                                                img={pr.img}
                                                                price={pr.price}
                                                                productName={pr.productName}
                                                                isExist={pr.isExist}
                                                                subProductName={pr.subProductName}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                        }
                                    </div>
                                    :
                                    ""
                            }

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default PreOrder