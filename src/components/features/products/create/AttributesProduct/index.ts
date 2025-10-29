export type AttributeGroupPayload = {
  id?: number;
  name: string;
  slug: string;
  display_order: null | number;
};

export type AttributePayload = {
  id?: number;
  name: string;
  group_id: number | null;
  is_public: boolean;
  slug: string;
  type: AttributeTypes;
  display_order: number | null;
  is_variant: boolean;
};

export type AttributeValuePayload = {
  id?: number;
  value: string;
  attribute_id: number;
  display_color: string;
  is_active: boolean;
};

export type AttributeValue = {
  id: number;
  value: string;
  attribute_id: number;
  display_color: string;
  display_order: number | null;
  is_active: boolean;
};

export type Attribute = {
  id: number;
  is_important: boolean;
  name: string;
  slug: string;
  is_public: boolean;
  group_id: number;
  type: string;
  display_order: number | null;
  is_variant: boolean;
  values: AttributeValue[];
};

export type AttributeNode = {
  id: number;
  name: string;
  slug: string;
  display_order: number | null;
  attributes: Attribute[];
};

export type AttributeTypes =
  | "text"
  | "number"
  | "color"
  | "checkBox"
  | "radioButton"
  | "select"
  | "boolean";

export type AttributeTree = AttributeNode[];
