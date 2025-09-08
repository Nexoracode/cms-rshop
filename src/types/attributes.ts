export type Variant = {
  id: string | number;
  price: number;
  sku: string;
  stock: number;
  discount_percent?: number;
  discount_amount?: number;
};
