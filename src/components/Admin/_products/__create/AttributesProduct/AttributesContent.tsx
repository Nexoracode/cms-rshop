"use client";

import { Button } from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import { useGetAllAttribute } from "@/hooks/attributes/useAttribute";
import { useGetAttributeValues } from "@/hooks/attributes/useAttributeValue";
import { useGetAllAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { useState } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";
import AddNewAttributeValue from "./AttributeValue/AddNewAttributeValue";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useAddNewVariantProduct } from "@/hooks/attributes/useVariantProduct";
import { useAddNewSimapleAttribute } from "@/hooks/attributes/useSimpleAttribute";

type Props = {
  isDisabledEdit?: boolean;
  onSubmitted?: () => void;
  isActiveHeader?: boolean;
};

const initialSelecteds = {
  attrGroupId: 0 as undefined | number,
  attrId: 0 as undefined | number,
  valueIds: [] as any,
};

export const AttributesContent = ({
  isDisabledEdit = true,
  onSubmitted,
  isActiveHeader = true,
}: Props) => {
  const [selecteds, setSelecteds] = useState(initialSelecteds);

  const { page } = usePaginationParams("edit_id");
  const { data: attributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(selecteds.attrGroupId);
  const { data: attributeValues } = useGetAttributeValues(selecteds.attrId);

  const addNewVariantProductMutation = useAddNewVariantProduct();
  const addNewSimapleAttribute = useAddNewSimapleAttribute();

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
          onSubmitted?.();
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
          onSubmitted?.();
        },
      });
    }
  };

  const resetInfos = () => {
    setSelecteds(initialSelecteds);
  };

  return (
    <div className="flex flex-col gap-8">
      {isActiveHeader ? (
        <div className="flex items-center justify-between">
          <p className="font-normal text-[16px] text-gray-600">
            ویژگی‌های محصول مورد نظر را کنترل کنید
          </p>
          <Button variant="flat" className="text-xl" size="sm">
            <TbSettings />
          </Button>
        </div>
      ) : (
        ""
      )}

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
    </div>
  );
};
