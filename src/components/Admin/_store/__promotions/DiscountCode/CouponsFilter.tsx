"use client";

import { Button, Card, CardBody } from "@heroui/react";
import BoxHeader from "@/components/Admin/_products/__create/helpers/BoxHeader";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { LuSettings2, LuTicketPercent } from "react-icons/lu";

const CouponsFilter = () => {
  return (
    <>
      <Card className="shadow-md">
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-start bg-slate-50 rounded-xl p-2">
            <p className="pr-2">صفحات مرتبط</p>
            <div className="flex flex-wrap xs:flex-nowrap gap-2 w-full sm:w-fit">
              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/store/coupons/create"}
              >
                <GoArrowUpRight className="text-xl" />
                ایجاد کد تخفیف
              </Button>
              <Button
                className="pl-5 w-full sm:w-fit"
                variant="flat"
                size="sm"
                as={Link}
                href={"/admin/settings/discounts"}
              >
                <GoArrowUpRight className="text-xl" />
                تنظیمات تخفیف
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CouponsFilter;
