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
                                <div className="flex items-center gap-3 text-start">
                                    {sizeGuide.imageFile && (
                                        <img
                                            src={URL.createObjectURL(sizeGuide.imageFile)}
                                            alt="preview"
                                            className="rounded-lg w-32 object-contain border"
                                        />
                                    )}
                                    <div>
                                        <p>{sizeGuide.title}</p>
                                        <p className="text-gray-600 mt-2">{sizeGuide.description}</p>
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
