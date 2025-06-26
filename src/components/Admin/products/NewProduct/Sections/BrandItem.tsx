"use client"

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import AddNewBrandModal from "../Modals/AddNewBrandModal";
import HeaderAction from "../Helpers/HeaderAction";
import CardBox from "../Helpers/CardBox";

type Brand = {
    brandNameFa: string;
    brandNameEn: string;
    imageFile: File | null;
};

const BrandItem = () => {
    const [brand, setBrand] = useState<Brand | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSave = (brandNameFa: string, brandNameEn: string, imageFile: File | null) => {
        setBrand({ brandNameFa, brandNameEn, imageFile });
        setIsEditing(false);
    };

    const handleDelete = () => {
        setBrand(null);
    };

    const handleEdit = () => {
        setIsEditing(true);
        onOpen();
    };

    return (
        <>
            <div dir="rtl" className="flex flex-col gap-4 text-start">
                <HeaderAction
                    title="برند"
                    textBtn="+ افزودن برند"
                    isDisabled={!!brand}
                    onPress={() => {
                        setIsEditing(false);
                        onOpen();
                    }}
                />
                {
                    brand ?
                        <CardBox
                            title={brand.brandNameFa}
                            description={brand.brandNameEn}
                            imageFile={brand.imageFile}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                        : ""
                }
            </div>

            <AddNewBrandModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSave}
                defaultValues={isEditing && brand ? {
                    brandNameFa: brand.brandNameFa,
                    brandNameEn: brand.brandNameFa,
                    imageFile: brand.imageFile
                } : undefined}
            />
        </>
    );
};

export default BrandItem;
