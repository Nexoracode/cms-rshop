"use client"

import { Accordion, AccordionItem } from "@heroui/react";
import BackToPage from "@/components/common/BackToPage"
import { BsInfoCircle } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { TbUserQuestion } from "react-icons/tb";
import { useRouter } from "next/navigation";

const AboutStore = () => {
    const router = useRouter();
    const style = "text-3xl hidden phone:flex w-12 h-12 rounded-lg p-2";

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="درباره فروشگاه" link="/admin/store" />

            <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-4">
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        title="درباره ما"
                        subtitle="توضیحات در مورد فروشگاه"
                        startContent={
                            <BsInfoCircle
                                className={`${style} text-yellow-700 bg-yellow-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/about")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                    <AccordionItem
                        key="2"
                        title="راهنمای خرید"
                        subtitle="توضیحات راهنمای خرید"
                        startContent={
                            <IoDocumentTextOutline
                                className={`${style} text-blue-700 bg-blue-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/help")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                    <AccordionItem
                        key="3"
                        title="شرایط بازگشت کالا"
                        subtitle="شرایط بازگشت کالاها (مرجوعی)"
                        startContent={
                            <HiOutlineReceiptRefund
                                className={`${style} text-orange-700 bg-orange-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/refund")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                    <AccordionItem
                        key="4"
                        title="سوالات متداول"
                        subtitle="سوالات متدوال پیش آمده برای مشتری"
                        startContent={
                            <TbUserQuestion
                                className={`${style} text-green-700 bg-green-700/10`}
                            />
                        }
                        onPress={() => router.push("/admin/settings/about-store/faq")}
                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default AboutStore;
