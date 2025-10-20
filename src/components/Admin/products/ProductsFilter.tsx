"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { BiSortAlt2 } from "react-icons/bi";
import SortingModal from "./modals/SortingModal";
import FilterModal from "./modals/FilterModal";
import { IoFilter } from "react-icons/io5";
import DebouncedSearchURL from "@/components/widgets/DebouncedSearchInput";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import OptionButton from "@/components/ui/buttons/OptionButton";

const ProductsFilter = () => {
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
            <p className="pr-2">صفحات مرتبط</p>
            <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">              
              <OptionButton
                title="ویژگی ها"
                icon={<GoArrowUpRight className="text-xl" />}
                href="/admin/products/variants"
                className="pl-5 w-full sm:w-fit"
              />
              <OptionButton
                title="دسته بندی ها"
                icon={<GoArrowUpRight className="text-xl" />}
                href="/admin/products/categories"
                className="pl-5 w-full sm:w-fit"
              />
              <OptionButton
                title="برندها"
                icon={<GoArrowUpRight className="text-xl" />}
                href="/admin/products/brands"
                className="pl-5 w-full sm:w-fit"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 bg-slate-50 rounded-xl p-2">
            <DebouncedSearchURL placeholder="جستجو در محصولات..." />
            <div className="w-full sm:w-fit flex items-center gap-2">
              <OptionButton
                title="فیلتر"
                icon={<IoFilter className="!text-[16px]" />}
                onClick={onOpenFilter}
                className="w-full sm:w-fit text-sky-600 bg-sky-100"
              />
              <OptionButton
                title="مرتب سازی"
                icon={<BiSortAlt2 className="!text-[16px]" />}
                onClick={onOpenSort}
                className="w-full sm:w-fit text-sky-600 bg-sky-100"
              />
            </div>
          </div>
        </CardBody>
      </Card>
      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
    </>
  );
};

export default ProductsFilter;
