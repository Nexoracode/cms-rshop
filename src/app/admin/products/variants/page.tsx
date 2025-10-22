"use client";

import { AttributesContent } from "@/components/features/products/create/AttributesProduct/AttributesContent";
import BoxHeader from "@/components/features/products/create/helpers/BoxHeader";
import BackToPage from "@/components/common/BackToPage";
import { Card, CardBody } from "@heroui/react";
import { MdOutlineCategory } from "react-icons/md";

const Variants = () => {
  return (
    <>
      <div className="mb-4">
        <BackToPage title="برگشت به لیست محصولات" link="/admin/products" />
      </div>

      <section className="flex flex-col gap-6">
        <Card className="shadow-md">
          <BoxHeader
            title="مدیریت ویژگی ها"
            color="text-blue-700 bg-blue-700/10"
            icon={<MdOutlineCategory className="text-2xl" />}
          />
          <CardBody className="-mt-12 p-0 pt-4">
            <AttributesContent isActiveHeader={false} isDisabledEdit={false} />
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default Variants;
