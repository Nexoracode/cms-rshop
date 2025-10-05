"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import BoxHeader from "./__create/helpers/BoxHeader";
import { LuBox } from "react-icons/lu";
import OptionBox from "../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import SortingModal from "./modals/SortingModal";
import FilterModal from "./modals/FilterModal";
import MoreFeaturesModal from "./modals/MoreFeaturesModal";
import { IoFilter } from "react-icons/io5";
import { IoMdMore } from "react-icons/io";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";

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

  const {
    isOpen: isFeatureOpen,
    onOpen: onOpenFeature,
    onOpenChange: onFeatureOpenChange,
  } = useDisclosure();

  return (
    <>
      <Card className="shadow-none">
        <BoxHeader
          title="باکس فیلتر"
          color="text-white bg-gray-800"
          icon={<LuBox className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-4">
          <DebouncedSearchURL placeholder="جستجو در محصولات..." />
          <div className="flex items-center justify-between">
            <p className="pr-2 hidden sm:flex">فیلتر محصولات</p>
            <section className="flex flex-wrap items-center gap-2 w-full sm:w-fit justify-center sm:justify-end">
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
              <OptionBox
                title="امکانات بیشتر"
                icon={<IoMdMore className="!text-[16px]" />}
                onClick={onOpenFeature}
              />
            </section>
          </div>
        </CardBody>
      </Card>
      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
      <MoreFeaturesModal
        isOpen={isFeatureOpen}
        onOpenChange={onFeatureOpenChange}
      />
    </>
  );
};

export default ProductsFilter;
