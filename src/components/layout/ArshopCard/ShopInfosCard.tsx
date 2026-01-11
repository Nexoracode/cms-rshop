"use client";

import { Card, CardBody } from "@heroui/react";
import { MdOutlineSupportAgent } from "react-icons/md";
import BoxLink from "@/components/shared/BoxLink";
//? Icons
import { FiUsers } from "react-icons/fi";
import { TbLogout2, TbReportAnalytics } from "react-icons/tb";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { RiAdminFill, RiAdminLine } from "react-icons/ri";

const ShopInfosCard = () => {
  return (
    <div className="flex items-center flex-col">
      <Card className="shadow-md bg-white rounded-2xl w-full">
        <CardBody className="p-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3 text-start">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-20 h-20 object-contain border-2 bg-[rgba(255,255,255,.8)] rounded-2xl"
              />
              <div>
                <p className="text-lg">فروشگاه آرشاپ</p>

                <div className="mt-2 rounded-xl flex justify-start px-2 w-fit items-center gap-2 text-green-700">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex size-2.5 rounded-full bg-green-500"></span>
                  </span>
                  <small>سفارش گیری فعال</small>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ActionButton
                className="bg-orange-50 text-orange-600"
                icon={<TbLogout2 size={20} />}
                route="/signin"
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-3 sm:flex justify-center items-center gap-3 md:gap-6 mt-4 mb-16">
        <BoxLink
          key="store/me"
          title="اطلاعات من"
          icon={<RiAdminLine className="text-2xl" />}
          routeName="store/me"
          parentStyle="bg-white shadow-md"
          color="text-green-700"
        />

        <BoxLink
          key="store/finance"
          title="گزارشات مالی"
          icon={<TbReportAnalytics className="text-2xl" />}
          routeName="store/finance"
          parentStyle="bg-white shadow-md"
          color="text-purple-700"
        />

        <BoxLink
          key="store/promotions"
          title="پروموشن‌ها"
          icon={<GrAnnounce className="text-2xl" />}
          routeName="store/promotions"
          parentStyle="bg-white shadow-md"
          color="text-orange-700"
        />

        <BoxLink
          key="store/customers"
          title="مشتریان"
          icon={<FiUsers className="text-2xl" />}
          routeName="store/customers"
          parentStyle="bg-white shadow-md"
          color="text-sky-700"
        />

        <BoxLink
          key="store/comments"
          title="دیدگاه‌ها"
          icon={<GoCommentDiscussion className="text-2xl" />}
          routeName="store/comments"
          parentStyle="bg-white shadow-md"
          color="text-sky-700"
        />

        <BoxLink
          key="store/support"
          title="پشتیبانی"
          icon={<MdOutlineSupportAgent className="text-2xl" />}
          routeName="store/support"
          parentStyle="bg-white shadow-md"
          color="text-sky-700"
        />
      </div>
    </div>
  );
};

export default ShopInfosCard;
