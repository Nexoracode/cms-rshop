"use client";

import { Card, CardBody } from "@heroui/react";
import ProductFilterModal from "./modals/ProductFilterModal";
import DebouncedSearchURL from "@/components/widgets/DebouncedSearchInput";
import { GoArrowUpRight } from "react-icons/go";
import OptionButton from "@/components/ui/buttons/OptionButton";
import ProductSortModal from "./modals/ProductSortModal";

const ProductsFilter = () => {
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
              <ProductFilterModal />
              <ProductSortModal />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductsFilter;
