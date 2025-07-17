"use client"

import { Card, CardBody, useDisclosure } from "@heroui/react";
import { TbCategory2 } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";
import { useEffect, useState } from "react";
import AddNewAttributeModal from "./modals/AddNewAttributeModal/AddNewAttributeModal";
import { AttributeData } from "./modals/AddNewAttributeModal/Types";
import SubAttributeBox from "./helpers/SubAttributeBox";

const AttributesProducts = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [attributes, setAttributes] = useState<AttributeData[]>([]);

    useEffect(() => {
        if (attributes.length) {
            console.log(attributes);
        }
    }, [attributes])

    return (
        <>
            <Card className="w-full shadow-md">
                <BoxHeader
                    title="ویژگی های محصول"
                    color="bg-purple-700/10 text-purple-700"
                    icon={<TbCategory2 className="text-3xl" />}
                />
                <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
                    <HeaderAction
                        title="ویژگی ها"
                        textBtn={attributes.length ? "ویرایش ویژگی ها" : "+ افزودن ویژگی"}
                        onPress={onOpen}
                    />
                    {
                        attributes.length
                            ?
                            <SubAttributeBox
                                titleCard={attributes[0].attr.label}
                                onHandleSubmit={() => { }}
                            />
                            : <p className="text-gray-500 pr-2">■ این محصول تنوع رنگ‌بندی و سایزبندی و ... دارد؟ از این بخش می‌تونید آنها را اضافه کنید.</p>
                    }
                </CardBody>
            </Card>

            <AddNewAttributeModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onSubmit={setAttributes}
            />
        </>
    );
};

export default AttributesProducts;
