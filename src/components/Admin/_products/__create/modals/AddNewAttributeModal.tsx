"use client"

import { Accordion, AccordionItem, Button, ModalFooter, Select, SelectItem } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useState } from "react";
import { TbSettings } from "react-icons/tb";
import AttributeVarient from "../temps/AttributeVarient";
//
import { Autocomplete, AutocompleteItem } from "@heroui/react";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (title: string, image: File | null) => void;
}

export const animals = [
    { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", key: "dog", description: "The most popular pet in the world" },
];

const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    //
    const [selectedKey, setSelectedKey] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    //
    const isDisabled = !title.trim() || !imageFile;

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(title.trim(), imageFile);
            setTitle("");
            setImageFile(null);
            onOpenChange();
        }
    };

    const productInputTypes = [
        { key: "text", label: "متن (text)" },
        { key: "number", label: "عدد (number)" },
        { key: "color", label: "رنگ (color)" },
        { key: "date", label: "تاریخ (date)" },
        { key: "checkbox", label: "چک‌باکس (checkbox)" },
        { key: "radio", label: "دکمه انتخابی (radio)" },
        { key: "file", label: "فایل / تصویر (file)" },
    ];


    const handleAddAttr = () => {

    }

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
                        <ModalHeader className="w-full px-8 flex items-center justify-between">
                            <p className="font-normal text-[16px]">ویژگی های محصول</p>
                            <Button variant="flat" className="text-xl" size="sm" onClick={() => { }}>
                                <TbSettings />
                            </Button>
                        </ModalHeader>

                        <ModalBody>
                            <Accordion variant="splitted">
                                <AccordionItem
                                    key="1"
                                    className="shadow-md"
                                    aria-label="Accordion 1"
                                    subtitle={<p className="mt-1 text-gray-500"> می‌توانید ویژگی‌های محصول مانند رنگ را تعریف و برای هر ویژگی مقدار معرفی کنید، مانند خاکستری.</p>}
                                    title="ویژگی جدید"
                                >
                                    <Autocomplete
                                        allowsCustomValue
                                        labelPlacement="outside"
                                        defaultItems={animals}
                                        label="نام ویژگی"
                                        placeholder="نام جدید را وارد کنید یا جستجو کنید"
                                        variant="flat"
                                        selectedKey={selectedKey}
                                        onSelectionChange={(key) => setSelectedKey(key as string)}
                                        onInputChange={setInputValue}
                                    >
                                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>

                                    <div className="mt-4 flex w-full flex-wrap md:flex-nowrap gap-4">
                                        <Select
                                            size="md"
                                            labelPlacement="outside"
                                            label="نوع ویژگی"
                                            placeholder="انتخاب نوع ویژگس"
                                        >
                                            {productInputTypes.map((form) => (
                                                <SelectItem key={form.key}>{form.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="w-full text-end">
                                        <Button size="sm" variant="flat" color="secondary" className="mt-4">
                                            + افزودن ویژگی
                                        </Button>
                                    </div>
                                </AccordionItem>
                            </Accordion>
                            <AttributeVarient />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                isDisabled={isDisabled}
                                className="w-full"
                                variant="solid"
                                color="secondary"
                                onClick={handleSubmit}
                            >ثبت تغیرات</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
export default AddNewAttributeModal