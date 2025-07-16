"use client";

import LatestOrders from "@/components/Admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/Admin/_home/ProductListMostViewed";
import ReportsList from "@/components/Admin/_home/ReportsList";

const Home = () => {
    return (
        <div className="flex flex-col gap-6 mb-16">
            <ReportsList />
            <LatestOrders />
            <ProductListMostViewed />
        </div>
    );
};

export default Home;
