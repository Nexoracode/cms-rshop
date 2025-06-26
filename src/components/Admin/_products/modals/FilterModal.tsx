"use client"

import { Button, DateRangePicker, ModalFooter, NumberInput, Select, SelectItem } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
}

export const animals = [
    { key: "cat", label: "جدید" },
    { key: "dog", label: "قدیمی" },
    { key: "elephant", label: "تازه" },
];

const FilterModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"    // uses Hero UI auto: bottom on mobile, center on larger screens
        >
            <ModalContent className="max-w-[700px] w-full">
                {onClose => (
                    <>
                        <ModalHeader><p className="font-normal text-[16px]">فیلتر</p></ModalHeader>
                        <ModalBody className="overflow-y-auto">
                            <Select
                                dir="rtl"
                                items={animals}
                                labelPlacement={"outside"}
                                label="وضعیت"
                                placeholder="انتخاب وضعیت محصول"
                            >
                                <SelectItem>نمایش - در فروشگاه نمایش داده میشود</SelectItem>
                                <SelectItem>عدم نمایش - در فروشگاه نمایش داده  نمی میشود</SelectItem>
                            </Select>
                            <NumberInput
                                minValue={1}
                                label="موجودی"
                                labelPlacement={"outside"}
                                placeholder="تعداد موجودی..."
                            />
                            <Select
                                dir="rtl"
                                items={animals}
                                labelPlacement={"outside"}
                                label="دسته بندی"
                                placeholder="انتخاب دسته بندی"
                            >
                                {(animal) => <SelectItem>{animal.label}</SelectItem>}
                            </Select>
                            <DateRangePicker label="تاریخ ثبت" labelPlacement="outside" />
                            <div className="flex flex-col gap-4">
                                <p className="-mb-2 text-black/80">وزن</p>
                                <div className="flex w-full flex-wrap justify-between md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        hideStepper
                                        label="از"
                                        placeholder="50"
                                        minValue={1}
                                        labelPlacement={"outside-left"}
                                        endContent={
                                            <div className="flex items-center">
                                                <label className="sr-only" htmlFor="currency">
                                                    Currency
                                                </label>
                                                <select
                                                    aria-label="Select currency"
                                                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                    defaultValue="USD"
                                                    id="currency"
                                                    name="currency"
                                                >
                                                    <option aria-label="US Dollar" value="USD">
                                                        کیلوگرم
                                                    </option>
                                                    <option aria-label="Argentine Peso" value="ARS">
                                                        گرم
                                                    </option>
                                                </select>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                    <NumberInput
                                        hideStepper
                                        label="تا"
                                        placeholder="10"
                                        minValue={2}
                                        labelPlacement={"outside-left"}
                                        endContent={
                                            <div className="flex items-center">
                                                <label className="sr-only" htmlFor="currency">
                                                    Currency
                                                </label>
                                                <select
                                                    aria-label="Select currency"
                                                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                                                    defaultValue="USD"
                                                    id="currency"
                                                    name="currency"
                                                >
                                                    <option aria-label="Argentine Peso" value="ARS">
                                                        گرم
                                                    </option>
                                                    <option aria-label="US Dollar" value="USD">
                                                        کیلوگرم
                                                    </option>
                                                </select>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="-mb-2 text-black/80">قیمت</p>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        label="از"
                                        labelPlacement={"outside-left"}
                                        placeholder="0.00"
                                        minValue={10000}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">تومان</span>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                    <NumberInput
                                        label="تا"
                                        labelPlacement={"outside-left"}
                                        placeholder="0.00"
                                        minValue={20000}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">تومان</span>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="-mb-2 text-black/80">تخفیف</p>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        label="از"
                                        placeholder="1"
                                        labelPlacement={"outside-left"}
                                        minValue={1}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">%</span>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                    <NumberInput
                                        label="تا"
                                        labelPlacement={"outside-left"}
                                        placeholder="3"
                                        minValue={3}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">%</span>
                                            </div>
                                        }
                                        className="justify-center"
                                    />
                                </div>
                            </div>
                            <NumberInput
                                label="زمان آماده سازی"
                                placeholder="3"
                                minValue={1}
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">روز</span>
                                    </div>
                                }
                                labelPlacement={"outside"}
                            />
                            <Select
                                dir="rtl"
                                items={animals}
                                labelPlacement={"outside"}
                                label="برند"
                                placeholder="انتخاب برند محصول"
                            >
                                <SelectItem>اپل</SelectItem>
                                <SelectItem>آیفون</SelectItem>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger">حذف فیلتر</Button>
                            <Button>اعمال</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default FilterModal