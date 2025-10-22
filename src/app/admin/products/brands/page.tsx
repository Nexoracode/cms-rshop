"use client";

import AddNewBrandModal from "@/components/features/products/brands/AddNewBrandModal";
import BrandCard from "@/components/features/products/brands/BrandCard";
import BrandFilters from "@/components/features/products/brands/BrandFilters";
import EntityCard from "@/components/common/EntityCard/EntityCard";
import BackToPage from "@/components/common/BackToPage";
import DynamicModal from "@/components/ui/modals/Modal";
import { useDeleteBrand, useGetBrands } from "@/hooks/api/useBrand";
import { useDisclosure } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TbBrandArc } from "react-icons/tb";

const BrandsProduct = () => {
  const searchParams = useSearchParams();
  const [editBrand, setEditBrand] = useState<any>(null);
  const [deleteBrandId, setDeleteBrandId] = useState<number | null>(null);
  const { mutate: deleteBrand } = useDeleteBrand();
  //
  // صفحه لیست برندها (فقط بخش مرتبط)
  const searchParamsStr = searchParams.toString();

  // page
  const page = useMemo(() => {
    const n = Number(searchParams.get("page") ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParamsStr]);

  // search / searchBy / sortBy
  const search = searchParams.get("search") ?? undefined;

  const sortBy = useMemo(() => {
    const s = searchParams.getAll("sortBy") as Array<
      "id:ASC" | "id:DESC" | "name:ASC" | "name:DESC" | "logo:ASC" | "logo:DESC"
    >;
    return s.length ? s : undefined;
  }, [searchParamsStr]);

  const isFilteredView = !!(
    search ||
    sortBy?.length
  );

  const { data: brands, isLoading } = useGetBrands({
    page,
    search,
    sortBy,
  });
  //? Disclosure
  const {
    isOpen: isOpenBrandModal,
    onOpen: onOpenBrandModal,
    onOpenChange: onOpenChangeBrandModal,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onOpenChange: onOpenChangeDeleteModal,
  } = useDisclosure();

  return (
    <>
      <div className="mb-4">
        <BackToPage title="برگشت به لیست محصولات" link="/admin/products" />
      </div>

      <section className="flex flex-col gap-6">
        <BrandFilters />
        <EntityCard
          datas={brands}
          isExistItems={brands?.data?.items?.length}
          isLoading={isLoading}
          title="لیست برندها"
          onAdd={onOpenBrandModal}
          icon={<TbBrandArc className="text-2xl" />}
          searchInp={isFilteredView}
        >
          <div className="flex flex-wrap justify-center pr-2 gap-4">
            {brands?.data?.items?.map((b: any) => {
              return (
                <BrandCard
                  key={b.id}
                  brand={b}
                  onDelete={(id) => {
                    setDeleteBrandId(id);
                    onOpenDeleteModal();
                  }}
                  onEdit={(brand) => {
                    setEditBrand(brand);
                    onOpenBrandModal();
                  }}
                />
              );
            })}
          </div>
        </EntityCard>
      </section>
      {/* Delete Modal */}
      <DynamicModal
        isOpen={isOpenDeleteModal}
        onOpenChange={onOpenChangeDeleteModal}
        icon={<TbBrandArc className="text-3xl" />}
        title={"تایید حذف برند"}
        onConfirm={() => deleteBrand(deleteBrandId || -1)}
      >
        آیا مطمئن هستید می‌خواهید این برند را حذف کنید؟ پس از حذف، امکان بازیابی
        آن وجود نخواهد داشت.
      </DynamicModal>
      {/* Update Brand Modal */}
      <AddNewBrandModal
        key={editBrand?.id ?? "new"}
        isOpen={isOpenBrandModal}
        onOpenChange={() => {
          setTimeout(() => setEditBrand(null), 200);
          onOpenChangeBrandModal();
        }}
        defaultValues={editBrand}
        brandId={editBrand?.id}
      />
    </>
  );
};

export default BrandsProduct;
