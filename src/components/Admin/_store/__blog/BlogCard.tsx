"use client"

import { Button, Card, CardBody, Input, Textarea } from "@heroui/react"
import BoxHeader from "../../_products/__create/helpers/BoxHeader"
import { useState, useEffect } from "react"
import { IoDocumentTextOutline } from "react-icons/io5"
import GenericMultiSelect from "@/components/Helper/GenericMultiSelect"
import ImageBoxUploader from "@/components/Helper/ImageBoxUploader"

type Props = {
  cardType: "new" | "update"
  title?: string
  onSubmit?: (data?: {
    title: string
    description: string
    imageFile: File | null
  }) => void
  onDelete?: () => void
  onChange?: (data: {
    title: string
    description: string
    imageFile: File | null
  }) => void
  defaultValues?: {
    title: string
    description: string
    imageFile?: File | null
  }
}

const BlogCard: React.FC<Props> = ({
  cardType,
  title: titleCard = "",
  onSubmit,
  onDelete,
  onChange,
  defaultValues
}) => {
  const [title, setTitle] = useState(defaultValues?.title || "")
  const [description, setDescription] = useState(defaultValues?.description || "")
  const [imageFile, setImageFile] = useState<File | null>(defaultValues?.imageFile || null)

  // فقط برای حالت new
  useEffect(() => {
    if (cardType === "new" && onChange) {
      onChange({ title, description, imageFile })
    }
  }, [title, description, imageFile])

  const isDisabled = !title.trim() || !description.trim()

  const handleSubmit = () => {
    if (isDisabled || !onSubmit) return
    onSubmit({ title, description, imageFile })
  }

  return (
    <Card className={cardType === "new" ? "shadow-md shadow-purple-300" : ""}>
      <BoxHeader
        title={cardType === "new" ? "تعریف بلاگ جدید" : titleCard}
        color={
          cardType === "new"
            ? "bg-purple-700/10 text-purple-700"
            : "bg-green-700/10 text-green-700"
        }
        icon={<IoDocumentTextOutline className="text-3xl" />}
      />
      <CardBody className="shadow-md flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-right">
          <ImageBoxUploader
            textBtn={imageFile ? "تغییر تصویر" : "+ افزودن تصویر"}
            title="کاور بلاگ"
            changeStatusFile={imageFile}
            onFile={(file) => setImageFile(file)}
            sizeText="سایز تصویر: 16.9"
          />

          <Input
            label="عنوان پست"
            labelPlacement="outside"
            placeholder="عنوان پست را وارد کنید"
            value={title}
            onValueChange={setTitle}
            autoFocus
          />

          <GenericMultiSelect
            label="تگ ها"
            items={[
              { key: "cat", title: "جدید" },
              { key: "dog", title: "قدیمی" },
              { key: "elephant", title: "تازه" }
            ]}
          />

          <Textarea
            labelPlacement="outside"
            label="محتوای پست"
            placeholder="توضیحات پست را وارد کنید"
            variant="flat"
            value={description}
            onValueChange={setDescription}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          {cardType === "update" && (
            <>
              <Button color="danger" variant="flat" onPress={onDelete}>
                حذف
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={handleSubmit}
                isDisabled={isDisabled}
              >
                به‌روزرسانی
              </Button>
            </>
          )}

          {cardType === "new" && (
            <Button
              color="success"
              variant="flat"
              onPress={handleSubmit}
              isDisabled={isDisabled}
            >
              ثبت
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default BlogCard
