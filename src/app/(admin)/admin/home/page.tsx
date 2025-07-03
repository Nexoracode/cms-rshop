"use client";

import LatestOrders from "@/components/Admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/Admin/_home/ProductListMostViewed";
import ReportsList from "@/components/Admin/_home/ReportsList";
import ShopInfosCard from "@/components/Admin/_home/ShopInfosCard";

const Home = () => {
    return (
        <div className="flex flex-col gap-6 pb-6">
            <ShopInfosCard />
            <ReportsList />
            <LatestOrders />
            <ProductListMostViewed />
        </div>
    );
};

export default Home;
