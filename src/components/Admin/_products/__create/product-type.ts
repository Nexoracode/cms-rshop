export type ProductPayload = {
  name: string;
  price: number;
  stock: number;
  isLimitedStock: boolean;
  categoryId: number;
  discountAmount: number;
  discountPercent: number;
  isFeatured: boolean;
  weight: number;
  weightUnit: "کیلوگرم" | "گرم";
  isSameDayShipping: boolean;
  requiresPreparation: boolean;
  preparationDays: number;
  description: string;
  isVisible: boolean;
  mediaIds: number[];
  media_pinned_id: number;
}
