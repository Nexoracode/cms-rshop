"use client"

import {
    Accordion,
    AccordionItem,
    Autocomplete,
    AutocompleteItem,
    Button,
    Card,
    CardBody,
    Divider
} from "@heroui/react";
import { useState } from "react";

import { MdOutlineCategory } from "react-icons/md";

type AttributeData = {
    name: string;
    type: string;
    isVariable: boolean;
    isNew: boolean;
};

type Props = {
    onNewAttribute: (data: AttributeData) => void;
    attribute: AttributeData;
};

const AddNewSubAttribute: React.FC<Props> = ({ onNewAttribute, attribute }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [keyAttribute, setKeyAttribute] = useState<string | null>(null);
    const [accordionKeys, setAccordionKeys] = useState<any>([]); // ← پیش‌فرض بسته
    const [selectedTypeAttribute, setSelectedTypeAttribute] = useState<string | null>(null);

    const isDisabledAcc = !keyAttribute && !inputValue;

    const attributes = [
        { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
        { label: "Dog", key: "dog", description: "The most popular pet in the world" },
    ];

    const handleAddNewAttribute = () => {
       /*  const data = {
            name: inputValue || attributes.find((a) => a.key === keyAttribute!)?.label || "",
            type: selectedTypeAttribute!
            isNew: !attributes.some((a) => a.key === keyAttribute),
        };

        onNewAttribute(data) */;

        setInputValue("");
        setKeyAttribute(null);
        setSelectedTypeAttribute(null);
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
                title={attribute.name}
                startContent={
                    attribute.isVariable ? <MdOutlineCategory className="text-xl text-gray-500" /> : ""
                }
            >
                <Card>
                    <CardBody>
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
                                + افزودن
                            </Button>
                        </div>
                    </CardBody>
                </Card>
                <Divider className="mt-6" />
                <div className="mt-4">
                    <p className="text-start pb-4">زیر مجموعه ها</p>
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </div>
            </AccordionItem>
        </Accordion>
    );
};

export default AddNewSubAttribute;
