"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import SortingUsersModal from "./modals/SortingUsersModal";
import FilterUsersModal from "./modals/FilterUsersModal";

const UsersFilter = () => {
  const {
    isOpen: isSortOpen,
    onOpen: onOpenSort,
    onOpenChange: onSortOpenChange,
  } = useDisclosure();

  const {
    isOpen: isFilterOpen,
    onOpen: onOpenFilter,
    onOpenChange: onFilterOpenChange,
  } = useDisclosure();

  return (
    <>
      <Card className="shadow-md">
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 rounded-xl p-2">
            <DebouncedSearchURL placeholder="جستجو در کاربران..." />
            <div className="w-full sm:w-fit flex items-center gap-2">
              <OptionBox
                title="فیلتر"
                icon={<IoFilter className="!text-[16px]" />}
                onClick={onOpenFilter}
                style="w-full sm:w-fit"
              />
              <OptionBox
                title="مرتب سازی"
                icon={<BiSortAlt2 className="!text-[16px]" />}
                onClick={onOpenSort}
                style="w-full sm:w-fit"
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <SortingUsersModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterUsersModal
        isOpen={isFilterOpen}
        onOpenChange={onFilterOpenChange}
      />
    </>
  );
};

export default UsersFilter;
