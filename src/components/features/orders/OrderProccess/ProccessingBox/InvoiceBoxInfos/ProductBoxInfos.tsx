"use client";

import BaseCard from "@/components/ui/BaseCard";
import { price } from "@/core/utils/helper";

type GroupedProductItem = {
  product: {
    base_price: number;
    id: number;
    name: string;
    image: string;
    product_discount: any;
  };
  variants: Array<{
    id: number;
    quantity: number;
    line_total: number;
    unit_price: number;
    variant_discount: any;
    variant: {
      attributes: Array<{ value: string; display_color?: string }>;
      price: number;
    };
  }>;
};

type ProductCardDetailProps = {
  item: GroupedProductItem;
};

const ProductBoxInfos: React.FC<ProductCardDetailProps> = ({ item }) => {
  const { product, variants } = item;

  // محاسبه مجموع تعداد و قیمت کل برای این محصول
  const totalQuantity = variants.reduce((sum, v) => sum + v.quantity, 0);
  const totalPrice = variants?.length
    ? variants.reduce((sum, v) => sum + v.line_total, 0)
    : product.base_price;

  console.log("@@@", item);

  return (
    <BaseCard bodyClassName="cursor-auto">
      {/* بخش اصلی محصول - فقط یکبار */}
      <div className="flex flex-col">
        <div className="w-full flex items-center gap-3">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="!min-w-20 max-w-20 !min-h-20 max-h-20 rounded-xl object-cover shadow-md"
          />
          <div className="w-full flex flex-col justify-between text-right h-14">
            <h3 className="text-gray-800 truncate">{product.name}</h3>
            <div className="w-full flex items-center justify-between mt-2 gap-4">
              <p className="text-sm text-gray-500">
                {totalQuantity} عدد (مجموع)
              </p>
              {product.product_discount.amount ||
              product.product_discount.percent ? (
                <p className="text-orange-600 bg-orange-50 px-2 rounded-lg">
                  {product.product_discount.amount
                    ? `${price(product.product_discount.amount)} تومان`
                    : `${product.product_discount.percent}%`}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            قیمت تک : {price(product.base_price)}
          </span>
          <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">
            {totalPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>

      {/* لیست واریانت‌ها */}
      {variants.length ? (
        <div className="mt-4 space-y-3">
          {variants?.map((v) => (
            <div
              key={v.id}
              className="flex flex-col gap-2 items-center text-sm text-gray-700 border border-slate-100 shadow rounded-lg p-2"
            >
              <div className="w-full flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 bg-gray-100 px-2 rounded-lg">
                    {v.quantity} عدد
                  </span>
                  <div className="flex items-center gap-2 text-[13px]">
                    {v?.variant?.attributes.map((attr, i) => (
                      <span key={i}>
                        {attr.value}
                        {i < v.variant.attributes.length - 1 && "  ،"}
                      </span>
                    ))}
                  </div>
                </div>
                {v?.variant_discount?.amount || v?.variant_discount?.percent ? (
                  <p className="text-orange-600 bg-orange-50 px-2 rounded-lg">
                    {v?.variant_discount?.amount
                      ? `${price(v?.variant_discount?.amount)} تومان`
                      : `${v?.variant_discount?.percent}%`}
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full mt-2 flex items-center justify-between gap-4 text-xs text-gray-600">
                <span>قیمت تک : {price(v.unit_price)}</span>
                <span className="text-green-600 font-semibold">
                  {price(v.line_total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </BaseCard>
  );
};

export default ProductBoxInfos;
