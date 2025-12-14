"use client";

import BaseCard from "@/components/ui/BaseCard";
import { LuScrollText } from "react-icons/lu";
import ProductBoxInfos from "./ProductCardInfos";
import InfoRow from "@/components/shared/InfoRow";
import { Divider } from "@heroui/react";
import { price } from "@/core/utils/helper";
import { useEffect, useState } from "react";
import { InvoiceItemPayload } from "./invoice-card-infos-types";
import { GoArrowUpRight } from "react-icons/go";
import MoreInvoiceInfosModal from "./MoreInvoiceInfosModal";

type InvoiceCardInfosProps = {
  order: any;
};

const InvoiceCardInfos: React.FC<InvoiceCardInfosProps> = ({ order }) => {
  const {
    manual_discount_type,
    manual_discount_value,
    promotions_discount_type,
    promotions_discount_value,
    promotions_discount_applied,
    shipping_cost,
    promotion_code,
    manual_discount_applied,
    subtotal,
    discount_total,
    total,
    items,
  } = order;

  console.log(order);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!items) return;

    const equalItems: InvoiceItemPayload[] = [];
    const notEqualItems: InvoiceItemPayload[] = [];

    for (let index = 0; index < items.length; index++) {
      const element = items[index] as InvoiceItemPayload;

      if (element.variant) {
        if (items[index + 1] !== undefined) {
          if (element.product.id === items[index + 1].product.id)
            equalItems.push(element);
          else {
            equalItems.find(
              (eq) =>
                eq.product.id !== element.product.id &&
                notEqualItems.push(element)
            );
          }
        }

        if (items[index + 1] === undefined) {
          notEqualItems.push(element);
        }
      } else {
        const { discount, quantity, line_total, product } = element;
        setProducts([
          {
            line_total,
            quantity,
            discount,
            product,
            variants: [],
          },
        ]);
      }
    }

    //
    let productNotEqual = null;
    let productEqual = null;

    if (equalItems.length) {
      const { discount, line_total, quantity, product } = equalItems[0];

      const varaintsListEqual = equalItems.map((eq) => {
        const { discount, line_total, quantity, variant } = eq;
        return {
          line_total,
          quantity,
          discount,
          variant,
        };
      });

      productEqual = [
        {
          line_total,
          quantity,
          discount,
          product,
          variants: varaintsListEqual,
        },
      ];
    }

    if (notEqualItems.length) {
      productNotEqual = notEqualItems.map((notEq) => {
        const { product, discount, line_total, quantity, variant } = notEq;
        return {
          line_total,
          quantity,
          discount,
          product,
          variants: [
            {
              line_total,
              quantity,
              discount,
              variant,
            },
          ],
        };
      });
    }

    if (productEqual && productEqual.length && productEqual[0].product)
      setProducts(productEqual);

    if (productNotEqual) setProducts((prev) => [...prev, ...productNotEqual]);
  }, [items]);

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات محصولات",
        icon: <LuScrollText className="text-gray-700" />,
        children: <MoreInvoiceInfosModal order={order} />,
      }}
    >
      <div className="mb-5 space-y-3">
        {products?.map((item: any, index: number) => (
          <ProductBoxInfos key={index} item={item} />
        ))}
      </div>
      <InfoRow label="مجموع قیمت" value={price(subtotal)} />
      
      <InfoRow
        label="مجموع تخفیفات"
        value={discount_total ? price(discount_total) : "—"}
      />
      {/* <InfoRow label="کد تخفیف" value={promotion_code ?? "—"} /> */}
      <InfoRow label="هزینه ارسال" value={"—"} />
      <InfoRow
        label="هزینه بسته بندی"
        value={shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))}
      />
      <Divider className="!mt-3 mb-1" />
      <InfoRow label="مبلغ قابل پرداخت" value={price(total)} hoverable />
    </BaseCard>
  );
};

export default InvoiceCardInfos;
