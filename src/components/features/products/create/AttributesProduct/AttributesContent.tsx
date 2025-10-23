"use client";

import { Button } from "@heroui/react";
import { useGetAllAttribute } from "@/hooks/api/attributes/useAttribute";
import { useGetAttributeValues } from "@/hooks/api/attributes/useAttributeValue";
import { useGetAllAttributeGroup } from "@/hooks/api/attributes/useAttributeGroup";
import { useState } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";
import AddNewAttributeValue from "./AttributeValue/AddNewAttributeValue";
import { useAddNewVariantProduct } from "@/hooks/api/attributes/useVariantProduct";
import { useSearchParams } from "next/navigation";
import { useAddNewAttributeProduct } from "@/hooks/api/attributes/useAttributeProducts";

type Props = {
  isDisabledEdit?: boolean;
  isActiveHeader?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialSelecteds = {
  attrGroupId: 0 as undefined | number,
  attrId: 0 as undefined | number,
  valueIds: [] as any,
};

export const AttributesContent = ({
  isDisabledEdit = true,
  isActiveHeader = true,
  onOpenChange
}: Props) => {
  const sp = useSearchParams();
  const page = +(sp.get("edit_id") ?? 1);
  const [selecteds, setSelecteds] = useState(initialSelecteds);
  const { data: attributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(selecteds.attrGroupId);
  const { data: attributeValues } = useGetAttributeValues(selecteds.attrId);
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const addNewSimapleAttribute = useAddNewAttributeProduct();

  const handleSubmit = async () => {
    const { attrId, attrGroupId, valueIds } = selecteds;
    if (!attributes?.data || !attributeValues?.data || !attrGroupId) return;

    const attrIsVariant = attributes.data.find(
      (a: any) => a.id === attrId
    )?.is_variant;

    if (attrIsVariant) {
      const newAttr = {
        product_id: page,
        sku: crypto.randomUUID(),
        price: 10000,
        discount_amount: 0,
        discount_percent: 0,
        stock: 0,
        attributes: [{ attribute_id: attrId, value_ids: valueIds }],
      };

      addNewVariantProductMutation.mutate(newAttr, {
        onSuccess: () => {
          resetInfos();
          onOpenChange?.(false);
        },
      });
    } else {
      const newAttrSimple = {
        product_id: page,
        attributeId: selecteds.attrId,
        valueIds: valueIds,
      };

      addNewSimapleAttribute.mutate(newAttrSimple, {
        onSuccess: () => {
          resetInfos();
        },
      });
    }
  };

  const resetInfos = () => {
    setSelecteds(initialSelecteds);
  };

  return (
    <div className="flex flex-col gap-6">
      <AddNewAttrGroup
        attrGroup={attributeGroup?.data}
        isDisabledEdit={isDisabledEdit}
        onChange={(groupId) =>
          setSelecteds({ attrGroupId: groupId, attrId: 0, valueIds: [] })
        }
      />

      <AddNewAttribute
        onChange={(value) =>
          setSelecteds((prev) => ({ ...prev, attrId: value }))
        }
        attr={attributes?.data}
        selectedAttrId={selecteds.attrId}
        isDisabledEdit={isDisabledEdit}
      />

      {selecteds.attrId ? (
        <AddNewAttributeValue
          attrValues={attributeValues?.data}
          onChange={(ids) =>
            setSelecteds((prev) => ({ ...prev, valueIds: ids }))
          }
          selectedAttrId={selecteds.attrId}
          selectedValues={selecteds.valueIds}
          isDisabledEdit={isDisabledEdit}
        />
      ) : null}
      {isActiveHeader ? (
        <Button
          className="w-full"
          variant="solid"
          color="secondary"
          onPress={handleSubmit}
          isDisabled={!selecteds.valueIds.length}
          isLoading={addNewVariantProductMutation.isPending}
        >
          ثبت تغییرات
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
