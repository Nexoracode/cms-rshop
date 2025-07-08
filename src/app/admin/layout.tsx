"use client"
import Sidebar from "@/components/Admin/Sidebar/Sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="flex w-full">
            <div className="w-3/12">
                <Sidebar />
            </div>
            <div className="w-9/12 pr-6 mt-6">
                {children}
            </div>
        </div>
    )
}
export default AdminLayout