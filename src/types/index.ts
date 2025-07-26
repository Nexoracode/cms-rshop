export type Stock = "money" | "percent";

export type ActionType = "add" | "edit" | "delete" | "view";

export type PreviewMeta = {
  id: number;
  file: File;
  pinned: boolean;
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
