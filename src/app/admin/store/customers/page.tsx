"use client";

import { useState } from "react";
import { useGetAllUsers, useGetOneUser } from "@/hooks/api/users/useUsers";
import { Card, CardBody, Input, useDisclosure } from "@heroui/react";
//? Components | Templates
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import DetailedUserInfo from "@/components/Admin/_store/__customers/DetailedUserInfo";
import UserInfoCard from "@/components/Admin/_store/__customers/UserInfoCard";
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import FilterModal from "@/components/Admin/_store/__customers/modals/FilterUsersModal";
import SortingModal from "@/components/Admin/_store/__customers/modals/SortingUsersModal";
import OptionBox from "@/components/Admin/OptionBox";
import BackToPage from "@/components/Helper/BackToPage";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
//? Icons
import { BiSortAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { LuBox, LuUsersRound } from "react-icons/lu";
import AppPagination from "@/components/Helper/AppPagination";
import { useSearchParams } from "next/navigation";
import UsersFilter from "@/components/Admin/_store/__customers/UsersFilter";

const Customers = () => {
  // State
  const [userId, setUserId] = useState(0);
  //? Hooks
  const sp = useSearchParams();
  const page = +(sp.get("page") ?? 1);
  const { data: users, isLoading } = useGetAllUsers(page);
  const { data: oneUser } = useGetOneUser(userId);

  //? Disclosures
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  return (
    <>
      {!userId ? (
        <section className="flex flex-col gap-6">
          <BackToPage title="برگشت" link="/admin/store" />

          <UsersFilter/>

          <Card className="shadow-md">
            <BoxHeader
              title="کاربران"
              color="text-purple-700 bg-purple-700/10"
              icon={<LuUsersRound className="text-3xl" />}
            />
            <CardBody className="p-4 flex flex-col gap-6">
              {isLoading ? (
                <LoadingApiCall />
              ) : users?.data ? (
                <div className="flex flex-col gap-4">
                  {users.data.items.map((user: any) => (
                    <UserInfoCard
                      key={user.id}
                      firstName={user.first_name || "نام"}
                      lastName={user.last_name || " | نام خوانوادگی"}
                      onShowDetail={() => setUserId(user.id)}
                      phone={user.phone || "09xxxxxxxxx"}
                      membership={user?.created_at.slice(0, 10)}
                      email={user?.email || "example@gmail.com"}
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
          <AppPagination meta={users?.data.meta} />
        </section>
      ) : (
        <section className="flex flex-col gap-6">
          <BackToPage
            title="برگشت"
            link="customers"
            onClick={() => setUserId(0)}
          />
          {(() => {
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
          })()}
        </section>
      )}

      <AddNewCustomerModal isOpen={isAddOpen} onOpenChange={onAddOpenChange} />
    </>
  );
};

export default Customers;
