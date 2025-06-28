"use client"

import { Card, CardBody, useDisclosure } from "@heroui/react";
import { TbBookmarks } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useState } from "react";
import AddNewAttributeModal from "./modals/AddNewAttributeModal/AddNewAttributeModal";

const AttributesProducts = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [infos, setInfos] = useState({
        price: ""
    })

    return (
        <>
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="ویژگی های محصول"
                    color="bg-purple-700/10 text-purple-700"
                    icon={<TbBookmarks className="text-3xl" />}
                />
                <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
                    <HeaderAction
                        title="ویژگی ها"
                        textBtn="+ افزودن ویژگی"
                        onPress={onOpen}
                    />
                    <p className="text-gray-500 pr-2">■ این محصول تنوع رنگ‌بندی و سایزبندی و ... دارد؟ از این بخش می‌تونید آنها را اضافه کنید.</p>
                </CardBody>
            </Card>

            <AddNewAttributeModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={() => {}}
            />
        </>
    );
};

export default AttributesProducts;
