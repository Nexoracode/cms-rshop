"use client";

import React, { useState } from "react";
import { ActionButton } from "../ui/buttons/ActionButton";
import { LuTrash2 } from "react-icons/lu";
import BaseModal from "@/components/ui/modals/BaseModal";

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

  const handleConfirmDelete = () => {
    onDelete();
    setIsOpenDeleteModal(false);
  };

  return (
    <BaseModal
      isOpen={isOpenDeleteModal}
      onOpenChange={setIsOpenDeleteModal}
      title={deleteTitle}
      trigger={
        <ActionButton
          icon={<LuTrash2 size={18} />}
          onClick={() => setIsOpenDeleteModal(true)}
          className="hover:text-red-700 hover:bg-red-100 hover:scale-105 hover:rotate-45"
        />
      }
      onConfirm={handleConfirmDelete}
      icon={<LuTrash2 className="text-danger-600 text-xl" />}
    >
      {deleteMessage}
    </BaseModal>
  );
};

export default DeleteButton;
