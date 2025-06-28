"use client"

import {
    Accordion,
    AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Button,
    Select,
    SelectItem,
    Switch,
} from "@heroui/react";
import { useState } from "react";

// Icons
import { AiOutlineFontColors, AiOutlineNumber } from "react-icons/ai";
import { BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle, FiImage } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";

type AttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
};

type Props = {
    onNewAttribute: (data: AttributeData) => void;
};

const AddNewAttribute: React.FC<Props> = ({ onNewAttribute }) => {
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

    const productInputTypes = [
        { key: "text", label: "متن", icon: <AiOutlineFontColors className="w-4 h-4" /> },
        { key: "number", label: "عدد", icon: <AiOutlineNumber className="w-4 h-4" /> },
        { key: "color", label: "رنگ", icon: <BsPalette className="w-4 h-4" /> },
        { key: "date", label: "تاریخ", icon: <MdDateRange className="w-4 h-4" /> },
        { key: "checkbox", label: "چک‌باکس", icon: <FiCheckSquare className="w-4 h-4" /> },
        { key: "radio", label: "دکمه انتخابی", icon: <FiCircle className="w-4 h-4" /> },
        { key: "file", label: "فایل / تصویر", icon: <FiImage className="w-4 h-4" /> },
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
                        می‌توانید ویژگی‌های محصول مانند رنگ را تعریف و برای هر ویژگی مقدار معرفی کنید، مانند خاکستری.
                    </p>
                }
                title="ویژگی جدید"
            >
                <Autocomplete
                    allowsCustomValue
                    labelPlacement="outside"
                    defaultItems={attributes}
                    label="نام ویژگی"
                    placeholder="نام جدید را وارد کنید یا جستجو کنید"
                    variant="flat"
                    selectedKey={keyAttribute}
                    onSelectionChange={(key) => setKeyAttribute(key as string)}
                    onInputChange={setInputValue}
                >
                    {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                </Autocomplete>

                <div className="mt-10 mb-5">
                    <Select
                        label="نوع ویژگی"
                        placeholder="انتخاب کنید"
                        labelPlacement="outside"
                        selectedKeys={selectedTypeAttribute ? new Set([selectedTypeAttribute]) : new Set()}
                        onSelectionChange={(keys) => {
                            if (keys === "all") return;
                            const keyArray = Array.from(keys as Set<string>);
                            setSelectedTypeAttribute(keyArray[0] ?? null);
                        }}
                    >
                        {productInputTypes.map((item) => (
                            <SelectItem key={item.key} startContent={item.icon}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>

                <Switch
                    color="secondary"
                    size="sm"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                >
                    {isChecked ? "این ویژگی یک متغیر است" : "این ویژگی متغیر نیست"}
                </Switch>

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
    );
};

export default AddNewAttribute;
