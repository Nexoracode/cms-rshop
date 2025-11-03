"use client";

import React from "react";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "./CustomersFilter";
import CustomerCard from "./CustomerCard";
import AddNewCustomerModal from "./modals/AddNewCustomerModal";
import SelectableCard from "@/components/ui/SelectableCard";
import { FiUsers } from "react-icons/fi";
import { useGetAllUsers, UserSortBy } from "@/hooks/api/users/useUsers";
import { useListQueryParams } from "@/hooks/common/useListQueryParams";

type Props = {
  selectedIds: (number | string)[];
  onSelectionChange: (user: any, selected: boolean) => void;
  initialCustomers?: (number | string)[];
};

const SelectableCustomersList: React.FC<Props> = ({
  selectedIds,
  onSelectionChange,
  initialCustomers = [],
}) => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  // ترکیب کاربران انتخاب‌شده + کاربران پیش‌فرض
  const mergedSelectedIds = Array.from(
    new Set([...initialCustomers, ...selectedIds])
  );

  return (
    <UnifiedCard
      searchFilter={<CustomersFilter />}
      headerProps={{
        title: "انتخاب کاربران",
        icon: <FiUsers className="text-2xl" />,
        children: <AddNewCustomerModal />,
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={users?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {users?.data?.items?.map((user: any) => (
        <SelectableCard
          key={user.id}
          id={user.id}
          selectedIds={mergedSelectedIds}
          onSelectionChange={(id, selected) =>
            onSelectionChange(user, selected)
          }
        >
          <CustomerCard infos={user} disableAction />
        </SelectableCard>
      ))}
    </UnifiedCard>
  );
};

export default SelectableCustomersList;
