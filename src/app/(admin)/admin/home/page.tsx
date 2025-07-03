"use client";

import ReportWrapper from "@/components/Admin/_home/ReportWrapper";
import ArShopCard from "@/components/Admin/ArShopCard";
import { Button } from "@heroui/react";
import { MdMoreVert } from "react-icons/md";

const Home = () => {
    return (
        <div>
            <ArShopCard activeOrderBadge>
                <Button color="secondary" variant="flat" size="sm" className="rounded-md">
                    <MdMoreVert className="text-lg" /> بیشتر
                </Button>
            </ArShopCard>
            <ReportWrapper />
        </div>
    );
};

export default Home;
