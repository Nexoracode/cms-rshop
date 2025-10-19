export type Order = {
  id: number;
  created_at: string;
  status: "pending" | "paid" | "canceled" | string;
  total: string;
  items: {
    id: number;
    product: {
      id: number;
      name: string;
      price: string;
    };
  }[];
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    addresses: {
      province: string;
      city: string;
    }[];
  };
};

export type StatusOrder =
  | "pending"
  | "paid"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "refunded"
  | "failed";

export type OrderData = {
  id: number;
  status: StatusOrder;
  subtotal: string;
  discount_total: string;
  total: string;
  payment_gateway_ref: string | null;
  coupon_code: string | null;
  coupon_discount_amount: string;
  is_manual: boolean;
  note: string | null;
  created_at: string;
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    phone: string;
    is_phone_verified: boolean;
    email: string | null;
    is_active: boolean;
    last_login_at: string;
    avatar_url: string | null;
    media_id: number | null;
    created_at: string;
  };
};

export type OrderSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "createdAt:ASC"
  | "createdAt:DESC"
  | "total:ASC"
  | "total:DESC"
>;
