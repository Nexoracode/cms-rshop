"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseModal from "@/components/ui/modals/BaseModal";
import { price } from "@/core/utils/helper";
import { Divider } from "@heroui/react";
import { GoArrowUpRight } from "react-icons/go";
import { LuScrollText } from "react-icons/lu";

type MoreInvoiceInfosModalProps = {
  order: any;
};

const MoreInvoiceInfosModal: React.FC<MoreInvoiceInfosModalProps> = ({
  order,
}) => {
  const {
    manual_discount_type,
    manual_discount_value,
    promotions_discount_type,
    promotions_discount_value,
    promotions_discount_applied,
    shipping_cost,
    manual_discount_applied,
    discount_total,
    subtotal,
    gift_wrapping_cost,
    total,
  } = order;

  return (
    <BaseModal
      triggerProps={{
        icon: <GoArrowUpRight />,
        title: "بیشتر",
      }}
      title={"اطلاعات کامل فاکتور"}
      size="lg"
      icon={<LuScrollText />}
      isActiveFooter={false}
    >
      <div className="!space-y-1">
        <InfoRow
          label="هزینه ارسال"
          value={shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))}
        />

        <InfoRow
          label="هزینه بسته بندی"
          value={
            gift_wrapping_cost === 0
              ? "رایگان"
              : String(price(gift_wrapping_cost))
          }
          isActiveBg
        />

        <InfoRow
          label="تخفیف دستی فاکتور"
          value={
            manual_discount_value
              ? manual_discount_type === "percent"
                ? `${manual_discount_value}%`
                : price(manual_discount_value)
              : "—"
          }
        />

        <InfoRow
          label="تخفیف پروموشن"
          value={
            promotions_discount_value
              ? promotions_discount_type === "percent"
                ? `${promotions_discount_value}%`
                : price(promotions_discount_value)
              : "—"
          }
          isActiveBg
        />

        <InfoRow label="مجموع قیمت بدون تخفیف" value={price(subtotal)} />

        <InfoRow
          label="مجموع تخفیفات"
          value={discount_total ? price(discount_total) : "—"}
          isActiveBg
        />
        {discount_total ? (
          <InfoRow
            label="قیمت پس از کسر تخفیفات"
            value={price(subtotal - discount_total)}
          />
        ) : (
          ""
        )}

        {/*
        <InfoRow
          label="قیمت پس از کسر تخفیف پروموشن"
          value={
            promotions_discount_applied
              ? price(promotions_discount_applied)
              : "—"
          }
        /> */}
      </div>
      <Divider className="-mb-2" />
      <InfoRow label="مبلغ قابل پرداخت" value={price(total)} hoverable />
    </BaseModal>
  );
};

export default MoreInvoiceInfosModal;
