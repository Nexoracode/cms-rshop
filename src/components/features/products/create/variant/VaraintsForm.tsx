"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import VariantEditorCard from "./VariantEditorCard";
import { useEffect } from "react";
import { useUpdateVariantProduct } from "@/core/hooks/api/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import { useListForm } from "@/core/hooks/common/form/useListForm";
import { validateVariant } from "./variant-validation";
import toast from "react-hot-toast";

type VaraintsFormProps = {
  initialVariants: any[];
};

const VaraintsForm: React.FC<VaraintsFormProps> = ({
  initialVariants = [],
}) => {
  const router = useRouter();
  const updateVariantProductMutation = useUpdateVariantProduct();

  const {
    items: variantsList,
    updateItem,
    errors,
    reset,
    canSubmit,
    getChangedItems,
  } = useListForm<any>(initialVariants, {
    idKey: "id",
    runValidationOnChange: true,
    onValidate: (items) => items.map(validateVariant),
  });

  useEffect(() => reset(initialVariants), [initialVariants]);

  const handleSubmit = async () => {
    // اول اعتبارسنجی
    console.log(errors);

    if (!canSubmit()) return;

    // بعد تغییرات رو بگیر
    const changed = getChangedItems();
    if (changed.length === 0) {
      toast.error("هیچ تغییری اعمال نشده است");
      return;
    }

    console.log(changed);

    /*  try {
      await Promise.all(
        changed.map((item) =>
          updateVariantProductMutation.mutateAsync({ id: item.id, data: item })
        )
      );
      toast.success(`${changed.length} واریانت بروزرسانی شد`);
      router.push("/admin/products");
    } catch {
      toast.error("خطا در ذخیره تغییرات");
    } */
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        {variantsList.map((variant, index) => (
          <VariantEditorCard
            key={variant.id ?? index}
            index={index}
            value={variant}
            onChange={updateItem}
            errors={errors[index] ?? {}}
            isSubmitAttempted={true}
          />
        ))}
      </div>

      {variantsList.length > 0 && (
        <FormActionButtons
          cancelHref="/admin/products"
          onSubmit={() => handleSubmit()}
          isSubmitting={updateVariantProductMutation.isPending}
        />
      )}
    </>
  );
};

export default VaraintsForm;
