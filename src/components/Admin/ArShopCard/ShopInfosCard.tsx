"use client";

import { useDisclosure, Card, CardBody } from "@heroui/react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import BoxLink from "../settings/BoxLink";
import ProgrammerModal from "./ProgrammerModal";

const ShopInfosCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="max-w-[794px] mx-auto">
        <Card className="shadow-md bg-white rounded-2xl">
          <CardBody className="p-2">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between">
              <div className="flex items-center gap-3 text-start">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-20 h-20 object-contain bg-[rgba(255,255,255,.8)] rounded-2xl"
                />
                <div>
                  <p className="text-lg">فروشگاه آرشاپ</p>

                  <div className="mt-2 rounded-xl flex justify-start px-2 w-fit items-center gap-2 text-green-700">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                      <span className="relative inline-flex size-2.5 rounded-full bg-green-500"></span>
                    </span>
                    <small className="">سفارش گیری فعال</small>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={onOpen}
                  className="bg-orange-50 rounded-xl p-1.5 hover:opacity-70 transition-all text-orange-600"
                >
                  <MdOutlineReportGmailerrorred size={22} />
                </button>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex items-center gap-6 justify-center mt-4 mb-16">
          <BoxLink
            key="store/customers"
            title="مشتریان"
            icon={<FiUsers className="text-2xl" />}
            routeName="store/customers"
            parentStyle="bg-white shadow-md"
            color="text-sky-700"
          />

          <BoxLink
            key="settings/finance"
            title="گزارشات مالی"
            icon={<TbReportAnalytics className="text-2xl" />}
            routeName="settings/finance"
            parentStyle="bg-white shadow-md"
            color="text-purple-700"
          />

          <BoxLink
            key="store/comments"
            title="دیدگاه‌ها"
            icon={<GoCommentDiscussion className="text-2xl" />}
            routeName="store/comments"
            parentStyle="bg-white shadow-md"
            color="text-blue-800"
          />

          <BoxLink
            key="store/promotions"
            title="پروموشن‌ها"
            icon={<GrAnnounce className="text-2xl" />}
            routeName="store/promotions"
            parentStyle="bg-white shadow-md"
            color="text-orange-700"
          />
        </div>
      </div>
      <ProgrammerModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default ShopInfosCard;
