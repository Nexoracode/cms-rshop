export type Attribute = { id: string, label: string }

export type AttributeData = {
  id: string;
  attr: Attribute;
  type: string;
  isVariable: boolean;
  subs?: Attribute[];
};