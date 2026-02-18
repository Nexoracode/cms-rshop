"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
// Icons
import { UserSortBy, useGetAllUsers } from "@/core/hooks/api/users/useUsers";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useGetAdminMe } from "@/core/hooks/api/useUsersAdmin";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { GrUserAdmin } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";

const Me = () => {
  const { page } = useListQueryParams<UserSortBy[number]>();

  const { data: admin, isLoading: isLoadingAdminData } = useGetAdminMe();

  const { data: users, isLoading: isLoadingAdminsData } = useGetAllUsers({
    page,
  });

  const isExistItems = !!users?.data?.items?.length;

  return (
    <div className="flex flex-col gap-4">
      <UserProfileForm
        headerProps={{
          title: "دسترسی ها",
          icon: <GrUserAdmin />,
          tooltipTitle: "",
          tooltipDescription: "",
          textBtn: "ویرایش اطلاعات",
          redirect: `/admin/store/customers/create?edit_id=${admin?.data?.id}`,
          btnIcon: <GoArrowUpRight />,
        }}
        info={admin?.data}
        isLoading={isLoadingAdminData}
        hiddenUserAddress
        disableEditForm
      />
      <UnifiedCard
        headerProps={{
          title: "اطلاعات کارمندان فروشگاه",
          icon: <HiOutlineUserGroup className="text-2xl" />,
          children: <AddNewCustomerModal />,
        }}
        isLoading={isLoadingAdminsData}
        isExistItems={isExistItems}
        meta={users?.data?.meta}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center md:justify-items-stretch"
      >
        {users?.data?.items?.map((user: any) => (
          <CustomerCard key={user.id} infos={user} />
        ))}
      </UnifiedCard>
    </div>
  );
};

export default Me;
