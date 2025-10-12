"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import OptionBox from "@/components/Admin/OptionBox";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import SortingCouponsModal from "./SortingCouponsModal";
import FilterCouponsModal from "./FilterCouponsModal";

const CouponsFilter = () => {
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
            <DebouncedSearchURL placeholder="جستجو در کد تخفیف ها..." />
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
      <SortingCouponsModal
        isOpen={isSortOpen}
        onOpenChange={onSortOpenChange}
      />
      <FilterCouponsModal
        isOpen={isFilterOpen}
        onOpenChange={onFilterOpenChange}
      />
    </>
  );
};

export default CouponsFilter;
