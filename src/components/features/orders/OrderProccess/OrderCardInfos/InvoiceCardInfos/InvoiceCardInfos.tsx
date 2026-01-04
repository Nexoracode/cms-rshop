"use client";

import BaseCard from "@/components/ui/BaseCard";
import ProductBoxInfos from "./ProductCardInfos";
import InfoRow from "@/components/shared/InfoRow";
import { Divider } from "@heroui/react";
import { price } from "@/core/utils/helper";
import { useEffect, useState } from "react";
import { InvoiceItemPayload } from "./invoice-card-infos-types";
import BaseModal from "@/components/ui/modals/BaseModal";
import { GoArrowUpRight } from "react-icons/go";
import OrderInvoiceInfos from "../OrderInvoiceInfos";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { IoReceiptOutline } from "react-icons/io5";

type InvoiceCardInfosProps = {
  order: any;
  factorOnly?: boolean;
};

const InvoiceCardInfos: React.FC<InvoiceCardInfosProps> = ({
  order,
  factorOnly = false,
}) => {
  const { shipping_cost, discount_total, total, items, gift_wrapping_cost } =
    order;

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
        title: "سفارشات",
        icon: <TfiShoppingCartFull className="text-gray-700" />,
        showIconInActionSlot: factorOnly,
        ...(factorOnly
          ? {}
          : {
              children: (
                <BaseModal
                  triggerProps={{
                    icon: <GoArrowUpRight />,
                    title: "بیشتر",
                  }}
                  title={"اطلاعات کامل فاکتور"}
                  size="lg"
                  icon={<IoReceiptOutline />}
                  isActiveFooter={false}
                >
                  <OrderInvoiceInfos order={order} />
                </BaseModal>
              ),
            }),
      }}
    >
      <div
        className={`space-y-2 mb-3`}
      >
        {products?.map((item: any, index: number) => (
          <ProductBoxInfos key={index} item={item} />
        ))}
      </div>
      {!factorOnly ? (
        <>
          <InfoRow
            label="هزینه ارسال"
            value={
              shipping_cost === 0 ? "رایگان" : String(price(shipping_cost))
            }
          />
          <InfoRow
            label="هزینه بسته بندی"
            value={
              gift_wrapping_cost === 0
                ? "رایگان"
                : String(price(gift_wrapping_cost))
            }
          />

          <InfoRow
            label="مجموع تخفیفات"
            value={discount_total ? price(discount_total) : "—"}
          />

          <Divider className="!mt-3 mb-1" />
          <InfoRow
            label="مبلغ قابل پرداخت"
            value={price(total)}
            valueStyle="text-green-700 text-lg"
          />
        </>
      ) : (
        ""
      )}
    </BaseCard>
  );
};

export default InvoiceCardInfos;
