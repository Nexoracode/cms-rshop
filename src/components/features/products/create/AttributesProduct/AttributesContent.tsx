"use client";

import { useAttributesByGroup } from "@/hooks/api/attributes/useAttribute";
import { useGetAttributeValues } from "@/hooks/api/attributes/useAttributeValue";
import { useAttributesByGroupGroup } from "@/hooks/api/attributes/useAttributeGroup";
import { useState } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";
import AddNewAttributeValue from "./AttributeValue/AddNewAttributeValue";
import { useAddNewVariantProduct } from "@/hooks/api/attributes/useVariantProduct";
import { useSearchParams } from "next/navigation";
import { useCreateAttributeProduct } from "@/hooks/api/attributes/useAttributeProducts";
import FormActionButtons from "@/components/common/FormActionButtons";
import toast from "react-hot-toast";

type Props = {
  isDisabledEdit?: boolean;
  isActiveHeader?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialSelecteds = {
  attrGroupId: undefined as number | undefined,
  attrId: undefined as number | undefined,
  valueIds: [] as number[],
};

const generateSKU = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `sku-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

export const AttributesContent = ({
  isDisabledEdit = true,
  isActiveHeader = true,
  onOpenChange,
}: Props) => {
  const sp = useSearchParams();
  const editId = sp.get("edit_id");
  const page = editId && !isNaN(+editId) ? +editId : 1;

  const [selecteds, setSelecteds] = useState(initialSelecteds);
  const { data: attributeGroup } = useAttributesByGroupGroup();
  const { data: attributes } = useAttributesByGroup(selecteds.attrGroupId);
  const { data: attributeValues } = useGetAttributeValues(selecteds.attrId);
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const addNewSimapleAttribute = useCreateAttributeProduct();

  console.log("attributeGroup => ", attributeGroup);
  console.log("attributes => ", attributes);
  console.log("attributeValues => ", attributeValues);

  const isSubmitting =
    addNewVariantProductMutation.isPending || addNewSimapleAttribute.isPending;

  const resetInfos = () => {
    setSelecteds(initialSelecteds);
  };

  const resetAndClose = () => {
    resetInfos();
    onOpenChange?.(false);
  };

  const handleSubmit = async () => {
    const { attrId, attrGroupId, valueIds } = selecteds;

    if (
      !attrGroupId ||
      !attrId ||
      valueIds.length === 0 ||
      !attributes?.data?.length
    ) {
      toast.error("لطفاً گروه، ویژگی و مقدار را انتخاب کنید");
      return;
    }

    const attrIsVariant = attributes.data.find(
      (a: any) => a.id === attrId
    )?.is_variant;

    if (attrIsVariant) {
      const newAttr = {
        product_id: page,
        sku: generateSKU(),
        price: 10000,
        discount_amount: 0,
        discount_percent: 0,
        stock: 0,
        attributes: [{ attribute_id: attrId, value_ids: valueIds }],
      };

      addNewVariantProductMutation.mutate(newAttr, {
        onSuccess: resetAndClose,
      });
    } else {
      const newAttrSimple = {
        product_id: page,
        attributeId: attrId,
        valueIds: valueIds,
      };

      addNewSimapleAttribute.mutate(newAttrSimple, {
        onSuccess: resetAndClose,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AddNewAttrGroup
        attrGroup={attributeGroup?.data}
        isDisabledEdit={isDisabledEdit}
        onChange={(groupId) =>
          setSelecteds({
            attrGroupId: groupId,
            attrId: undefined,
            valueIds: [],
          })
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
        <FormActionButtons
          onCancel={resetAndClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  );
};
