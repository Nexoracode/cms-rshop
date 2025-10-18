"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackToPage from "@/components/Helper/BackToPage";
import CardContent from "@/components/Admin/CardContent";
import DynamicModal from "@/components/Helper/DynamicModal";
import CouponsFilter from "@/components/Admin/_store/__promotions/___coupon/CouponsFilter";
import {
  useDeleteCoupon,
  useGetCoupons,
} from "@/hooks/api/useCoupon";
import { LuTicket } from "react-icons/lu";
import CouponCard from "@/components/Admin/_store/__promotions/___coupon/CouponCard";
import { CouponSortBy } from "@/components/Admin/_store/__promotions/___coupon/coupon-types";

const Discount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // page from query
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  // Filters from URL -> Record<string, string[]>
  const filter = useMemo(() => {
    const f: Record<string, string[]> = {};
    for (const [key, value] of Array.from(searchParams.entries())) {
      if (!key.startsWith("filter.")) continue;
      const [, field] = key.split(".");
      if (!field) continue;
      if (!f[field]) f[field] = [];
      f[field].push(value);
    }
    return Object.keys(f).length ? (f as any) : undefined;
  }, [searchParams?.toString()]);

  // search & searchBy
  const search = useMemo(() => {
    const s = searchParams.get("search")?.trim();
    return s ? s : undefined;
  }, [searchParams?.toString()]);

  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy") as CouponSortBy;
    return sorts.length ? sorts : undefined;
  }, [searchParams?.toString()]);

  const { data: coupons, isLoading } = useGetCoupons({
    page,
    sortBy,
    search,
    filter,
  });

  const isFilteredView = !!(search || sortBy?.length || filter);

  // delete modal state
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const isOpen = deleteId !== null;
  const onOpenChange = (open: boolean) => !open && setDeleteId(null);

  const deleteCoupon = useDeleteCoupon(deleteId ?? 0);

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteCoupon.mutate(undefined, {
      onSettled: () => setDeleteId(null),
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <BackToPage title="برگشت به لیست پروموشن ها" link="/admin/store/promotions" />

        {/* فیلتر/لینک‌ها مثل OrdersFilter (مینیمال) */}
        <CouponsFilter />

        <CardContent
          title="لیست کدهای تخفیف"
          icon={<LuTicket className="text-2xl" />}
          isLoading={isLoading}
          datas={coupons}
          onAdd={() => router.push("/admin/store/promotions/coupon/create")}
          isExistItems={!!coupons?.data?.items?.length}
          searchInp={isFilteredView}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coupons?.data?.items?.length
              ? coupons.data.items.map((item: any) => (
                  <CouponCard
                    key={item.id}
                    item={item}
                    onDelete={(id) => setDeleteId(id)}
                  />
                ))
              : ""}
          </div>
        </CardContent>
      </div>

      {/* Modal حذف (دقیقاً مشابه الگوی محصولات) */}
      <DynamicModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onConfirm={handleConfirmDelete}
      >
        <p className="leading-7 text-danger-600">
          با حذف کد تخفیف انتخاب‌شده، امکان بازگردانی وجود ندارد! آیا از حذف
          اطمینان دارید؟
        </p>
      </DynamicModal>
    </>
  );
};

export default Discount;
