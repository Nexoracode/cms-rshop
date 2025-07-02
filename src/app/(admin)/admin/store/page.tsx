"use client"

import BoxLink from "@/components/Admin/_settings/BoxLink";
import { Button, Card, CardBody } from "@heroui/react"
import { FiEdit } from "react-icons/fi";
import { IoReceiptOutline } from "react-icons/io5";
//
import { GrAnnounce } from "react-icons/gr";


const Settings = () => {

    return (
        <div>
            <Card className="bg-gradient-to-r from-blue-200 via-purple-500 to-yellow-200">
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-start">
                            <img src="/images/logo.png" alt="logo" className="w-28 h-28 object-contain bg-[rgba(255,255,255,.8)] border-4 rounded-full" />
                            <div>
                                <p className="text-xl text-white">آرشاپ</p>
                                <p className="mt-1 text-[13px]">محصولات فرهنگی و مذهبی</p>
                            </div>
                        </div>
                        <Button color="secondary" variant="flat" size="sm" className="py-5 rounded-xl">
                            <FiEdit className="text-lg" /> ویرایش
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <div className="flex items-center gap-6 mt-6">
                <BoxLink
                    title="پروموشن ها"
                    icon={<GrAnnounce className="text-2xl" />}
                    routeName="store/promotions"
                    parentStyle="text-blue-700 bg-blue-700/5"
                    iconStyle="bg-blue-700/10"
                />
            </div>
        </div>
    )
}

export default Settings