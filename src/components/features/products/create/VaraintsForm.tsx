"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import VariantEditorCard from "./AttributesProduct/VariantEditorCard";
import { useState } from "react";
import { useUpdateVariantProduct } from "@/core/hooks/api/attributes/useVariantProduct";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { replaceOrAddById } from "@/core/utils/replaceOrAddById";

type VaraintsFormProps = {
  productData: any;
};

const VaraintsForm: React.FC<VaraintsFormProps> = ({ productData }) => {
  const router = useRouter();
  const [variants, setVariants] = useState<any[]>([]);
  const updateVariantProductMutation = useUpdateVariantProduct();

  const updateVariantProduct = async () => {
    Promise.all(
      variants.map((val) =>
        updateVariantProductMutation.mutateAsync({ id: val.id, data: val })
      )
    )
      .then(() => {
        toast.success("متغیرها با موفقیت بروزرسانی شدند");
        router.push("/admin/products");
      })
      .catch((err) => {
        toast.error("مشکلی در آپدیت یکی از واریانت‌ها پیش آمد");
        console.error(err);
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
        {productData?.data?.variants?.map((variant: any) => (
          <VariantEditorCard
            key={variant.id}
            variantName={variant?.name}
            defaultValues={variant}
            onHandleSubmit={(data) =>
              setVariants((prev) => replaceOrAddById(prev, data))
            }
            isSubmitAttempted={false}
            onValidityChange={(id, valid) => {}}
          />
        ))}
      </div>

      {(productData?.data?.variants?.length || variants.length) && (
        <FormActionButtons
          cancelHref="/admin/products"
          onSubmit={updateVariantProduct}
        />
      )}
    </>
  );
};

export default VaraintsForm;
