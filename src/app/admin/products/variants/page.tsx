"use client";

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
            <div>Test</div>
          </CardBody>
        </Card>
      </section>
    </>
  );
};

export default Variants;
