"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useSizeGuideUpload,
  useCreateSizeGuid,
  useUpdateSizeGuid,
} from "@/core/hooks/api/useSizeGuide";
import toast from "react-hot-toast";
import { TbFileText } from "react-icons/tb";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import Textarea from "@/components/ui/inputs/Textarea";
import { validateSizeGuide } from "./sizeguide-validation";
import { SizeGuideType } from "./type";

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
  const { form, errors, handleFieldChange, canSubmit, setForm , reset} =
    useForm<SizeGuideType>(initialForm, {
      onValidate: validateSizeGuide,
      runValidationOnChange: true,
    });

  const { mutate: uploadMedias } = useSizeGuideUpload();
  const { mutate: createSizeGuid } = useCreateSizeGuid();
  const { mutate: updateSizeGuid } = useUpdateSizeGuid(defaultValues?.id || 0);

  useEffect(() => {
    if (defaultValues) {
      setForm({
        id: defaultValues.id,
        title: defaultValues.title ?? "",
        description: defaultValues.description ?? "",
        image: defaultValues.image ?? null,
      });
    } else {
      setForm(initialForm);
    }
  }, [defaultValues, setForm]);

  // handler نهایی ثبت
  const handleUpload = async () => {
    if (!canSubmit()) return;

    try {
      // اگر تصویر فایل هست آپلود می‌کنیم و url رو جایگزین می‌کنیم
      let imageValue: string | null =
        typeof form.image === "string" ? form.image : "";

      if (form.image && form.image instanceof File) {
        const fd = new FormData();
        fd.append("files", form.image);
        uploadMedias(fd, {
          onSuccess: (res: any) => {
            const img = res?.data?.[0];
            if (!img) {
              toast.error("آپلود تصویر ناموفق بود.");
              return;
            }
            imageValue = img.url;
            // بعد از آپلود، یا create یا update رو اجرا کن
            proceedWithCreateOrUpdate(imageValue);
          },
          onError: () => {
            toast.error("آپلود تصویر ناموفق بود.");
          },
        });
      } else {
        // تصویر از قبل URL داشته یا خالیه
        imageValue = typeof form.image === "string" ? form.image : null;
        proceedWithCreateOrUpdate(imageValue);
      }
    } catch (err) {
      console.error(err);
      toast.error("خطای ناشناخته رخ داد.");
    }
  };

  const proceedWithCreateOrUpdate = (imageValue: string | null) => {
    const payload: any = {
      title: form.title,
      description: form.description,
      image: imageValue,
    };

    form.id && (payload.id = form.id);

    if (form.id && !isNew) {
      updateSizeGuid(payload, {
        onSuccess: (response: any) => onSubmit(response.data),
      });
    } else {
      createSizeGuid(payload, {
        onSuccess: (response: any) => onSubmit(response.data),
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange(val);
        !val && reset()
      }}
      triggerProps={undefined}
      title={form.id ? "ویرایش راهنمای سایز" : "افزودن راهنمای سایز"}
      confirmText={form.id ? "ویرایش" : "ایجاد"}
      onConfirm={handleUpload}
      icon={<TbFileText />}
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          textBtn={form.image ? "تغییر تصویر" : "افزودن تصویر"}
          title="تصویر"
          changeStatusFile={form.image}
          defaultImg={typeof form.image === "string" ? form.image : null}
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
        />

        <Textarea
          value={form.description}
          onChange={(e: any) =>
            handleFieldChange("description", e.target.value)
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
