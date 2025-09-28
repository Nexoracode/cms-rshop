"use client";

import AddNewBrandModal from "@/components/Admin/_products/__brands/AddNewBrandModal";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import SearchInput from "@/components/Admin/_products/__create/helpers/SearchInput";
import CardContent from "@/components/Admin/CardContent";
import OptionBox from "@/components/Admin/OptionBox";
import { useGetBrands } from "@/hooks/useBrand";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilter } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbBrandArc, TbEdit } from "react-icons/tb";

const BrandsProduct = () => {
  const searchParams = useSearchParams();
  const [searchInp, setSearchInp] = useState<string | undefined>(undefined);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data: brands, isLoading } = useGetBrands(
    searchParams.get("page") ? +searchParams.get("page")! : 1
  );

  console.log(brands);

  return (
    <>
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
        <CardContent
          datas={brands}
          isExistItems={brands?.data?.items?.length}
          isLoading={isLoading}
          title="لیست برندها"
          keyTitle="برند"
          onAdd={onOpen}
          icon={<TbBrandArc className="text-3xl animate-pulse" />}
          searchInp={!!searchInp?.length}
          styleContent="grid grid-cols-3 gap-4"
        >
          {brands?.data?.items?.map((b: any) => {
            return (
              <Card
                key={b.id}
                className="cursor-auto shadow-lg border"
                isPressable
                shadow="sm"
                onPress={() => {}}
              >
                <CardBody className="overflow-hidden p-0">
                  <Image
                    alt={b.title}
                    className="w-full object-cover h-[140px]"
                    radius="lg"
                    src={b.logo}
                    width={"100%"}
                  />
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex flex-col items-center leading-7 mt-2 w-[200px] py-2 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-1">
                        <p className="text-[15px]">{b.name}</p>
                      </div>
                      <p className="text-default-500">{b.slug}</p>
                    </div>
                    <div className="w-[200px] flex">
                      <Button
                        size="sm"
                        className="rounded-tr-lg w-full"
                        radius="none"
                        color="danger"
                        variant="flat"
                        onPress={() => {}}
                      >
                        <RiDeleteBin5Line className="text-xl" />
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-tl-xl w-full"
                        radius="none"
                        color="success"
                        variant="flat"
                        onPress={() => {
                          onOpen();
                        }}
                      >
                        <TbEdit className="text-xl" />
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </CardContent>
      </section>
      <AddNewBrandModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default BrandsProduct;
