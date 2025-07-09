"use client"

import { Button, Card, CardBody, Input, NumberInput } from "@heroui/react"
import BoxHeader from "../../_products/__create/helpers/BoxHeader"
import { LuPackageOpen } from "react-icons/lu";

type Props = {
    cardType: "new" | "update",
    title?: string
}

const Packaging: React.FC<Props> = ({ cardType, title: titleCard = "" }) => {

    return (
        <Card>
            <BoxHeader
                title={cardType === "new" ? "تعریف بسته بندی جدید" : titleCard}
                color="bg-green-700/10 text-green-700"
                icon={<LuPackageOpen className="text-3xl" />}
            />
            <CardBody className="shadow-md flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <Input
                        label="عنوان بسته بندی"
                        labelPlacement="outside"
                        placeholder="بسته بندی ..."
                    />
                    <NumberInput
                        label="مبلغ"
                        labelPlacement="outside"
                        placeholder="120,000"
                        type="number"
                        minValue={0}
                        endContent={
                            <div>
                                <p>تومان</p>
                            </div>
                        }
                    />
                </div>
                <div className="flex items-center justify-end gap-2">
                    {
                        cardType !== "new"
                            ?
                            <Button color="danger" variant="flat" onPress={() => { }}>
                                حذف
                            </Button>
                            : ""
                    }
                    <Button color="success" variant="flat" onPress={() => { }}>
                        ثبت
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default Packaging