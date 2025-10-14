"use client";

import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import UsersFilter from "@/components/Admin/_store/__customers/UsersFilter";
import CardContent from "@/components/Admin/CardContent";
import UserInfoCard from "@/components/Admin/_store/__customers/UserInfoCard";
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import AppPagination from "@/components/Helper/AppPagination";
import { useGetAllUsers } from "@/hooks/api/users/useUsers";

const UsersListPage = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const { data: users, isLoading } = useGetAllUsers(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="flex flex-col gap-6">
      <UsersFilter />

      <CardContent
        title="لیست کاربران"
        icon={<span className="text-2xl">👥</span>}
        isLoading={isLoading}
        datas={users}
        onAdd={onOpen}
        isExistItems={!!users?.data?.items?.length}
        searchInp={false}
      >
        {isLoading && <LoadingApiCall />}

        <div className="flex flex-col justify-center items-center gap-4">
          {users?.data?.items?.map((user: any) => (
            <UserInfoCard
              key={user.id}
              infos={user}
              selectedIds={selectedUsers}
              onSelect={(id, selected) =>
                setSelectedUsers((prev) =>
                  selected ? [...prev, id] : prev.filter((x) => x !== id)
                )
              }
            />
          ))}
        </div>
      </CardContent>

      <AppPagination meta={users?.data?.meta} />

      <AddNewCustomerModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </section>
  );
};

export default UsersListPage;
