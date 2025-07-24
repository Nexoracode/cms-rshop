export type Stock = "money" | "percent";

export type ActionType = "add" | "edit" | "delete" | "view";

export type PreviewMeta = {
  file: File;
  pinned: boolean;
  id?: number;
};

export type SelectOption = {
  key: string | number;
  title: string;
  [key: string]: any;
};
