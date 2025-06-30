"use client"

import { useEffect, useState } from "react";
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
// Icons
import { AiOutlineFontColors, AiOutlineNumber } from "react-icons/ai";
import { BsPalette } from "react-icons/bs";
import { FiCheckSquare, FiCircle, FiImage } from "react-icons/fi";
import { MdDateRange } from "react-icons/md";
//
import { Attribute, AttributeData } from "./Types";

type Props = {
    onNewAttribute: (data: AttributeData) => void;
    selectedAttributes: Attribute[]
};

const AddNewAttribute: React.FC<Props> = ({ onNewAttribute, selectedAttributes }) => {

    const [inputValue, setInputValue] = useState<string>("");
    const [accordionKeys, setAccordionKeys] = useState<any>([]);
    const [selectedAttr, setSelectedAttr] = useState<string | null>(null);
    const [selectedTypeAttr, setSelectedTypeAttr] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    //
    const [test, setTest] = useState(false)
    const [attributes, setAttributes] = useState<Attribute[]>([])
    const [attributesListSuggestion, setAttributesListSuggestion] = useState<Attribute[]>([]);
    const [isAddedNewAttribute, setIsAddedNewAttribute] = useState({
        status: false,
        isApiCall: false
    })
    // static
    const productInputTypes = [
        { key: "text", label: "متن", icon: <AiOutlineFontColors className="w-4 h-4" /> },
        { key: "number", label: "عدد", icon: <AiOutlineNumber className="w-4 h-4" /> },
        { key: "color", label: "رنگ", icon: <BsPalette className="w-4 h-4" /> },
        { key: "date", label: "تاریخ", icon: <MdDateRange className="w-4 h-4" /> },
        { key: "checkbox", label: "چک‌باکس", icon: <FiCheckSquare className="w-4 h-4" /> },
        { key: "radio", label: "دکمه انتخابی", icon: <FiCircle className="w-4 h-4" /> },
        { key: "file", label: "فایل / تصویر", icon: <FiImage className="w-4 h-4" /> },
    ];

    const isDisabledAcc = (!selectedAttr && !inputValue) || !selectedTypeAttr || !isAddedNewAttribute.isApiCall || !isAddedNewAttribute.status || test;

    useEffect(() => {
        getAllAttributes()
    }, [])

    useEffect(() => {
        //filter attributes for suggestions list
        const selectedIds = selectedAttributes.map(item => item.id);
        setAttributesListSuggestion(attributes.filter(attr => !selectedIds.includes(attr.id)));
    }, [selectedAttributes]);

    useEffect(() => {
        if (attributes?.length) {
            const result = attributes.find(item => item.label === inputValue) === undefined
            setIsAddedNewAttribute((prev: any) => {
                if (result) return { ...prev, status: false, isApiCall: false }
                return { ...prev, status: true, isApiCall: true }
            })
        }

        //
        let attrFind = attributes.find(attr => attr.label === inputValue)
        console.log("BBBBBBBB", attrFind);

        if (attrFind) {
            setSelectedAttr(attrFind.id)
            let t = attributesListSuggestion.filter(attr => attr.label === attrFind?.label);
            console.log(t);
            setTest(t.length ? false : true)
        } else {
            setTest(false)
        }
    }, [inputValue])

    const getAllAttributes = async () => {
        setAttributes([
            { id: crypto.randomUUID(), label: "Cat", },
            { id: crypto.randomUUID(), label: "Dog", },
        ])
        setAttributesListSuggestion([
            { id: crypto.randomUUID(), label: "Cat", },
            { id: crypto.randomUUID(), label: "Dog", },
        ])
    }

    const handleAddNewAttribute = () => {
        if (attributes && !attributes.length) return

        let newAttr = attributes.find(attr => attr.id === selectedAttr)!

        setAttributes(prev => {
            let past = prev.filter(attr => attr.id !== newAttr.id)
            return [...past, newAttr]
        })

        onNewAttribute({
            id: crypto.randomUUID(),
            attr: newAttr,
            type: selectedTypeAttr!,
            isVariable: isChecked,
        });

        setInputValue("");
        setSelectedAttr(null);
        setSelectedTypeAttr(null);
        setIsChecked(false);
        setAccordionKeys([]);
    };

    const handleAddAttr = () => {
        if (attributes?.length) {
            let generateID = crypto.randomUUID()
            setAttributes((prev: any) => {
                setSelectedAttr(generateID)
                return ([...prev, { id: generateID, label: inputValue }])
            })
            setSelectedAttr(generateID)
            setIsAddedNewAttribute({ status: true, isApiCall: true })
        }
    }

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
                    defaultItems={attributesListSuggestion}
                    label="نام ویژگی"
                    placeholder="نام جدید را وارد کنید یا جستجو کنید"
                    variant="flat"
                    onSelectionChange={(key: any) => setSelectedAttr(key)}
                    onInputChange={setInputValue}
                    endContent={
                        !isAddedNewAttribute.status && inputValue.length ?
                            <Button size="sm" onPress={handleAddAttr} color="secondary" variant="flat">
                                افزودن
                            </Button>
                            : ""
                    }
                >
                    {(item) => <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>}
                </Autocomplete>

                <div className="mt-10 mb-5">
                    <Select
                        label="نوع ویژگی"
                        placeholder="انتخاب کنید"
                        labelPlacement="outside"
                        selectedKeys={selectedTypeAttr ? new Set([selectedTypeAttr]) : new Set()}
                        onSelectionChange={(keys) => {
                            if (keys === "all") return;
                            const keyArray = Array.from(keys as Set<string>);
                            setSelectedTypeAttr(keyArray[0] ?? null);
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