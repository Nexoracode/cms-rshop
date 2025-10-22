"use client";

import LatestOrders from "@/components/features/dashboard/LatestOrders";
import ProductListMostViewed from "@/components/features/dashboard/ProductListMostViewed";
import ReportsList from "@/components/features/dashboard/ReportsList";

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
