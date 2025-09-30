"use client";

import { AttributesContent } from "@/components/Admin/_products/__create/AttributesProduct/AttributesContent";
import BackToPage from "@/components/Helper/BackToPage";
import HeaderActionCard from "@/components/Helper/HeaderActionCard";
import { Card, CardBody } from "@heroui/react";
import { MdOutlineCategory } from "react-icons/md";

const Variants = () => {
  return (
    <>
      <div className="mb-4">
        <BackToPage title="برگشت به لیست محصولات" link="/admin/products" />
      </div>

      <section className="flex flex-col gap-6">
        <Card>
          <CardBody>
            <HeaderActionCard
              icon={<MdOutlineCategory className="text-3xl animate-pulse" />}
              title={"مدیریت ویژگی ها"}
              keyTitle={"ویژگی"}
              onAdd={() => {}}
            />
            <div className="px-4 mb-4">
              <AttributesContent
                isActiveHeader={false}
                isDisabledEdit={false}
              />
            </div>
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default Variants;
