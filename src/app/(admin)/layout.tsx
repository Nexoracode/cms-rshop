"use client"
import Sidebar from "@/components/Admin/Sidebar/Sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex w-full">
            <div className="w-5/6 pr-6 mt-6">
                {children}
            </div>
            <div className="w-1/6">
                <Sidebar />
            </div>
        </div>
    )
}
export default AdminLayout