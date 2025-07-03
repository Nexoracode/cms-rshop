"use client"

import { Button } from "@heroui/react"
import ArShopCard from "../ArShopCard"
import { MdMoreVert } from "react-icons/md"

const ShopInfosCard = () => {

    return (
        <ArShopCard activeOrderBadge>
            <Button color="secondary" variant="flat" size="sm" className="rounded-md">
                <MdMoreVert className="text-lg" /> بیشتر
            </Button>
        </ArShopCard>
    )
}

export default ShopInfosCard