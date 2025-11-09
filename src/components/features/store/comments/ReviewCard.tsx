"use client";

import RatingStars from "@/components/common/RatingStars";
import DeleteButton from "@/components/shared/DeleteButton";
import BaseCard from "@/components/ui/BaseCard";
import OptionButton from "@/components/ui/buttons/OptionButton";
import { toPersianDate } from "@/core/utils/dateHelpers";
import { BiCommentDetail } from "react-icons/bi";

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

  //const { mutate: deleteReview } = useDeleteReview();

  return (
    <BaseCard
      className="flex flex-col gap-3 p-1 max-w-[377px] w-full hover-reveal-parent"
      bodyClassName="overflow-hidden p-2.5 cursor-auto"
    >
      {/* دکمه حذف */}
      <div className="hover-reveal-child">
        <DeleteButton onDelete={() => {}} />
      </div>

      {/* محصول */}
      <div className="flex items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl object-cover w-16 h-16"
        />
        <div className="w-full h-full flex flex-col justify-between gap-1 py-1">
          <h3 className="line-clamp-1 truncate w-56">{product.name}</h3>
          <div className="flex items-center justify-between gap-2">
            <span className="text-gray-700">
              {formatPrice(product.final_price)} تومان
            </span>
            <div className="flex items-center gap-2">
              {product.discount_percent > 0 && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                  {product.discount_percent}% تخفیف
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 p-2 border mt-3 rounded-xl">
        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2">
          <BiCommentDetail className="text-xl" />
          <span>{toPersianDate(item.created_at)}</span>
        </div>
        <div className="h-16 overflow-y-auto pt-3 text-sm text-gray-700 leading-relaxed px-1.5">
          {item.comment}
        </div>
        <div className="flex items-center justify-between mt-1 ml-1">
          <RatingStars rating={item.rating} size={16} />
          <OptionButton title="تایید کامنت" size="sm" />
        </div>
      </div>
    </BaseCard>
  );
};

export default ReviewCard;
