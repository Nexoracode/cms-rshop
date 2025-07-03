"use client"

import { Button, Card, CardBody } from "@heroui/react";
import { MdMoreVert } from "react-icons/md";


const Home = () => {
    return (
        <div>
            <Card className="shadow-md bg-gradient-to-r from-white via-purple-400">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-start">
                            <img
                                src="/images/logo.png"
                                alt="logo"
                                className="w-28 h-28 object-contain bg-[rgba(255,255,255,.8)] border-4 rounded-full"
                            />
                            <div>
                                <p className="text-2xl text-white">فروشگاه آرشاپ</p>
                                <p className="mt-1 text-[13px]">محصولات فرهنگی و مذهبی</p>
                                <div className="mt-2 bg-green-700/60 rounded-xl flex justify-start px-2 w-fit items-center gap-2 text-green-200">
                                    <span className="relative flex size-3">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-200 opacity-75"></span>
                                        <span className="relative inline-flex size-3 rounded-full bg-green-300"></span>
                                    </span>
                                    <p className="text-[12px]">سفارش گیری فعال</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button color="secondary" variant="flat" size="sm" className="rounded-md">
                                <MdMoreVert className="text-lg" /> بیشتر
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default Home