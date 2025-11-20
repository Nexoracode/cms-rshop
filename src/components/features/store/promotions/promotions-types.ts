// ------------------------------
// Action Types
// ------------------------------
export type PromotionActionType =
  | { type: "percent_discount"; value: number }
  | { type: "amount_discount"; value: number }
  | { type: "free_shipping" }
  | { type: "next_order_coupon"; meta: { reward_amount: number } };

// ------------------------------
// Condition Types
// ------------------------------
export type PromotionConditionType =
  | { type: "min_order_amount"; min_amount: number }
  | { type: "product"; product_ids: number[] }
  | { type: "category"; category_ids: number[] }
  | { type: "variant"; variant_ids: number[] }
  | { type: "user"; user_ids: number[] }
  | { type: "first_order" };

// ------------------------------
// Base Promotion (Core Fields)
// ------------------------------
export type PromotionBase = {
  id?: number;
  name: string;
  code?: string | null;
  type:
    | "coupon"
    | "flash_deal"
    | "free_shipping"
    | "first_order"
    | "next_order_reward";
  actions: PromotionActionType[];
  conditions?: PromotionConditionType[];
  starts_at?: string | null;
  ends_at?: string | null;
  usage_limit?: number;
  used_count?: number;
  is_active?: boolean;
  created_at?: string;
  max_discount_amount?: number;
};

// ------------------------------
// API Payload (POST / PATCH)
// ------------------------------
export type PromotionAPI = Omit<
  PromotionBase,
  "id" | "used_count" | "created_at"
>;

// ------------------------------
// Promotion Sort By Options
// ------------------------------
export type PromotionSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "createdAt:ASC"
  | "createdAt:DESC"
  | "startDate:ASC"
  | "startDate:DESC"
  | "endDate:ASC"
  | "endDate:DESC"
>;
