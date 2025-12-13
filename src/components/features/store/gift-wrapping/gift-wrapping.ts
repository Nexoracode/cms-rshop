export type CreateGiftWrappingRequest = {
  name: string;
  description: string;
  price: number;
  discount_type: "amount" | "percent";
  discount_value: number;
  image_id: number | null;
  image_file: File | null;
  status: boolean;
  is_for_gift: boolean;
};