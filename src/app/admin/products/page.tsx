"use client";

// Components
import { Card, CardBody, Input, useDisclosure } from "@heroui/react";
import OptionBox from "@/components/Admin/OptionBox";
import ProductBox from "@/components/Admin/_products/ProductBox";
import ActionsModal from "@/components/Admin/_products/modals/ActionsModal";
import FilterModal from "@/components/Admin/_products/modals/FilterModal";
import SortingModal from "@/components/Admin/_products/modals/SortingModal";
import MoreFeaturesModal from "@/components/Admin/_products/modals/MoreFeaturesModal";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { useRouter } from "next/navigation";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
// Icons
import { FiSearch } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { LuBox } from "react-icons/lu";
import { useGetProducts } from "@/hooks/products/useProduct";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { Product } from "@/components/Admin/_products/__create/product-type";

const Products = () => {
  const router = useRouter();
  const { data: products, isPending } = useGetProducts();
  const {
    isOpen: isActionsOpen,
    onOpen: onOpenActions,
    onOpenChange: onActionsOpenChange,
  } = useDisclosure();

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
      <section className="flex flex-col gap-6">
        <HeaderAction
          title="لیست محصولات"
          textBtn="+ محصول جدید"
          onPress={() => router.push("/admin/products/create")}
        />

        <Card className="shadow-none">
          <BoxHeader
            title="باکس فیلر"
            color="text-white bg-gray-800"
            icon={<LuBox className="text-3xl" />}
          />
          <CardBody className="flex flex-col gap-4">
            <section className="w-full">
              <Input
                isClearable
                size="lg"
                variant="bordered"
                className="bg-white rounded-xl"
                color="secondary"
                placeholder="جستجو در محصول ها..."
                startContent={<FiSearch className="text-xl" />}
              ></Input>
            </section>
            <section className="flex flex-wrap items-center gap-2 justify-between">
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
          </CardBody>
        </Card>

        <Card className="shadow-md">
          <BoxHeader
            title="محصولات"
            color="text-orange-700 bg-orange-700/10"
            icon={<AiOutlineShop className="text-3xl" />}
          />
          <CardBody>
            {products?.data ? (
              <div className="flex flex-col gap-4">
                {products.data.items.map((product: Product) => (
                  <ProductBox
                    key={product.id}
                    title={product.name}
                    pathImg={product.media_pinned?.url}
                    price={product.price}
                    varientsCount={product.stock}
                    onMoreDetail={onOpenActions}
                    onShowMore={() => {}}
                  />
                ))}
              </div>
            ) : (
              <LoadingApiCall />
            )}
          </CardBody>
        </Card>
      </section>
      {/* Modals */}
      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
      <ActionsModal
        isOpen={isActionsOpen}
        onOpenChange={onActionsOpenChange}
        productName="کفش آسیاتک"
      />
      <MoreFeaturesModal
        isOpen={isFeatureOpen}
        onOpenChange={onFeatureOpenChange}
      />
    </>
  );
};

export default Products;
