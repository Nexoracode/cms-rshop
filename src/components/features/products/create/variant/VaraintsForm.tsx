"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import VariantEditorCard from "./VariantEditorCard";
import { useState, useEffect, useCallback } from "react";
import { useUpdateVariantProduct } from "@/core/hooks/api/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { replaceOrAddById } from "@/core/utils/replaceOrAddById";
import { useListFormHandler } from "@/core/hooks/common/useListFormHandler";
import { validateVariant } from "./variant-validation";

type VaraintsFormProps = {
  initialVariants: any;
};

const VaraintsForm: React.FC<VaraintsFormProps> = ({ initialVariants }) => {
  const router = useRouter();
  const updateVariantProductMutation = useUpdateVariantProduct();
  console.log(initialVariants);

  // initial variants from productData (may be undefined at mount)
  const initVariants = initialVariants ?? [];

  const {
    list: variantsList,
    setList: setVariantsList,
    updateItem,
    validateAll,
    canSubmit,
    errors,
    hasSubmitted,
    setHasSubmitted,
  } = useListFormHandler<any>(initialVariants, {
    runValidationOnChange: true,
    // onValidate expects an array and returns map: index -> fieldErrors
    onValidate: (items) => {
      return items.map((it) => validateVariant(it));
    },
  });

  // keep changed payloads (only items changed will be submitted)
  const [changed, setChanged] = useState<any[]>([]);

  // when productData updates, sync into hook
  useEffect(() => {
    if (initVariants) {
      setVariantsList(initVariants);
      setChanged([]); // reset change buffer
      setHasSubmitted(false);
    }
  }, [initVariants]);

  // child onChange handler -> update list and mark changed
  const handleChildChange = useCallback(
    (index: number, patch: Partial<any>) => {
      updateItem(index, patch);

      setChanged((prev) => {
        const updated = { id: variantsList[index].id, ...patch };
        return replaceOrAddById(prev, updated);
      });
    },
    [updateItem, variantsList]
  );

  // child push payload (optional)
  const handleChildPush = useCallback((payload: any) => {
    setChanged((prev) => replaceOrAddById(prev, payload));
  }, []);

  const handleSubmit = async () => {
    console.log(errors);

    if (!canSubmit()) return;

    try {
      await Promise.all(
        changed.map((val) =>
          updateVariantProductMutation.mutateAsync({ id: val.id, data: val })
        )
      );
      toast.success("متغیرها با موفقیت بروزرسانی شدند");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("مشکلی در آپدیت یکی از واریانت‌ها پیش آمد");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        {variantsList?.map((variant: any, idx: number) => (
          <VariantEditorCard
            key={variant.id ?? idx}
            index={idx}
            value={variant}
            onChange={(i, patch) => handleChildChange(i, patch)}
            onPushPayload={handleChildPush}
            errors={errors[idx] || {}}
            isSubmitAttempted={hasSubmitted}
          />
        ))}
      </div>

      {variantsList?.length && (
        <FormActionButtons
          cancelHref="/admin/products"
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default VaraintsForm;
