"use client";

import BaseCard from "@/components/ui/BaseCard";

type ProductCardDetailProps = {
  item: Record<string, any>;
};

const ProductCardDetail: React.FC<ProductCardDetailProps> = ({ item }) => {
  const { product, quantity, line_total, variant } = item;

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
              {Number(line_total).toLocaleString("fa-IR")} تومان
            </span>
            <span className="text-[13px] text-gray-500">{quantity} عدد</span>
          </div>
        </div>
      </div>

      {variant && (
        <div className="w-full flex mt-4 items-center justify-between gap-2 text-xs text-gray-600">
          <span className="truncate">{variant.sku}</span>
          <span>{Number(variant.price).toLocaleString("fa-IR")} </span>
        </div>
      )}
    </BaseCard>
  );
};

export default ProductCardDetail;
