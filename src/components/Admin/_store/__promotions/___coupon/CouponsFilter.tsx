"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import OptionBox from "@/components/Admin/OptionBox";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import SortingCouponsModal from "./SortingCouponsModal";
import FilterCouponsModal from "./FilterCouponsModal";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-slate-50 rounded-xl p-2">
            <p className="pr-2">اعمال کد تخفیف برای</p>
            <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">
              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/promotions/coupon/products"}
              >
                <GoArrowUpRight className="text-xl" />
                محصولات
              </Button>

              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/promotions/coupon/categories"}
              >
                <GoArrowUpRight className="text-xl" />
                دسته بندی ها
              </Button>

              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/promotions/coupon/users"}
              >
                <GoArrowUpRight className="text-xl" />
                کاربران
              </Button>
            </div>
          </div>
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
