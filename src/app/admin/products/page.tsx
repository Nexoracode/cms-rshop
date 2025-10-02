"use client";

// Components
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import OptionBox from "@/components/Admin/OptionBox";
import ProductBox from "@/components/Admin/_products/ProductBox";
import FilterModal from "@/components/Admin/_products/modals/FilterModal";
import SortingModal from "@/components/Admin/_products/modals/SortingModal";
import MoreFeaturesModal from "@/components/Admin/_products/modals/MoreFeaturesModal";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { useRouter, useSearchParams } from "next/navigation";
// Icons
import { IoMdMore } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";
import { LuBox } from "react-icons/lu";
import {
  ProductSortBy,
  useDeleteGroupProduct,
  useGetProducts,
} from "@/hooks/products/useProduct";
import LoadingApiCall from "@/components/Helper/LoadingApiCall";
import { GETProduct } from "@/components/Admin/_products/types/edit-product";
import AppPagination from "@/components/Helper/AppPagination";
import { useMemo, useState } from "react";
import DynamicModal from "@/components/Helper/DynamicModal";
import SearchInput from "@/components/Admin/_products/__create/helpers/SearchInput";
import HeaderNavigator from "@/components/Admin/_products/HeaderNavigator";
import { TbCategoryPlus } from "react-icons/tb";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchInp, setSearchInp] = useState<string | undefined>(undefined);
  //? Hooks
  const deleteGroupProduct = useDeleteGroupProduct();

  // get page
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);
  console.log("DDDDDD", page);

  // sortBy
  const sortBy = useMemo(() => {
    // searchParams.getAll exists on URLSearchParams - در next/navigation هم کار می‌کند
    const sorts = searchParams.getAll("sortBy") as ProductSortBy | string[];
    return sorts.length ? (sorts as ProductSortBy) : undefined;
  }, [searchParams?.toString()]);

  // search & searchBy
  const search = searchInp;
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

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    searchBy,
    sortBy,
  });
  console.log(products?.data?.items);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const deleteGroupProducts = () => {
    deleteGroupProduct.mutate(
      { ids: selectedItems },
      {
        onSuccess: () => {
          setSelectedItems([]);
        },
      }
    );
  };

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
                placeholder="جستجو در محصول‌ها..."
                onSearch={setSearchInp}
              />
            </section>
            <section className="flex flex-wrap items-center gap-2 justify-start">
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
          <div className="mx-4 mb-6">
            <HeaderNavigator
              tooltipTitle="افزودن محصول جدید"
              title="لیست محصولات"
              navigateTo="/admin/products/create?type=infos"
              icon={<AiOutlineShop className="text-3xl" />}
              link={<TbCategoryPlus className="text-2xl"/>}
            />
          </div>
          <CardBody>
            {isLoading ? (
              <LoadingApiCall />
            ) : products?.data?.items?.length ? (
              <div className="flex flex-col gap-4">
                {(products.data as GETProduct).items.map((product) => {
                  // ⬇️ محاسبه‌ی ساده در والد
                  const discountValue =
                    product.discount_amount > 0
                      ? product.discount_amount
                      : ((product.discount_percent ?? 0) / 100) * product.price;

                  const finalPrice = Math.max(
                    0,
                    Math.round(product.price - discountValue)
                  );
                  const originalPrice =
                    discountValue > 0 ? product.price : undefined;
                  const effectivePercent = originalPrice
                    ? Math.round((discountValue / product.price) * 100)
                    : 0;

                  return (
                    <ProductBox
                      key={product.id}
                      id={product.id}
                      created_at={product.created_at.slice(0, 10)}
                      title={product.name}
                      pathImg={product.media_pinned.url}
                      price={finalPrice}
                      originalPrice={originalPrice}
                      isVisible={product.is_visible}
                      category={product.category.title}
                      isFeatured={product.is_featured}
                      varientsCount={
                        product.is_limited_stock
                          ? "نامحدود"
                          : product.stock === 0
                          ? "ندارد"
                          : `${product.stock} عدد`
                      }
                      onShowInfos={() =>
                        router.push(
                          `/admin/products/create?edit_id=${product.id}&type=infos`
                        )
                      }
                      onShowVariant={() =>
                        router.push(
                          `/admin/products/create?edit_id=${product.id}&type=variant`
                        )
                      }
                      onSelect={(id, selected) => {
                        setSelectedItems((prev) =>
                          selected
                            ? [...prev, id]
                            : prev.filter((x) => x !== id)
                        );
                      }}
                      cancleRemove={selectedItems}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-center py-6">
                {searchInp?.length
                  ? "برای سرچ شما محصولی وجود ندارد"
                  : "فعلا محصولی وجود ندارد"}
              </p>
            )}
            {selectedItems.length ? (
              <div className="flex gap-2">
                <Button
                  color="default"
                  variant="flat"
                  className="w-full mt-8"
                  onPress={(e) => {
                    setSelectedItems([]);
                  }}
                >
                  لغو حذف محصولات انتخابی
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  className="w-full mt-8"
                  onPress={(e) => {
                    onOpen();
                  }}
                >
                  حذف محصولات انتخاب شده
                </Button>
              </div>
            ) : (
              ""
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
      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="تایید حذف محصولات انتخابی"
        confirmText="حذف محصولات"
        onConfirm={deleteGroupProducts}
        icon={<AiOutlineShop className="text-3xl" />}
      >
        <p className="leading-7 text-danger-600">
          با حذف محصولات انتخاب شده دیگر این محصولات قابل برگشت نیست!! آیا از
          حذف اطمینان دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default Products;
