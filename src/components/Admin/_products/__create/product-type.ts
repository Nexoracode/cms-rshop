export type ProductMedia = {
  id: number;
  url: string;
  type: string;
  alt_text: string | null;
  product_id: number | null;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  is_same_day_shipping: boolean;
  requires_preparation: boolean;
  preparation_days: number | null;
  is_limited_stock: boolean;
  discount_amount?: number | null;
  discount_percent?: number | null;
  is_featured: boolean;
  weight: number;
  weight_unit: string;
  description: string | null;
  is_visible: boolean;
  category_id: number;
  media_pinned_id: number;
  created_at: string;
  media: ProductMedia[];
  media_pinned: ProductMedia;
}