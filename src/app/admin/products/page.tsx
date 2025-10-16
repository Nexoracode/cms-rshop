"use client";

// Components
import { Button, useDisclosure } from "@heroui/react";
import ProductBox from "@/components/Admin/_products/ProductBox";
import { useRouter, useSearchParams } from "next/navigation";
// Icons
import {
  ProductSortBy,
  useBulkUpdateProducts,
  useDeleteGroupProduct,
  useGetProducts,
} from "@/hooks/api/products/useProduct";
import { useMemo, useState } from "react";
import DynamicModal from "@/components/Helper/DynamicModal";
import CardContent from "@/components/Admin/CardContent";
import ProductsFilter from "@/components/Admin/_products/ProductsFilter";
import BulkUpdateProductsModal from "@/components/Admin/_products/modals/BulkUpdateProductsModal/BulkUpdateProductsModal";
import { BsShop } from "react-icons/bs";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  //? Hooks
  const deleteGroupProduct = useDeleteGroupProduct();
  const bulkUpdateProducts = useBulkUpdateProducts();

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
  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
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
    sortBy,
  });

  const isFilteredView = !!(
    search ||
    sortBy?.length ||
    filter
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenBulk,
    onOpen: onOpenBulk,
    onOpenChange: onOpenChangeBulk,
  } = useDisclosure();

  const handleBulkUpdateProducts = (changed: any) => {
    bulkUpdateProducts.mutate(
      {
        ids: selectedItems,
        ...changed,
      },
      {
        onSuccess: () => setSelectedItems([]),
      }
    );
  };

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
        <ProductsFilter />
        <CardContent
          title="لیست محصولات"
          icon={<BsShop className="text-2xl" />}
          isLoading={isLoading}
          datas={products}
          onAdd={() => router.push("/admin/products/create?type=infos")}
          isExistItems={!!products?.data?.items?.length}
          searchInp={isFilteredView}
        >
          {selectedItems.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 -mt-2 justify-between gap-4 text-start p-2">
              <p className="pr-2">عملیات</p>
              <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">
                <Button
                  color="danger"
                  variant="flat"
                  className="w-full sm:w-fit"
                  onPress={onOpen}
                  size="sm"
                >
                  حذف محصولات
                </Button>
                <Button
                  color="secondary"
                  variant="flat"
                  className="w-full sm:w-fit"
                  onPress={onOpenBulk}
                  size="sm"
                >
                  بروزرسانی گروهی
                </Button>
                <Button
                  color="default"
                  variant="flat"
                  className="w-full sm:w-fit"
                  onPress={() => setSelectedItems([])}
                  size="sm"
                >
                  لغو انتخاب
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center items-center gap-4">
            {products?.data?.items?.map((product: any) => (
              <ProductBox
                key={product.id}
                product={product}
                onSelect={(id, selected) =>
                  setSelectedItems((prev) =>
                    selected ? [...prev, id] : prev.filter((x) => x !== id)
                  )
                }
                selectedIds={selectedItems}
              />
            ))}
          </div>
        </CardContent>
      </section>
      <BulkUpdateProductsModal
        isOpen={isOpenBulk}
        onOpenChange={onOpenChangeBulk}
        selectedCount={selectedItems.length}
        onConfirm={handleBulkUpdateProducts}
      />
      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={deleteGroupProducts}
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
