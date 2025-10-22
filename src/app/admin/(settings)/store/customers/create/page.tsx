"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/hooks/api/users/useUsers";
import DetailedUserInfo from "@/components/features/store/customers/DetailedUserInfo";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";
import BackToPage from "@/components/common/BackToPage";

const UserDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;

  const { data: oneUser } = useGetOneUser(userId);

  if (!oneUser?.data) return <LoadingApiCall />;

  const {
    first_name,
    last_name,
    phone,
    email,
    created_at,
    id,
    is_active,
    is_phone_verified,
    avatar_url,
  } = oneUser.data;

  return (
    <>
      <BackToPage title="برگشت به لیست مشتریان" link="/admin/store/customers" />

      <DetailedUserInfo
        firstName={first_name}
        lastName={last_name}
        phone={phone}
        membership={created_at.slice(0, 10)}
        email={email}
        id={id}
        isActive={is_active}
        isPhoneVerified={is_phone_verified}
        avatarUrl={avatar_url}
        address={[
          {
            city: "",
            province: "",
            address_line: "",
            postal_code: "",
            is_primary: false,
          },
        ]}
      />
    </>
  );
};

export default UserDetailPage;
