"use client"

import { Button, Card, CardBody, Input, Textarea } from "@heroui/react"
import { FaQuestion } from "react-icons/fa6"
import { useState, useEffect } from "react"

type Props = {
  cardType: "new" | "update"
  title?: string
  onSubmit?: (data?: { title: string; description: string }) => void
  onDelete?: () => void
  onChange?: (data: { title: string; description: string }) => void
  defaultValues?: { title: string; description: string }
}

const Faq: React.FC<Props> = ({
  cardType,
  title: titleCard = "",
  onSubmit,
  onDelete,
  onChange,
  defaultValues
}) => {
  const [title, setTitle] = useState(defaultValues?.title || "")
  const [description, setDescription] = useState(defaultValues?.description || "")

  // فقط برای حالت new
  useEffect(() => {
    if (cardType === "new" && onChange) {
      onChange({ title, description })
    }
  }, [title, description])

  const isDisabled = !title.trim() || !description.trim()

  const handleSubmit = () => {
    if (isDisabled || !onSubmit) return
    onSubmit({ title, description })
  }

  return (
    <Card className={cardType === "new" ? "shadow-md shadow-purple-300" : ""}>
   {/*    <BoxHeader
        title={cardType === "new" ? "تعریف سوال جدید" : titleCard}
        color={
          cardType === "new"
            ? "bg-purple-700/10 text-purple-700"
            : "bg-green-700/10 text-green-700"
        }
        icon={<FaQuestion className="text-3xl" />}
      /> */}
      <CardBody className="shadow-md flex flex-col gap-6">
        <div className="flex flex-col gap-4 text-right">
          <Input
            label="عنوان سوال"
            placeholder="مثلاً نحوه ارسال کالا"
            value={title}
            onValueChange={setTitle}
          />
          <Textarea
            label="توضیحات سوال"
            placeholder="مثلاً کالا از طریق پست پیشتاز ارسال می‌شود..."
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

export default Faq
