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