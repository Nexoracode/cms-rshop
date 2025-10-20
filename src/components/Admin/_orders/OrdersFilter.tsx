"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import OptionBox from "@/components/admin/OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import DebouncedSearchURL from "@/components/widgets/DebouncedSearchInput";
import { IoFilter } from "react-icons/io5";
import FilterOrdersModal from "./modals/FilterOrdersModal";
import SortingOrdersModal from "@/components/admin/_orders/modals/SortingOrdersModal";

const OrdersFilter = () => {
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
            <p className="pr-2">دسترسی سریع</p>
            <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">
              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/promotions"}
              >
                <GoArrowUpRight className="text-xl" />
                پروموشن ها
              </Button>
              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/customers"}
              >
                <GoArrowUpRight className="text-xl" />
                مشتریان
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 rounded-xl p-2">
            <DebouncedSearchURL placeholder="جستجو کدسفارش ، نام مشتری ، نام محصول..." />
            <div className="w-full sm:w-fit flex items-center gap-2">
              <OptionBox
                title="فیلتر"
                icon={<IoFilter className="!text-[16px]" />}
                onClick={onOpenFilter}
                style="w-full sm:w-fit"
              />
              <OptionBox
                title="مرتب‌سازی"
                icon={<BiSortAlt2 className="!text-[16px]" />}
                onClick={onOpenSort}
                style="w-full sm:w-fit"
              />
              {/* <Button
                as={Link}
                href="/admin/settings/orders"
                className="w-full sm:w-fit"
                size="sm"
                variant="flat"
              >
                <LuSettings2 className="text-lg ml-2" />
                تنظیمات سفارش
              </Button> */}
            </div>
          </div>
        </CardBody>
      </Card>

      <SortingOrdersModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterOrdersModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
    </>
  );
};

export default OrdersFilter;
