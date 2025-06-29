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
    subs: string[]
};

type Props = {
    onNewSubAttribute: (data: SubAttributeData) => void;
    attribute: AttributeData;
};

const AddNewSubAttribute: React.FC<Props> = ({ onNewSubAttribute, attribute }) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [keyAttribute, setKeyAttribute] = useState<string | null>(null);
    const [subAttributesList, setSubAttributesList] = useState<string | null>(null);
    const isDisabledAcc = !keyAttribute && !inputValue;

    const subAttributes = [
        { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", key: "dog", description: "The most popular pet in the world" },
    ];

    const handleAddNewAttribute = () => {
        console.log(inputValue, keyAttribute);
        setSubAttributesList(prev => {
            if (prev) {
                return ([...prev, inputValue])
            }
        })
        setInputValue("");
        setKeyAttribute(null);
    };


    return (
        <Accordion
            variant="splitted"
        >
            <AccordionItem
                key="1"
                className="shadow-md"
                aria-label="Accordion 1"
                title={
                    <div className="flex items-center justify-between w-full">
                        <p className="text-gray-600">{attribute.name}</p>
                        <div className="border-l-1 pl-3 border-gray-400">
                            <RiDeleteBin5Line className="text-xl text-red-500" />
                        </div>
                    </div>
                }
                startContent={
                    attribute.isVariable ? <MdOutlineCategory className="text-xl text-gray-500" /> : ""
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
                            defaultItems={subAttributes}
                            placeholder="نام جدید را وارد کنید یا جستجو کنید"
                            variant="flat"
                            selectedKey={keyAttribute}
                            onSelectionChange={(key) => setKeyAttribute(key as string)}
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

                        <Divider className="mt-6" />

                        <div className="mt-4">
                            <p className="text-start pb-4">زیر مجموعه ها</p>
                            <ul className="flex flex-col gap-4">
                                <li className="flex items-center justify-between">
                                    <span>■ 1</span>
                                    <Button size="sm" variant="light" color="danger">
                                        <RiDeleteBin5Line className="text-xl" />
                                    </Button>
                                </li>
                            </ul>
                        </div>

                    </CardBody>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};

export default AddNewSubAttribute;
