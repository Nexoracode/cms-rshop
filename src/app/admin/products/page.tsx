"use client";

// Components
import { Card, CardBody, Input, useDisclosure } from "@heroui/react";
import OptionBox from "@/components/Admin/OptionBox";
import ProductBox from "@/components/Admin/_products/ProductBox";
import FilterModal from "@/components/Admin/_products/modals/FilterModal";
import SortingModal from "@/components/Admin/_products/modals/SortingModal";
import MoreFeaturesModal from "@/components/Admin/_products/modals/MoreFeaturesModal";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { useRouter, useSearchParams } from "next/navigation";
import HeaderAction from "@/components/Admin/_products/__create/helpers/HeaderAction";
// Icons
import { FiSearch } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { LuBox } from "react-icons/lu";
import { ProductSortBy, useGetProducts } from "@/hooks/products/useProduct";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { GETProduct } from "@/components/Admin/_products/types/edit-product";
import AppPagination from "@/components/Helper/AppPagination";
import { useMemo } from "react";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // get page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // sortBy
  const sortBy = useMemo(() => {
    // searchParams.getAll exists on URLSearchParams - در next/navigation هم کار می‌کند
    const sorts = searchParams.getAll("sortBy") as ProductSortBy | string[];
    return sorts.length ? (sorts as ProductSortBy) : undefined;
  }, [searchParams?.toString()]);

  // search & searchBy
  const search = useMemo(
    () => searchParams.get("search") ?? undefined,
    [searchParams?.toString()]
  );
  const searchBy = useMemo(() => {
    const s = searchParams.getAll("searchBy");
    return s.length ? s : undefined;
  }, [searchParams?.toString()]);

  // Filters
  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    // 'entries()' را به آرایه تبدیل می‌کنیم تا dependency string کار کند
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    // cast به type مناسب (همان ProductFilter)
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);
  console.log(filter);

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    searchBy,
    sortBy,
  });
  console.log("products Data => ", products?.data);

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
          onPress={() => router.push("/admin/products/create?type=infos")}
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
            {isLoading ? (
              <LoadingApiCall />
            ) : products?.data ? (
              <div className="flex flex-col gap-4">
                {(products.data as GETProduct).items.map((product) => (
                  <ProductBox
                    key={product.id}
                    id={product.id}
                    created_at={product.created_at.slice(0, 10)}
                    title={product.name}
                    pathImg={product.media_pinned.url}
                    price={product.price}
                    varientsCount={
                      product.stock === 0 ? "نامحدود یا هیچ" : product.stock
                    }
                    onShowInfos={() =>
                      router.push(
                        `/admin/products/create?edit_id=${product.id}&type=infos`
                      )
                    }
                    onShowVariant={() => {
                      router.push(
                        `/admin/products/create?edit_id=${product.id}&type=variant`
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center py-6">فعلا هنوز محصولی وجود ندارد</p>
            )}
          </CardBody>
        </Card>

        <AppPagination meta={products?.data.meta} />
      </section>
      {/* Modals */}
      <SortingModal isOpen={isSortOpen} onOpenChange={onSortOpenChange} />
      <FilterModal isOpen={isFilterOpen} onOpenChange={onFilterOpenChange} />
      <MoreFeaturesModal
        isOpen={isFeatureOpen}
        onOpenChange={onFeatureOpenChange}
      />
    </>
  );
};

export default Products;
