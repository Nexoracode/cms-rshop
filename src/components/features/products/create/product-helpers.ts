// utils/product-mappers.ts
import type { ProductResponse, CreateProductRequest } from "./types/product";

export function mapAPIToLocalProduct(p: ProductResponse): CreateProductRequest {
  return {
    name: p.name ?? "",
    price: typeof p.price === "string" ? Number(p.price || 0) : p.price ?? 0,
    stock: p.stock ?? 0,
    is_limited_stock: !!p.is_limited_stock,
    category_id: p.category_id ?? 0,
    discount_amount:
      p.discount_amount === null ? 0 : Number(p.discount_amount ?? 0),
    discount_percent:
      p.discount_percent === null ? 0 : Number(p.discount_percent ?? 0),
    is_featured: !!p.is_featured,
    weight: Number(p.weight ?? 0),
    weight_unit: p.weight_unit ?? "کیلوگرم",
    is_same_day_shipping: !!p.is_same_day_shipping,
    requires_preparation: !!p.requires_preparation,
    preparation_days:
      p.preparation_days === null ? 0 : Number(p.preparation_days ?? 0),
    description: p.description ?? "",
    order_limit: Number(p.order_limit ?? 0),
    is_visible: !!p.is_visible,
    // prefer media_ids if present, else use medias -> map ids
    media_ids:
      (p.media_ids && p.media_ids.length > 0)
        ? p.media_ids
        : (p.medias && p.medias.length > 0 ? p.medias.map((m) => m.id) : []),
    media_pinned_id: p.media_pinned_id ?? null,
    helper_id: p.helper ? p.helper.id : (p.helper_id ?? null),
    brand_id: p.brand ? p.brand.id : (p.brand_id ?? null),
  };
}
