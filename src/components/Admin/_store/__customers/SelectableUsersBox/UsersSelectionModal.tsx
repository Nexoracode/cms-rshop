// components/Admin/_products/SelectableProductsBox/ProductSelectionModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Spinner } from "@heroui/react";
import DynamicModal from "@/components/Helper/DynamicModal";
import { useGetAllUsers } from "@/hooks/api/users/useUsers";
import { TbUsers } from "react-icons/tb";
import UsersFilter from "../UsersFilter";
import UserInfoCard from "../UserInfoCard";

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  // now returns array of product objects (not only ids)
  onConfirm: (selectedProducts: any[]) => void;
  selectedIds?: number[]; // optional initial selection by id
};

const UsersSelectionModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedIds = [],
}) => {
  // map of selected products by id
  const [selectedMap, setSelectedMap] = useState<Record<number, any>>({});
  const [selectedOrder, setSelectedOrder] = useState<number[]>(selectedIds);

  const { data: usersResponse, isLoading } = useGetAllUsers(1);

  const users = usersResponse?.data?.items ?? [];

  useEffect(() => {
    if (!isOpen) return;

    // باز شدن مدال → ریست انتخاب‌ها از props
    const initialMap: Record<number, any> = {};
    selectedIds.forEach((id) => {
      const existing = users.find((p: any) => p.id === id);
      if (existing) initialMap[id] = existing;
    });

    setSelectedOrder(selectedIds);
    setSelectedMap(initialMap);
  }, [isOpen, selectedIds, users]);

  const handleSelect = (product: any, checked: boolean) => {
    setSelectedOrder((prev) =>
      checked
        ? [...new Set([...prev, product.id])]
        : prev.filter((id) => id !== product.id)
    );

    setSelectedMap((prev) => {
      const copy = { ...prev };
      if (checked) copy[product.id] = product;
      else delete copy[product.id];
      return copy;
    });
  };

  const handleConfirm = () => {
    // preserve order using selectedOrder
    const selectedProducts = selectedOrder
      .map((id) => selectedMap[id])
      .filter(Boolean);
    onConfirm(selectedProducts);
    // optionally we can clear selection after confirm, but leave it to parent
  };

  return (
    <DynamicModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="انتخاب کاربران"
      confirmText="تأیید انتخاب"
      cancelText="لغو"
      confirmColor="secondary"
      confirmVariant="solid"
      onConfirm={handleConfirm}
      icon={<TbUsers className="text-2xl" />}
      size="3xl"
    >
      <div className="flex flex-col gap-4">
        <UsersFilter />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Spinner label="در حال بارگذاری کاربران..." color="secondary" />
          </div>
        ) : users.length ? (
          <div className="flex flex-col gap-4">
            {users.map((user: any) => (
              <UserInfoCard
                key={user.id}
                infos={user}
                selectedIds={selectedOrder}
                onSelect={(id, sel, prod) =>
                  handleSelect(prod ?? user, !!sel)
                }
                disableAction
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            کاربری برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </DynamicModal>
  );
};

export default UsersSelectionModal;
