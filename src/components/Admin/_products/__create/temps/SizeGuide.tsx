"use client"

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import AddNewSizeGuideModal from "../modals/AddNewSizeGuideModal";
import CardBox from "../helpers/CardBox";
import HeaderAction from "../helpers/HeaderAction";

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
                <HeaderAction
                    title="راهنمای سایز"
                    textBtn="+ افزودن راهنما"
                    isDisabled={!!sizeGuide}
                    onPress={() => {
                        setIsEditing(false);
                        onOpen();
                    }}
                />
                {
                    sizeGuide ?
                        <CardBox
                            title={sizeGuide.title}
                            description={sizeGuide.description}
                            imageFile={sizeGuide.imageFile}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                        : ""
                }
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
