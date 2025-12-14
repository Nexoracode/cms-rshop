"use client";

import InfoRow from "@/components/shared/InfoRow";
import BaseModal from "@/components/ui/modals/BaseModal";
import { price } from "@/core/utils/helper";
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
        label="قیمت پس از کسر تخفیف دستی"
        value={manual_discount_applied ? price(manual_discount_applied) : "—"}
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
        label="قیمت پس از کسر تخفیف پروموشن"
        value={
          promotions_discount_applied ? price(promotions_discount_applied) : "—"
        }
        isActiveBg
      />
    </BaseModal>
  );
};

export default MoreInvoiceInfosModal;
