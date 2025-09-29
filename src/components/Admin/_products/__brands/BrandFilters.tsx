// components/Admin/_products/__brands/BrandFilters.tsx
"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import BoxHeader from "../__create/helpers/BoxHeader";
import { LuBox } from "react-icons/lu";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import SortingBrandsModal from "./SortingBrandsModal";

const BrandFilters = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="shadow-none">
        <BoxHeader
          title="باکس فیلتر"
          color="text-white bg-gray-800"
          icon={<LuBox className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-4">
          <section className="w-full">
            <DebouncedSearchURL placeholder="جستجو در برندها..." />
          </section>

          <section className="flex flex-wrap items-center gap-2 justify-between">
            <OptionBox
              title="مرتب سازی"
              icon={<BiSortAlt2 className="!text-[16px]" />}
              onClick={onOpen}
            />
          </section>
        </CardBody>
      </Card>
      <SortingBrandsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default BrandFilters;
