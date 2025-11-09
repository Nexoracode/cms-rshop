"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingStarsProps = {
  rating: number; // مثل 3.5 یا 4 یا 2.8
  max?: number; // پیش‌فرض 5
  size?: number; // سایز آیکون‌ها (اختیاری)
  className?: string;
  showNumber?: boolean; // نمایش عدد کنار ستاره
};

const RatingStars = ({
  rating,
  max = 5,
  size = 16,
  className = "text-yellow-500",
  showNumber = true,
}: RatingStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {showNumber && (
        <span className="text-gray-600 text-sm">{rating.toFixed(1)}</span>
      )}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FaStar key={`full-${i}`} size={size} />
        ))}

        {hasHalfStar && (
          <FaStarHalfAlt
            key="half"
            size={size}
            className="transform scale-x-[-1]"
          />
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <FaRegStar key={`empty-${i}`} size={size} />
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
