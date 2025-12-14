"use client";

import { OrderData } from "../order-types";
import GiftWrappingBoxInfos from "./ProccessingBox/GiftWrappingBoxInfos";
import OrderBoxInfos from "./ProccessingBox/OrderBoxInfos";
import PaymentBoxInfos from "./ProccessingBox/PaymentBoxInfos";
import CustomerBoxInfos from "./ProccessingBox/CustomerBoxInfos";
import ShippingBoxInfos from "./ProccessingBox/ShippingBoxInfos";
import InvoiceBoxInfos from "./ProccessingBox/InvoiceBoxInfos/InvoiceBoxInfos";
import DynamicBoxInfos from "./ProccessingBox/DynamicBoxInfos";

type OrderProcessProps = {
  order: OrderData;
  actionBox?: React.ReactNode;
};

const OrderProcess: React.FC<OrderProcessProps> = ({ order, actionBox }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-6">
        <DynamicBoxInfos order={order} actionBox={actionBox} />
        <InvoiceBoxInfos order={order} />
      </div>

      <div className="space-y-6">
        <CustomerBoxInfos order={order} />
        <GiftWrappingBoxInfos order={order} />
        <PaymentBoxInfos order={order} />
        <OrderBoxInfos order={order} />
        <ShippingBoxInfos order={order} />
      </div>
    </div>
  );
};

export default OrderProcess;
