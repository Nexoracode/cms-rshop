"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "@/components/features/store/customers/CustomersFilter";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
// Icons
import { UserSortBy, useGetAllUsers } from "@/hooks/api/users/useUsers";
import { FiUsers } from "react-icons/fi";
import { useListQueryParams } from "@/hooks/common/useListQueryParams";
import { useDisclosure } from "@heroui/react";

const Customers = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<CustomersFilter />}
      headerProps={{
        title: "لیست کاربران",
        icon: <FiUsers className="text-2xl" />,
        children: <AddNewCustomerModal isOpen={isOpen} onOpenChange={onOpenChange} />
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={users?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {users?.data?.items?.map((user: any) => (
        <CustomerCard key={user.id} infos={user} />
      ))}
    </UnifiedCard>
  );
};

export default Customers;
