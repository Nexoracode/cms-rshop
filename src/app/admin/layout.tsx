"use client"
import ShopInfosCard from "@/components/Admin/ArShopCard/ShopInfosCard"
import Sidebar from "@/components/Admin/Sidebar/Sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex w-full bg-stone-100 px-2 !rounded-3xl">
            <div className="w-3/12">
                <Sidebar />
            </div>
            <div className="w-9/12 pr-6 mt-6">
                <div className="mb-6">
                    <ShopInfosCard />
                </div>
                <div className="arshop-card">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default AdminLayout