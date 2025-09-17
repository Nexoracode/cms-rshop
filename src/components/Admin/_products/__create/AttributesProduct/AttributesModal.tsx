"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { TbSettings } from "react-icons/tb";
import { useGetAllAttribute } from "@/hooks/attributes/useAttribute";
import { useGetAttributeValues } from "@/hooks/attributes/useAttributeValue";
import { useGetAllAttributeGroup } from "@/hooks/attributes/useAttributeGroup";
import { useState } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";
import AddNewAttributeValue from "./AttributeValue/AddNewAttributeValue";
import { useAttributeContext } from "../../context/AttributeContext";
import { usePaginationParams } from "@/hooks/usePaginationParams";
import { useAddNewVariantProduct } from "@/hooks/attributes/useVariantProduct";

type AttributeData = {
  attr: Record<string, any>;
  values: Record<string, any>[];
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  isDisabledEdit?: boolean;
};

const initialSelecteds = {
  attrGroupId: 0 as undefined | number,
  attrId: 0 as undefined | number,
  valueIds: [] as any,
};

const AttributesModal = ({
  isOpen,
  onOpenChange,
  isDisabledEdit = true,
}: Props) => {
  //
  const [selecteds, setSelecteds] = useState(initialSelecteds);
  //? Hooks
  //const { attrInfos, setAttrInfos } = useAttributeContext();
  const { page } = usePaginationParams("edit_id");
  const { data: attributeGroup } = useGetAllAttributeGroup();
  const { data: attributes } = useGetAllAttribute(selecteds.attrGroupId);
  const { data: attributeValues } = useGetAttributeValues(selecteds.attrId);
  const addNewVariantProductMutation = useAddNewVariantProduct();

  const handleSubmit = async () => {
    const { attrId, attrGroupId, valueIds } = selecteds;
    if (!attributes?.data || !attributeValues?.data || !attrGroupId) return;
    //
    const attrIsVariant = attributes.data.find(
      (attr: Record<string, any>) => attr.id === attrId
    ).is_variant;

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
          resetModalInfos();
        },
      });
    }
  };

  const resetModalInfos = () => {
    onOpenChange();
    setSelecteds(initialSelecteds);
  };

  return (
    <Modal dir="rtl" isOpen={isOpen} onOpenChange={resetModalInfos}>
      <ModalContent className="max-w-[700px] w-full">
        {(onClose) => (
          <>
            <ModalHeader className="w-full px-8 flex items-center justify-between">
              <p className="font-normal text-[16px] text-gray-600">
                ویژگی های محصول مورد نظر را کنترل کنید
              </p>
              <Button
                variant="flat"
                className="text-xl"
                size="sm"
                onPress={() => {}}
              >
                <TbSettings />
              </Button>
            </ModalHeader>
            <ModalBody className="flex flex-col gap-8 px-8">
              <AddNewAttrGroup
                attrGroup={attributeGroup?.data}
                isDisabledEdit={isDisabledEdit}
                onChange={(groupId) => {
                  setSelecteds({
                    attrGroupId: groupId,
                    attrId: 0,
                    valueIds: [],
                  });
                }}
              />
              <AddNewAttribute
                onChange={(value) =>
                  setSelecteds((prev) => ({ ...prev, attrId: value }))
                }
                attr={attributes?.data}
                selectedAttrId={selecteds.attrId}
                isDisabledEdit={isDisabledEdit}
              />
              <AddNewAttributeValue
                attrValues={attributeValues?.data}
                onChange={(ids) =>
                  setSelecteds((prev) => ({ ...prev, valueIds: ids }))
                }
                selectedAttrId={selecteds.attrId}
                selectedValues={selecteds.valueIds}
                isDisabledEdit={isDisabledEdit}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                className="w-full"
                variant="solid"
                color="secondary"
                onPress={handleSubmit}
                isDisabled={!selecteds.valueIds.length}
                isLoading={addNewVariantProductMutation.isPending}
              >
                ثبت تغیرات
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AttributesModal;
