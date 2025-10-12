"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackToPage from "@/components/Helper/BackToPage";
import CardContent from "@/components/Admin/CardContent";
import DynamicModal from "@/components/Helper/DynamicModal";
import CouponsFilter from "@/components/Admin/_store/__promotions/DiscountCode/CouponsFilter";
import { CouponSortBy, useDeleteCoupon, useGetCoupons } from "@/hooks/api/useCoupon";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
} from "@heroui/react";
import { LuTicket } from "react-icons/lu";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Discount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // page from query
  const page = useMemo(() => {
    const p = searchParams.get("page");
    const n = Number(p ?? 1);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }, [searchParams?.toString()]);

  const sortBy = useMemo(() => {
    const sorts = searchParams.getAll("sortBy") as CouponSortBy;
    return sorts.length ? sorts : undefined;
  }, [searchParams?.toString()]);

  const { data: coupons, isLoading } = useGetCoupons({ page, sortBy });

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
        <BackToPage title="برگشت به تنظیمات" link="/admin/store" />

        {/* فیلتر/لینک‌ها مثل OrdersFilter (مینیمال) */}
        <CouponsFilter />

        <CardContent
          title="لیست کدهای تخفیف"
          icon={<LuTicket className="text-2xl" />}
          isLoading={isLoading}
          datas={coupons}
          onAdd={() => router.push("/admin/store/coupons/create")}
          isExistItems={!!coupons?.data?.items?.length}
        >
          <Table
            aria-label="Coupons table"
            isStriped
            removeWrapper
            className="w-full"
          >
            <TableHeader>
              <TableColumn>کد</TableColumn>
              <TableColumn>نوع</TableColumn>
              <TableColumn>مقدار</TableColumn>
              <TableColumn>حداقل مبلغ سفارش</TableColumn>
              <TableColumn>سقف تخفیف</TableColumn>
              <TableColumn>شروع اعتبار</TableColumn>
              <TableColumn>پایان اعتبار</TableColumn>
              <TableColumn>محدودیت تعداد</TableColumn>
              <TableColumn>وضعیت</TableColumn>
              <TableColumn>اولین سفارش</TableColumn>
              <TableColumn>اقدامات</TableColumn>
            </TableHeader>

            <TableBody
              isLoading={isLoading}
              emptyContent="کوپنی یافت نشد."
              items={coupons?.data?.items ?? []}
            >
              {(item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.code}</TableCell>
                  <TableCell>
                    {item.type === "percent" ? "درصدی" : "مبلغ ثابت"}
                  </TableCell>
                  <TableCell>
                    {item.type === "percent"
                      ? `${item.amount}%`
                      : `${Number(item.amount ?? 0).toLocaleString(
                          "fa-IR"
                        )} تومان`}
                  </TableCell>
                  <TableCell>
                    {item.mid_order_amount
                      ? Number(item.mid_order_amount).toLocaleString("fa-IR")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {item.max_discount_amount
                      ? Number(item.max_discount_amount).toLocaleString("fa-IR")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {item.start_date
                      ? new Date(item.start_date).toLocaleString("fa-IR")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {item.end_date
                      ? new Date(item.end_date).toLocaleString("fa-IR")
                      : "—"}
                  </TableCell>
                  <TableCell>{item.usage_limit ?? "—"}</TableCell>
                  <TableCell>
                    <Chip
                      size="sm"
                      color={item.is_active ? "success" : "default"}
                      variant="flat"
                    >
                      {item.is_active ? "فعال" : "غیرفعال"}
                    </Chip>
                  </TableCell>
                  <TableCell>{item.for_first_order ? "بله" : "خیر"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={() =>
                          router.push(
                            `/admin/store/coupons/create?edit_id=${item.id}`
                          )
                        }
                        startContent={<FiEdit2 />}
                      >
                        ویرایش
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => setDeleteId(item.id)}
                        startContent={<FiTrash2 />}
                      >
                        حذف
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
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
