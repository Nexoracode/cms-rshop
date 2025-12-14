"use client";

import BaseCard from "@/components/ui/BaseCard";
import { price } from "@/core/utils/helper";

type GroupedProductItem = {
  product: {
    id: number;
    name: string;
    image: string;
  };
  variants: Array<{
    id: number;
    quantity: number;
    line_total: number;
    unit_price: number;
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
  const totalPrice = variants.reduce((sum, v) => sum + v.line_total, 0);
  console.log(variants);

  return (
    <BaseCard bodyClassName="cursor-auto">
      {/* بخش اصلی محصول - فقط یکبار */}
      <div className="w-full flex items-center gap-3">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="w-20 h-20 rounded-xl object-cover shadow-md"
        />
        <div className="flex-1 text-right">
          <h3 className="text-gray-800 truncate">{product.name}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {totalQuantity} عدد (مجموع)
            </span>
            <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-lg">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>

      {/* لیست واریانت‌ها */}
      {variants.length ? (
        <div className="mt-4 space-y-3">
          {variants?.map((v) => (
            <div
              key={v.id}
              className="flex flex-col items-center text-sm text-gray-700 border border-slate-100 shadow rounded-lg p-2"
            >
              <div className="w-full flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 text-[13px]">
                  {v?.variant?.attributes.map((attr, i) => (
                    <span key={i}>
                      {attr.value}
                      {i < v.variant.attributes.length - 1 && "  ،"}
                    </span>
                  ))}
                </div>
                <span>{price(v.unit_price)}</span>
              </div>

              <div className="w-full mt-2 flex items-center justify-between gap-4 text-xs text-gray-600">
                <span>{v.quantity} عدد</span>
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
