"use client";

import { Button, useDisclosure } from "@heroui/react";
import DynamicModal from "@/components/ui/modals/BaseModal";
import BulkUpdateProductsModal from "@/components/features/products/modals/BulkUpdateProductsModal/BulkUpdateProductsModal";
import { useBulkUpdateProducts, useDeleteGroupProduct } from "@/hooks/api/products/useProduct";

type ProductsBulkActionsProps = {
  selectedItems: number[];
  onClearSelection: () => void;
};

const ProductsBulkActions = ({ selectedItems, onClearSelection }: ProductsBulkActionsProps) => {
  const deleteGroupProduct = useDeleteGroupProduct();
  const bulkUpdateProducts = useBulkUpdateProducts();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenBulk,
    onOpen: onOpenBulk,
    onOpenChange: onOpenChangeBulk,
  } = useDisclosure();

  const handleDelete = () => {
    deleteGroupProduct.mutate(
      { ids: selectedItems },
      { onSuccess: () => onClearSelection() }
    );
  };

  const handleBulkUpdate = (changed: any) => {
    bulkUpdateProducts.mutate(
      { ids: selectedItems, ...changed },
      { onSuccess: () => onClearSelection() }
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 -mt-2 justify-between gap-4 text-start p-2">
        <p className="pr-2">عملیات گروهی</p>
        <div className="flex flex-wrap gap-2 w-full sm:w-fit">
          <Button color="danger" variant="flat" onPress={onOpen} size="sm">
            حذف انتخاب‌شده‌ها
          </Button>
          <Button color="secondary" variant="flat" onPress={onOpenBulk} size="sm">
            بروزرسانی گروهی
          </Button>
          <Button color="default" variant="flat" onPress={onClearSelection} size="sm">
            لغو انتخاب
          </Button>
        </div>
      </div>

      <BulkUpdateProductsModal
        isOpen={isOpenBulk}
        onOpenChange={onOpenChangeBulk}
        selectedCount={selectedItems.length}
        onConfirm={handleBulkUpdate}
      />

      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleDelete}
      >
        <p className="leading-7 text-danger-600">
          با حذف محصولات انتخاب‌شده، بازگردانی آن‌ها ممکن نیست. آیا مطمئن هستید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default ProductsBulkActions;
