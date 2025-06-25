"use client";

import { useState } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import AddNewPropertyModal from "./Modal/AddNewPropertyModal";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";

type Property = {
    title: string;
    description: string;
};

const LastAdditionalInfos = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card className="w-full shadow-md">
                <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
                    <div className="w-full px-2 flex items-center justify-between">
                        <span>مشخصات</span>
                        <Button color="secondary" variant="light" onPress={onOpen}>
                            + افزودن مشخصات جدید
                        </Button>
                    </div>

                    {properties.length > 0 && (
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
                                        <Button className="text-xl bg-green-100 text-green-600" size="sm">
                                            <TbEdit />
                                        </Button>
                                        <Button className="text-xl bg-danger-100 text-danger-600" size="sm">
                                            <TiDeleteOutline />
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))
                    )}
                </CardBody>
            </Card>

            <AddNewPropertyModal
                onSubmit={(title, description) => setProperties(prev => [...prev, { title, description }])}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />
        </>
    );
};

export default LastAdditionalInfos;
