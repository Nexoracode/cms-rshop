"use client";

import BaseCard from "@/components/ui/BaseCard";

type GroupedProductCardProps = {
  group: {
    product: Record<string, any>;
    variants: Array<Record<string, any>>;
  };
};

const GroupedProductCard: React.FC<GroupedProductCardProps> = ({ group }) => {
  const { product, variants } = group;

  // محاسبه مجموع قیمت و تعداد برای کل محصول (اختیاری، اما مفید برای نمایش خلاصه)
  const totalQuantity = variants.reduce((sum, item) => sum + item.quantity, 0);
  const totalLineTotal = variants.reduce((sum, item) => sum + item.line_total, 0);

  return (
    <BaseCard bodyClassName="cursor-auto">
      <div className="w-full flex items-center gap-2.5">
        <img
          src={product?.image || "/placeholder.jpg"}
          alt={product?.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="w-full flex flex-col justify-start text-right gap-2.5">
          <p className="w-full text-gray-800 text-right truncate">
            {product?.name}
          </p>
          <div className="w-full flex items-center justify-between">
            <span className="text-[13px] text-green-600 bg-green-50 rounded-lg p-0.5">
              {Number(totalLineTotal).toLocaleString("fa-IR")} تومان (مجموع)
            </span>
            <span className="text-[13px] text-gray-500">{totalQuantity} عدد (مجموع)</span>
          </div>
        </div>
      </div>

      {/* بخش واریانت‌ها: نمایش هر واریانت در یک ردیف جداگانه */}
      <div className="w-full mt-4 space-y-3">
        {variants.map((item) => {
          const { variant, quantity, unit_price, line_total } = item;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 text-xs text-gray-600 border-t pt-2"
            >
              <div className="flex items-center gap-1.5">
                {variant.attributes.map((attr: any, index: number) => (
                  <span key={index}>
                    {attr.value}
                    {index < variant.attributes.length - 1 && "  ،"}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span>{quantity} عدد</span>
                <span>{Number(unit_price).toLocaleString("fa-IR")} تومان (واحد)</span>
                <span className="text-green-600">
                  {Number(line_total).toLocaleString("fa-IR")} تومان (کل)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </BaseCard>
  );
};

export default GroupedProductCard;