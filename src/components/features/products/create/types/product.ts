import { Media } from "@/components/media/types";

export type ProductMedia = {
  id: number;
  url: string;
  type: string;
  alt_text: string | null;
  product_id: number | null;
  created_at: string;
};

export interface Product {
  id?: number;
  name: string;
  price: number;
  stock: number;
  helper_id?: number;
  brand_id?: number;
  is_same_day_shipping: boolean;
  requires_preparation: boolean;
  preparation_days: number | null;
  is_limited_stock: boolean;
  discount_amount?: number | null;
  discount_percent?: number | null;
  is_featured: boolean;
  weight: number;
  weight_unit: string;
  attribute_nodes?: any[];
  specifications?: any[];
  description: string | null;
  is_visible: boolean;
  category_id: number;
  created_at?: string;
  media_ids: number[];
  order_limit: number;
  media_pinned_id: number | null;
  medias?: Media[];
  media_pinned?: Record<string, any>;
  category?: Record<string, any>;
  updated_at?: string;
  variants?: any[];
  helper?: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
  brand?: {
    id: number;
    name: string;
    slug: string;
    logo: string;
  };
}
