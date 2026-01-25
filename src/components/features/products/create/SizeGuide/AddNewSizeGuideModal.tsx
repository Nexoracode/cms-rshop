"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useSizeGuideUpload,
  useCreateSizeGuid,
  useUpdateSizeGuid,
} from "@/core/hooks/api/useSizeGuide";
import { TbFileText } from "react-icons/tb";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import { useForm } from "@/core/hooks/common/form/useForm";
import { validateSizeGuide } from "./sizeguide-validation";
import { SizeGuideType } from "./type";
import { handleMutation } from "@/core/utils/mutationHelper";

const initialForm: SizeGuideType = {
  id: null,
  title: "",
  description: "",
  image: null,
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (datas: any) => void;
  defaultValues?: SizeGuideType | null;
  isNew?: boolean;
};

export default function AddNewSizeGuideModal({
  isOpen,
  onOpenChange,
  onSubmit,
  defaultValues,
  isNew = true,
}: Props) {
  const { form, errors, handleFieldChange, setForm, reset, submit } =
    useForm<SizeGuideType>(initialForm, {
      onValidate: validateSizeGuide,
      runValidationOnChange: true,
    });

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useSizeGuideUpload();
  const { mutateAsync: createSizeGuid, isPending: isPendingCreate } =
    useCreateSizeGuid();
  const { mutateAsync: updateSizeGuid, isPending: isPendingUpdate } =
    useUpdateSizeGuid(form.id || 0);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        id: defaultValues.id,
        title: defaultValues.title ?? "",
        description: defaultValues.description ?? "",
        image: defaultValues.image ?? null,
      });
    } else {
      reset();
    }
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let imageUrl =
      typeof form.image === "string" ? form.image : null;

    if (form.image instanceof File) {
      const fd = new FormData();
      fd.append("files", form.image);

      const uploadRes = (await handleMutation(
        () => uploadMedias(fd),
        { returnResponse: true }
      )) as any;

      if (!uploadRes.ok) return false;

      imageUrl = uploadRes.data?.[0]?.url ?? null;
    }

    const payload: any = {
      title: form.title,
      description: form.description,
      image: imageUrl,
    };

    if (form.id) payload.id = form.id;

    const res = form.id && !isNew
      ? await handleMutation(() => updateSizeGuid(payload), {
          returnResponse: true,
          resetForm: reset,
        })
      : await handleMutation(() => createSizeGuid(payload), {
          returnResponse: true,
          resetForm: reset,
        });

    if ((res as any)?.data) {
      onSubmit((res as any).data);
    }
  });

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange(val);
        !val && reset();
      }}
      title={form.id ? "ویرایش راهنمای سایز" : "افزودن راهنمای سایز"}
      confirmText={form.id ? "ویرایش" : "ایجاد"}
      onConfirm={handleSubmit}
      icon={<TbFileText />}
      isConfirmDisabled={
        isPendingUpload || isPendingCreate || isPendingUpdate
      }
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          textBtn={form.image ? "تغییر تصویر" : "افزودن تصویر"}
          title="تصویر"
          changeStatusFile={form.image}
          defaultImg={
            typeof form.image === "string" ? form.image : null
          }
          onFile={(file) => handleFieldChange("image", file)}
          sizeText="سایز تصویر: 540x540"
          errorMessage={errors.image}
        />

        <TextInput
          label="عنوان"
          placeholder="عنوان را وارد کنید"
          value={form.title}
          onChange={(val) => handleFieldChange("title", val)}
          isRequired
          errorMessage={errors.title}
          allowEnglishOnly={false}
        />

        <Textarea
          value={form.description}
          onChange={(val) =>
            handleFieldChange("description", val)
          }
          label="توضیحات"
          placeholder="توضیحات را وارد کنید"
          isRequired
          errorMessage={errors.description}
        />
      </div>
    </BaseModal>
  );
}
