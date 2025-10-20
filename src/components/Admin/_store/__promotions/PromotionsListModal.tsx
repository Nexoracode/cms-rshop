"use client";

import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { useRouter } from "next/navigation";
//
import { BsBasket } from "react-icons/bs";
import {
  TbMessage,
  TbRosetteDiscount,
  TbShoppingCartDiscount,
} from "react-icons/tb";
import { LiaTruckLoadingSolid } from "react-icons/lia";
import { TfiShoppingCartFull } from "react-icons/tfi";

import DynamicModal from "@/components/shared/DynamicModal";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const PromotionsListModal: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const router = useRouter();
  const style = "text-3xl hidden phone:flex w-12 h-12 block rounded-lg p-2";

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={"انواع پروموشن ها"}
      icon={null}
      confirmText="بستن"
      cancelText=""
      isActiveFooter={false}
      confirmVariant="solid"
      confirmColor="primary"
      size="xl"
    >
      <div className="bg-white p-4 rounded-2xl">
        <Accordion selectionMode="multiple">
          <AccordionItem
            key="1"
            title="خرید اول"
            subtitle="مخصوص مشتریانی که برای بار اول می‌خواهند از شما خرید کنند"
            startContent={
              <TfiShoppingCartFull
                className={`${style} text-yellow-700 bg-yellow-700/10`}
              />
            }
            onPress={() =>
              router.push("/admin/store/promotions/first-purchase")
            }
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>

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
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>

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
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>

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
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>

          <AccordionItem
            key="5"
            title="کد تخفیف"
            subtitle="تعریف کد تخفیف نقدی یا درصدی"
            startContent={
              <TbRosetteDiscount
                className={`${style} text-purple-700 bg-purple-700/10`}
              />
            }
            onPress={() => router.push("/admin/store/promotions/coupon")}
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>

          <AccordionItem
            key="6"
            title="پیشنهاد شگفت‌انگیز"
            subtitle="پیشنهادهای جذاب برای مشتری"
            startContent={
              <BsBasket className={`${style} text-red-700 bg-red-700/10`} />
            }
            onPress={() => router.push("/admin/store/promotions/amazing-offer")}
          >
            <p className="animate-pulse pr-8 pb-4">در حال انتقال...</p>
          </AccordionItem>
        </Accordion>
      </div>
    </DynamicModal>
  );
};

export default PromotionsListModal;
