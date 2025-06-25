"use client"

import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { TbBookmarks } from "react-icons/tb";

const FeatureProducts = () => {

    return (
        <Card className="w-full shadow-md">
            <CardBody dir="rtl" className="flex flex-col gap-4 text-start">
                <CardHeader className="flex gap-3 p-0">
                    <div className="w-full rounded-md bg-purple-700/10 text-purple-700 p-2 flex items-center justify-between">
                        <p>ویژگی‌های محصول</p>
                        <TbBookmarks className="text-3xl" />
                    </div>
                </CardHeader>
                <div className="w-full flex items-center justify-between">
                    <span>ویژگی ها</span>
                    <Button
                        color="secondary"
                        variant="light"
                    >
                        + افزودن ویژگی
                    </Button>
                </div>
                <p className="text-gray-500 pr-2">■ این محصول تنوع رنگ‌بندی و سایزبندی و ... دارد؟ از این بخش می‌تونید آنها را اضافه کنید.</p>
            </CardBody>
        </Card>
    );
};

export default FeatureProducts;
