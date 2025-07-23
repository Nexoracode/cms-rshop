import { Product } from "../__create/product-type";

export type CategoryPayload = {
  id?: string;
  title: string;
  slug: string;
  discount: string;
  parentId: number;
  mediaId: string;
};

export type CategoryMedia = {
  id: number;
  url: string;
  type: string;
  alt_text: string | null;
  category_id: number | null;
  created_at: string;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  discount: string;
  level: number;
  is_delete: boolean;
  media: CategoryMedia | null;
  products: Product[];
  children: Category[]; // recursive type
}