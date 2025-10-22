"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import BackToPage from "@/components/common/Breadcrumbs";
import EntityCard from "@/components/common/EntityCard/EntityCard";
import CouponsFilter from "@/components/features/store/promotions/coupon/CouponsFilter";
import { useGetCoupons } from "@/hooks/api/useCoupon";
import { LuTicket } from "react-icons/lu";
import CouponCard from "@/components/features/store/promotions/coupon/CouponCard";
import { CouponSortBy } from "@/components/features/store/promotions/coupon/coupon-types";

const Coupons = () => {
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

  return (
    <>
      <CouponsFilter />

      <EntityCard
        title="لیست کدهای تخفیف"
        icon={<LuTicket className="text-2xl" />}
        isLoading={isLoading}
        datas={coupons}
        redirect="/admin/store/promotions/coupon/create"
        isExistItems={!!coupons?.data?.items?.length}
        searchInp={isFilteredView}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {coupons?.data?.items?.length
          ? coupons.data.items.map((item: any) => (
              <CouponCard key={item.id} item={item} />
            ))
          : ""}
      </EntityCard>
    </>
  );
};

export default Coupons;
