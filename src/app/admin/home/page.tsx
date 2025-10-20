"use client";

import LatestOrders from "@/components/admin/dashboard/LatestOrders";
import ProductListMostViewed from "@/components/admin/dashboard/ProductListMostViewed";
import ReportsList from "@/components/admin/dashboard/ReportsList";

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
