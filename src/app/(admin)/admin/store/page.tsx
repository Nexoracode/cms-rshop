"use client"

import BoxLink from "@/components/Admin/_settings/BoxLink";
import { Button, Card, CardBody, CardHeader } from "@heroui/react"
import { FiEdit } from "react-icons/fi";
//
import { GrAnnounce } from "react-icons/gr";
import { GoCommentDiscussion } from "react-icons/go";
import { TbReportAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { IoShareSocialOutline } from "react-icons/io5";
import { HiOutlineAtSymbol } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiListSettingsLine } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { PiMoneyWavy } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { LuPackage } from "react-icons/lu";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { RiTimerLine } from "react-icons/ri";


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
                        parentStyle="text-purple-700 bg-purple-700/5 shadow-md"
                        iconStyle="bg-purple-700/10"
                    />
                    <BoxLink
                        title="گزارشات مالی"
                        icon={<TbReportAnalytics className="text-2xl" />}
                        routeName="store/settings/finance"
                        parentStyle="text-green-700 bg-green-700/5 shadow-md"
                        iconStyle="bg-green-700/10"
                    />
                    <BoxLink
                        title="دیدگاه ها"
                        icon={<GoCommentDiscussion className="text-2xl" />}
                        routeName="store/comments"
                        parentStyle="text-gray-700 bg-gray-700/5 shadow-md"
                        iconStyle="bg-gray-700/10"
                    />
                    <BoxLink
                        title="پروموشن ها"
                        icon={<GrAnnounce className="text-2xl" />}
                        routeName="store/promotions"
                        parentStyle="text-orange-700 bg-orange-700/5 shadow-md"
                        iconStyle="bg-orange-700/10"
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 mt-8">
                <Card className="shadow-md">
                    <CardHeader className="flex items-center justify-between bg-gray-200">
                        <p className="text-gray-600">تنظیمات فروشگاه</p>
                        <RiListSettingsLine className="text-2xl text-gray-600" />
                    </CardHeader>
                    <CardBody className="grid grid-cols-3 gap-4">
                        <BoxLink
                            title="حساب کاربری"
                            icon={<FiUser className="text-2xl" />}
                            routeName="store/customers"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="اطلاعات فروشگاه"
                            icon={<BsShop className="text-2xl" />}
                            routeName="store/settings/finance"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="درباره فروشگاه"
                            icon={<HiOutlineInformationCircle className="text-2xl" />}
                            routeName="store/comments"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="شبکه های اجتماعی"
                            icon={<IoShareSocialOutline className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="نمادها و مجوزها"
                            icon={<HiOutlineAtSymbol className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="بلاگ ها"
                            icon={<HiOutlineDocumentText className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-purple-700"
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                    </CardBody>
                </Card>
                <Card className="shadow-md">
                    <CardHeader className="flex items-center justify-between bg-blue-200">
                        <p className="text-blue-600">تنظیمات سفارش گیری</p>
                        <LuShoppingBag className="text-2xl text-blue-600" />
                    </CardHeader>
                    <CardBody className="grid grid-cols-3 gap-4">
                        <BoxLink
                            title="روش پرداخت"
                            icon={<PiMoneyWavy className="text-2xl" />}
                            routeName="store/customers"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="روش ارسال"
                            icon={<TbTruckDelivery className="text-2xl" />}
                            routeName="store/settings/finance"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="بسته بندی"
                            icon={<LuPackage className="text-2xl" />}
                            routeName="store/comments"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="تایید خودکار"
                            icon={<MdOutlineVerifiedUser className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="پیش سفارش"
                            icon={<HiOutlineClipboardDocumentCheck className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                        <BoxLink
                            title="زمان رزرو"
                            icon={<RiTimerLine className="text-2xl" />}
                            routeName="store/promotions"
                            parentStyle="text-blue-700 "
                            iconStyle="bg-gray-700/10"
                            titleStyle="text-gray-600"
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Settings