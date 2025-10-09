"use client";

import { Card, CardBody, useDisclosure } from "@heroui/react";
import OptionBox from "../../OptionBox";
import { BiSortAlt2 } from "react-icons/bi";
import DebouncedSearchURL from "@/components/Helper/DebouncedSearchInput";
import SortingBrandsModal from "./SortingBrandsModal";

const BrandFilters = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Card className="shadow-none">
        <CardBody className="flex flex-row items-center gap-4">
          <DebouncedSearchURL placeholder="جستجو در برندها..." />

          <OptionBox
            title="مرتب سازی"
            icon={<BiSortAlt2 className="text-xl" />}
            onClick={onOpen}
          />
        </CardBody>
      </Card>
      <SortingBrandsModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default BrandFilters;
