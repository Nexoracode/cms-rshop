"use client"

import { Accordion, AccordionItem, Button, Card, CardBody, CardHeader, Divider, ModalFooter } from "@heroui/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useState } from "react";
import { TbSettings } from "react-icons/tb";
import AttributeVarient from "../temps/AttributeVarient";
import Link from "next/link";
//
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import BoxHeader from "../helpers/BoxHeader";
import { MdOutlineCategory } from "react-icons/md";

type Props = {
    isOpen: boolean,
    onOpenChange: () => void,
    onSubmit: (title: string, image: File | null) => void;
}

export const animals = [
    { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
    { label: "Dog", key: "dog", description: "The most popular pet in the world" },
    { label: "Elephant", key: "elephant", description: "The largest land animal" },
    { label: "Lion", key: "lion", description: "The king of the jungle" },
    { label: "Tiger", key: "tiger", description: "The largest cat species" },
    { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
    {
        label: "Dolphin",
        key: "dolphin",
        description: "A widely distributed and diverse group of aquatic mammals",
    },
    { label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds" },
    { label: "Zebra", key: "zebra", description: "A several species of African equids" },
    {
        label: "Shark",
        key: "shark",
        description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
        label: "Whale",
        key: "whale",
        description: "Diverse group of fully aquatic placental marine mammals",
    },
    { label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
    { label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile" },
];


const AddNewAttributeModal: React.FC<Props> = ({ isOpen, onOpenChange, onSubmit }) => {

    const [title, setTitle] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);

    const isDisabled = !title.trim() || !imageFile;

    const handleSubmit = () => {
        if (!isDisabled) {
            onSubmit(title.trim(), imageFile);
            setTitle("");
            setImageFile(null);
            onOpenChange();
        }
    };

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
                                <Button variant="flat" color="secondary" onClick={() => { }}>
                                    تنظیمات ویژگی ها
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
                                    >
                                        {(item) => <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>}
                                    </Autocomplete>
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