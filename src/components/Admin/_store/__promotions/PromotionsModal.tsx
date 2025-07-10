"use client";

import { Modal, ModalContent, ModalHeader, ModalBody, AccordionItem, Accordion } from "@heroui/react";
import { useRouter } from "next/navigation";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TbMessage, TbRosetteDiscount, TbShoppingCartDiscount } from "react-icons/tb";
import { BsBasket } from "react-icons/bs";

type Props = {
    isOpen: boolean;
    onOpenChange: () => void;
};

const PromotionsModal: React.FC<Props> = ({
    isOpen,
    onOpenChange,
}) => {

    const router = useRouter();
    const style = "text-3xl w-12 h-12 rounded-lg p-2";

    return (
        <Modal
            dir="rtl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="auto"
        >
            <ModalContent className="max-w-[700px] w-full">
                {(onClose) => (
                    <>
                        <ModalHeader>
                            <p className="font-normal text-[16px]">
                                نوع پروموشن را انتخاب کنید.
                            </p>
                        </ModalHeader>
                        <ModalBody>
                            <div className="bg-white rounded-2xl p-4 flex flex-col items-center gap-4">
                                <Accordion selectionMode="multiple">
                                    <AccordionItem
                                        key="1"
                                        title="خرید اول"
                                        subtitle="تعریف تخفیف مخصوص مشتریانی که برای بار اول می‌خواهند از شما خرید کنند"
                                        startContent={
                                            <TfiShoppingCartFull
                                                className={`${style} text-yellow-700 bg-yellow-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/first-purchase")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                                    <AccordionItem
                                        key="2"
                                        title="ارسال رایگان"
                                        subtitle="تعریف تخفیف برای ارسال رایگان."
                                        startContent={
                                            <LiaTruckLoadingSolid
                                                className={`${style} text-blue-700 bg-blue-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/free-shipping")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                                    <AccordionItem
                                        key="3"
                                        title="ارسال پیامک"
                                        subtitle="ارسال پیامک‌های متنوع و مختلف برای مشتریانتان."
                                        startContent={
                                            <TbMessage
                                                className={`${style} text-orange-700 bg-orange-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/sms")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                                    <AccordionItem
                                        key="4"
                                        title="تخفیف خرید بعدی"
                                        subtitle="ارسال پیامک تخفیف برای خرید بعدی مشتری"
                                        startContent={
                                            <TbShoppingCartDiscount
                                                className={`${style} text-green-700 bg-green-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/next-purchase")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                                    <AccordionItem
                                        key="5"
                                        title="کد تخفیف"
                                        subtitle="تعریف کد تخفیف نقدی یا درصدی"
                                        startContent={
                                            <TbRosetteDiscount
                                                className={`${style} text-purple-700 bg-purple-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/discount-code")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>

                                    <AccordionItem
                                        key="6"
                                        title="پیشنهاد شگفت‌انگیز"
                                        subtitle="پیشنهادهای جذاب برای مشتری"
                                        startContent={
                                            <BsBasket
                                                className={`${style} text-red-700 bg-red-700/10`}
                                            />
                                        }
                                        onPress={() => router.push("/admin/store/promotions/amazing-offer")}
                                    > <p className="animate-pulse pr-8 pb-4">در حال انتقال</p> </AccordionItem>
                                </Accordion>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PromotionsModal;
