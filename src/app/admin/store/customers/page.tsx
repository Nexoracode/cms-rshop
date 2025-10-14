"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import UserInfoCard from "@/components/Admin/_store/__customers/UserInfoCard";
import UsersFilter from "@/components/Admin/_store/__customers/UsersFilter";
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import AppPagination from "@/components/Helper/AppPagination";
import { useGetAllUsers } from "@/hooks/api/users/useUsers";

type Props = {
  onSelectUser: (id: number) => void;
  page: number;
};

const UsersListPage = () => {
  const { data: users, isLoading } = useGetAllUsers(1);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <UsersFilter />

      <Card className="shadow-md">
        <CardBody className="p-4 flex flex-col gap-6">
          {isLoading ? (
            <LoadingApiCall />
          ) : users?.data?.items?.length ? (
            <div className="flex flex-col gap-4">
              {users.data.items.map((user: any) => (
                <UserInfoCard
                  key={user.id}
                  infos={user}
                  disableSelect
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-6">
              فعلا هنوز کاربری ثبت نام نکرده است
            </p>
          )}
        </CardBody>
      </Card>

      <AppPagination meta={users?.data?.meta} />

      <AddNewCustomerModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default UsersListPage;
