"use client";

import { FaStar } from "react-icons/fa6";

type ReviewCardProps = {
  item: {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    product: {
      id: number;
      name: string;
      image: string;
      price: number;
      discount_amount: number;
      discount_percent: number;
      final_price: number;
    };
  };
};

const ReviewCard = ({ item }: ReviewCardProps) => {
  const { product } = item;

  // فرمت قیمت با جداکننده هزارگان و بدون اعشار
  const formatPrice = (price: number) =>
    Math.round(price).toLocaleString("fa-IR");

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col gap-3 transition hover:shadow-md duration-200">
      {/* محصول */}
      <div className="flex items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          width={64}
          height={64}
          className="rounded-xl object-cover w-16 h-16 border border-gray-100"
        />
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>

          {/* قیمت‌ها */}
          <div className="flex items-center gap-2">
            {product.discount_percent > 0 && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                {product.discount_percent}% تخفیف
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {product.discount_percent > 0 && (
              <p className="text-xs text-gray-400 line-through">
                {formatPrice(product.price)} تومان
              </p>
            )}
            <p className="text-sm text-gray-800 font-semibold">
              {formatPrice(product.final_price)} تومان
            </p>
          </div>
        </div>
      </div>

      {/* نظر */}
      <p className="text-sm text-gray-700 leading-relaxed border-t pt-2">
        {item.comment}
      </p>

      {/* امتیاز و تاریخ */}
      <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: item.rating }).map((_, i) => (
            <FaStar key={i} className="w-4 h-4" />
          ))}
        </div>
        <span dir="ltr">{item.created_at.slice(0, 10)}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
