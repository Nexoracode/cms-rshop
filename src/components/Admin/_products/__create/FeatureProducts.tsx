"use client"

import { Card, CardBody } from "@heroui/react";
import { TbBookmarks } from "react-icons/tb";
import HeaderAction from "./helpers/HeaderAction";
import BoxHeader from "./helpers/BoxHeader";

const FeatureProducts = () => {

    return (
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
                    onPress={() => { }}
                />
                <p className="text-gray-500 pr-2">■ این محصول تنوع رنگ‌بندی و سایزبندی و ... دارد؟ از این بخش می‌تونید آنها را اضافه کنید.</p>
            </CardBody>
        </Card>
    );
};

export default FeatureProducts;
