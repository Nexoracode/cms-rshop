// types/attribute-tree.ts
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

export type AttributeTree = AttributeNode[];
