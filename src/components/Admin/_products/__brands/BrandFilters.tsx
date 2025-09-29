// components/Admin/_products/__brands/BrandFilters.tsx
"use client";

import { Card, CardBody } from "@heroui/react";
import BoxHeader from "../__create/helpers/BoxHeader";
import { LuBox } from "react-icons/lu";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";

const BrandFilters = () => {
  return (
    <Card className="shadow-none">
      <BoxHeader
        title="باکس فیلتر"
        color="text-white bg-gray-800"
        icon={<LuBox className="text-3xl" />}
      />
      <CardBody className="flex flex-col gap-4">
        <section className="w-full">
          {/* فقط اینو می‌خوایم */}
          <DebouncedSearchURL placeholder="جستجو در برندها..." />
        </section>

        <section className="flex flex-wrap items-center gap-2 justify-between">
          <OptionBox
            title="فیلتر"
            icon={<IoFilter className="!text-[16px]" />}
            onClick={() => {}}
          />
          <OptionBox
            title="مرتب سازی"
            icon={<BiSortAlt2 className="!text-[16px]" />}
            onClick={() => {}}
          />
        </section>
      </CardBody>
    </Card>
  );
};

export default BrandFilters;
