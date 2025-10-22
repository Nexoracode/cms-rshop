"use client";

import { useDisclosure } from "@heroui/react";
import CustomersFilter from "@/components/features/store/customers/CustomersFilter";
import EntityCard from "@/components/common/EntityCard/EntityCard";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import { useGetAllUsers, UserSortBy } from "@/hooks/api/users/useUsers";
import { FiUsers } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import BackToPage from "@/components/common/BackToPage";

const UsersListPage = () => {
  const searchParams = useSearchParams();
  // get page

  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // Filters
  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    // 'entries()' را به آرایه تبدیل می‌کنیم تا dependency string کار کند
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    // cast به type مناسب (همان ProductFilter)
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);

  // search
  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
  }, [searchParams?.toString()]);

  // sortBy
  const sortBy = useMemo(() => {
    // searchParams.getAll exists on URLSearchParams - در next/navigation هم کار می‌کند
    const sorts = searchParams.getAll("sortBy") as UserSortBy | string[];
    return sorts.length ? (sorts as UserSortBy) : undefined;
  }, [searchParams?.toString()]);

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isFilteredView = !!(search || sortBy?.length || filter);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <BackToPage title="برگشت" link="/admin/store/customers" />

      <CustomersFilter />

      <EntityCard
        title="لیست کاربران"
        icon={<FiUsers className="text-2xl" />}
        isLoading={isLoading}
        datas={users}
        onAdd={onOpen}
        isExistItems={!!users?.data?.items?.length}
        searchInp={isFilteredView}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {isLoading && <LoadingApiCall />}

        {users?.data?.items?.map((user: any) => (
          <CustomerCard key={user.id} infos={user} />
        ))}
      </EntityCard>

      <AddNewCustomerModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default UsersListPage;
