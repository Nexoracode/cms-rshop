"use client"

import { Button, Card, CardBody } from "@heroui/react"
import { FiEdit } from "react-icons/fi";

const Settings = () => {

    return (
        <div>
            <Card className="rounded-r-full bg-gradient-to-r from-blue-200 via-purple-500 to-yellow-200">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-start">
                            <img src="/images/logo.png" alt="logo" className="w-28 h-28 object-contain bg-[rgba(255,255,255,.8)] border-4 rounded-full" />
                            <div>
                                <p className="text-xl text-white">آکادمی روح بخش</p>
                                <p className="text-gray-200 mt-1 text-[13px]">محصولات فرهنگی و مذهبی</p>
                            </div>
                        </div>
                        <Button color="secondary" variant="flat" size="sm" className="py-5 rounded-xl">
                            <FiEdit className="text-lg" /> ویرایش
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Settings