import { CreateGiftWrappingRequest } from "./gift-wrapping";

const toNumber = (value: any, defaultValue = 0) =>
  value === null || value === undefined || value === ""
    ? defaultValue
    : Number(value);

export const initialGiftWrappingForm: CreateGiftWrappingRequest = {
  name: "",
  description: "",
  price: 0,
  discount_type: "amount",
  discount_value: 0,
  image_id: null,
  image_file: null,
  status: "active",
  is_for_gift: true,
};

export function mapAPIToLocalGiftWrapping(
  data: GiftWrapping
): typeof initialGiftWrappingForm {
  return {
    name: data.name ?? "",
    description: data.description ?? "",
    price: toNumber(data.price),
    discount_type: (data.discount_type as "amount" | "percent") ?? "amount",
    discount_value: toNumber(data.discount_value),
    image_id: data.image?.id ?? null,
    image_file: null,
    status: data.status === "disable" ? "disable" : "active",
    is_for_gift: data.is_for_gift ?? true,
  };
}
