"use client";

import BaseCard from "@/components/ui/BaseCard";
import { LuScrollText } from "react-icons/lu";
import ProductBoxInfos from "./ProductBoxInfos";
import InfoRow from "@/components/shared/InfoRow";
import { Divider } from "@heroui/react";
import { price } from "@/core/utils/helper";
import { useEffect, useState } from "react";

type InvoiceBoxInfosProps = {
  order: any;
};

const InvoiceBoxInfos: React.FC<InvoiceBoxInfosProps> = ({ order }) => {
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

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!items) return;
    console.log("Items =>", items);

    type Item = {
      id: number;
      line_total: number;
      discount: number;
      quantity: number;
      variant: {
        id: number;
        price: number;
        sku: string;
        attributes: { value: string }[];
        variant_discount: { percent: number; amount: number };
      };
      product: {
        id: number;
        image: string;
        name: string;
        price: number;
        product_discount: { percent: number; amount: number };
      };
    };

    //
    const equalItems: Item[] = [];
    const notEqualItems: Item[] = [];

    for (let index = 0; index < items.length; index++) {
      const element = items[index] as Item;

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
        showIconInActionSlot: true,
      }}
    >
      <div className="mb-5 space-y-3">
        {products?.map((item: any, index: number) => (
          <ProductBoxInfos key={index} item={item} />
        ))}
      </div>
      <InfoRow label="مجموع قیمت" value={price(subtotal)} />
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
      />
      <InfoRow
        label="مجموع تخفیفات"
        value={discount_total ? price(discount_total) : "—"}
      />
      <InfoRow label="کد تخفیف" value={promotion_code ?? "—"} />
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

export default InvoiceBoxInfos;
