"use client";

import React, { useState } from "react";
import { ActionButton } from "../ui/buttons/ActionButton";
import DynamicModal from "@/components/ui/modals/BaseModal";
import { LuTrash2 } from "react-icons/lu";

type DeleteButtonProps = {
  onDelete: () => void;
  deleteTitle?: string;
  deleteMessage?: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  deleteTitle = "تایید حذف",
  deleteMessage = "آیا مطمئن هستید می‌خواهید این آیتم را حذف کنید؟",
}) => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setIsOpenDeleteModal(true)
  };

  const handleConfirmDelete = () => {
    onDelete();
    setIsOpenDeleteModal(false);
  };

  return (
    <>
      <ActionButton
        icon={<LuTrash2 size={18} />}
        onClick={handleDeleteClick}
        className="hover:text-red-700 hover:bg-red-100 hover:scale-105 hover:rotate-45"
      />

      <DynamicModal
        isOpen={isOpenDeleteModal}
        onOpenChange={setIsOpenDeleteModal}
        title={deleteTitle}
        onConfirm={handleConfirmDelete}
        confirmColor="danger"
        icon={<LuTrash2 className="text-danger-600 text-xl"/>}
      >
        {deleteMessage}
      </DynamicModal>
    </>
  );
};

export default DeleteButton;
