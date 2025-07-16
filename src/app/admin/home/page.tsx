"use client";

import LatestOrders from "@/components/Admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/Admin/_home/ProductListMostViewed";
import ReportsList from "@/components/Admin/_home/ReportsList";

const Home = () => {
    return (
        <section className="flex flex-col gap-6">
            <ReportsList />
            <LatestOrders />
            <ProductListMostViewed />
        </section>
    );
};

export default Home;
