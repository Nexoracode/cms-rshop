"use client"

import { Button, Card, CardBody, Input, NumberInput } from "@heroui/react"
import BoxHeader from "../../_products/__create/helpers/BoxHeader"
import { LuPackageOpen } from "react-icons/lu"
import { useState, useEffect } from "react"

type Props = {
  cardType: "new" | "update"
  title?: string
  onSubmit?: (data?: { title: string; price: number }) => void
  onDelete?: () => void
  onChange?: (data: { title: string; price: number }) => void
  defaultValues?: { title: string; price: number }
}

const Packaging: React.FC<Props> = ({
  cardType,
  title: titleCard = "",
  onSubmit,
  onDelete,
  onChange,
  defaultValues
}) => {
  const [title, setTitle] = useState(defaultValues?.title || "")
  const [price, setPrice] = useState<any>(defaultValues?.price)

  // فقط برای حالت new
  useEffect(() => {
    if (cardType === "new" && onChange) {
      onChange({ title, price })
    }
  }, [title, price])

  const isDisabled = !title.trim() || price === "" || Number(price) <= 0

  const handleSubmit = () => {
    if (isDisabled || !onSubmit) return
    onSubmit({ title, price: Number(price) })
  }

  return (
    <Card className={cardType === "new" ? "shadow-md shadow-purple-300" : ""}>
      <BoxHeader
        title={cardType === "new" ? "تعریف بسته بندی جدید" : titleCard}
        color={
          cardType === "new"
            ? "bg-purple-700/10 text-purple-700"
            : "bg-green-700/10 text-green-700"
        }
        icon={<LuPackageOpen className="text-3xl" />}
      />
      <CardBody className="shadow-md flex flex-col gap-6">
        <div className="flex gap-4">
          <Input
            label="عنوان بسته بندی"
            labelPlacement="outside"
            placeholder="مثلاً بسته بندی شیشه‌ای"
            value={title}
            onValueChange={setTitle}
          />
          <NumberInput
            label="مبلغ"
            labelPlacement="outside"
            placeholder="60,000"
            type="number"
            minValue={0}
            value={price}
            onValueChange={setPrice}
            endContent={<div><p>تومان</p></div>}
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

export default Packaging
