"use client";

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import CustomerInfo from "@/components/Admin/_store/__customers/CustomerInfo";
import CustomerBoxDetail from "@/components/Admin/_store/__customers/helper/CustomerBoxDetail";
import AddNewCustomerModal from "@/components/Admin/_store/__customers/modals/AddNewCustomerModal";
import FilterModal from "@/components/Admin/_store/__customers/modals/FilterModal";
import SortingModal from "@/components/Admin/_store/__customers/modals/SortingModal";
import OptionBox from "@/components/Admin/OptionBox";
import BackToPage from "@/components/Helper/BackToPage";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { useGetAllUsers, useGetOneUser } from "@/hooks/users/useUsers";
import { Card, CardBody, Input, Spinner, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { IoFilter } from "react-icons/io5";
import { LuBox, LuUserSearch, LuUsersRound } from "react-icons/lu";

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [userId, setUserId] = useState("");
  //? Hooks
  const { data: users } = useGetAllUsers();
  const { data: oneUser } = useGetOneUser(userId);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const {
    isOpen: isSortingOpen,
    onOpen: onSortingOpen,
    onOpenChange: onSortingOpenChange,
  } = useDisclosure();

  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();

  return (
    <>
      {!userId ? (
        <div className="flex flex-col gap-6">
          <BackToPage title="برگشت" link="/admin/store" />

          <HeaderAction
            title="لیست کاربران"
            textBtn={"+ کاربر جدید"}
            onPress={onAddOpen}
          />

          <Card className="shadow-none">
            <BoxHeader
              title="باکس فیلر"
              color="text-white bg-gray-800"
              icon={<LuBox className="text-3xl" />}
            />
            <CardBody className="flex flex-col gap-4">
              <section className="w-full">
                <Input
                  isClearable
                  size="lg"
                  variant="bordered"
                  className="bg-white rounded-xl"
                  color="secondary"
                  placeholder="جستجو در کاربران..."
                  startContent={<FiSearch className="text-xl" />}
                ></Input>
              </section>
              <section className="flex flex-wrap items-center gap-2 justify-between">
                <OptionBox
                  title="فیلتر"
                  icon={<IoFilter className="!text-[16px]" />}
                  onClick={onFilterOpen}
                />
                <OptionBox
                  title="مرتب سازی"
                  icon={<BiSortAlt2 className="!text-[16px]" />}
                  onClick={onSortingOpen}
                />
              </section>
            </CardBody>
          </Card>

          <Card className="shadow-md">
            <BoxHeader
              title="کاربران"
              color="text-purple-700 bg-purple-700/10"
              icon={<LuUsersRound className="text-3xl" />}
            />
            <CardBody className="p-4 flex flex-col gap-6">
              {!users?.data ? (
                <LoadingApiCall loadingText="هنوز هیچ کاربری در وبسایت ثبت نام نکرده است یا" />
              ) : (
                <div className="flex flex-col gap-4">
                  {users.data.map((user: any) => (
                    <CustomerBoxDetail
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
              )}
            </CardBody>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <BackToPage
            title="برگشت"
            link="customers"
            onClick={() => setUserId("")}
          />

          <div className="bg-white p-4 rounded-2xl">
            {oneUser?.data ? (
              <CustomerInfo>
                <CustomerBoxDetail
                  firstName={oneUser.data.first_name || "نام"}
                  lastName={oneUser.data.last_name || " | نام خوانوادگی"}
                  phone={oneUser.data.phone}
                  membership={oneUser.data.created_at.slice(0, 10)}
                  email={oneUser.data.email || "example@gmail.com"}
                  cardHeader={
                    <BoxHeader
                      title="اطلاعات کاربر"
                      color="bg-purple-700/10 text-purple-700"
                      icon={<LuUserSearch className="text-3xl" />}
                    />
                  }
                />
              </CustomerInfo>
            ) : (
              <LoadingApiCall />
            )}
          </div>
        </div>
      )}

      <AddNewCustomerModal isOpen={isAddOpen} onOpenChange={onAddOpenChange} />

      <SortingModal isOpen={isSortingOpen} onOpenChange={onSortingOpenChange} />

      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
    </>
  );
};

export default Customers;
