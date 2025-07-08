"use client"

import { Accordion, AccordionItem } from "@heroui/react";
import BackToPage from "@/components/Helper/BackToPage"
import { BsInfoCircle } from "react-icons/bs";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { TbUserQuestion } from "react-icons/tb";

const AboutStore = () => {

    const style = "text-3xl w-12 h-12 rounded-lg p-2"

    return (
        <div className="flex flex-col gap-4">
            <BackToPage title="درباره فروشگاه" link="/admin/store" />

            <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-4">
                <Accordion selectionMode="multiple">
                    <AccordionItem
                        key="1"
                        aria-label="Chung Miller"
                        startContent={<BsInfoCircle className={`${style} text-yellow-700 bg-yellow-700/10`} />}
                        subtitle="توضیحات در مورد فروشگاه"
                        title="درباره ما"
                    />
                    <AccordionItem
                        key="2"
                        aria-label="Janelle Lenard"
                        startContent={<IoDocumentTextOutline className={`${style} text-blue-700 bg-blue-700/10`} />}
                        subtitle="توضیحات راهنمای خرید"
                        title="راهنمای خرید"
                    />
                    <AccordionItem
                        key="3"
                        aria-label="Zoey Lang"
                        startContent={<HiOutlineReceiptRefund className={`${style} text-orange-700 bg-orange-700/10`} />}
                        subtitle="شرایط بازگشت کالاها (مرجوعی)"
                        title="شرایط بازگشت کالا"
                    />
                    <AccordionItem
                        key="4"
                        aria-label="Zoey Lang"
                        startContent={<TbUserQuestion className={`${style} text-green-700 bg-green-700/10`} />}
                        subtitle="سوالات متدوال پیش آمده برای مشتری"
                        title="سوالات متدوال"
                    />
                </Accordion>
            </div>
        </div>
    )

}

export default AboutStore