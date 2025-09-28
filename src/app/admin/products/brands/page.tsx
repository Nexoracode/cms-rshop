"use client";

import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
import SearchInput from "@/components/Admin/_products/__create/helpers/SearchInput";
import OptionBox from "@/components/Admin/OptionBox";
import AppPagination from "@/components/Helper/AppPagination";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { useGetBrands } from "@/hooks/useBrand";
import { Button, Card, CardBody, CardFooter, Image } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { TbBrandArc } from "react-icons/tb";

const BrandsProduct = () => {
  const searchParams = useSearchParams();
  const [searchInp, setSearchInp] = useState<string | undefined>(undefined);

  const { data: brands, isLoading } = useGetBrands(
    searchParams.get("page") ? +searchParams.get("page")! : 1
  );

  console.log(brands);

  return (
    <section className="flex flex-col gap-6">
      <Card className="shadow-none">
        <BoxHeader
          title="باکس فیلتر"
          color="text-white bg-gray-800"
          icon={<LuBox className="text-3xl" />}
        />
        <CardBody className="flex flex-col gap-4">
          <section className="w-full">
            <SearchInput
              placeholder="جستجو در برندها..."
              onSearch={setSearchInp}
            />
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
      <Card>
        <BoxHeader
          title="برندها"
          color="text-white bg-gradient-to-r from-orange-500 via-purple-500 to-slate-700"
          icon={<TbBrandArc className="text-3xl" />}
        />
        <CardBody>
          <div className="border-b pb-3 mb-6">
            <HeaderAction
              title="لیست برندها"
              textBtn="+ برند جدید"
              onPress={() => {}}
            />
          </div>

          {isLoading ? (
            <LoadingApiCall />
          ) : brands?.data?.items?.length ? (
            <div className="grid grid-cols-3 gap-2 space-y-4">
              {brands.data.items.map((b: any) => {
                return (
                  <Card key={b.id} isPressable shadow="sm" onPress={() => {}}>
                    <CardBody className="overflow-visible p-0">
                      <Image
                        alt={b.title}
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src={b.logo}
                        width="100%"
                      />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                      <b>{b.name}</b>
                      <p className="text-default-500">{b.slug}</p>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-center py-6">
              {searchInp?.length
                ? "برای سرچ شما برندی وجود ندارد"
                : "فعلا برندی وجود ندارد"}
            </p>
          )}
        </CardBody>
      </Card>
      <AppPagination meta={brands?.data.meta} />
    </section>
  );
};

export default BrandsProduct;
