"use client"

import { useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import AddNewBrandModal from "./Modal/AddNewBrandModal";

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
                <div className="w-full flex items-center justify-between">
                    <span>برند</span>
                    <Button
                        color="secondary"
                        variant="light"
                        onPress={() => {
                            setIsEditing(false);
                            onOpen();
                        }}
                        isDisabled={!!brand}
                    >
                        + افزودن برند
                    </Button>
                </div>

                {brand ? (
                    <Card className="shadow-md border">
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3 text-start">
                                    {brand.imageFile && (
                                        <img
                                            src={URL.createObjectURL(brand.imageFile)}
                                            alt="preview"
                                            className="rounded-lg w-32 object-contain border"
                                        />
                                    )}
                                    <div>
                                        <p>{brand.brandNameFa}</p>
                                        <p className="text-gray-600 mt-2">{brand.brandNameEn}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button size="sm" className="text-xl bg-danger-100 text-danger-600" onPress={handleDelete}>
                                        <TiDeleteOutline />
                                    </Button>
                                    <Button size="sm" className="text-xl bg-green-100 text-green-600" onPress={handleEdit}>
                                        <TbEdit />
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ) : ""}
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
