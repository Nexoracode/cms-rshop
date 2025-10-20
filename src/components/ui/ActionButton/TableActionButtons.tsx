"use client";

import React, { useState } from "react";
import { ActionButton } from "./ActionButton";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import DynamicModal from "@/components/shared/DynamicModal";

type TableActionButtonsProps = {
  onEdit?: () => void;
  editRoute?: string;
  onDelete?: (item?: any) => void;
  deleteItem?: any;
  deleteTitle?: string;
  deleteMessage?: string;
  className?: string;
};

export const TableActionButtons = ({
  onEdit,
  editRoute,
  onDelete,
  deleteItem,
  deleteTitle = "تایید حذف",
  deleteMessage = "آیا مطمئن هستید می‌خواهید این آیتم را حذف کنید؟",
  className,
}: TableActionButtonsProps) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    if (deleteItem) setIsOpenDeleteModal(true);
    else onDelete?.(deleteItem);
  };

  const handleConfirmDelete = () => {
    if (deleteItem) onDelete?.(deleteItem);
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <div className={`flex gap-2 ${className || ""}`}>
        {onEdit || editRoute ? (
          <ActionButton
            icon={<TbEdit size={18} />}
            route={editRoute}
            onClick={onEdit}
          />
        ) : (
          ""
        )}

        {onDelete ? (
          <ActionButton
            icon={<RiDeleteBin5Line size={18} />}
            onClick={handleDeleteClick}
          />
        ) : (
          ""
        )}
      </div>

      {deleteItem && onDelete ? (
        <DynamicModal
          isOpen={isOpenDeleteModal}
          onOpenChange={setIsOpenDeleteModal}
          title={deleteTitle}
          onConfirm={handleConfirmDelete}
          confirmColor="danger"
        >
          {deleteMessage}
        </DynamicModal>
      ) : (
        ""
      )}
    </>
  );
};
