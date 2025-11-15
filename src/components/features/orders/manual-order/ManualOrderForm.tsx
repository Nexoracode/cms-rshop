"use client";

import { useEffect, useState } from "react";
import SwitchWrapper from "@/components/shared/SwitchWrapper";
import DiscountInput from "@/components/forms/Inputs/DiscountInput";
import { Discount } from "@/core/types";
import BaseCard from "@/components/ui/BaseCard";
import { HiOutlineDocumentText } from "react-icons/hi2";
import FormActionButtons from "@/components/common/FormActionButtons";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import SelectableProductsBoxWithQuantity from "../../products/SelectableProduct/SelectableProductsBoxWithQuantity";
import { useGetOneUser } from "@/core/hooks/api/users/useUsers";
import { useCreateManualOrder } from "@/core/hooks/api/orders/useOrder";
import SelectableAddressesBox from "./SelectableAddressesBox";
import { toast } from "react-hot-toast";

/* اضافه‌شده برای انتخاب وضعیت */
import PopoverSelect from "@/components/ui/PopoverSelect";
import { statusOptions } from "../order-constants";
import { StatusOrder } from "../order-types";

type ManualOrderData = {
  userId?: number;
  products: any[];
  selectedAddressId?: number;
};

const ManualOrderForm = () => {
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<Discount>("percent");
  const [formData, setFormData] = useState<ManualOrderData>({
    products: [],
  });

  // فقط وقتی userId موجوده query فعال میشه (enabled داخل خود هوک هندل شده)
  const {
    data: user,
    refetch,
    isFetching,
  } = useGetOneUser(formData.userId ?? 0);
  const { mutate: createOrder, isPending } = useCreateManualOrder();

  useEffect(() => {
    // هر بار کاربر تغییر کرد آدرس باید ریست بشه
    setFormData((prev) => ({ ...prev, selectedAddressId: undefined }));
    if (formData.userId) refetch();
  }, [formData.userId, refetch]);

  // وقتی که دیتای کاربر لود شد، آدرس primary به صورت خودکار انتخاب شود
  useEffect(() => {
    if (user?.data?.addresses?.length) {
      const primaryAddress = user.data.addresses.find((a: any) => a.is_primary);

      // اگر primary وجود داشت و قبلاً آدرس انتخاب نشده بود → انتخاب کن
      if (primaryAddress && !formData.selectedAddressId) {
        setFormData((prev) => ({
          ...prev,
          selectedAddressId: primaryAddress.id,
        }));
      }
    }
  }, [user]);

  /* وضعیت پیش‌فرض: "awaiting_payment" (مطابق نمونه‌payload تو) */
  const [selectedStatus, setSelectedStatus] =
    useState<StatusOrder>("awaiting_payment");

  const handleSubmit = () => {
    if (
      !formData.userId ||
      !formData.products.length ||
      !formData.selectedAddressId
    ) {
      toast.error("لطفا کاربر، آدرس و محصولات را انتخاب کنید");
      return;
    }

    const orderData = {
      userId: formData.userId,
      addressId: formData.selectedAddressId,
      items: formData.products.map((product: any) => ({
        product_id: product.id,
        variant_ids:
          product.variants?.map((variant: any) => ({
            id: variant.id,
            quantity: variant.quantity || 1,
          })) || [],
      })),
      status: selectedStatus, // ← اینجا status اضافه شد
    };

    createOrder(orderData, {
      onSuccess: () => {
        toast.success("سفارش دستی با موفقیت ایجاد شد");
        setFormData({ products: [] });
        setDiscountValue(0);
        setSelectedStatus("awaiting_payment"); // ریست وضعیت به پیش‌فرض (اختیاری)
      },
      onError: (err: any) => {
        console.error(err);
        toast.error("خطا در ایجاد سفارش. لطفا مجدداً تلاش کنید.");
      },
    });
  };

  const canSubmit =
    !!formData.userId &&
    formData.products.length > 0 &&
    !!formData.selectedAddressId;

  return (
    <BaseCard
      className="shadow-md mt-6"
      CardHeaderProps={{
        title: "ایجاد سفارش دستی",
        icon: <HiOutlineDocumentText />,
        showIconInActionSlot: true,
      }}
      wrapperContents
    >
      {/* انتخاب کاربر */}
      <SelectableUsersBox
        onChange={(selectedUsers) => {
          const firstUserId = selectedUsers[0];
          setFormData((prev) => ({ ...prev, userId: firstUserId }));
        }}
      />

      {/* نمایش آدرس‌های کاربر */}
      {isFetching ? (
        <p className="text-sm text-gray-500 mt-3">در حال بارگذاری آدرس‌ها...</p>
      ) : user?.data?.addresses?.length > 0 ? (
        <SelectableAddressesBox
          addresses={user?.data.addresses}
          selectedAddressId={formData.selectedAddressId}
          onChange={(addressId) =>
            setFormData((prev) => ({ ...prev, selectedAddressId: addressId }))
          }
        />
      ) : formData.userId ? (
        <p className="text-sm text-gray-500 mt-3">
          هیچ آدرسی برای این کاربر ثبت نشده است.
        </p>
      ) : null}

      {/* انتخاب محصولات */}
      <SelectableProductsBoxWithQuantity
        onChange={(selectedProducts) =>
          setFormData((prev) => ({ ...prev, products: selectedProducts }))
        }
      />

      {/* انتخاب وضعیت سفارش (اضافه‌شده) */}
      <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-2">وضعیت سفارش</label>
        <PopoverSelect
          items={statusOptions}
          initialKey={selectedStatus}
          onSelect={(key) => setSelectedStatus(key as StatusOrder)}
          popoverClassName="w-[240px]"
          buttonClassName="capitalize w-full xs:w-fit text-sm"
        />
      </div>

      {/* تخفیف فاکتور */}
      <SwitchWrapper
        label="تخفیف فاکتور"
        description="این مبلغ به عنوان تخفیف از مجموع فاکتور کسر می‌شود"
      >
        <DiscountInput
          value={discountValue}
          onValueChange={(val) => setDiscountValue(val ?? 0)}
          selectedKey={discountType}
          onSelectChange={(val) => setDiscountType(val as Discount)}
        />
      </SwitchWrapper>

      {/* دکمه‌های عملیات */}
      <FormActionButtons
        cancelHref="/admin/orders"
        onSubmit={handleSubmit}
        isSubmitting={!canSubmit || isPending}
        submitText={isPending ? "در حال ایجاد..." : "ایجاد سفارش"}
      />
    </BaseCard>
  );
};

export default ManualOrderForm;
