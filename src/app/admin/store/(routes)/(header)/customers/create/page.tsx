"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/core/hooks/api/users/useUsers";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { useGetStaff } from "@/core/hooks/api/useUsersAdmin";

const UserDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;
  const isUserStaff = params?.get("is_staff");
  const { data: staff, isLoading: isStaffLoading } = useGetStaff({
    admin: !!isUserStaff,
    id: userId,
  });
  const { data: oneUser, isLoading: isLoadingOneUser } = useGetOneUser(userId);

  const isLoading = isStaffLoading || isLoadingOneUser;

  return (
    <UserProfileForm
      headerProps={{
        title: "اطلاعات کاربر",
        icon: <HiOutlineUserGroup />,
        tooltipTitle: "مدیریت اطلاعات کاربر",
        tooltipDescription: `در این بخش می‌توانید اطلاعات حساب کاربری را مشاهده و ویرایش کنید. امکان به‌روزرسانی مشخصات فردی، اطلاعات تماس و افزودن یا مدیریت آدرس‌ها وجود دارد. تغییرات پس از ثبت، در سیستم ذخیره خواهد شد.`,
      }}
      info={staff?.data || oneUser?.data}
      isLoading={isLoading}
      hiddenUserAddress={!!isUserStaff}
      disableShowPermissions
    />
  );
};

export default UserDetailPage;
