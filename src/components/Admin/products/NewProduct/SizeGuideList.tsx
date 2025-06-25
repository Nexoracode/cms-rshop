"use client"

import { useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import AddNewSizeGuideModal from "./Modal/AddNewSizeGuideModal";

type SizeGuide = {
    title: string;
    description: string;
    imageFile: File | null;
};

const SizeGuide = () => {
    const [sizeGuide, setSizeGuide] = useState<SizeGuide | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleSave = (title: string, description: string, imageFile: File | null) => {
        setSizeGuide({ title, description, imageFile });
        setIsEditing(false);
    };

    const handleDelete = () => {
        setSizeGuide(null);
    };

    const handleEdit = () => {
        setIsEditing(true);
        onOpen();
    };

    return (
        <>
            <div dir="rtl" className="flex flex-col gap-4 text-start">
                <div className="w-full flex items-center justify-between">
                    <span>راهنمای سایز</span>
                    <Button
                        color="secondary"
                        variant="light"
                        onPress={() => {
                            setIsEditing(false);
                            onOpen();
                        }}
                        isDisabled={!!sizeGuide}
                    >
                        + افزودن راهنما
                    </Button>
                </div>

                {sizeGuide ? (
                    <Card className="shadow-md border">
                        <CardBody className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold">{sizeGuide.title}</p>
                                    <p className="text-gray-600">{sizeGuide.description}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" className="text-xl bg-green-100 text-green-600" onPress={handleEdit}>
                                        <TbEdit />
                                    </Button>
                                    <Button size="sm" className="text-xl bg-danger-100 text-danger-600" onPress={handleDelete}>
                                        <TiDeleteOutline />
                                    </Button>
                                </div>
                            </div>
                            {sizeGuide.imageFile && (
                                <img
                                    src={URL.createObjectURL(sizeGuide.imageFile)}
                                    alt="پیش‌نمایش تصویر"
                                    className="mt-2 rounded-md max-h-48 object-contain border"
                                />
                            )}
                        </CardBody>
                    </Card>
                ) : (
                    <p className="text-gray-500">هنوز راهنمای سایزی تعریف نشده است.</p>
                )}
            </div>

            <AddNewSizeGuideModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleSave}
                defaultValues={isEditing && sizeGuide ? {
                    title: sizeGuide.title,
                    description: sizeGuide.description,
                    imageFile: sizeGuide.imageFile
                } : undefined}
            />
        </>
    );
};

export default SizeGuide;
