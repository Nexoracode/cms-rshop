"use client";

import LatestOrders from "@/components/Admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/Admin/_home/ProductListMostViewed";
import ReportsList from "@/components/Admin/_home/ReportsList";
import ShopInfosCard from "@/components/Admin/ArShopCard/ShopInfosCard";

const Home = () => {
    return (
        <>
            <ShopInfosCard />
            <div className="flex flex-col gap-6 arshop-card">
                <ReportsList />
                <LatestOrders />
                <ProductListMostViewed />
            </div>
        </>
    );
};

export default Home;
