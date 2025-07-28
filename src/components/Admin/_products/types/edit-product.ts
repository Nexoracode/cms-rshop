import { Media, MetaData } from "@/types";

type ProductItem = {
  id: number;
  category: {
    id: number;
    title: string;
  };
  variants: any[];
  medias: Media[];
  media_pinned: Media;
  is_visible: boolean;
  name: string;
  price: string;
  stock: number;
  helper: {
    id: number,
    title: string,
    description: string,
    image: string
  }
  created_at: string;
};

export type GETProduct = {
  items: ProductItem[];
  meta: MetaData;
};
