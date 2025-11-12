"use client";

import ManualOrderForm from "@/components/features/orders/ManualOrderForm";
import { ProductsSelectionProvider } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";
import { CustomersSelectionProvider } from "@/components/features/store/customers/SelectableCustomersBox/CustomersSelectionContext";

const ManualOrder = () => {
  return (
    <ProductsSelectionProvider initialProducts={[]}>
      <CustomersSelectionProvider initialCustomers={[]} singleSelect>
        <ManualOrderForm />
      </CustomersSelectionProvider>
    </ProductsSelectionProvider>
  );
};

export default ManualOrder;
