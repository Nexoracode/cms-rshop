const toNumber = (value: any, defaultValue = 0) =>
  value === null || value === undefined || value === ""
    ? defaultValue
    : Number(value);

export function mapAPIToLocalGiftWrapping(data: any) {
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
