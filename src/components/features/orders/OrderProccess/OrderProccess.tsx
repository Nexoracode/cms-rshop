"use client";

import { OrderData } from "../order-types";
import GiftWrappingBoxInfos from "./ProccessBox/GiftWrappingBoxInfos";
import OrderBoxInfos from "./ProccessBox/OrderBoxInfos";
import PaymentBoxInfos from "./ProccessBox/PaymentBoxInfos";
import CustomerBoxInfos from "./ProccessBox/CustomerBoxInfos";
import ShippingBoxInfos from "./ProccessBox/ShippingBoxInfos";
import InvoiceBoxInfos from "./ProccessBox/InvoiceBoxInfos";
import DynamicBoxInfos from "./ProccessBox/DynamicBoxInfos";

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
