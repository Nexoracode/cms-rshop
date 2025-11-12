"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "../CustomersFilter";
import CustomerCard from "../CustomerCard";
import AddNewCustomerModal from "../modals/AddNewCustomerModal";
import SelectableCard from "@/components/ui/SelectableCard";
import { FiUsers } from "react-icons/fi";
import { useGetAllUsers, UserSortBy } from "@/core/hooks/api/users/useUsers";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useCustomersSelection } from "./CustomersSelectionContext";

const UsersSelectionModal: React.FC = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();
  const { selectedCustomers, addCustomer, removeCustomer } = useCustomersSelection();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  // فقط id های انتخاب شده
  const selectedIds = useMemo(
    () => selectedCustomers.map((u) => u.id),
    [selectedCustomers]
  );

  const handleSelectionChange = (user: any, selected: boolean) => {
    if (selected) addCustomer(user);
    else removeCustomer(user.id);
  };

  return (
    <BaseModal
      title="انتخاب کاربران"
      icon={<TbUsers />}
      isActiveFooter={false}
      size="3xl"
    >
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
            selectedIds={selectedIds}
            onSelectionChange={(id, selected) =>
              handleSelectionChange(user, selected)
            }
          >
            <CustomerCard infos={user} disableAction />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default UsersSelectionModal;
