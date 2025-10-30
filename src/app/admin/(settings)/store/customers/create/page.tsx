"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/hooks/api/users/useUsers";
import UserInitialForm from "@/components/features/store/customers/UserInitialForm";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";

const UserDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;

  const { data: oneUser } = useGetOneUser(userId);

  if (!oneUser?.data) return <LoadingApiCall />;

  return (
    <UserInitialForm
      user={oneUser.data}
    />
  );
};

export default UserDetailPage;
