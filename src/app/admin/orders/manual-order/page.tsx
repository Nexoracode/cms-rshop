"use client";

import ManualOrderForm from "@/components/features/orders/ManualOrderForm";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";

const ManualOrder = () => {
  const handleReset = () => {
    //setCustomers([]);
  };

  return (
    <ProductsSelectionProvider initialProducts={[]}>
      <CustomersSelectionProvider initialCustomers={[]}>
        <ManualOrderForm onReset={handleReset} />
      </CustomersSelectionProvider>
    </ProductsSelectionProvider>
  );
};

export default ManualOrder;
