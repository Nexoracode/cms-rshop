"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/hooks/api/users/useUsers";
import DetailedUserInfo from "@/components/admin/_store/__customers/DetailedUserInfo";
import LoadingApiCall from "@/components/feedback/LoadingApiCall";

const UserDetailPage = () => {
  const router = useRouter();
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
    <div className="flex flex-col gap-4">
      <button
        className="text-blue-600 hover:underline mb-4"
        onClick={() => router.back()}
      >
        ← برگشت
      </button>

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
    </div>
  );
};

export default UserDetailPage;
