"use client";

import ShopInfosCard from "@/components/common/ArshopCard/ShopInfosCard";
import LatestOrders from "@/components/features/dashboard/LatestOrders";
import ProductListMostViewed from "@/components/features/dashboard/ProductListMostViewed";
import ReportsList from "@/components/features/dashboard/ReportsList";

const Home = () => {
  return (
    <>
      <ShopInfosCard />
      <section className="w-full flex flex-col gap-4">
        <ReportsList />
        <LatestOrders />
        <ProductListMostViewed />
      </section>
    </>
  );
};

export default Home;
