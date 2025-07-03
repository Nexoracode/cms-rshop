"use client";

import LatestOrders from "@/components/Admin/_home/LatestOrders";
import ProductListMostViewed from "@/components/Admin/_home/ProductListMostViewed";
import ReportsList from "@/components/Admin/_home/ReportsList";
import ArShopCard from "@/components/Admin/ArShopCard";
import { Button } from "@heroui/react";
import { MdMoreVert } from "react-icons/md";

const Home = () => {
    return (
        <div className="flex flex-col gap-6">
            <ArShopCard activeOrderBadge>
                <Button color="secondary" variant="flat" size="sm" className="rounded-md">
                    <MdMoreVert className="text-lg" /> بیشتر
                </Button>
            </ArShopCard>
            <ReportsList />
            <LatestOrders />
            <ProductListMostViewed />
        </div>
    );
};

export default Home;
