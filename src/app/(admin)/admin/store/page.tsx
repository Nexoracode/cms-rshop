"use client"

import BoxLink from "@/components/Admin/_settings/BoxLink";
import { Button, Card, CardBody } from "@heroui/react"
import { FiEdit } from "react-icons/fi";
//
import { GrAnnounce } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";

const Settings = () => {

    return (
        <div>
            <div className="bg-gradient-to-l from-blue-100 via-purple-100 rounded-xl p-4 shadow-md">
                <Card className="shadow-md bg-gradient-to-l from-blue-200 via-purple-400">
                    <CardBody>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-start">
                                <img src="/images/logo.png" alt="logo" className="w-28 h-28 object-contain bg-[rgba(255,255,255,.8)] border-4 rounded-full" />
                                <div>
                                    <p className="text-2xl text-white">آرشاپ</p>
                                    <p className="mt-1 text-[13px]">محصولات فرهنگی و مذهبی</p>
                                </div>
                            </div>
                            <Button color="secondary" variant="flat" size="sm" className="py-5 rounded-xl">
                                <FiEdit className="text-lg" /> ویرایش
                            </Button>
                        </div>
                    </CardBody>
                </Card>
                <div className="flex items-center justify-around mt-6">
                    <BoxLink
                        title="مشتریان"
                        icon={<FiUsers className="text-2xl" />}
                        routeName="store/customers"
                        parentStyle="text-purple-700 bg-purple-700/5"
                        iconStyle="bg-purple-700/10"
                    />
                    <BoxLink
                        title="گزارشات مالی"
                        icon={<TbReportAnalytics className="text-2xl" />}
                        routeName="store/settings/finance"
                        parentStyle="text-green-700 bg-green-700/5"
                        iconStyle="bg-green-700/10"
                    />
                    <BoxLink
                        title="دیدگاه ها"
                        icon={<GoCommentDiscussion className="text-2xl" />}
                        routeName="store/comments"
                        parentStyle="text-gray-700 bg-gray-700/5"
                        iconStyle="bg-gray-700/10"
                    />
                    <BoxLink
                        title="پروموشن ها"
                        icon={<GrAnnounce className="text-2xl" />}
                        routeName="store/promotions"
                        parentStyle="text-orange-700 bg-orange-700/5"
                        iconStyle="bg-orange-700/10"
                    />
                </div>
            </div>
        </div>
    )
}

export default Settings