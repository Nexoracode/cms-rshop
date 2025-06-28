"use client"

import {
    Accordion,
    AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody
} from "@heroui/react";
import { useState } from "react";

// Icons
import { AiOutlineFontColors, AiOutlineNumber } from "react-icons/ai";
import { BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle, FiImage } from "react-icons/fi";
import { MdDateRange, MdOutlineCategory } from "react-icons/md";
import BoxHeader from "../../helpers/BoxHeader";

type AttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
};

type Props = {
    onNewAttribute: (data: AttributeData) => void;
    attributeList: AttributeData[];
};

const AddNewSubAttribute: React.FC<Props> = ({ onNewAttribute, attributeList }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [keyAttribute, setKeyAttribute] = useState<string | null>(null);
    const [accordionKeys, setAccordionKeys] = useState<any>([]); // ← پیش‌فرض بسته
    const [selectedTypeAttribute, setSelectedTypeAttribute] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const isDisabledAcc = (!keyAttribute && !inputValue) || !selectedTypeAttribute;

    const attributes = [
        { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", key: "dog", description: "The most popular pet in the world" },
    ];

    const handleAddNewAttribute = () => {
        const data: AttributeData = {
            name: inputValue || attributes.find((a) => a.key === keyAttribute!)?.label || "",
            type: selectedTypeAttribute!,
            isVariable: isChecked,
            isNew: !attributes.some((a) => a.key === keyAttribute),
        };

        onNewAttribute(data);

        setInputValue("");
        setKeyAttribute(null);
        setSelectedTypeAttribute(null);
        setIsChecked(false);
        setAccordionKeys([]);
    };


    return (
        <Card className="bg-green-100/20 mx-2">
            <BoxHeader
                title="ویژگی های اضافه شده"
                color="bg-green-700/10 text-green-700"
                icon={<MdOutlineCategory className="text-3xl" />}
            />
            <CardBody>
                <Accordion
                    variant="splitted"
                    selectedKeys={accordionKeys}
                    onSelectionChange={(keys) => {
                        if (keys === "all") return;
                        const keyArray = Array.isArray(keys) ? keys : Array.from(keys as Set<string>);
                        setAccordionKeys(keyArray);
                    }}
                >
                    <AccordionItem
                        key="1"
                        className="shadow-md"
                        aria-label="Accordion 1"
                        subtitle={
                            <p className="mt-1 text-gray-500">
                                نام مورد نظر را وارد کرده یا در لیست جستجو کنید.
                            </p>
                        }
                        title="افزودن مقدار ویژگی"
                    >
                        <Autocomplete
                            allowsCustomValue
                            labelPlacement="outside"
                            defaultItems={attributes}
                            label="نام"
                            placeholder="نام جدید را وارد کنید یا جستجو کنید"
                            variant="flat"
                            selectedKey={keyAttribute}
                            onSelectionChange={(key) => setKeyAttribute(key as string)}
                            onInputChange={setInputValue}
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
                                + افزودن ویژگی
                            </Button>
                        </div>
                    </AccordionItem>
                </Accordion>
            </CardBody>
        </Card>
    );
};

export default AddNewSubAttribute;
