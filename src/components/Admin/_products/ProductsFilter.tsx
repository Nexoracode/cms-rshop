"use client";

import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import BoxHeader from "./__create/helpers/BoxHeader";
import OptionBox from "../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import SortingModal from "./modals/SortingModal";
import FilterModal from "./modals/FilterModal";
import { IoFilter } from "react-icons/io5";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import Link from "next/link";
import { LuSettings2 } from "react-icons/lu";
import { GoArrowUpRight } from "react-icons/go";

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
      <Card className="shadow-none">
        <BoxHeader
          title="نوار ابزار محصولات"
          color="text-white bg-gray-800"
          icon={<LuSettings2 className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-4">
          <DebouncedSearchURL placeholder="جستجو در محصولات..." />
          <section className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-sky-50 rounded-xl p-3">
              <p className="pr-2 text-sky-600">فیلتر محصولات</p>
              <div className="flex flex-wrap gap-2 w-full sm:w-fit">
                <OptionBox
                  title="فیلتر"
                  icon={<IoFilter className="!text-[16px]" />}
                  onClick={onOpenFilter}
                />
                <OptionBox
                  title="مرتب سازی"
                  icon={<BiSortAlt2 className="!text-[16px]" />}
                  onClick={onOpenSort}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-slate-50 rounded-xl p-3">
              <p className="pr-2">صفحات مرتبط</p>
              <div className="flex flex-wrap gap-2 w-full sm:w-fit">
                <Button
                  className="pl-5"
                  variant="flat"
                  size="sm"
                  as={Link}
                  href={"/admin/products/variants"}
                >
                  <GoArrowUpRight className="text-xl" />
                  ویژگی ها
                </Button>

                <Button
                  className="pl-5"
                  variant="flat"
                  size="sm"
                  as={Link}
                  href={"/admin/products/categories"}
                >
                  <GoArrowUpRight className="text-xl" />
                  دسته بندی ها
                </Button>

                <Button
                  className="pl-5"
                  variant="flat"
                  size="sm"
                  as={Link}
                  href={"/admin/products/brands"}
                >
                  <GoArrowUpRight className="text-xl" />
                برندها
                </Button>
              </div>
            </div>
          </section>
        </CardBody>
      </Card>
      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
    </>
  );
};

export default ProductsFilter;
