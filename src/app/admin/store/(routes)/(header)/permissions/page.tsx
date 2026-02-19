"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
// Icons
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useGetAdminMe, useGetStaffs } from "@/core/hooks/api/useUsersAdmin";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { GrUserAdmin } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";

const Permissions = () => {
  const { data: admin, isLoading: isLoadingAdminData } = useGetAdminMe();

  const isAdminUser =
    admin?.data?.role === "super_admin" || admin?.data?.role === "admin";

  const { data: staffs, isLoading: isLoadingStaffsData } = useGetStaffs({
    admin: isAdminUser,
  });

  const isExistItems = !!staffs?.data?.length;

  return (
    <div className="flex flex-col gap-4">
      <UserProfileForm
        headerProps={{
          title: "دسترسی ها",
          icon: <GrUserAdmin />,
          textBtn: "ویرایش",
          redirect: `/admin/store/permissions/staff?edit_id=${admin?.data?.id}&role=${isAdminUser}`,
          btnIcon: <GoArrowUpRight />,
        }}
        info={admin?.data}
        isLoading={isLoadingAdminData}
        hiddenUserAddress
        disableEditForm
        disableShowIsActive
      />
      {admin?.data?.role === "super_admin" || admin?.data?.role === "admin" ? (
        <UnifiedCard
          headerProps={{
            title: "اطلاعات کارمندان",
            icon: <HiOutlineUserGroup className="text-2xl" />,
            children: <AddNewCustomerModal />,
          }}
          isLoading={isLoadingStaffsData}
          isExistItems={isExistItems}
          childrenClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch"
        >
          {staffs?.data?.map((user: any) => (
            <CustomerCard key={user.id} infos={user} redirect={`/admin/store/permissions/staff?edit_id=${user?.id}&staff_role=${user?.role}&role=${isAdminUser}`}/>
          ))}
        </UnifiedCard>
      ) : (
        ""
      )}
    </div>
  );
};

export default Permissions;
