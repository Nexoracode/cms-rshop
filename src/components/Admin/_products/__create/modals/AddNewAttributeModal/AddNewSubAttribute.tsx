"use client"

import {
    Accordion,
    AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider
} from "@heroui/react";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCategory } from "react-icons/md";

type AttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
};

type SubAttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
    subs: string[];
};

type Props = {
    onNewSubAttribute: (data: SubAttributeData) => void;
    attribute: AttributeData;
};

const AddNewSubAttribute: React.FC<Props> = ({ onNewSubAttribute, attribute }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [subAttrs, setSubAttrs] = useState<string[]>([]);

    // پایه داده‌های پیشنهادی اولیه
    const baseSubAttributes = [
        { label: "Cat", key: "cat" },
        { label: "Dog", key: "dog" },
    ];

    // فیلتر آیتم‌های پیشنهادی براساس مقادیری که اضافه شده
    const filteredSubAttributes = baseSubAttributes.filter(
        (item) => !subAttrs.includes(item.label)
    );

    const isDisabledAcc = inputValue.trim() === "";

    const handleAddNewAttribute = () => {
        const newValue = inputValue;
        setSubAttrs((prev) => [...prev, newValue]);
        setInputValue("");

        onNewSubAttribute({
            ...attribute,
            subs: [...subAttrs, newValue]
        });
    };

    const handleRemove = (value: string) => {
        setSubAttrs((prev) => prev.filter((item) => item !== value));
    };

    return (
        <Accordion variant="splitted">
            <AccordionItem
                key="1"
                className="shadow-md"
                aria-label="Accordion 1"
                title={
                    <div className="flex items-center justify-between w-full">
                        <p className="text-gray-600">{attribute.name}</p>
                        <RiDeleteBin5Line className="text-xl text-red-500" />
                    </div>
                }
                startContent={
                    attribute.isVariable ? <MdOutlineCategory className="text-xl text-gray-500" /> : null
                }
            >
                <Divider className="mb-4" />
                <Card className="bg-gray-100 p-2 shadow-none">
                    <CardHeader className="flex flex-col items-start gap-2">
                        <p className="text-[16px]">افزودن مقدار ویژگی</p>
                        <p className="text-gray-500">نام مورد نظر را وارد کرده یا در لیست جستجو کنید.</p>
                    </CardHeader>
                    <CardBody>
                        <Autocomplete
                            allowsCustomValue
                            labelPlacement="outside"
                            defaultItems={filteredSubAttributes}
                            placeholder="نام جدید را وارد کنید یا جستجو کنید"
                            variant="flat"
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            color="secondary"
                        >
                            {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                        </Autocomplete>

                        <div className="w-full text-end">
                            <Button
                                size="sm"
                                variant="flat"
                                color="secondary"
                                className="mt-4"
                                isDisabled={isDisabledAcc}
                                onClick={handleAddNewAttribute}
                            >
                                + افزودن
                            </Button>
                        </div>
                        {
                            subAttrs.length
                                ?
                                <>
                                    <Divider className="mt-6" />
                                    <div className="mt-4">
                                        <p className="text-start pb-4">زیر مجموعه‌ها</p>
                                        <ul className="flex flex-col gap-4">
                                            {subAttrs.map((sub, i) => (
                                                <li key={i} className="flex items-center justify-between bg-gray-200 rounded-lg p-2">
                                                    <span>{sub}</span>
                                                    <Button size="sm" variant="flat" color="danger" onClick={() => handleRemove(sub)}>
                                                        <RiDeleteBin5Line className="text-xl" />
                                                    </Button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                                : ""
                        }
                    </CardBody>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};

export default AddNewSubAttribute;
