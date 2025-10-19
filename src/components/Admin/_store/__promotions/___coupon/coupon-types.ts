// Helper Types
type ObjArray = Record<string, any>[];
type NumArray = number[];

// API Payload (POST/PATCH)
export type CouponAPI = {
  allowed_user_ids?: NumArray;
  allowed_product_ids?: NumArray;
  allowed_category_ids?: NumArray;
};

// Base Coupon
export type CouponBase = {
  id?: number;
  code: string;
  type: "percent" | "fixed";
  amount: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  start_date?: string | null;
  end_date?: string | null;
  usage_limit?: number;
  is_active?: boolean;
  for_first_order?: boolean;
  created_at?: string;
};

// Main combined model
export type CouponPayload = CouponBase & Partial<CouponAPI>;
export type CouponFormType = CouponBase & Partial<CouponAPI> & {
  allowed_users: ObjArray;
  allowed_products: ObjArray;
  allowed_categories: ObjArray;
};

export type CouponSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "createdAt:ASC"
  | "createdAt:DESC"
  | "startDate:ASC"
  | "startDate:DESC"
  | "endDate:ASC"
  | "endDate:DESC"
>;
