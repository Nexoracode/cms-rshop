"use client";

import { TbWorldSearch } from "react-icons/tb";
import { PiMoneyWavyBold } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import BaseCard from "@/components/ui/BaseCard";
import CardHeader from "@/components/common/Card/CardHeader";
import { LuChartNetwork } from "react-icons/lu";
import BoxLink from "@/components/common/BoxLink";

const ReportsList = () => {
  return (
    <BaseCard bodyClassName="p-0">
      <CardHeader
        title="گزارشات وبسایت"
        icon={<LuChartNetwork className="text-[24px]" />}
        showIconInActionSlot
      />
      <div className="flex flex-row gap-2 items-center justify-evenly my-3">
        <BoxLink
          title="بازدید"
          icon={<TbWorldSearch className="text-2xl"/>}
          routeName={"home/#"}
          parentStyle="text-gray-700"
          titleStyle="text-gray-600"
        />
        <BoxLink
          title="فروش کل"
          icon={<PiMoneyWavyBold className="text-2xl"/>}
          routeName={"home/#"}
          parentStyle="text-gray-700"
          titleStyle="text-gray-600"
        />
        <BoxLink
          title="سفارش ها"
          icon={<HiOutlineDocumentText className="text-2xl"/>}
          routeName={"home/#"}
          parentStyle="text-gray-700"
          titleStyle="text-gray-600"
        />
        <BoxLink
          title="مشتری جدید"
          icon={<FiUsers className="text-2xl"/>}
          routeName={"home/#"}
          parentStyle="text-gray-700"
          titleStyle="text-gray-600"
        />
      </div>
    </BaseCard>
  );
};

export default ReportsList;
