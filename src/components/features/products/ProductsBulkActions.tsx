"use client";

import { Button, useDisclosure } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import BulkUpdateProductsModal from "@/components/features/products/modals/BulkUpdateProductsModal/BulkUpdateProductsModal";
import {
  useBulkUpdateProducts,
  useDeleteGroupProduct,
} from "@/hooks/api/products/useProduct";

type ProductsBulkActionsProps = {
  selectedItems: number[];
  onClearSelection: () => void;
};

const ProductsBulkActions = ({
  selectedItems,
  onClearSelection,
}: ProductsBulkActionsProps) => {
  const deleteGroupProduct = useDeleteGroupProduct();
  const bulkUpdateProducts = useBulkUpdateProducts();

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
          <Button
            color="default"
            variant="flat"
            onPress={onClearSelection}
            size="sm"
          >
            لغو انتخاب
          </Button>
          <Button
            color="secondary"
            variant="flat"
            onPress={onOpenBulk}
            size="sm"
          >
            بروزرسانی گروهی
          </Button>
          <BaseModal
            title="حذف محصولات انتخاب‌شده"
            confirmText="بله، حذف شود"
            cancelText="لغو"
            confirmColor="danger"
            triggerProps={{
              title: "حذف گروهی",
              variant: "flat",
              className: "text-red-600 bg-red-100"
            }}
            onConfirm={handleDelete}
          >
            با حذف محصولات انتخاب‌شده، بازگردانی آن‌ها ممکن نیست. آیا مطمئن
            هستید؟
          </BaseModal>
        </div>
      </div>

      <BulkUpdateProductsModal
        isOpen={isOpenBulk}
        onOpenChange={onOpenChangeBulk}
        selectedCount={selectedItems.length}
        onConfirm={handleBulkUpdate}
      />
    </>
  );
};

export default ProductsBulkActions;
