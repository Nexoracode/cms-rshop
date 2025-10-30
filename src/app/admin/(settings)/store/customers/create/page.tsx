"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/hooks/api/users/useUsers";
import UserInitialForm from "@/components/features/store/customers/UserInitialForm";

const UserDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;

  const { data: oneUser } = useGetOneUser(userId);

  return (
    <UserInitialForm
      user={oneUser?.data ?? []}
    />
  );
};

export default UserDetailPage;
