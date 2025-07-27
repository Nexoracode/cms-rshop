import { Product } from "./create-product";

export type InitInfosType = Pick<
  Product,
  | "category_id"
  | "name"
  | "price"
  | "stock"
  | "is_limited_stock"
  | "is_featured"
  | "discount_amount"
  | "discount_percent"
>;

export type MiddInfosType = Pick<
  Product,
  | "weight"
  | "weight_unit"
  | "is_same_day_shipping"
  | "requires_preparation"
  | "preparation_days"
>;