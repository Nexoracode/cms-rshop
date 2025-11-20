import dynamic from "next/dynamic";
import ShopInfosCard from "@/components/layout/ArshopCard/ShopInfosCard";
const LatestOrders = dynamic(() => import('@/components/features/dashboard/LatestOrders'));
const ProductListMostViewed = dynamic(() => import('@/components/features/dashboard/ProductListMostViewed'));
const ReportsList = dynamic(() => import("@/components/features/dashboard/ReportsList"));

const Dashboard = () => {
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

export default Dashboard;
