"use client"

import BackToPage from "@/components/Helper/BackToPage"
import { Button, Input, NumberInput } from "@heroui/react"

const DiscountCode = () => {

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="تخفیف خرید اول" link="/admin/store/promotions" />

            <div className="bg-white rounded-2xl p-4 py-6 flex flex-col items-center gap-4">
                <div className="w-full flex flex-col gap-6 text-start">
                    <Input
                        isRequired
                        label="نام کد تخفیف"
                        labelPlacement="outside"
                        name="title"
                        placeholder="مثال: First_Pr20"
                    />
                    <NumberInput
                        isRequired
                        label="تخفیف"
                        labelPlacement={"outside"}
                        placeholder="10"
                        minValue={1}
                        endContent={
                            <div className="flex items-center">
                                <label className="sr-only" htmlFor="stock">
                                    stock
                                </label>
                                <select
                                    aria-label="Select stock"
                                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                                    defaultValue="percent"
                                    id="stock"
                                    name="stock"
                                    onChange={(e: any) => { }}
                                >
                                    <option aria-label="percent" value="percent">
                                        درصد
                                    </option>
                                    <option aria-label="money" value="money">
                                        مبلغ ثابت (تومان)
                                    </option>
                                </select>
                            </div>
                        }
                        onValueChange={(value: any) => { }}
                    />
                    <NumberInput
                        label="تعیین حداقل مبلغ خرید"
                        labelPlacement={"outside"}
                        placeholder="100,000"
                        minValue={1}
                        endContent={<p>تومان</p>}
                        onValueChange={(value: any) => { }}
                    />
                </div>

                <div className="w-full text-end">
                    <Button color="secondary" variant="flat">ایجاد کد تخفیف</Button>
                </div>
            </div>
        </div>
    )
}

export default DiscountCode