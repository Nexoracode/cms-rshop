"use client"

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader"
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import BackToPage from "@/components/Helper/BackToPage"
import { Button, Card, CardBody, CardFooter, Divider, NumberInput, Select, SelectItem, Switch, Textarea, useDisclosure } from "@heroui/react"
import { useEffect, useState } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { LuNotebookPen } from "react-icons/lu";
import AddSpecialProductsModal from "@/components/Admin/_store/__pre-order/AddSpecialProductsModal";
import { FiShoppingBag } from "react-icons/fi";
import ProductItem from "@/components/Admin/_home/helpers/ProductItem";
import SelectCustomer from "@/components/Admin/_store/__customers/modals/SelectCustomer";
import { TbUserExclamation } from "react-icons/tb";

const pay = [
    { key: "payed", label: "مبلغ سفارش قبلا پرداخت شده" },
    { key: "sendLink", label: "ارسال لینک پرداخت برای مشتری" },
];

const status = [
    { key: "prepration", label: "درحال آماده سازی" },
    { key: "sendding", label: "درحال ارسال" },
    { key: "geted", label: "تحویل گرفته" },
];

type Product = {
    id: number;
    price: number;
    img: string;
    productName: string;
    isExist: string;
    subProductName: string;
};

type Count = { _id: string, count: number }

const ManualOrder = () => {

    const [isSelected, setIsSelected] = useState(false);
    const [specialProducts, setSpecialProducts] = useState<Product[]>([]);
    const [customer, setCustomer] = useState<any>();
    //Discount
    const [productCount, setProductCount] = useState<Count[]>([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState<any>();
    const [discountType, setDiscountType] = useState<"money" | "percent">("percent")

    const {
        isOpen: isProductOpen,
        onOpen: onProductOpen,
        onOpenChange: onOpenProductChange,
    } = useDisclosure();
    const {
        isOpen: isCustomerOpen,
        onOpen: onCustomerOpen,
        onOpenChange: onOpenCustomerChange,
    } = useDisclosure();

    return (
        <>
            <BackToPage title="بازگشت" link="/admin/orders" />
            <Card className="shadow-md mt-6">
                <BoxHeader
                    title="ثبت سفارش"
                    color="text-blue-700 bg-blue-700/10"
                    icon={<TbShoppingCartPlus className="text-3xl" />}
                />
                <CardBody className="text-right flex flex-col gap-6">
                    <p className="text-gray-600">با تکمیل فرم زیر، سفارش‌های مورد نظر را مدیریت کنید و امکان پرداخت آسان و پیگیری سریع سفارش را برای مشتری خود فراهم کنید.</p>
                    <Card className="shadow-md p-2">
                        <HeaderAction
                            title={"مشتری"}
                            textBtn={customer ? "ویرایش مشتری" : "+ انتخاب مشتری"}
                            onPress={onCustomerOpen}
                        />
                        <CardBody>
                            <div className="w-full">
                                {
                                    !customer
                                        ?
                                        <div className="w-full flex items-center justify-center flex-col animate-pulse">
                                            <TbUserExclamation className="text-[70px] animate-blink w-full text-gray-600 mb-2" />
                                            <p>هنوز کاربری را انتخاب نکرده اید</p>
                                        </div>
                                        :
                                        <div className="!w-full bg-slate-100 rounded-xl py-3 px-4 flex items-center justify-between">
                                            <p>{customer.name}</p>
                                            <p className="text-gray-600">{customer.phone}</p>
                                        </div>
                                }
                            </div>
                        </CardBody>
                    </Card>
                    <Card className="shadow-md p-2">
                        <HeaderAction
                            title={"محصولات"}
                            textBtn={"+ انتخاب محصولات"}
                            onPress={onProductOpen}
                        />
                        <CardBody>
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
                                                    <div className={`flex flex-col gap-2 rounded-2xl p-2 bg-slate-200 ${!pr.isExist ? "pointer-events-none select-none opacity-60" : ""}`}>
                                                        <ProductItem
                                                            key={index}
                                                            img={pr.img}
                                                            price={pr.price}
                                                            productName={pr.productName}
                                                            isExist={pr.isExist}
                                                            subProductName={pr.subProductName}
                                                        />
                                                        <div>
                                                            <NumberInput
                                                                label="تعداد"
                                                                size="sm"
                                                                labelPlacement="inside"
                                                                placeholder="10"
                                                                minValue={1}
                                                                defaultValue={1}
                                                                endContent={"عدد"}
                                                                onValueChange={(val) => {
                                                                    if (!specialProducts.length) return;

                                                                    specialProducts.map(product => {
                                                                        if (product.isExist && product.id === pr.id) {
                                                                            setProductCount((prev: Count[]) => {

                                                                                const isExistProduct = prev.find(item => +item._id === pr.id);
                                                                                const products = prev.filter(item => +item._id !== pr.id);

                                                                                if (!isExistProduct) {
                                                                                    return [...prev, { _id: String(pr.id), count: val }];
                                                                                } else {
                                                                                    return [...products, { _id: String(pr.id), count: val }];
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
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
                                                value={discount}
                                                onValueChange={setDiscount}
                                                endContent={
                                                    <select
                                                        aria-label="Select discount type"
                                                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                        onChange={(e) => setDiscountType(e.target.value as any)}
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
                    <Card className="border-5 border-gray-300 border-dashed m-8 mx-12">
                        <BoxHeader
                            title="فاکتور"
                            color="text-green-700 bg-green-700/10"
                            icon={<LuNotebookPen className="text-3xl" />}
                        />
                        <CardBody className="text-right bg-gradient-to-r from-white via-green-100 to-white py-4">
                            <p>برای مشاهده فاکتور، محصولات مورد نظر و وضعیت پرداخت سفارش را مشخص کنید.</p>
                            {
                                specialProducts.length
                                    ?
                                    <div className="flex flex-col gap-2 mt-4 bg-gradient-to-r from-white via-blue-950 to-white py-4 rounded-2xl p-4">
                                        <div className="!w-full bg-white rounded-xl py-3 px-4 flex items-center justify-between shadow">
                                            <p>مبلغ کل محصولات</p>
                                            <p className="text-gray-600">{totalPrice.toLocaleString()} تومان</p>
                                        </div>
                                        {
                                            isSelected && discount && (discountType === "percent" && discount <= 100) || (discountType === "money" && discount <= totalPrice) ?
                                                <div className="!w-full bg-white rounded-xl py-3 px-4 flex items-center justify-between shadow">
                                                    <p>مجموع تخفیف</p>
                                                    <p>
                                                        {
                                                            discountType === "money"
                                                                ? totalPrice - discount ? `${(totalPrice - discount).toLocaleString()} تومان` : `${totalPrice.toLocaleString()} تومان`
                                                                : totalPrice - (totalPrice * discount / 100) ? `${(totalPrice - (totalPrice * discount / 100)).toLocaleString()} تومان` : `${totalPrice.toLocaleString()} تومان`
                                                        }
                                                    </p>
                                                </div>
                                                :
                                                ""
                                        }
                                        <div className="mt-4">
                                            <Divider />
                                        </div>
                                        <div className="!w-full text-lg bg-green-50 mt-4 rounded-xl text-black py-3 px-8 flex items-center justify-between">
                                            <p>مبلغ قابل پرداخت</p>
                                            <p className="text-gray-600">
                                                {
                                                    isSelected && discount && (discountType === "percent" && discount <= 100) || (discountType === "money" && discount <= totalPrice) ?
                                                        discountType === "money"
                                                            ? `${(totalPrice - discount).toLocaleString()} تومان`
                                                            : `${(totalPrice - (totalPrice * discount / 100)).toLocaleString()} تومان`
                                                        :
                                                        `${totalPrice.toLocaleString()} تومان`
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    : ""
                            }
                            <div className="py-6">
                                <Divider />
                            </div>
                            <Textarea
                                label="توضیحات مکمل"
                                labelPlacement="outside"
                                placeholder="توضیحات خود را وارد کنید"
                                variant="bordered"
                                color="primary"
                            />
                        </CardBody>
                    </Card>
                </CardBody>
                <CardFooter className="w-full">
                    <Button variant="flat" color="secondary" className="w-full">
                        ثبت
                    </Button>
                </CardFooter>
            </Card>

            <AddSpecialProductsModal
                isOpen={isProductOpen}
                onOpenChange={onOpenProductChange}
                onAdd={(newSelection) => {
                    setTotalPrice(0)
                    if (!specialProducts.length) {
                        
                        newSelection.map(product => {
                            if (product.isExist) {
                                setTotalPrice(prev => prev += +product.price)
                            }
                        })
                        
                        const products = newSelection.map(item => {
                            return { id: String(item.id), count: 1 }
                        })
                        console.log(products);
                        setProductCount(products as any)
                    }
                    setSpecialProducts(newSelection)
                }}
                initialSelectedProducts={specialProducts}
            />

            <SelectCustomer
                isOpen={isCustomerOpen}
                onOpenChange={onOpenCustomerChange}
                onAdd={(newSelection) => setCustomer(newSelection)}
                initialSelectedProducts={customer}
            />

        </>
    )
}

export default ManualOrder