"use client";

import BaseCard from "@/components/ui/BaseCard";

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

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({ item }) => {
  const { product, variants } = item;

  // محاسبه مجموع تعداد و قیمت کل برای این محصول
  const totalQuantity = variants.reduce((sum, v) => sum + v.quantity, 0);
  const totalPrice = variants.reduce((sum, v) => sum + v.line_total, 0);

  return (
    <BaseCard bodyClassName="cursor-auto hover:shadow-lg transition-shadow">
      {/* بخش اصلی محصول - فقط یکبار */}
      <div className="w-full flex items-center gap-3">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="w-20 h-20 rounded-xl object-cover shadow-md"
        />
        <div className="flex-1 text-right">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-gray-500">
              {totalQuantity} عدد (مجموع)
            </span>
            <span className="text-base font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
              {totalPrice.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>

      {/* لیست واریانت‌ها */}
      <div className="mt-4 space-y-3 border-t pt-4">
        {variants.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              {/* نمایش رنگ اگر وجود داشت */}
              {v?.variant?.attributes[0]?.display_color && (
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: v.variant.attributes[0].display_color }}
                />
              )}

              <div className="flex items-center gap-2">
                {v?.variant?.attributes.map((attr, i) => (
                  <span key={i} className="font-medium">
                    {attr.value}
                    {i < v.variant.attributes.length - 1 && "،"}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>{v.quantity} عدد</span>
              <span className="text-gray-400">×</span>
              <span>{v.unit_price.toLocaleString("fa-IR")} تومان</span>
              <span className="text-green-600 font-semibold">
                {v.line_total.toLocaleString("fa-IR")} تومان
              </span>
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
};

export default ProductCardDetail;