"use client"

import { Accordion, AccordionItem } from "@heroui/react";
import BackToPage from "@/components/common/BackToPage"
import { BsInfoCircle } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { TbUserQuestion } from "react-icons/tb";
import { useRouter } from "next/navigation";

const Finance = () => {
    const router = useRouter();
    const style = "text-3xl w-12 h-12 rounded-lg p-2";

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="گزارش های مالی" link="/admin/store" />

            <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-4">
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        title="سوابق مالی"
                        subtitle="جزییات مالی سرویس هایی که از دیجی فای دریافت می کنید (مانند شارژ کیف پول، خرید پیامک، پکیج و ...) ."
                        startContent={
                            <BsInfoCircle
                                className={`${style} text-yellow-700 bg-yellow-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/about")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                    <AccordionItem
                        key="2"
                        title="کارمزد"
                        subtitle="جزییات مالی کارمزدی که دیجی فای، به ازای هر سفارش از کیف پول شما کسر و دریافت می کند. (برای افرادی که پکیج کلیک برایشان فعال است.)"
                        startContent={
                            <IoDocumentTextOutline
                                className={`${style} text-blue-700 bg-blue-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/help")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                    <AccordionItem
                        key="3"
                        title="تسویه حساب"
                        subtitle="جزییات مالی تسویه حساب دیجی فای با شما، که به ازای هر سفارش تایید شده انجام می شود. (برای افرادی که از درگاه پرداخت سریع دیجی فای استفاده می کنند.)"
                        startContent={
                            <HiOutlineReceiptRefund
                                className={`${style} text-orange-700 bg-orange-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/refund")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                </Accordion>
            </div>
        </div>
    )
}

export default Finance;
