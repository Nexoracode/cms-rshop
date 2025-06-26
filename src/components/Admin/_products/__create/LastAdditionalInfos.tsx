"use client"

import { useState } from "react";
import { Button, Card, CardBody, NumberInput, Select, SelectItem, Switch, useDisclosure } from "@heroui/react";
import AddNewPropertyModal from "./modals/AddNewPropertyModal";
import { TiDeleteOutline } from "react-icons/ti";
import { TbEdit } from "react-icons/tb";
import SizeGuide from "./temps/SizeGuide";
import BrandItem from "./temps/BrandItem";
import HeaderAction from "./helpers/HeaderAction";

type Property = {
    title: string;
    description: string;
};

const LastAdditionalInfos = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectItem, setSelectItem] = useState<"limit" | "unlimit">("unlimit")

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
            <Card className="w-full shadow-md">
                <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
                    <HeaderAction
                        title="مشخصات"
                        textBtn="+ افزودن مشخصه"
                        onPress={() => {
                            setEditIndex(null);
                            onOpen();
                        }}
                    />
                    
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
                        : <p className="text-gray-500">با تعریف مشخصات محصول، ویژگی‌های محصول خود را معرفی و به تصمیم گیری سریعتر مشتریان به خرید کمک کنید.</p>
                    }

                    <Select
                        dir="rtl"
                        labelPlacement={"outside"}
                        label="وضعیت نمایش در وبسایت"
                        placeholder="انتخاب وضعیت محصول"
                        className="!mt-8"
                    >
                        <SelectItem>نمایش - در فروشگاه نمایش داده میشود</SelectItem>
                        <SelectItem>عدم نمایش - در فروشگاه نمایش داده  نمی میشود</SelectItem>
                    </Select>

                    <div className={`flex flex-col justify-between ${selectItem === "limit" ? "bg-stone-50 rounded-xl p-2" : ""}`}>
                        <div className="flex items-center justify-between mb-4 text-gray-700">
                            <p>محدودیت تعداد برای هر سفارش</p>
                            <Switch isSelected={selectItem === "limit" ? true : false} onValueChange={() => setSelectItem(prev => prev === "limit" ? "unlimit" : "limit")} aria-label="Automatic updates" size="sm" />
                        </div>
                        {
                            selectItem === "limit"
                                ?
                                <NumberInput
                                    label="حداکثر تعداد قابل سفارش"
                                    placeholder="3"
                                    minValue={1}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">عدد</span>
                                        </div>
                                    }
                                    labelPlacement={"outside"}
                                />
                                : ""
                        }
                    </div>

                    <SizeGuide />
                    <BrandItem />
                </CardBody>
            </Card>

            <AddNewPropertyModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={handleAddOrUpdate}
                defaultValues={editIndex !== null ? properties[editIndex] : undefined}
            />
        </>
    );
};

export default LastAdditionalInfos;
