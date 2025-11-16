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
import { toast } from "react-hot-toast";

/* اضافه‌شده برای انتخاب وضعیت */
import { statusOptions } from "../order-constants";
import { StatusOrder } from "../order-types";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { useRouter } from "next/navigation";
import SelectableAddressUserCard from "../../store/customers/SelectableAddressUserCard";

type ManualOrderData = {
  userId?: number;
  products: any[];
  selectedAddressId?: number;
};

const ManualOrderForm = () => {
  const router = useRouter()
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
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

  useEffect(() => {
    if (user?.data?.addresses?.length) {
      const primaryAddress = user.data.addresses.find((a: any) => a.is_primary);
      const firstAddress = user.data.addresses[0];

      if (!formData.selectedAddressId) {
        setFormData((prev) => ({
          ...prev,
          selectedAddressId: primaryAddress?.id || firstAddress.id,
        }));
      }
    }
  }, [user]);

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

    const orderData: any = {
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
      status: selectedStatus,
    };

    if (isDiscountEnabled && discountValue > 0) {
      orderData.manualDiscountType = discountType;
      orderData.manualDiscountValue = discountValue;
    }

    createOrder(orderData, {
      onSuccess: () => {
        router.push("/admin/orders");
      },
      onError: (err: any) => {
        console.error(err);
        toast.error("خطا در ایجاد سفارش. لطفا مجدداً تلاش کنید.");
      },
    });
  };

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
        <SelectableAddressUserCard
          key={user?.data.addresses.id}
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

      {/* انتخاب وضعیت سفارش */}
      <div className="mt-4">
        <SelectBox
          label="وضعیت سفارش"
          value={selectedStatus}
          onChange={(val) => setSelectedStatus(val as StatusOrder)}
          options={statusOptions.map((opt) => ({
            key: opt.key,
            title: opt.title,
          }))}
          placeholder="انتخاب وضعیت"
          isRequired
        />
      </div>

      <SwitchWrapper
        label="تخفیف فاکتور"
        description="این مبلغ به عنوان تخفیف از مجموع فاکتور کسر می‌شود"
        initialSelected={false}
        onChange={setIsDiscountEnabled}
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
        isSubmitting={isPending}
        submitText={"ایجاد سفارش"}
      />
    </BaseCard>
  );
};

export default ManualOrderForm;
