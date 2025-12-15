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
        <InfoRow label="مجموع قیمت" value={price(subtotal)} />

        <InfoRow
          label="مجموع تخفیفات"
          value={discount_total ? price(discount_total) : "—"}
          isActiveBg
        />

        <InfoRow
          label="کدتخفیف"
          value={
            promotions_discount_value
              ? promotions_discount_type === "percent"
                ? `${promotions_discount_value}%`
                : price(promotions_discount_value)
              : "—"
          }
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
          isActiveBg
        />

        <InfoRow
          label="قیمت پس از کسر تخفیف دستی"
          value={manual_discount_applied ? price(manual_discount_applied) : "—"}
        />

        <InfoRow
          label="قیمت پس از کسر تخفیف پروموشن"
          value={
            promotions_discount_applied
              ? price(promotions_discount_applied)
              : "—"
          }
          isActiveBg
        />

        <InfoRow label="هزینه ارسال" value={"—"} />

        <InfoRow
          label="هزینه بسته بندی"
          value={shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))}
          isActiveBg
        />
      </div>
      <Divider className="-mb-2"/>
      <InfoRow label="مبلغ نهایی" value={price(total)} hoverable />
    </BaseModal>
  );
};

export default MoreInvoiceInfosModal;
