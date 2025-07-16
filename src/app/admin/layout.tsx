"use client"
import ShopInfosCard from "@/components/Admin/ArShopCard/ShopInfosCard"
import Sidebar from "@/components/Admin/Sidebar/Sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex flex-col-reverse lg:flex-row w-full bg-stone-100 px-2 !rounded-3xl">
            <div className="fixed bottom-0 left-0 right-0 lg:relative w-3/12 z-50">
                <Sidebar />
            </div>
            <div className="w-9/12 pr-6 mt-6">
                <div className="mb-6">
                    <ShopInfosCard />
                </div>
                <div className="relative pt-12 mb-3">
                    <div className="arshop-card animate-pulse min-h-[70vh] absolute inset-0"></div>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default AdminLayout