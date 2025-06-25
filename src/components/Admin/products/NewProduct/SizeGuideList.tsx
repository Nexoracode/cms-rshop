"use client"

import { useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import AddNewSizeGuideModal from "./Modal/AddNewSizeGuideModal";

type Property = {
    title: string;
    description: string;
};

const SizeGuideList = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleAddOrUpdate = (title: string, description: string) => {
        if (editIndex !== null) {
            setProperties(prev => {
                const updated = [...prev];
                updated[editIndex] = { title, description };
                return updated;
            });
            setEditIndex(null);
        } else {
            setProperties(prev => [...prev, { title, description }]);
        }
    };

    const handleDelete = (index: number) => {
        setProperties(prev => prev.filter((_, i) => i !== index));
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        onOpen();
    };

    return (
        <>
            <div dir="rtl" className="flex flex-col gap-4 text-start">
                <div>
                    <div className="w-full flex items-center justify-between">
                        <span>راهنما سایز</span>
                        <Button
                            color="secondary"
                            variant="light"
                            onPress={onOpen}
                        >
                            + افزودن راهنما
                        </Button>
                    </div>
                </div>

                {properties.length > 0 ?
                    properties.map((prop, index) => (
                        <Card key={index} className="shadow-md border">
                            <CardBody className="w-full flex flex-row items-center text-start">
                                <div className="w-full flex flex-row items-center">
                                    <div className="w-2/12">
                                        <p>{prop.title}</p>
                                    </div>
                                    <div className="w-10/12">
                                        <p className="text-gray-600">{prop.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button className="text-xl bg-green-100 text-green-600" size="sm" onPress={() => handleEdit(index)}>
                                        <TbEdit />
                                    </Button>
                                    <Button className="text-xl bg-danger-100 text-danger-600" size="sm" onPress={() => handleDelete(index)}>
                                        <TiDeleteOutline />
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))
                    : ""
                }
            </div>

            <AddNewSizeGuideModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleAddOrUpdate}
                defaultValues={editIndex !== null ? properties[editIndex] : undefined}
            />
        </>
    );
};

export default SizeGuideList;
