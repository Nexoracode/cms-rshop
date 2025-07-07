"use client"

import { Card, CardBody, Checkbox, Input, NumberInput, Select, SelectItem, useDisclosure } from "@heroui/react"
import { LuTextCursorInput } from "react-icons/lu"
import { FiSearch } from "react-icons/fi"
import { TiPlusOutline } from "react-icons/ti"
import AddNewCategoryModal from "./modals/AddNewCategoryModal"
import { useEffect, useState } from "react"
import { Stock } from "@/types"
import BoxHeader from "./helpers/BoxHeader"

interface InitInfosProps {
    onChange: (data: {
        title: string
        price: number,
        stock: number,
        unlimitedStock: boolean
        discount: { value: number; type: Stock }
        specialOffer: boolean
        category?: string
    }) => void
}

const InitInfos: React.FC<InitInfosProps> = ({ onChange }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [categories, setCategories] = useState([
        { id: "apple", title: "اپل" },
        { id: "iphone", title: "آیفون" }
    ])
    //
    const [formData, setFormData] = useState({
        title: "",
        price: 10000,
        unlimitedStock: false,
        discountValue: 0,
        discountType: "percent" as Stock,
        specialOffer: false,
        category: "",
        stock: 5
    })

    useEffect(() => {
        onChange({
            title: formData.title,
            price: formData.price,
            unlimitedStock: formData.unlimitedStock,
            discount: { value: formData.discountValue, type: formData.discountType },
            specialOffer: formData.specialOffer,
            category: formData.category || undefined,
            stock: formData.stock
        })
    }, [formData])

    return (
        <>
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="اطلاعات اولیه محصول"
                    color="bg-orange-700/10 text-orange-700"
                    icon={<LuTextCursorInput className="text-3xl" />}
                />
                <CardBody dir="rtl" className="flex flex-col gap-6">
                    <Input
                        isRequired
                        label="نام"
                        labelPlacement="outside"
                        placeholder="نام محصول را وارد کنید"
                        value={formData.title}
                        onValueChange={title => setFormData(prev => ({ ...prev, title }))}
                    />

                    <div className="flex flex-col items-start">
                        <NumberInput
                            label="قیمت"
                            labelPlacement="outside"
                            placeholder="10,000"
                            min={1}
                            isRequired
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">تومان</span>
                                </div>
                            }
                            value={+formData.price}
                            onValueChange={price => setFormData(prev => ({ ...prev, price }))}
                        />
                        {formData.price && formData.discountValue !== 0 && (
                            <p className="text-green-600 text-sm mt-2 mr-3">
                                قیمت با تخفیف:{' '}
                                {formData.discountType === "percent"
                                    ? (+formData.price * (1 - formData.discountValue / 100)).toLocaleString()
                                    : (+formData.price - formData.discountValue).toLocaleString()}{' '}
                                تومان
                            </p>
                        )}
                    </div>

                    <NumberInput
                        label="موجودی"
                        labelPlacement="outside"
                        placeholder="1"
                        minValue={1}
                        isRequired
                        isDisabled={formData.unlimitedStock}
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small truncate">عدد موجود</span>
                            </div>
                        }
                        value={+formData.stock}
                        onValueChange={stock => setFormData(prev => ({ ...prev, stock }))}
                    />
                    <Checkbox
                        isSelected={formData.unlimitedStock}
                        onValueChange={unlimitedStock => setFormData(prev => ({ ...prev, unlimitedStock }))}
                    >
                        <p className="text-sm">موجودی نامحدود</p>
                    </Checkbox>

                    <Select
                        isRequired
                        dir="rtl"
                        labelPlacement="outside"
                        label="دسته بندی"
                        placeholder="دسته بندی مورد نظر را جستجو یا اضافه کنید"
                        startContent={
                            <FiSearch className="text-lg pointer-events-none" />
                        }
                        onSelectionChange={value => {
                            if (value.anchorKey === "$.0") onOpen()
                            else setFormData(prev => ({ ...prev, category: String(value.anchorKey) }))
                            console.log(value.anchorKey)
                        }}
                    >
                        <SelectItem>
                            <div className="flex items-center gap-2">
                                <TiPlusOutline className="text-lg" />
                                <span>افزودن دسته بندی جدید</span>
                            </div>
                        </SelectItem>
                        {
                            categories.map(cat => (
                                <SelectItem key={cat.id}>{cat.title}</SelectItem>
                            ))
                        }
                    </Select>

                    <div className="flex flex-col gap-2">
                        <NumberInput
                            label="تخفیف"
                            labelPlacement="outside"
                            placeholder="10"
                            minValue={1}
                            endContent={
                                <select
                                    aria-label="Select discount type"
                                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                                    value={formData.discountType}
                                    onChange={e => setFormData(prev => ({ ...prev, discountType: e.target.value as Stock }))}
                                >
                                    <option value="percent">درصد</option>
                                    <option value="money">مبلغ ثابت (تومان)</option>
                                </select>
                            }
                            onValueChange={value => setFormData(prev => ({ ...prev, discountValue: value }))}
                            isDisabled={!formData.price}
                        />
                        {!formData.price && (
                            <p className="text-gray-500 text-[13px]">برای تعریف تخفیف ابتدا قیمت را وارد کنید.</p>
                        )}
                    </div>

                    <Checkbox
                        isSelected={formData.specialOffer}
                        onValueChange={specialOffer => setFormData(prev => ({ ...prev, specialOffer }))}
                    >
                        <span className="text-sm">افزودن محصول به لیست پیشنهاد ویژه</span>
                    </Checkbox>
                </CardBody>
            </Card >

            <AddNewCategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={() => { }}
            />
        </>
    )
}

export default InitInfos;
