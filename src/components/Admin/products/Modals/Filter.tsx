"use client"

import { Checkbox, NumberInput, Select, SelectItem } from "@heroui/react";
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

const Filter: React.FC<Props> = ({ isOpen, onOpenChange }) => {
    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"    // uses Hero UI auto: bottom on mobile, center on larger screens
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader><p className="font-normal text-[16px]">فیلتر</p></ModalHeader>
                        <ModalBody>
                            <Select
                                dir="rtl"
                                items={animals}
                                labelPlacement={"outside"}
                                label="وضعیت"
                                placeholder="انتخاب وضعیت محصول"
                            >
                                {(animal) => <SelectItem>{animal.label}</SelectItem>}
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
                            <div className="flex flex-col gap-4">
                                <p className="-mb-2 text-black/80">قیمت</p>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        label="از"
                                        placeholder="0.00"
                                        labelPlacement={"outside-left"}
                                        startContentContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">تومان</span>
                                            </div>
                                        }
                                    />
                                    <NumberInput
                                        label="تا"
                                        labelPlacement={"outside-left"}
                                        placeholder="0.00"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">تومان</span>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="-mb-2 text-black/80">تخفیف</p>
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        label="از"
                                        placeholder="0.00"
                                        labelPlacement={"outside-left"}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">%</span>
                                            </div>
                                        }
                                    />
                                    <NumberInput
                                        label="تا"
                                        labelPlacement={"outside-left"}
                                        placeholder="0.00"
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">%</span>
                                            </div>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                    <NumberInput
                                        hideStepper
                                        label="حداقل از وزن"
                                        placeholder="0.5"
                                        labelPlacement={"outside"}
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
                                    />
                                    <NumberInput
                                        hideStepper
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

                                        labelPlacement={"outside"}
                                        label="حداکثر تا وزن"
                                        placeholder="10"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 pt-4">
                                <Checkbox defaultSelected>انتخاب محصولات بدون وزن</Checkbox>
                                <Checkbox defaultSelected>انتخاب محصولات متصل به دیوار</Checkbox>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default Filter