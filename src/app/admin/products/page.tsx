"use client";

import { useState } from "react";
// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import ProductsFilter from "@/components/features/products/Filter/ProductsFilter";
import ProductsBulkActions from "@/components/features/products/Filter/ProductsBulkActions";
import ProductCard from "@/components/features/products/ProductCard";
import SelectableCard from "@/components/ui/SelectableCard";
import {
  ProductSortBy,
  useGetProducts,
} from "@/core/hooks/api/products/useProduct";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
// Icons
import { LuPackage, LuPlus } from "react-icons/lu";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";

const Products = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<ProductSortBy[number]>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data: products, isLoading } = useGetProducts({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <>
      <ShopInfosCard />
      <UnifiedCard
        searchFilter={<ProductsFilter />}
        headerProps={{
          title: "مدیریت محصولات",
          icon: <LuPackage className="text-2xl" />,
          redirect: "/admin/products/create?type=infos",
          btnIcon: <LuPlus />,
          tooltipTitle:"مدیریت محصولات",
          tooltipDescription:
          "هر محصول شامل 3 حالت برای آپدیت است. روی کارت محصول کلیک کنید به صفحه فرم محصول میروید تا انحا تغیرات لازم را برای آپدیت انجام دهید. روی دکه چشم کلیک کنید به شما این امکان را میدهد که محوصل رو نمایش یا عدم نمایش بدهید. روی دکمه مثلث کلیک کنید هدایت میشوید به صفحه تنوع های و ویژگی های این محصول جهت اضافه کردن یا آپدیت. در کارت محصول اطلاعاتی قبیل قیمت و موجودی نشان داده میشود اما 3 ایکون هست که در کارت نشان داده میشود برای حالات مختلف. 1. آیکون سبزرنگ به شما نشان میدهد یعنی این محصول دارای راهنمای سایز است 2. آیکون نارنجی یا همان خاور به شما نشان میدهد این محصول برای ارسال امروز استت. و آیکون اخر که صورتی رنگ است و شبیه ستاره است نشان میدهد این محصول جزو لیست پیشنهاد شگفت انگیز است. . شما میتوانید با کلیک روی دکمه  مثالث به صورت دسترسی سریع برای محصول خود متغفیر و ویژگی اضافه کنید  و بعد در صورت نیاز برای اپدیت میتوانید به صفحه مربوطه برای آپدیت بروید "
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={products?.data?.meta}
      >
        {selectedItems.length > 0 && (
          <ProductsBulkActions
            selectedItems={selectedItems}
            onClearSelection={() => setSelectedItems([])}
          />
        )}

        {products?.data?.items?.map((product: any) => (
          <SelectableCard
            key={product.id}
            id={product.id}
            selectedIds={selectedItems}
            onSelectionChange={(id, selected) =>
              setSelectedItems((prev: any) =>
                selected ? [...prev, id] : prev.filter((x: any) => x !== id)
              )
            }
          >
            <ProductCard product={product} />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </>
  );
};

export default Products;
