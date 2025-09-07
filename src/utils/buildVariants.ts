import { cartesian } from "./cartesian";

type AttributeValue = {
  attribute_id: number;
  value_id: number;
  label: string;
};

type VariantData = Record<string, any>;

export function buildVariants(
  product_id: number,
  attributes: any[],
  variantsData: VariantData[]
) {
  const variantAttributes = attributes.filter((attr) => attr.is_variant);

  const variantValues = variantAttributes.map((attr) =>
    attr.values.map((v: any) => ({
      attribute_id: v.attribute_id,
      value_id: v.id,
      label: v.value,
    }))
  );

  const allCombinations = cartesian(variantValues);

  return allCombinations.map((combo, index) => ({
    product_id,
    ...variantsData[index],
    attributes: combo as AttributeValue[],
  }));
}
