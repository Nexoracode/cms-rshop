export type Stock = "money" | "percent";

export type Discount = "percent" | "amount";

export type MetaData = {
  items_per_page: number;
  total_items: number;
  current_page: number;
  total_pages: number;
  sort_by: [string, "ASC" | "DESC"][];
};

export type Media = {
  id: number;
  url: any;
  type: string;
}

export type SelectOption = {
  key: string | number;
  title: string;
  [key: string]: any;
};
