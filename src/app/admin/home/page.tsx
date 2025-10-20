"use client";

import LatestOrders from "@/components/admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/admin/_home/ProductListMostViewed";
import ReportsList from "@/components/admin/_home/ReportsList";

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
