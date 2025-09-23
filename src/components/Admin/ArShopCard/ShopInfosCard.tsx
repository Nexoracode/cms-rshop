"use client";

import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { MdMoreVert } from "react-icons/md";
import ArShopCard from "../ArShopCard/ArShopCard";
import MediaGallery from "@/components/Helper/MediaGallery";
import { FiSend, FiUsers } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { GoCommentDiscussion } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import BoxLink from "../_settings/BoxLink";
import { FaGithub } from "react-icons/fa";

const ShopInfosCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const topLinks = [
    {
      title: "مشتریان",
      icon: <FiUsers className="text-2xl" />,
      route: "store/customers",
      parent: "text-purple-700 bg-purple-700/5 shadow-md",
      iconBg: "bg-purple-700/10",
    },
    {
      title: "گزارشات مالی",
      icon: <TbReportAnalytics className="text-2xl" />,
      route: "settings/finance",
      parent: "text-green-700 bg-green-700/5 shadow-md",
      iconBg: "bg-green-700/10",
    },
    {
      title: "دیدگاه‌ها",
      icon: <GoCommentDiscussion className="text-2xl" />,
      route: "store/comments",
      parent: "text-gray-700 bg-gray-700/5 shadow-md",
      iconBg: "bg-gray-700/10",
    },
    {
      title: "پروموشن‌ها",
      icon: <GrAnnounce className="text-2xl" />,
      route: "store/promotions",
      parent: "text-orange-700 bg-orange-700/5 shadow-md",
      iconBg: "bg-orange-700/10",
    },
  ];

  return (
    <div className="max-w-[794px] mx-auto bg-gradient-to-l from-blue-100 via-purple-100 rounded-xl p-2 sm:p-4 shadow-md -mb-5">
      <ArShopCard activeOrderBadge>
        <div className="flex xs:flex-col mt-3 xs:mt-0 gap-2 sm:bg-gray-50 sm:p-4 rounded-xl items-center">
          <MediaGallery />
          <Button
            color="secondary"
            variant="flat"
            size="sm"
            onPress={onOpen}
            className="rounded-md w-full xs:w-fit"
          >
            <MdMoreVert className="text-lg" />{" "}
            <span className="hidden sm:flex">بیشتر</span>
          </Button>
        </div>
      </ArShopCard>

      {/* 🔹 Modal جایگزین Popover */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-1">
                <h3 className="font-bold">اطلاعات فروشگاه و تیم توسعه</h3>
                <small className="text-gray-600">arshop.ir</small>
              </ModalHeader>
              <ModalBody>
                <section className="flex flex-wrap justify-center gap-6">
                  <section className="flex flex-wrap md:flex-nowrap w-full md:flex-row gap-6">
                    {/* کارت دوم */}
                    <div className="flex w-full flex-col gap-3 p-3 sm:p-4 rounded-2xl border-2 shadow-lg bg-white/70">
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src="/images/maddahi.jpg"
                          alt="عکس Mohammad Maddahi"
                          className="h-16 w-16 rounded-full ring-2 ring-offset-1 ring-orange-500/50"
                        />
                        <div className="leading-tight text-center">
                          <div className="font-bold text-sm sm:text-base text-gray-900">
                            Mohammad Reza <br /> Maddahi
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            BackEnd Developer (NodeJs / Nest)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <a
                          href="https://eitaa.com/programmer058"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium 
                   bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 
                   text-white shadow hover:from-orange-600 hover:via-orange-500 hover:to-yellow-500 
                   transition-all duration-300"
                        >
                          <FiSend className="h-4 w-4" />
                          Eitaa
                        </a>
                        <a
                          href="tel:09372013208"
                          className="text-center w-full gap-2 rounded-xl border border-orange-300/50 
                   px-3 py-2 text-sm text-orange-700 hover:bg-orange-50 
                   transition-all duration-300"
                        >
                          تماس: 09372013208
                        </a>
                      </div>
                    </div>
                    {/* کارت اول */}
                    <div className="flex w-full flex-col gap-3 p-3 sm:p-4 rounded-2xl border-2 shadow-lg bg-white/70">
                      <div className="flex flex-col items-center gap-3">
                        <img
                          src="https://avatars.githubusercontent.com/u/101788797?v=4"
                          alt="عکس Mohammad Hossein Khadem al Mahdi"
                          className="h-16 w-16 rounded-full ring-2 ring-offset-1 ring-orange-500/50"
                        />
                        <div className="leading-tight text-center">
                          <div className="font-bold text-sm sm:text-base text-gray-900">
                            Mohammad Hossein <br /> Khadem al Mahdi
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            Front-End Developer (React / Next.js)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <a
                          href="https://eitaa.com/mhkhadem"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium 
                   bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 
                   text-white shadow hover:from-orange-600 hover:via-orange-500 hover:to-yellow-500 
                   transition-all duration-300"
                        >
                          <FiSend className="h-4 w-4" />
                          Eitaa
                        </a>
                        <a
                          href="tel:09031335939"
                          className="text-center w-full gap-2 rounded-xl border border-orange-300/50 
                   px-3 py-2 text-sm text-orange-700 hover:bg-orange-50 
                   transition-all duration-300"
                        >
                          تماس: 09031335939
                        </a>
                      </div>
                    </div>
                  </section>
                  <p className="px-4 py-2 text-center text-xs text-gray-600 dark:text-gray-400">
                    در صورت بروز مشکل با برنامه‌نویس تماس بگیرید.
                  </p>
                </section>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* لینک‌های پایین کارت */}
      <div className="flex flex-wrap gap-6 items-center justify-around mt-6">
        {topLinks.map(({ title, icon, route, parent, iconBg }) => (
          <BoxLink
            key={route}
            title={title}
            icon={icon}
            routeName={route}
            parentStyle={parent}
            iconStyle={iconBg}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopInfosCard;
