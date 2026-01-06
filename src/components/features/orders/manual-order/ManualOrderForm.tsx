"use client";

import { useEffect, useState } from "react";
import SwitchWrapper from "@/components/shared/SwitchWrapper";
import DiscountInput from "@/components/forms/Inputs/DiscountInput";
import { Discount } from "@/core/types";
import BaseCard from "@/components/ui/BaseCard";
import { HiOutlineDocumentText } from "react-icons/hi2";
import FormActionButtons from "@/components/common/FormActionButtons";
import SelectableUsersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import { useGetOneUser } from "@/core/hooks/api/users/useUsers";
import { useCreateManualOrder } from "@/core/hooks/api/orders/useOrder";
import { toast } from "react-hot-toast";
import { statusOptions } from "../OrderProccess/const/order-constants";
import { StatusOrder } from "../order-types";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { useRouter } from "next/navigation";
import SelectableUserAddressCard from "../../store/customers/UserAddress/SelectableUserAddressCard";

// Hook و validation
import { useForm } from "@/core/hooks/common/form/useForm";
import { validateManualOrder } from "./manual-order-validation";
import ProductVariantsQuantityCard from "../../products/ProductVariantsQuantityCard";

const initialFormData = {
  userId: null as number | null,
  selectedAddressId: null as number | null,
  products: [] as any[],
  status: "awaiting_payment" as StatusOrder,
};

const ManualOrderForm = () => {
  const router = useRouter();

  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<Discount>("percent");

  const { form, errors, handleFieldChange, setForm, submit } = useForm(
    initialFormData,
    {
      onValidate: validateManualOrder,
      runValidationOnChange: true,
    }
  );

  const { data: user, refetch, isFetching } = useGetOneUser(form.userId ?? 0);
  const { mutate: createOrder, isPending } = useCreateManualOrder();

  // ریست آدرس هنگام تغییر کاربر
  useEffect(() => {
    handleFieldChange("selectedAddressId", null);
    if (form.userId) refetch();
  }, [form.userId]);

  // انتخاب خودکار آدرس اصلی یا اولین آدرس
  useEffect(() => {
    if (user?.data?.addresses?.length && !form.selectedAddressId) {
      const primary = user.data.addresses.find((a: any) => a.is_primary);
      const first = user.data.addresses[0];
      handleFieldChange("selectedAddressId", primary?.id || first.id);
    }
  }, [user?.data?.addresses]);

  const handleSubmit = submit(async () => {
    const orderData: any = {
      userId: form.userId,
      addressId: form.selectedAddressId,
      items: form.products.map((product: any) => ({
        product_id: product.id,
        quantity: !product.variants.length ? product.quantity || 1 : null,
        variant_ids:
          product.variants?.map((variant: any) => ({
            id: variant.id,
            quantity: variant.quantity || 1,
          })) || [],
      })),
      status: form.status,
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
        toast.error("خطا در ایجاد سفارش");
      },
    });
  });

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
          handleFieldChange("userId", firstUserId || null);
        }}
        error={!!errors?.userId?.length}
      />

      {/* نمایش آدرس‌ها */}
      {isFetching ? (
        <p className="text-sm text-gray-500 mt-3">در حال بارگذاری آدرس‌ها...</p>
      ) : user?.data?.addresses?.length > 0 ? (
        <SelectableUserAddressCard
          userId={user?.data.id}
          addresses={user?.data.addresses}
          selectedAddressId={form.selectedAddressId ?? undefined} // این خط مشکل رو حل می‌کنه
          onChange={(addressId) =>
            handleFieldChange("selectedAddressId", addressId)
          }
          error={!!errors?.selectedAddressId?.length}
        />
      ) : form.userId ? (
        <div className="text-center py-8 text-red-600">
          <p>هیچ آدرسی برای این کاربر ثبت نشده است.</p>
          <p className="text-sm text-gray-500 mt-2">
            برای ایجاد سفارش، ابتدا آدرس برای کاربر اضافه کنید.
          </p>
        </div>
      ) : null}

      <ProductVariantsQuantityCard
        onChange={(selectedProducts) => {
          handleFieldChange("products", selectedProducts);
        }}
        error={!!errors?.products?.length}
      />

      {/* وضعیت سفارش */}
      <div className="mt-4">
        <SelectBox
          label="وضعیت سفارش"
          value={form.status}
          onChange={(val) => handleFieldChange("status", val as StatusOrder)}
          options={statusOptions.map((opt) => ({
            key: opt.key,
            title: opt.title,
          }))}
          placeholder="انتخاب وضعیت"
        />
      </div>

      {/* تخفیف دستی */}
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

      {/* دکمه‌ها */}
      <FormActionButtons
        cancelHref="/admin/orders"
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitText="ایجاد سفارش"
      />
    </BaseCard>
  );
};

export default ManualOrderForm;
